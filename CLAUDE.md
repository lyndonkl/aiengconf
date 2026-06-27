# aiengconf — AI Engineer World's Fair 2026 schedule builder

This project builds a personalized schedule for the **AI Engineer World's Fair 2026** by running a four-stage agent pipeline over the conference program. It is the *conference-specific* half of a reusable system.

## What lives where (do not blur this line)

- **Reusable, conference-agnostic logic** lives in the `claude` plugin: the agents `conf-director`, `conf-program-ingestor`, `conf-enrichment-researcher`, `conf-theme-cartographer`, `conf-preference-elicitor`, `conf-schedule-optimizer`, and their `conf-*` skills. They hardcode nothing about this conference.
- **Everything conference-specific lives in this folder**: `conference.config.json` (dates, rooms, tracks, travel times, policies, default weights), the `data/` handoff structure, the `state/` machine, and `WORKFLOW.md` (the runbook + communication contract + canonical schemas).

When the agents need a conference parameter or a path, it comes from this folder as an input — never from inside an agent.

> **Prerequisite:** the `claude` plugin must be enabled here so the `conf-*` agents/skills are discoverable.

## Key paths

- Config: `./conference.config.json`
- Data root: `./data` (stage dirs `00-source` → `04-schedule`)
- State: `./state/pipeline-state.json`, `./state/invariants.lock.json`
- Contract + schemas: `./WORKFLOW.md`

## How to run

Invoke the orchestrator in the **main conversation**:

> "Use `conf-director` to build my schedule — config `./conference.config.json`, data root `./data`, state root `./state`, source URL from the config. Start fresh."

The director runs ingest and cluster as subagents, then **Stage 3 (preference elicitation) happens live with you** — `conf-preference-elicitor` asks a few grounded, choice-based questions (this stage cannot run as a background task; it must ask you questions). Then it optimizes a schedule and presents the plan plus the conflicts only you can decide. It never auto-commits or writes to a calendar without explicit instruction.

## Conventions for this workflow

- Stages communicate only through the schema-shaped artifacts in `data/` (see `WORKFLOW.md` §3). No free-text handoffs.
- Every stage emits calibrated confidence; the director gates on it before advancing.
- The data dirs are empty by design until the pipeline runs (each has a `.gitkeep`).
- Don't edit a completed stage's artifact in place; re-run the stage if inputs change.
- `conference.config.json`'s `tracks` and `rooms` include some inferred placeholders — refine them after the first real ingest of `source_url`.
