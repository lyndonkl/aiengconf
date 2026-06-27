// =============================================================================
// workflow.js — OPTIONAL automated driver for the aiengconf schedule pipeline.
//
// This is a convenience, NOT the primary path. The canonical way to run this
// project is to invoke `conf-director` in the main conversation (see WORKFLOW.md
// §4 and README.md). The director verifies each stage gate, guards its invariants,
// and runs Stage 3 interactively with you.
//
// This script automates only the NON-INTERACTIVE stages (1 ingest, 2 cluster, and —
// after you have produced a profile — 4 schedule). Stage 3 (preference elicitation)
// is interactive and CANNOT run inside a workflow, because workflow subagents cannot
// ask you questions. So this driver runs ingest + cluster, then stops and tells you
// to run the elicitor in the main conversation; re-run it with
// args = { afterElicitation: true } once data/03-preferences/profile.json exists.
//
// It drives the SAME reusable agents the director uses, via the agentType option.
// Paths are this-conference-specific (relative to this folder), which is correct:
// workflow.js is itself a conference-specific file and lives here, not in the plugin.
//
// Run it (from the main conversation): use the Workflow tool with
//   { scriptPath: "./workflow.js" }                      // stages 1-2, then pause
//   { scriptPath: "./workflow.js", args: { afterElicitation: true } }  // + stage 4
// =============================================================================

export const meta = {
  name: 'aiengconf-schedule',
  description: 'Drive the non-interactive stages of the AI Engineer World\'s Fair 2026 schedule pipeline (ingest, cluster, and — after interactive elicitation — schedule).',
  phases: [
    { title: 'Ingest', detail: 'parse the program into confidence-scored event records' },
    { title: 'Cluster', detail: 'build the theme map (coarse themes + outliers + soft affinities)' },
    { title: 'Schedule', detail: 'optimize the plan under the user-owned weights (only after a profile exists)' },
  ],
}

const CONFIG = './conference.config.json'
const DATA = './data'

// ---- Stage 1: ingest -------------------------------------------------------
phase('Ingest')
const eventsPath = await agent(
  `Act as the conf-program-ingestor worker. Ingest the AI Engineer World's Fair 2026 program.
   - source_url: read it from ${CONFIG} (the "source_url" field); fetch it into ${DATA}/00-source/ if no local snapshot exists.
   - output_dir: ${DATA}/01-events
   - config_path: ${CONFIG}
   Parse into the canonical events.json with per-field confidence and axes, fan out enrichment to
   conf-enrichment-researcher for thin sessions, merge it back, and write events.json + index.md.
   Return ONLY the path to events.json.`,
  { agentType: 'conf-program-ingestor', phase: 'Ingest', label: 'ingest' },
)

// ---- Stage 2: cluster ------------------------------------------------------
phase('Cluster')
const clustersPath = await agent(
  `Act as the conf-theme-cartographer worker. Build the theme map.
   - events_path: ${DATA}/01-events/events.json
   - output_dir: ${DATA}/02-clusters
   - config_path: ${CONFIG}
   Prefer the embed-then-label pipeline (resources/cluster.py); fall back to the LLM-reasoned method
   if the libraries are missing. Produce 6-8 coarse themes with sub-clusters, an outlier bucket, and
   soft top-k affinities for every event; relabel any provisional labels from the representative members.
   Write clusters.json + affinities.json + clusters.md. Return ONLY the path to clusters.json.`,
  { agentType: 'conf-theme-cartographer', phase: 'Cluster', label: 'cluster' },
)

// ---- Stage 3 is INTERACTIVE — it happens with you, not here ----------------
log('Stages 1-2 done. STAGE 3 (preference elicitation) is INTERACTIVE: run @conf-preference-elicitor '
  + 'in the main conversation to produce data/03-preferences/profile.json (it will ask you a few '
  + 'grounded, choice-based questions). Then re-run this workflow with args { afterElicitation: true } '
  + 'to build the schedule.')

// ---- Stage 4: schedule (only once a profile exists) ------------------------
if (args && args.afterElicitation) {
  phase('Schedule')
  const schedulePath = await agent(
    `Act as the conf-schedule-optimizer worker. Build the schedule.
     - events_path: ${DATA}/01-events/events.json
     - affinities_path: ${DATA}/02-clusters/affinities.json
     - profile_path: ${DATA}/03-preferences/profile.json
     - output_dir: ${DATA}/04-schedule
     - config_path: ${CONFIG}
     Solve the COP under the USER-OWNED objective_weights from the profile (halt if they are missing).
     Enforce hard constraints, surface unbreakable conflicts as decisions (do not silently pick), protect
     contiguous free time, and report the trade-off. Write schedule.json + schedule.md + conflicts.md +
     rationale.md. Return ONLY the path to schedule.json.`,
    { agentType: 'conf-schedule-optimizer', phase: 'Schedule', label: 'schedule' },
  )
  return { eventsPath, clustersPath, schedulePath }
}

return {
  eventsPath,
  clustersPath,
  note: 'Run conf-preference-elicitor interactively to create the profile, then re-run with { afterElicitation: true }.',
}
