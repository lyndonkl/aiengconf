# AI Engineer World's Fair 2026 — Personal Schedule Builder

A small pipeline that reads the conference program and helps you build the schedule *you* actually want — not the popular one. You answer a handful of sharp questions; it hands you a day-by-day plan plus the few overlaps only you can decide.

## What it does, in plain English

1. **Ingest** — reads the whole program and turns every session into a structured record, honestly marking what it's sure about and what it had to guess (and quietly researching the sessions whose blurbs are too thin to classify).
2. **Cluster** — groups ~300 sessions into a handful of themes you can actually reason about, keeps a bucket of genuinely odd cross-disciplinary talks, and lets a talk belong to more than one theme.
3. **Elicit** — has a short, live conversation with you: "one slot, which of these two real talks would you walk into?" A few questions (usually 3–6), including at least one deliberate left-field option, plus your call on packed-vs-paced and any must-attends.
4. **Schedule** — optimizes a feasible plan under *your* priorities (no double-booking, time to walk between rooms, real breaks protected), and surfaces the talks it genuinely can't choose between as decisions for you.

You get: `data/04-schedule/schedule.md` (the plan), `conflicts.md` (the short list of decisions), and `rationale.md` (why these picks, and what the plan traded away).

## Run it

The reusable agents live in the `claude` plugin (enable it here). Then, in the main conversation:

> "Use `conf-director` to build my schedule for the AI Engineer World's Fair 2026 — config `./conference.config.json`, data root `./data`, state root `./state`, source URL from the config."

The orchestrator does the ingest and clustering, then talks to you for the preferences, then builds the schedule. Nothing is committed and no calendar is touched unless you explicitly ask.

## Where things are

| Path | What |
|---|---|
| `conference.config.json` | dates, venue, rooms, tracks, travel times, default weights — everything specific to *this* conference |
| `WORKFLOW.md` | the full runbook: the agent team, the stage gates, the communication contract, the canonical schemas, and the design rationale |
| `CLAUDE.md` | project notes for the agent (paths, how to run, the generic/specific split) |
| `data/00-source … 04-schedule/` | the stage-by-stage handoff files (empty until you run it) |
| `state/` | the pipeline state machine and the orchestrator's frozen safety invariants |
| `workflow.js` | optional automated driver for the non-interactive stages |

## Design note

The whole system is built around being honest about uncertainty: every stage reports confidence, the elicitor tracks how much it still doesn't know about you (and deliberately probes for interests you'd never volunteer), and the scheduler flags an overlap precisely *because* it knows both talks are good and that it can't break the tie for you. That's the point — it surfaces the real decisions instead of pretending it made them well.
