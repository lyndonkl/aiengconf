# data/ — the stage-by-stage handoff

The pipeline's agents communicate **only** through the schema-shaped files in these directories. Each stage reads the previous stage's output directory and writes its own. The canonical schemas for every file below are in `../WORKFLOW.md` §3 — this is just the map.

These directories are **empty by design** (each holds a `.gitkeep`) until the pipeline runs.

| Directory | Stage | Produced by | Contains |
|---|---|---|---|
| `00-source/` | input | you / Stage 1 fetch | the raw conference program snapshot (e.g. `llms-full.md`) |
| `01-events/` | 1 — ingest | `conf-program-ingestor` | `events.json` (normalized records + per-field confidence + axes), `index.md`, and `enrichment/{event_id}.json` (per-event web-research records from `conf-enrichment-researcher`) |
| `02-clusters/` | 2 — cluster | `conf-theme-cartographer` | `clusters.json` (6–8 coarse themes + sub-clusters + outliers), `affinities.json` (per-event soft top-k theme affinities), `clusters.md` (human-readable theme tour) |
| `03-preferences/` | 3 — elicit | `conf-preference-elicitor` | `profile.json` (the preference region + axis preferences + user-owned objective weights + hard constraints + interaction log) |
| `04-schedule/` | 4 — schedule | `conf-schedule-optimizer` | `schedule.json` (the plan + objective breakdown + surfaced conflicts), `schedule.md` (day-by-day), `conflicts.md` (the decisions for you), `rationale.md` (why these picks + trade-off note) |

Rules of the road (see `../WORKFLOW.md`):
- Confidence travels with the data — every artifact reports how sure it is, and the director gates on it.
- Don't edit a completed stage's artifact in place; re-run the stage if its inputs changed.
- Caps are never silent — if a stage bounded its work (top-N, sampled enrichment), it says so in its artifact.
