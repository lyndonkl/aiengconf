# Why this schedule looks the way it does

## 1. Your weights drove everything (they are yours, not invented)

Read straight from `profile.objective_weights`:

| term | weight | what it pulls for |
|---|---|---|
| **interest** | 0.42 | talks in your bullseye (T1 harnesses/orchestration + context engineering, then T3/T5) |
| **pacing** | 0.3 | contiguous recovery time; lunch free; light evenings — *paced, not packed* |
| **breadth** | 0.16 | some cross-theme coverage, but moderate (you're focused) |
| **serendipity** | 0.12 | a little slack / off-lane curiosity, 'fit when cheap' |

Interest is the largest term, but **pacing at 0.3 is a close second and it is what stops the plan from filling every slot.** That tension is the whole story below.

## 2. Objective breakdown (what the plan actually scored)

| component | score | weight | contribution |
|---|---|---|---|
| interest | 0.729 | 0.42 | 0.306 |
| breadth | 0.5 | 0.16 | 0.08 |
| pacing | 0.988 | 0.3 | 0.296 |
| serendipity | 0.054 | 0.12 | 0.006 |
| **total** | | | **0.689** |

- **interest 0.729** — high: most picks are 0.77–0.99 in your core T1 lane; the keynotes (0.35–0.68) pull the mean down honestly.
- **pacing 0.988** — near-max: every day keeps one long contiguous free block (130–200 min) plus a protected lunch and a light evening.
- **breadth 0.5** — deliberately middling: the plan tunnels into T1/T3/T5 (see §4).
- **serendipity 0.054** — low by design: both wildcards are *surfaced for your decision*, not forced in, so this term stays small unless you opt one in.

## 3. How each per-event 'interest' was computed

1. **Base** = affinity-weighted blend of your per-theme interest (`point_estimate`/`region`) over the event's top-3 theme affinities from `affinities.json`.
2. **Subtheme focus (T1 only):** +0.12 if the event is in **T1.1 Agent Harnesses & Orchestration** or **T1.2 Context Engineering** (your `T1_prioritize`); +0.05 for the secondary T1 subclusters (Tools/MCP, Computer-Use, Sandboxes). Membership read from `clusters.json`.
3. **Depth:** +0.04 where the event is tagged `advanced` (your `depth_target`). NB only 25/556 events carry a known depth tag, so this mostly breaks ties rather than driving picks.
4. **Neighbors** fall out of your point estimates: T3/T5 ≈ 0.68 (woven in), T2/T8 ≈ 0.30–0.35 (lower), T4/T6/T7 ≈ 0.18–0.25 (lowest).

## 4. What was de-prioritized (the honest list)

- **Themes you'll barely see:** picks by theme = Building & Operating Agents (13), Coding Agents & AI-Native Dev (4), Retrieval, Memory & Knowledge (2), Evaluation, Observability & Data (1). T4 (model/inference), T6 (multimodal/voice/media) and T7 (enterprise/verticals) are essentially absent — that is your stated low-interest set, but it *is* a real omission.
- **3–4 strong parallel talks every afternoon** were dropped to keep contiguous breaks. The runners-up are recorded in each selection's `alternatives[]`; the genuine near-ties are escalated in `conflicts.md`.
- **Workshops on session days:** excluded entirely. Your two hands-on labs are confined to Workshop Day (the format_mix you asked for: mostly talks, 1–2 standout labs).
- **The recorded tiebreak was unusable:** `recorded_policy=unknown` for all 556 sessions, so 'skip the one you can replay' never had data. Where a capacity-constrained live lab competed, it was treated as the least-replayable.

## 5. How the hard constraints were honored

- **4 anchored keynotes forced in:** Embiricos (opening, Jun 30), Dex Horthy (harness engineering, Jun 30 16:30 — the one keynote allowed into the wind-down window because you anchored it), Tariq Shaukat (verifiers, Jul 1), Matt Pocock (agent skills, Jul 2). Emil Eifrem (Why Graphs, T5) added as your in-lane keynote alternate; swyx offered, not forced.
- **Lunch ~12:00–13:30 free every day** (meal block). **Evenings light after ~17:00** (networking/buffer).
- **All four days scheduled**, including Workshop Day = 2 deep T1 labs: *Cooking with Codex* (harness/codex) + *Context Engineering in 2026: Compaction*.
- **Feasibility:** zero time-overlaps; room-to-room travel respected (default 5 min, Main↔Expo 10 min).

## 6. Caps & method notes (no silent truncation)

- content-free placeholders de-prioritised: 21 expo/sponsor/TBA slots excluded from the selectable talk pool (clusters.json flagged 22 content-free expo/sponsor placements); kept in program, never silently dropped
- paced block-caps applied: considered top feasible talk per slot, selected best contiguous run (2 morning / 2-3 afternoon) per day rather than filling every slot — a deliberate pacing cap, not data loss
- session-day talk pool restricted to format=talk (+ anchored keynotes); multi-part Claude-Managed-Agents labs etc. excluded from session days to honor format_mix
- unresolved-conflict surfacing limited to high-value ties (both candidates >=0.70 and within 0.05); lower-value overlaps recorded as per-pick alternatives only
- **Method:** greedy-local-search (block-structured, paced; conf-schedule-optimization skill, parameterized for this conference). The stock `resources/schedule.py` packs every feasible slot and can't encode your lunch/evening blocks, subtheme boosts, workshop quota or wildcard surfacing, so its greedy+local-search *method* was reproduced in a driver parameterized with this conference's hard constraints (the conference-specific layer this repo keeps out of the agents). numpy-only; no solver deps.

## 7. The trade-off (Goodhart honesty)

> Weights are the user's: interest 0.42 / pacing 0.30 / breadth 0.16 / serendipity 0.12. PACING (0.30) bought breathing room at the cost of INTEREST: each session day leaves 3-4 parallel talks per afternoon unattended and Workshop Day runs only two deep labs with a long midday break — several 0.7-0.85 talks were dropped to keep contiguous recovery time and light evenings. The T1-prioritise focus (harnesses/orchestration + context engineering) plus modest BREADTH (0.16) means the plan tunnels into T1/T3/T5: you will see almost nothing of T4 (model/inference), T6 (multimodal/voice/media) or T7 (enterprise/verticals) — by design, but that is the substitution. SERENDIPITY (0.12, 'fit when cheap') is left deliberately low: both wildcards are surfaced as your decision rather than forced in, so the serendipity term stays small unless you opt one in. Goodhart honesty: optimizing this weighting maximizes 'paced time in your bullseye theme', which is exactly what under-counts cross-theme discovery and the marginal high-interest talk you'll walk past.

**In one line:** you asked for *paced time in your bullseye theme*, and that is exactly what you got — at the cost of cross-theme discovery and several good talks you'll walk past each afternoon. If that feels too narrow, nudge `breadth` up or `pacing` down and re-run.
