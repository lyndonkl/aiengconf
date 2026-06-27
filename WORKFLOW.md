# AI Engineer World's Fair 2026 — Schedule Workflow

This project builds a **personalized schedule** for the AI Engineer World's Fair 2026 by running a four-stage pipeline of specialist agents over the conference program. It is the *conference-specific* half of the system: the config, the data-flow structure, the communication contract, and this runbook live here. The agents and skills that do the work are **generic and reusable across conferences** and live in the `claude` plugin (`conf-director`, `conf-program-ingestor`, `conf-enrichment-researcher`, `conf-theme-cartographer`, `conf-preference-elicitor`, `conf-schedule-optimizer`, and their `conf-*` skills).

**The dividing line, strictly held:** nothing conference-specific is baked into the agents. Every conference parameter (dates, rooms, tracks, travel times, default weights, policies) is in `conference.config.json`; every data path is under `./data` and `./state`; the agents receive these as inputs. To schedule a *different* conference, you copy this folder, swap the config, and point the same agents at it.

> **Prerequisite.** The `claude` plugin (which provides the `conf-*` agents and skills) must be enabled in this project. The agents are discovered from the plugin; this folder supplies only config, data, and orchestration.

---

## 1. The agent team

| Stage | Agent | Skill(s) it drives | Reads | Writes |
|---|---|---|---|---|
| 0 — Orchestrate | `conf-director` (opus) | `conf-pipeline-orchestration` | config, state | drives the others; updates `pipeline-state.json` |
| 1 — Ingest | `conf-program-ingestor` | `conf-program-extraction`, `conf-abstract-enrichment` | `data/00-source/*` | `data/01-events/events.json` (+ `index.md`) |
| 1b — Enrich | `conf-enrichment-researcher` | `conf-abstract-enrichment` | one event record | `data/01-events/enrichment/{id}.json` |
| 2 — Cluster | `conf-theme-cartographer` | `conf-theme-clustering` | `events.json` | `data/02-clusters/clusters.json` + `affinities.json` (+ `clusters.md`) |
| 3 — Elicit *(interactive)* | `conf-preference-elicitor` (opus) | `conf-preference-elicitation`, `bayesian-reasoning-calibration`, `discovery-interviews-surveys` | clusters, affinities, events | `data/03-preferences/profile.json` |
| 4 — Schedule | `conf-schedule-optimizer` | `conf-schedule-optimization`, `decision-matrix`, `expected-value` | events, affinities, profile | `data/04-schedule/schedule.json` (+ `schedule.md`, `conflicts.md`, `rationale.md`) |

Stage 3 is **interactive** — it must run in the main conversation, because it asks you questions. The other stages run as subagents under the director.

---

## 2. The four-stage flow and its gates

```
data/00-source/llms-full.md
      │  conf-program-ingestor  (parse + per-field confidence + axes; fan out enrichment)
      ▼
data/01-events/events.json ───────── GATE: meta.status=done, confidence_rollup present,
      │                                    low_confidence_field_fraction ≤ 0.4 (else surface)
      │  conf-theme-cartographer  (embed→label or reasoned; 6–8 themes + outliers + soft affinities)
      ▼
data/02-clusters/clusters.json + affinities.json ── GATE: ≥1 coarse theme, affinities present
      │
      │  conf-preference-elicitor  (INTERACTIVE: few grounded choice questions + outlier probes + weights)
      ▼
data/03-preferences/profile.json ── GATE: status=stable, objective_weights present,
      │                                    outlier_probes_done ≥ 1 (the diversity floor)
      │  conf-schedule-optimizer  (COP: hard constraints + user-weighted objective; surface conflicts)
      ▼
data/04-schedule/schedule.json + schedule.md + conflicts.md + rationale.md
      │
      ▼  conf-director synthesizes → presents schedule + surfaced conflicts + trade-off note as DECISIONS
         (never auto-commits; no calendar write without explicit instruction)
```

A gate is a check the director performs on the **artifact's status fields** before advancing — not on a worker's prose claim of success. A failed gate is surfaced to you, not silently retried forever.

---

## 3. The communication contract

Agents communicate **only through these files**, each with a defined schema and status fields. The director passes input paths + an explicit output path + a return contract; the worker writes the artifact and returns the path; the director verifies the artifact before advancing. No free-text handoffs.

### `data/01-events/events.json`  (Stage 1)

```json
{
  "meta": {
    "conference_id": "ai-engineer-worldsfair-2026",
    "source_ref": "data/00-source/llms-full.md",
    "generated_on": "YYYY-MM-DD",
    "counts": { "total": 0, "talk": 0, "workshop": 0, "keynote": 0, "panel": 0, "other": 0 },
    "confidence_rollup": { "mean_field_confidence": 0.0, "low_confidence_field_fraction": 0.0, "events_with_thin_abstract": 0 },
    "status": "done | partial",
    "format_detected": "string"
  },
  "events": [
    {
      "id": "d2-0900-laurie-voss-vibes-to-production",
      "title": "string",
      "speakers": [ { "name": "string", "affiliation": null, "affiliation_confidence": 0.0 } ],
      "session_type": "talk | workshop | keynote | panel | sponsor | expo | unknown",
      "track": "string | null", "room": "string | null",
      "day": "YYYY-MM-DD | null", "start": "HH:MM | null", "end": "HH:MM | null",
      "abstract_raw": "string | null", "abstract_enriched": "string | null",
      "axes": {
        "topic": ["string"],
        "depth": { "value": "intro|intermediate|advanced|unknown", "confidence": 0.0, "basis": "string" },
        "format": { "value": "talk|workshop|keynote|panel|unknown", "confidence": 0.0, "basis": "string" },
        "prerequisites": { "value": ["string"], "confidence": 0.0, "basis": "string" },
        "recorded": { "value": null, "confidence": 0.0, "basis": "string" },
        "capacity_constrained": { "value": null, "confidence": 0.0, "basis": "string" }
      },
      "enrichment": { "performed": false, "sources": [], "confidence": 0.0 },
      "field_confidence": { "title": 1.0, "speakers": 0.0, "track": 0.0, "room": 0.0, "time": 0.0, "abstract": 0.0 },
      "source_ref": "raw heading or line range"
    }
  ]
}
```

### `data/01-events/enrichment/{event_id}.json`  (Stage 1b)

```json
{
  "event_id": "string", "gated_out": false,
  "abstract_enriched": "string | null",
  "axis_updates": { "topic": ["string"], "depth": { "value": "string", "confidence": 0.0, "basis": "string" } },
  "sources": [ { "url": "string", "claim": "string", "retrieved_on": "YYYY-MM-DD" } ],
  "confidence": 0.0, "searches_used": 0, "searches_cap": 4, "capped": false, "notes": "string"
}
```

### `data/02-clusters/clusters.json`  (Stage 2)

```json
{
  "method": "embed-hdbscan | llm-reasoned",
  "generated_on": "YYYY-MM-DD",
  "stability_note": "string",
  "coarse_themes": [
    { "id": "T1", "label": "string", "gloss": "string", "size": 0,
      "representative_event_ids": ["..."],
      "subclusters": [ { "id": "T1.1", "label": "string", "gloss": "string", "event_ids": ["..."] } ] }
  ],
  "outliers": [ { "event_id": "string", "why": "string" } ]
}
```

### `data/02-clusters/affinities.json`  (Stage 2)

```json
{ "generated_on": "YYYY-MM-DD", "top_k": 3,
  "affinities": { "<event_id>": [ { "theme_id": "T1", "affinity": 0.0 } ] } }
```

### `data/03-preferences/profile.json`  (Stage 3)

```json
{
  "status": "in_progress | stable",
  "generated_on": "YYYY-MM-DD",
  "region": { "<theme_id>": { "interest_lo": 0.0, "interest_hi": 1.0 } },
  "point_estimate": { "<theme_id>": 0.0 },
  "axis_preferences": { "depth_target": "string", "format_mix": {}, "recorded_ok_to_skip": true, "time_constraints": ["..."] },
  "objective_weights": { "interest": 0.0, "breadth": 0.0, "pacing": 0.0, "serendipity": 0.0 },
  "hard_constraints": ["..."],
  "interaction_log": [ { "q": "string", "options": ["..."], "choice": "string", "inferred": "string", "info_gain_note": "string", "type": "exploit|explore|outlier_probe|weights|constraint" } ],
  "outlier_probes_done": 0,
  "region_tightness": 0.0,
  "forced_in": ["event_id"], "blacked_out": ["event_id"]
}
```

`forced_in` / `blacked_out` are the structured form of must-attends / blackouts that the scheduler reads directly; free-text versions also live in `hard_constraints` for the human.

### `data/04-schedule/schedule.json`  (Stage 4)

```json
{
  "generated_on": "YYYY-MM-DD", "method": "greedy-local-search | ilp",
  "selections": [ { "day": "YYYY-MM-DD", "start": "HH:MM", "end": "HH:MM", "event_id": "string", "room": "string", "score": 0.0, "why": "string", "alternatives": [ { "event_id": "string", "score": 0.0, "why_not": "string" } ] } ],
  "free_blocks": [ { "day": "YYYY-MM-DD", "start": "HH:MM", "end": "HH:MM", "purpose": "break|buffer|travel|meal" } ],
  "objective_breakdown": { "interest": 0.0, "breadth": 0.0, "pacing": 0.0, "serendipity": 0.0, "total": 0.0, "weights": {} },
  "unresolved_conflicts": [ { "day": "YYYY-MM-DD", "slot": "HH:MM-HH:MM", "candidates": ["..."], "why_unbreakable": "string", "needs": "your decision" } ],
  "constraints_applied": {}, "tradeoffs_note": "string"
}
```

### `state/pipeline-state.json`  and  `state/invariants.lock.json`

`pipeline-state.json` is the canonical state machine (stage status + verified confidence + gates) that makes the pipeline resumable. `invariants.lock.json` is the frozen reference of the director's protected control logic; the director checksums against it each cycle and refuses any change that would weaken it. Both schemas are in those files; see §5 for why they exist.

---

## 4. How to run

**Primary path — invoke the director in the main conversation:**

1. Drop the program into `data/00-source/` (or let Stage 1 fetch `source_url`).
2. In the main conversation: *"Use `conf-director` to build my schedule for this conference — config `./conference.config.json`, data root `./data`, state root `./state`, source URL from the config."*
3. The director runs Stage 1 (ingest) and Stage 2 (cluster) via subagents, verifying each gate.
4. **Stage 3 happens with you, live:** the director hands off to `conf-preference-elicitor` (or runs the elicitation itself). Expect 3–6 sharp, choice-based questions grounded in the real themes, including at least one deliberate outlier. You'll also be asked your trade-off (packed vs paced) and any must-attends.
5. The director runs Stage 4 (schedule) and presents the day-by-day plan, the short list of **conflicts only you can decide**, and a note on what the weighting traded away. Nothing is committed; no calendar is touched unless you ask.

**Optional path — `workflow.js`:** an automated driver for the non-interactive stages (1, 2, 4) that pauses for the interactive Stage 3. It is a convenience, not the primary path; the director is the canonical entry point. See the header of `workflow.js`.

---

## 5. Design rationale (grounded in the multi-agent research)

The through-line is **explicit uncertainty management at every layer** — each stage produces calibrated confidence, not commitments — and a small set of **safety loops on the orchestration**. Where each principle lives:

- **Per-field confidence (ingest).** Abstracts are short/missing; depth and capacity must be inferred. Every field carries a confidence + basis so downstream stages know solid from guessed. → `conf-program-extraction`.
- **Enrichment is isolated and provenance-bound.** The one place runtime web search pays off; fanned out to sub-workers so verbose output stays out of the ingestor, every claim sourced. → `conf-enrichment-researcher` / `conf-abstract-enrichment`.
- **Embed-then-label, with outliers and soft membership (cluster).** Embeddings group (cheap, stable); the LLM only labels. The outlier bucket is a feature — the odd cross-disciplinary talk is often the best one. Soft top-k affinities because "evaluating agentic RAG" belongs to three themes. → `conf-theme-clustering`.
- **Few grounded questions, a preference region, and outlier probes (elicit).** A couple of well-chosen choice-based questions capture most of the signal; the agent tracks an uncertainty region and asks the highest-information-gain question; it deliberately probes outliers to fight **selection bias** (otherwise it converges on a narrowed model of you). → `conf-preference-elicitation`.
- **A weighted COP with user-owned weights, contiguous free time, and conflict-surfacing (schedule).** Interest vs breadth vs pacing vs serendipity are in genuine conflict; the weights are yours; a real break beats six scattered gaps; unbreakable ties are surfaced as decisions, not silently picked. → `conf-schedule-optimization`.
- **The orchestration discipline (director).** Confidence propagates and governs each gate; agents talk through schema-shaped artifacts, never free text; the director is an **aggregator with internal recurrence** (holds and integrates, doesn't pass through); it **freezes its safety logic** (stuck-detector, kill-switch, thresholds) against an invariants lock and refuses to optimize it away — the most common multi-agent failure is an in-place update that deletes the very rail that would have caught the failure; it holds the **diversity floor** (the elicitor's outlier probes); it **concentrates hardening** on the fragile elicit→schedule handoff and the enrichment fan-out; and it honors the **Goodhart caution** — any optimized score produces a substitution effect somewhere it didn't name, so weights stay yours and trade-offs are reported. → `conf-pipeline-orchestration`.

The net effect: the system flags an overlap precisely because it knows both talks score high *and* that its model of you can't break the tie alone. Conflict-surfacing is not a weakness — it is the honest output of a pipeline that tracks its uncertainty at every layer.
