export const projects = [
  { id: 'polaris', name: 'POLARIS', x: 24, y: 20, size: 46, status: 'Active', role: 'AI governance and sovereign intelligence engine',
    summary: 'A model-agnostic harness that adds governance and safety to any language model without retraining it.',
    facts: ['Multi-agent reasoning with governance and safety mechanisms', 'Formal verification and adversarial testing', 'Topological and phase transition analysis of the architecture', 'Game theoretic and control theoretic mechanisms', 'Byzantine fault tolerance experiments', 'Benchmarked across many runs'],
    tech: ['Python', 'PyTorch', 'Z3', 'Game theory', 'Topology'],
    problem: 'How can an arbitrary language model be governed and made safer without retraining it?',
    architecture: 'A modular harness that wraps any LLM with multi-agent reasoning, governance, provenance, formal verification and adversarial testing.',
    evidence: 'Public repository, an open technical discussion with a PhD researcher, and a demonstration of an early version to faculty at IIST.',
    caveat: 'AI assistance was used in parts of this project. A breakdown of what was generated versus designed and validated by me will be published.' },
  { id: 'sentinel', name: 'SENTINEL', x: 78, y: 18, size: 38, status: 'Hackathon build', role: 'Autonomous incident response system',
    summary: 'Agents that detect, diagnose and remediate incidents, with confidence scoring and a human in the loop.',
    facts: ['Six specialized agents and twelve tool integrations', 'Confidence scoring with decay over time', 'Blast radius propagation', 'Approvals through Slack', 'Built in a few hours for the ANVIL Hackathon'],
    tech: ['Agents', 'SRE', 'Slack', 'Python'],
    problem: 'Incident response is slow and manual. Can agents handle it safely with a human approving risky actions?',
    architecture: 'Cooperating agents drive tool integrations. Every action carries a confidence that decays and propagates across the blast radius.',
    caveat: 'The fast resolution time is a design target, not yet a published benchmark. Methodology will be posted beside it.' },
  { id: 'andromeda', name: 'ANDROMEDA', x: 13, y: 58, size: 40, status: 'Experimental', role: 'CRDT based distributed database engine',
    summary: 'Explores how distributed transactions can keep relational guarantees under partition and concurrent edits.',
    facts: ['Deterministic merges and conflict resolution', 'Foreign key cascade protocols', 'Uniqueness through escrow', 'Serverless architecture'],
    tech: ['CRDTs', 'Distributed systems', 'Databases'],
    problem: 'How can distributed transactional systems preserve useful relational invariants under partition and concurrent modification?',
    architecture: 'A CRDT based relational layer with deterministic merges, escrow for uniqueness and cascade protocols for foreign keys.' },
  { id: 'nebula', name: 'NEBULA', x: 84, y: 50, size: 36, status: 'Experimental', role: 'Persistent context engine for autonomous SRE',
    summary: 'Turns raw operational telemetry into persistent, evolving memory for incident reasoning.',
    facts: ['Topology awareness and drift detection', 'Recurring failure recognition', 'Service identity continuity', 'A very long context experiment'],
    tech: ['Memory', 'SRE', 'Long context'],
    problem: 'Operational knowledge is lost between incidents. Can context persist and evolve?',
    architecture: 'A persistent context layer that distills telemetry into topology aware memory.',
    caveat: 'The long context experiment will be defined precisely (storage, retrieval or model context) on its page.' },
  { id: 'zenith', name: 'ZENITH', x: 70, y: 80, size: 34, status: 'Research', role: 'Precision controlled memory agent',
    summary: 'Explores per-dimension attractor control in agent memory, building on ideas from published PCAM research.',
    facts: ['Attractor dynamics', 'Precision controlled memory', 'Autonomous agents'],
    tech: ['Memory', 'Dynamics', 'Agents'],
    problem: 'How can an agent control the precision of what it remembers, dimension by dimension?',
    caveat: 'PCAM is published research by others. ZENITH explores and extends related ideas, and the boundary will be stated plainly.' },
  { id: 'gargantua', name: 'GARGANTUA', x: 50, y: 48, size: 58, hub: true, status: 'Concept architecture', role: 'Unified autonomous intelligence architecture',
    summary: 'The layer meant to connect reasoning, governance, memory, infrastructure, distributed state and autonomous execution.',
    facts: ['Combines POLARIS, SENTINEL, ANDROMEDA, NEBULA and ZENITH', 'One architecture for reasoning and governance', 'Memory joined to infrastructure and execution'],
    tech: ['Architecture', 'Multi-agent', 'Integration'],
    links: ['polaris', 'sentinel', 'andromeda', 'nebula', 'zenith'] },
  { id: 'indra', name: 'INDRA', x: 36, y: 84, size: 34, status: 'Hackathon, top 250', role: 'Citizen state transition engine for public infrastructure',
    summary: 'Ranked 45 at Build What Moves India. Citizen transitions are prepared, reviewed, authorized and reconciled.',
    facts: ['PREPARE, VALIDATE, REVIEW, AUTHORIZE, EXECUTE, RECONCILE', 'Intent, capability, workflow and policy engines', 'Event bus and provenance layer', 'Tamper evident tokens, Argon2id, CSRF protection, tenant isolation, replay protection', 'Demo: a simulated outage that suspends, resumes and reconciles a transition'],
    tech: ['Fastify', 'PGlite', 'Postgres', 'Security'],
    problem: 'Public infrastructure transitions break when a dependency fails mid-flow.',
    architecture: 'A Fastify API with contract, intent, capability, workflow and policy engines, an event bus and a provenance layer.',
    caveat: 'The demonstration uses synthetic citizens and synthetic institutional data only.' },
  { id: 'chimera', name: 'CHIMERA', x: 60, y: 10, size: 36, status: 'Active', role: 'Autonomous intelligence architecture',
    summary: 'A continuously evolving specification for agent hierarchy, model routing, local inference, memory, planning and verification.',
    facts: ['Multi-model orchestration and routing', 'Tool use, planning and verification', 'Long context and self-improvement', 'Local inference experiments'],
    tech: ['Local LLMs', 'Routing', 'Agents'] },
  { id: 'neural-compiler', name: 'NEURAL COMPILER', x: 10, y: 34, size: 32, status: 'Experimental', role: 'Runtime for large models on minimal hardware',
    summary: 'An experiment in running large language model workloads on very constrained hardware.',
    facts: ['Model compression and execution', 'Resource constrained inference', 'Compiler and runtime optimization', 'Built over a single night, nearly complete'],
    tech: ['Compilers', 'Runtime', 'Efficient AI'] },
  { id: 'untitledos', name: 'UntitledOS', x: 44, y: 68, size: 32, status: 'In development', role: 'Operating system written from scratch',
    summary: 'A from scratch OS covering boot, kernel, memory, drivers, filesystem, scheduling and a shell.',
    facts: ['Boot process and kernel', 'Memory management and scheduling', 'Drivers, filesystem and shell'],
    tech: ['Kernel', 'Low level', 'Hardware'] },
]

export const hubLinks = [['polaris','chimera'],['chimera','sentinel'],['neural-compiler','chimera'],['andromeda','untitledos'],['untitledos','neural-compiler'],['indra','andromeda'],['indra','untitledos'],['nebula','zenith'],['zenith','indra']]

export const method = [['Problem','Find the real constraint.'],['Investigate','Read, probe, reverse engineer.'],['Decompose','Break it to first principles.'],['Prototype','The smallest thing that can fail.'],['Build','Software and hardware together.'],['Test','Adversarial, not polite.'],['Benchmark','Measure, with methodology.'],['Iterate','Again, with evidence.']]

export const workshop = [
  { tag: 'Hardware', title: 'Computers from dead boards', text: 'A working PC assembled from dead motherboards with a soldering iron and a multimeter.' },
  { tag: 'Network', title: 'Salvaged storage and routers', text: 'A self-hosted NAS from salvaged drives, and an old router turned into a wireless bridge.' },
  { tag: 'Automation', title: 'Room automation', text: 'ESP8266, ESPHome, relays, Raspberry Pi and Home Assistant.' },
  { tag: 'Repair', title: '3D printer and phones', text: 'Repaired a printer a technician could not fix, and worked on custom ROMs and kernels for Android.' },
  { tag: 'Local AI', title: 'Models on my own GPU', text: 'Running and tuning open models locally with Ollama and LM Studio.' },
  { tag: 'Energy', title: 'Solar monitoring', text: 'In progress: telemetry and Home Assistant integration for a home solar system.' },
]

export const record = {
  'Competitions': [['Meta x PyTorch OpenEnv Hackathon','Solo entry, Top 10'],['Build What Moves India','Top 250, rank 45'],['Xiaomi MiMo Orbit AI Creator Program','Selected'],['Little KITES','State level winner'],['AI Quiz 2026','Winner'],['IdeaFest, JAIN University','2nd runner up'],['Robotics, ACE College of Engineering','First prize']],
  'Leadership': [['Student Police Cadet','Kerala SPC'],['Kerala Police Cyber Division','Internship, statewide selection'],['Atal Tinkering Lab','Showcase leadership'],['Freedom Fest 2022','Speaker at age 15'],['Viksit Bharat Young Leaders Dialogue','National selection']],
  'Learning': [['IIT Madras','Data Science and AI certification'],['Google Cloud Gen AI Academy APAC 2026','Hack2Skill'],['Common Service Centre','Years of hands-on IT support'],['Freelance web work','Sites and hosting for local businesses']],
}

export const notes = [
  ['AI-assisted development','AI tools were used in parts of my projects. Each repository will document what was generated and what I designed, validated and decided.'],
  ['Claims in progress','Speed targets and long context figures are design goals or experiments until their methodology is published next to them.'],
  ['Building on others','ZENITH builds on published PCAM research. I will always separate the original paper from my own extensions.'],
  ['External feedback','A researcher discussed POLARIS publicly and faculty saw an early version. That is feedback, not endorsement or peer review.'],
]

export const github = 'https://github.com/abhishekascodes'

export const disciplines = [
  ['Artificial intelligence', ['Autonomous agents', 'Multi-agent systems', 'AI governance and safety', 'Evaluation', 'Local model inference', 'Reinforcement learning']],
  ['Mathematics', ['Optimization', 'Probability', 'Topology', 'Game theory', 'Control theory', 'Formal methods']],
  ['Systems', ['Distributed databases', 'CRDTs', 'Operating systems', 'Compilers', 'Reliability engineering', 'Networking']],
  ['Hardware', ['Embedded systems', 'Soldering and repair', 'Home automation', 'Android internals', 'Salvaged computers']],
  ['Autonomy', ['Agent memory', 'Planning and verification', 'Self-hosted infrastructure', 'Systems that run without supervision']],
]
