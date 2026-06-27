# Stage 2 — Theme Map: AI Engineer World's Fair 2026

*Method:* `llm-reasoned`  ·  *Generated:* 2026-06-27  ·  *8 coarse themes, 539 talks in themes, 17 outliers, 556 total*

These **8 coarse themes** are deliberately coarser than the conference's 36 program tracks and cut **across** them — a Security-track talk on agent permissions, a Harness-Engineering talk, and an Enterprise talk on agent rollout can share the *Building & Operating Agents* theme. Every talk also carries **soft top-k affinities** (`affinities.json`), so a session like *evaluating agentic RAG* surfaces under evaluation **and** agents **and** retrieval. The **outlier bucket** at the bottom is a feature: genuinely cross-disciplinary / niche sessions kept first-class for Stage-3 selection-bias probes.

> **How to read affinities:** they are a saturating function of IDF-weighted topic overlap (strong match ≈ 0.7-0.9, weak ≈ 0.2-0.35). The hard theme below is for navigation; the affinities carry the overlap.


---


## T1 — Building & Operating Agents  (83 talks)

*Engineering the agent itself — harnesses, orchestration, context, tools/MCP, computer-use, and the sandboxes they run in.*


**Sub-clusters:**

- **Agent Harnesses & Orchestration** (29) — Building the loop itself — harnesses, planning, multi-agent orchestration.
- **Sandboxes & Agent Platforms** (17) — Runtime substrate: sandboxes, isolation, and platform engineering for agents.
- **Tools, MCP & Interop** (16) — The plumbing that lets agents call tools and talk to each other (MCP and friends).
- **Context Engineering** (15) — Curating what goes into the window — context assembly, compaction, and state.
- **Computer Use & Browser Agents** (6) — Agents that drive GUIs, browsers, and the open web.

**Representative talks:**

- *MCP Tasks (async)/ Why the heck aren't any agents supporting MCP tasks/async?* — Cornelia Davis  `[Context Engineering]`
- *Anthropic's CCA Exam as a Field-Guide for Agentic Engineering* — Frank Coyle  `[Agentic Engineering]`
- *500 Skills, Zero Fine-Tuning: LinkedIn's Playbook for AI Agents That Actually Know Your Codebase* — Ajay Prakash  `[Context Engineering]`
- *Your agent needs a sandbox, not a desert* — Samuel Colvin  `[Sandbox & Platform Engineering]`
- *The Dark Arts of Web Automation: Teaching Agents to Use Websites Like Humans* — Corey Gallon  `[Computer Use]`


## T2 — Coding Agents & AI-Native Software Development  (47 talks)

*Using AI to write, review, and ship software — coding agents, software factories, and design/frontend engineering.*


**Sub-clusters:**

- **Coding Agents & Software Factories** (27) — Agents that write, review, and ship production code at scale.
- **Engineering Org & Workflow** (11) — Rolling coding agents across a team — process, enablement, SDLC change.
- **Design & Frontend Engineering** (9) — AI for UI, design-to-code, and the frontend craft.

**Representative talks:**

- *Understanding is the new bottleneck* — Geoffrey Litt  `[Design Engineering]`
- *Orchestras, not Factories* — Charlie Holtz  `[Software Factories]`
- *Use Copilot across CLI, dev, and cloud workflows to move faster end-to-end* — Pamela Fox  `[Track M]`
- *Vibe Code Safely: Introducing Gadgets*
- *Mousepower: agents that can't be measured, can't be managed.* — Maximillian Piras  `[Design Engineering]`


## T3 — Evaluation, Observability & Data Quality  (58 talks)

*Knowing whether your AI works and keeping it working — evals and judges, tracing and monitoring, and the data underneath.*


**Sub-clusters:**

- **Observability & Tracing** (21) — Seeing inside running systems — traces, spans, production monitoring.
- **Eval Methods, Judges & Benchmarks** (16) — Benchmarks, LLM-as-judge, and rubrics for model and system quality.
- **Data Quality & Pipelines** (14) — The data substrate evals depend on — labeling, quality, pipelines.
- **Agent Evaluation & Reliability** (7) — Measuring whether agents actually work over long, multi-step trajectories.

**Representative talks:**

- *Advanced workshop: Mastering AI Observability* — Doug Guthrie
- *Agentic vs. Vector Search: An Eval-Driven Approach to Coding Agent Performance* — Jess Wang
- *From Alert to PR: Building an Autonomous Agent Debugger* — Jason Lopatecki  `[Evals]`
- *Evaling Video Slop* — Maor Bril  `[Evals]`
- *Why building building agent quality platforms is hard.* — Hossein Niazmandi


## T4 — Model & Inference Engineering  (94 talks)

*The systems layer beneath the app — inference and serving, GPUs and kernels, post-training/RL, and local or open models.*


**Sub-clusters:**

- **Inference & Serving** (54) — Serving models fast and cheap — inference stacks, throughput, cost.
- **Post-training, RL & Fine-tuning** (20) — Shaping model behavior after pretraining — RL, fine-tuning, midtraining.
- **GPU, Kernels & Hardware** (8) — Squeezing the silicon — GPUs, kernels, and accelerator engineering.
- **Models & Frontier Capabilities** (7) — Frontier model releases and what new capabilities unlock.
- **Local & Open Models** (5) — Running open and on-device models outside the big API providers.

**Representative talks:**

- *Local LLMs and workstation agents: Part 2* — Ahmad Osman  `[Workshops Day 1]`
- *What's New in Inference Engineering* — Philip Kiely  `[Inference]`
- *Stop Renting Intelligence: The Train-to-Deploy Loop for Specialized AI* — Jetashree Ravi
- *What's next after RLHF?* — Diogo Almeida  `[Posttraining & Midtraining]`
- *Towards Reliable Financial Agents: How a 4B Model Outsmarted a 235B Giant* — Charlie Dickens


## T5 — Retrieval, Memory & Knowledge  (69 talks)

*Giving models the right context — RAG and search, agent memory, knowledge graphs, embeddings, and recommendation.*


**Sub-clusters:**

- **RAG & Search** (24) — Retrieval-augmented generation and the search stack behind it.
- **Memory & Continual Learning** (21) — Giving agents durable memory and the ability to keep learning.
- **Knowledge Graphs** (15) — Graph-structured knowledge for grounding and reasoning.
- **Embeddings & Recsys** (9) — Vector representations and recommendation systems.

**Representative talks:**

- *Your Agreements Are a Database You Can't Query. We're Fixing That* — Hiral Shah, Sean Sodha  `[Search & Retrieval]`
- *CrabRAG: Why Automated Assistants Need Graph Memory, Not More Tokens* — Stephen Chin  `[Graphs]`
- *Vector Isn't Enough: Hybrid Search & Retrieval for AI Engineers* — Jeff Vestal  `[Track 7]`
- *Video Has No Memory. Here's How We Built One.* — James Le  `[Graphs]`
- *From Context to Memory: Your Agents Need a Real Memory Layer* — Anders Swanson


## T6 — Multimodal, Voice & Generative Media  (55 talks)

*Beyond text — vision and OCR, voice and realtime, generative image/video, and robotics or world models.*


**Sub-clusters:**

- **Voice & Realtime** (20) — Speech, voice agents, and low-latency realtime interaction.
- **Vision, Multimodal & OCR** (15) — Seeing and reading — vision models, multimodal understanding, OCR.
- **Robotics & World Models** (14) — Embodied AI, simulation, and learned world models.
- **Generative Media** (6) — Generating image, video, and creative media.

**Representative talks:**

- *The Next Medium: Why Real-Time Interactive Video Changes Everything for Developers* — Ahmed Ahres  `[Generative Media]`
- *Generative Video at the Speed of Light* — Keegan McCallum  `[Generative Media]`
- *Building an Agentic Video Editor for Mass Consumer* — Ekaterina Deyneka  `[Generative Media]`
- *I gave an AI a body* — Cyrus Clarke  `[Robotics & World Models]`
- *Building the simulation infrastructure for practical world model use* — Christopher Manning  `[Robotics & World Models]`


## T7 — AI in the Enterprise: Leadership & Verticals  (106 talks)

*Putting AI to work in the business — enterprise adoption and strategy, plus finance, healthcare, GTM, and commerce.*


**Sub-clusters:**

- **Leadership & Strategy** (32) — The CTO/leader view — strategy, org, and betting on AI.
- **Enterprise Adoption & AI-Native Orgs** (22) — Getting AI into the enterprise — adoption, rollout, becoming AI-native.
- **Finance & Fintech** (20) — AI in finance, banking, and fintech.
- **Healthcare & Life Sciences** (13) — AI in healthcare, clinical, and life-sciences settings.
- **GTM, Sales & Marketing** (10) — AI in go-to-market — sales, marketing, growth.
- **Agentic Commerce & Payments** (9) — Agents that transact — commerce, payments, checkout.

**Representative talks:**

- *Reverse-Engineering the AI Buyer* — Aliisa Rosenthal  `[AI in GTM]`
- *Shipping AI to a Million Patients Without an A/B Test* — Jared Joselowitz  `[AI in Healthcare]`
- *Beyond the Lethal Trifecta: Agentic Commerce on the Open Internet at Machine Speed* — David Levine  `[Agentic Commerce]`
- *x402 isn't good (yet)* — Jan Curn  `[Agentic Commerce]`
- *When AI Agents Pay and Sellers Monetize: Building x402 Apps for Agentic Commerce on AWS* — Anil Nadiminti  `[Agentic Commerce]`


## T8 — Security & Trust for AI Systems  (27 talks)

*Keeping agentic systems safe — agent permissions and the lethal trifecta, secure AI-written code, and trust/governance.*


**Sub-clusters:**

- **Agent Security & Permissions** (16) — Locking down what agents can do — permissions, isolation, the lethal trifecta.
- **AppSec & Secure Coding** (6) — Security of AI-written code and the software supply chain.
- **Trust, Safety & Governance** (5) — Trust, safety, and governance for AI systems.

**Representative talks:**

- *We Gave an Agent Production Code Access and Then Tried to Sleep at Night* — Moritz Johner  `[Security]`
- *Agentic Security: Permissions, Provenance, and the Agent Supply Chain* — Steve Yegge  `[Security]`
- *Burn your flags: How PayPal designs interactive CLI tools for agents* — Mark Lummus, Navinkumar Patil  `[Workshops Day 1]`
- *Gadgets: Personal app vibe coding that is actually safe* — Kenton Varda  `[Software Factories]`
- *AI's Jurassic Park Period* — Aaron Stanley  `[Security]`


---


## Outliers — the cross-disciplinary bucket (17)

Genuinely hard-to-place / niche / against-the-grain sessions. Not noise — these are kept first-class and seed Stage 3's mandatory outlier probe. Each still has affinities (shown), but no clean single home.

- **Runway AI Film Festival**
  - *Why:* An AI film-festival screening, not an engineering session — generative media meets the creative arts (film, fashion, advertising); no topical neighbours in the program.
  - affinities: T6:0.68, T7:0.576, T1:0.0
- **While my guitar gently speaks** — Todd Fisher
  - *Why:* Live music performance fused with coding agents and generative media — bridges creative arts and software in a way no single theme holds.
  - affinities: T6:0.81, T2:0.385, T1:0.111
- **The Next Game Engine Won't Have a Manual** — Arturo Nunez
  - *Why:* Game-engine design as its own craft (art + engineering + entertainment), arguing LLMs alone won't crack it — sits outside the app/infra spine.
  - affinities: T6:0.809, T4:0.434, T1:0.195
- **Computer-use models will agentify the web, not APIs** — Dhruv Batra
  - *Why:* An embodied/robotics framing of computer-use ('agentify the web, not APIs') that straddles agents, robotics world-models, and HCI.
  - affinities: T6:0.798, T1:0.781, T5:0.683
- **Reduce the OUCH: Smarter behavior for AI assistants and robots** — Amit Desai
  - *Why:* Voice-controlled physical robots optimized for user satisfaction over accuracy — an HCI/robotics crossover rare in a software-agent program.
  - affinities: T6:0.802, T1:0.195, T2:0.046
- **Trading Desks to Clinical Trials: Parallels in Applied Vertical AI** — Ayush Bhardwaj
  - *Why:* Deliberately bridges two verticals — finance and healthcare/pharma — to extract shared vertical-AI patterns; belongs to neither alone.
  - affinities: T7:0.805, T1:0.0, T2:0.0
- **Your Agent Is Lying to You About Whether It Worked** — Dat Ngo
  - *Why:* An agent-honesty / trajectory-truth talk with an unusual healthcare + recsys mix that refuses the standard eval vocabulary.
  - affinities: T7:0.705, T5:0.69, T1:0.195
- **Your Agent Just Authorized What?!** — Jay Mok
  - *Why:* Agentic-commerce guardrails spanning security, finance, healthcare and payments at once — a true multi-theme bridge with no dominant home.
  - affinities: T7:0.846, T8:0.586, T5:0.547
- **Who Approved That MCP Server? Governing the Tool Layer** — Jim Clark
  - *Why:* Supply-chain governance of the MCP tool layer (vetting/signing servers) — a narrow security-meets-agent-infra org practice.
  - affinities: T1:0.591, T8:0.586, T2:0.303
- **Design at the Speed of Adjectives** — Paul Bakaus
  - *Why:* Reframes design tooling as the wrong abstraction for AI — bridges generative media, design craft, and code generation.
  - affinities: T6:0.68, T4:0.667, T2:0.591
- **Human Connection in the Age of AI** — Joyce Zhang, Carole Robin
  - *Why:* A 'Touchy Feely' interpersonal-skills workshop — a deliberately human, non-technical session amid an engineering program (a selection-bias probe).
  - affinities: T1:0.255, T7:0.215, T2:0.0
- **Wearing the Agent: Engineering a Family-and-Friends Personal Agent, from Group Chats to Glasses** — Sai Krishna Rallabandi
  - *Why:* A hyper-personal family-and-friends agent run in production for a year across WhatsApp/Telegram/Discord — a many-topic build that resists any one theme.
  - affinities: T7:0.775, T5:0.747, T4:0.743
- **How We Got LLMs to Recommend Our Open Source Library (Without Paying or Plug-ins)** — Christopher Burns
  - *Why:* LLMs as a new distribution channel — getting an open-source library recommended by Claude; a GTM/marketing-meets-open-source oddity.
  - affinities: T7:0.806, T4:0.734, T1:0.0
- **Cut Through the Context Hype: 4 Layers Your Agent Is Missing** — Prukalpa Sankar
  - *Why:* Pulls robotics 'world-model' language into enterprise context engineering ('a world model of your business') — an unusual cross-framing.
  - affinities: T1:0.685, T6:0.659, T5:0.639
- **How Web Data Infrastructure Powers the Next Generation of AI** — Patricija Žemaitytė
  - *Why:* Web-data infrastructure purpose-built for computer-use agents — an infra niche straddling crawling, computer-use, and data.
  - affinities: T1:0.71, T6:0.669, T4:0.273
- **FinOps for AI Agents: Who Spent All the Tokens?** — Tisha Chawla, Susheem Koul
  - *Why:* FinOps / cost-engineering for autonomous agents ('who spent all the tokens?') — a finance-meets-observability discipline that fits no single track.
  - affinities: T7:0.775, T5:0.771, T3:0.702
- **Citation Needed: Provenance for LLM-Built Knowledge Graphs** — Daniel Chalef
  - *Why:* Provenance and citation for agent outputs in regulated, knowledge-graph-backed settings — a trust/grounding niche between themes.
  - affinities: T5:0.719, T7:0.636, T4:0.551
