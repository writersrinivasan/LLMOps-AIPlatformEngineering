"use client";

import { useState } from "react";
import ModuleLayout from "@/components/ui/ModuleLayout";
import HandsOnExercise from "@/components/ui/HandsOnExercise";

const gradient = "linear-gradient(135deg, #f97316 0%, #ef4444 100%)";

/* ── Platform mindset shift ── */
const mindsetShift = [
  {
    before: "Every team builds their own vector DB",
    after: "One vector DB platform, shared by 50 teams",
    icon: "🗄️",
    saving: "50× duplication avoided",
  },
  {
    before: "Each app manages its own LLM keys",
    after: "Centralised Model Gateway with governance",
    icon: "🔀",
    saving: "One audit log for all LLM calls",
  },
  {
    before: "Prompts are stored in code comments",
    after: "Prompt Registry with versioning & rollback",
    icon: "✍️",
    saving: "Prompt changes deployed in minutes",
  },
  {
    before: "Each team builds their own eval pipeline",
    after: "Shared Evaluation Framework with golden sets",
    icon: "📐",
    saving: "Consistent quality standards across apps",
  },
  {
    before: "No visibility into LLM costs per team",
    after: "Cost dashboard with per-team budget alerts",
    icon: "💰",
    saving: "40% cost reduction through accountability",
  },
  {
    before: "Security is each app's responsibility",
    after: "Platform-level guardrails & PII detection",
    icon: "🛡️",
    saving: "Zero PII exposure incidents",
  },
];

/* ── Platform capability layers ── */
const platformCapabilities = [
  {
    layer: "Developer Experience",
    icon: "👨‍💻",
    color: "#818cf8",
    description: "The surface that product teams interact with daily",
    capabilities: [
      { name: "AI SDK", desc: "Python / TypeScript SDK wrapping all platform APIs", icon: "📦" },
      { name: "REST APIs", desc: "OpenAPI-documented HTTP APIs for every capability", icon: "🔌" },
      { name: "Templates", desc: "Starter repos for RAG, agent, assistant apps", icon: "📋" },
      { name: "CLI", desc: "Command-line tools for prompt deploy, eval, logs", icon: "💻" },
      { name: "Developer Portal", desc: "Self-service docs, playground, usage dashboard", icon: "🌐" },
    ],
  },
  {
    layer: "Model Layer",
    icon: "🤖",
    color: "#a78bfa",
    description: "Everything needed to manage and serve AI models",
    capabilities: [
      { name: "Model Registry", desc: "Versioned catalog of all approved models", icon: "📦" },
      { name: "Model Gateway", desc: "Unified interface to OpenAI, Anthropic, Azure, etc.", icon: "🔀" },
      { name: "Model Routing", desc: "Cost/latency-based intelligent request routing", icon: "#" },
      { name: "Fine-tune Pipeline", desc: "Managed fine-tuning jobs with eval gates", icon: "🎯" },
    ],
  },
  {
    layer: "Knowledge Layer",
    icon: "📚",
    color: "#60a5fa",
    description: "Ingest, store, and retrieve enterprise knowledge",
    capabilities: [
      { name: "Document Ingestion", desc: "Connectors for SharePoint, Confluence, S3, DBs", icon: "📥" },
      { name: "Embeddings Service", desc: "Managed embedding API with versioning", icon: "🔢" },
      { name: "Vector DB", desc: "Multi-tenant pgvector / Pinecone with ACLs", icon: "🗄️" },
      { name: "Retrieval APIs", desc: "Semantic search, keyword, hybrid endpoints", icon: "🔍" },
    ],
  },
  {
    layer: "Agent Layer",
    icon: "🤖",
    color: "#34d399",
    description: "Infrastructure for building and running autonomous agents",
    capabilities: [
      { name: "Agent Runtime", desc: "Hosted execution environment for LangGraph / CrewAI", icon: "⚡" },
      { name: "Tool Registry", desc: "Curated, approved tool library for agents", icon: "🔧" },
      { name: "MCP Integration", desc: "Model Context Protocol server support", icon: "🔌" },
      { name: "Workflow Orchestration", desc: "Multi-agent workflow definitions & scheduling", icon: "🔄" },
    ],
  },
  {
    layer: "Evaluation Layer",
    icon: "📐",
    color: "#fbbf24",
    description: "Quality assurance shared across all AI applications",
    capabilities: [
      { name: "Eval Datasets", desc: "Central golden dataset library per domain", icon: "✨" },
      { name: "Automated Eval", desc: "RAGAS / DeepEval as a managed service", icon: "⚡" },
      { name: "Quality Gates", desc: "Configurable CI/CD thresholds per app type", icon: "🚦" },
      { name: "LLM Judge Service", desc: "Managed LLM-as-a-judge endpoint", icon: "🧑‍⚖️" },
    ],
  },
  {
    layer: "Operations Layer",
    icon: "📊",
    color: "#f472b6",
    description: "Observability, reliability, and cost visibility",
    capabilities: [
      { name: "Observability", desc: "OpenTelemetry traces, metrics, logs pipeline", icon: "📡" },
      { name: "Logging", desc: "Structured LLM request/response logging", icon: "📝" },
      { name: "Tracing", desc: "End-to-end agent trace visualisation", icon: "🔍" },
      { name: "Cost Management", desc: "Per-app, per-team, per-model cost dashboards", icon: "💰" },
    ],
  },
  {
    layer: "Governance Layer",
    icon: "🔐",
    color: "#fb923c",
    description: "Security, compliance, and access control",
    capabilities: [
      { name: "Access Control", desc: "RBAC / ABAC for models, data, tools", icon: "🔐" },
      { name: "Audit Logs", desc: "Immutable log of all AI actions for compliance", icon: "📋" },
      { name: "Policy Enforcement", desc: "Guardrails for PII, toxicity, topic control", icon: "🛡️" },
      { name: "Compliance", desc: "GDPR, SOC2, HIPAA controls for AI", icon: "✅" },
    ],
  },
];

/* ── Team topology ── */
const teamTopology = [
  {
    team: "AI Platform Team",
    icon: "🏗️",
    color: "#818cf8",
    responsibility: "Builds and maintains the shared AI platform capabilities",
    builds: ["Model Gateway", "Vector DB platform", "Eval Framework", "SDK & APIs", "Developer Portal"],
    serves: "All product teams",
  },
  {
    team: "Product AI Teams",
    icon: "🚀",
    color: "#34d399",
    responsibility: "Consume platform capabilities to build AI-powered products",
    builds: ["Business-specific prompts", "App logic & UX", "Domain-specific eval sets", "Custom tools"],
    serves: "End users",
  },
  {
    team: "Data / ML Team",
    icon: "📊",
    color: "#f472b6",
    responsibility: "Manage data quality, fine-tuning, and model evaluation",
    builds: ["Training datasets", "Fine-tuned models", "Golden datasets", "Model benchmarks"],
    serves: "Platform team + product teams",
  },
  {
    team: "Security Team",
    icon: "🔐",
    color: "#fb923c",
    responsibility: "Define and enforce AI-specific security policies",
    builds: ["Guardrail policies", "Red-team tests", "Access policies", "Compliance controls"],
    serves: "Platform team + auditors",
  },
];

export default function Module6() {
  const [activeLayer, setActiveLayer] = useState(0);
  const [activeTeam, setActiveTeam] = useState(0);
  const [expandedCap, setExpandedCap] = useState<string | null>(null);

  return (
    <ModuleLayout
      moduleNumber={6}
      title="Building the Enterprise AI Platform"
      duration="40 minutes"
      gradient={gradient}
      description="Shift from building individual AI apps to building reusable platform capabilities that empower 100+ teams. Learn the platform engineering mindset, capability layers, team topology, and developer experience."
      prevHref="/modules/module5"
      prevLabel="Observability & Security"
      nextHref="/modules/module7"
      nextLabel="Capstone Challenge"
    >
      <div className="space-y-16">

        {/* ── Section 6.1 — Platform Mindset ── */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-black text-white" style={{ background: gradient }}>6.1</div>
            <h2 className="text-2xl font-bold text-white">The Platform Engineering Mindset</h2>
          </div>

          {/* The shift */}
          <div className="grid sm:grid-cols-2 gap-5 mb-8">
            <div className="glass rounded-2xl p-6 border border-red-500/20">
              <div className="text-xs font-bold text-red-400 uppercase tracking-widest mb-4">❌ Old Thinking</div>
              <div className="text-3xl font-black text-white mb-3 leading-tight">&ldquo;Build another AI application&rdquo;</div>
              <p className="text-slate-400 text-sm leading-relaxed">
                Every team reimplements the same infrastructure — vector DBs, gateways, eval pipelines — wasting months of engineering time and creating inconsistent quality standards.
              </p>
            </div>
            <div className="rounded-2xl p-6 border border-orange-500/30" style={{ background: "rgba(249,115,22,0.08)" }}>
              <div className="text-xs font-bold text-orange-400 uppercase tracking-widest mb-4">✅ Platform Thinking</div>
              <div className="text-3xl font-black text-white mb-3 leading-tight">&ldquo;Build reusable capabilities for 100 teams&rdquo;</div>
              <p className="text-slate-300 text-sm leading-relaxed">
                Build the AI equivalent of AWS — internal services that abstract complexity, enforce governance, and let product teams ship AI features in days, not months.
              </p>
            </div>
          </div>

          {/* Mindset shifts grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {mindsetShift.map((shift, i) => (
              <div key={i} className="glass rounded-2xl p-5 border border-white/10 hover:border-orange-500/30 hover:scale-[1.02] transition-all duration-300">
                <div className="text-2xl mb-3">{shift.icon}</div>
                <div className="space-y-2 mb-3">
                  <div className="flex items-start gap-2">
                    <span className="text-red-400 text-xs mt-0.5 shrink-0">Before</span>
                    <span className="text-xs text-slate-400 italic">{shift.before}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-green-400 text-xs mt-0.5 shrink-0">After</span>
                    <span className="text-xs text-slate-300">{shift.after}</span>
                  </div>
                </div>
                <div className="text-xs font-semibold px-3 py-1.5 rounded-xl bg-orange-500/15 text-orange-300">
                  💡 {shift.saving}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Section 6.2 — Platform Capability Map ── */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-black text-white" style={{ background: gradient }}>6.2</div>
            <h2 className="text-2xl font-bold text-white">Platform Capability Map</h2>
          </div>
          <p className="text-slate-400 mb-6 text-sm">Select a platform layer to explore its capabilities. Each layer is a self-contained service teams can consume via API.</p>

          {/* Layer tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2 mb-6">
            {platformCapabilities.map((cap, i) => (
              <button
                key={cap.layer}
                onClick={() => setActiveLayer(i)}
                className="p-3 rounded-xl border text-center transition-all duration-300 hover:scale-[1.03]"
                style={{
                  background: activeLayer === i ? `${cap.color}25` : `${cap.color}10`,
                  borderColor: activeLayer === i ? `${cap.color}70` : `${cap.color}20`,
                  boxShadow: activeLayer === i ? `0 0 20px ${cap.color}30` : "none",
                }}
              >
                <div className="text-xl mb-1">{cap.icon}</div>
                <div className="text-xs font-semibold text-white leading-tight">{cap.layer}</div>
              </button>
            ))}
          </div>

          {/* Active layer detail */}
          <div
            className="rounded-2xl border overflow-hidden transition-all duration-300"
            style={{
              background: `${platformCapabilities[activeLayer].color}08`,
              borderColor: `${platformCapabilities[activeLayer].color}30`,
            }}
          >
            <div className="p-5 border-b flex items-center gap-4"
              style={{ background: `${platformCapabilities[activeLayer].color}15`, borderColor: `${platformCapabilities[activeLayer].color}20` }}>
              <span className="text-3xl">{platformCapabilities[activeLayer].icon}</span>
              <div>
                <h3 className="text-xl font-bold text-white">{platformCapabilities[activeLayer].layer}</h3>
                <p className="text-sm text-slate-400">{platformCapabilities[activeLayer].description}</p>
              </div>
            </div>
            <div className="p-5 grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {platformCapabilities[activeLayer].capabilities.map((cap) => (
                <button
                  key={cap.name}
                  onClick={() => setExpandedCap(expandedCap === cap.name ? null : cap.name)}
                  className="text-left p-4 rounded-xl border transition-all duration-200 hover:scale-[1.02]"
                  style={{
                    background: expandedCap === cap.name
                      ? `${platformCapabilities[activeLayer].color}20`
                      : `${platformCapabilities[activeLayer].color}10`,
                    borderColor: expandedCap === cap.name
                      ? `${platformCapabilities[activeLayer].color}60`
                      : `${platformCapabilities[activeLayer].color}20`,
                  }}
                >
                  <div className="text-xl mb-2">{cap.icon}</div>
                  <div className="font-semibold text-white text-sm mb-1">{cap.name}</div>
                  <div className="text-xs text-slate-400 leading-relaxed">{cap.desc}</div>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* ── Team Topology ── */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-black text-white" style={{ background: gradient }}>6.3</div>
            <h2 className="text-2xl font-bold text-white">Team Topology</h2>
          </div>
          <p className="text-slate-400 mb-6 text-sm">A successful AI platform needs clear team ownership. Click each team to understand its responsibilities.</p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {teamTopology.map((team, i) => (
              <button
                key={team.team}
                onClick={() => setActiveTeam(i)}
                className="p-5 rounded-2xl border text-left transition-all duration-300 hover:scale-[1.02]"
                style={{
                  background: activeTeam === i ? `${team.color}20` : `${team.color}10`,
                  borderColor: activeTeam === i ? `${team.color}60` : `${team.color}20`,
                  boxShadow: activeTeam === i ? `0 0 20px ${team.color}25` : "none",
                }}
              >
                <div className="text-3xl mb-3">{team.icon}</div>
                <div className="font-bold text-white text-sm mb-1">{team.team}</div>
                <div className="text-xs text-slate-400 leading-relaxed">{team.responsibility}</div>
              </button>
            ))}
          </div>

          <div
            className="rounded-2xl p-6 border transition-all duration-300"
            style={{
              background: `${teamTopology[activeTeam].color}10`,
              borderColor: `${teamTopology[activeTeam].color}35`,
            }}
          >
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">🔨 What this team builds</div>
                <ul className="space-y-2">
                  {teamTopology[activeTeam].builds.map((b) => (
                    <li key={b} className="flex items-center gap-2 text-sm text-slate-300">
                      <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: teamTopology[activeTeam].color }} />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">👥 Who they serve</div>
                <div className="inline-flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold"
                  style={{ background: `${teamTopology[activeTeam].color}20`, color: teamTopology[activeTeam].color }}>
                  {teamTopology[activeTeam].serves}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Developer Experience ── */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-black text-white" style={{ background: gradient }}>6.4</div>
            <h2 className="text-2xl font-bold text-white">Developer Experience — The Golden Path</h2>
          </div>

          <div className="glass rounded-2xl p-6 border border-white/10 mb-6">
            <h4 className="font-semibold text-white mb-4">From zero to production RAG app — 30 minutes</h4>
            <pre className="code-block text-xs leading-relaxed">{`# Install the AI Platform SDK
pip install acme-ai-sdk

# Authenticate
ai-platform login --sso

# Scaffold a new RAG app from template
ai-platform new my-hr-assistant --template rag

# Configure your knowledge source
ai-platform knowledge add \\
  --source sharepoint://company/hr-docs \\
  --name hr-knowledge-base \\
  --chunk-size 512

# Configure your model
ai-platform model set gpt-4o-mini \\
  --fallback claude-haiku \\
  --budget 500/month

# Deploy to staging
ai-platform deploy --env staging

# Run evaluation against golden dataset
ai-platform eval run \\
  --dataset hr-golden-v2 \\
  --threshold faithfulness=0.85

# Deploy to production (after eval passes)
ai-platform deploy --env production --canary 10%`}</pre>
          </div>

          <div className="grid sm:grid-cols-3 gap-4">
            {[
              { title: "Time to First RAG App", before: "6–8 weeks", after: "< 2 days", icon: "⏱️", color: "#34d399" },
              { title: "Infrastructure Setup", before: "Each team from scratch", after: "Zero — platform provides it", icon: "🏗️", color: "#818cf8" },
              { title: "Security Compliance", before: "Manual review per app", after: "Built-in platform guarantees", icon: "🔐", color: "#f472b6" },
            ].map((metric) => (
              <div key={metric.title} className="rounded-2xl p-5 border text-center" style={{ background: `${metric.color}10`, borderColor: `${metric.color}25` }}>
                <div className="text-3xl mb-2">{metric.icon}</div>
                <div className="font-bold text-white text-sm mb-3">{metric.title}</div>
                <div className="flex items-center justify-center gap-3">
                  <div className="text-xs text-red-400 line-through">{metric.before}</div>
                  <div className="text-slate-600">→</div>
                  <div className="text-sm font-bold" style={{ color: metric.color }}>{metric.after}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Hands-on ── */}
        <section>
          <HandsOnExercise
            title="Design Your Enterprise AI Platform"
            description="Apply the platform engineering mindset to design an internal AI platform that enables multiple teams to build AI applications independently."
            gradient={gradient}
            steps={[
              "Identify 5 AI use cases across your organisation that share common infrastructure needs",
              "Map which platform capabilities (from the 7 layers above) each use case requires",
              "Define your platform team: size, skills (ML Eng, Platform Eng, DevOps, Security)",
              "Choose your first 3 platform capabilities to build (highest leverage, most shared)",
              "Design the developer onboarding flow: how does a new team build their first RAG app?",
              "Define platform SLAs: availability, latency, support response time",
              "Create a 12-month roadmap: MVP capabilities → full platform",
            ]}
            hint="Start with the Model Gateway — it requires zero ML knowledge to use, immediately reduces cost through routing, and gives you full visibility into all LLM usage. It's the highest-ROI first platform component."
            solution={`Enterprise AI Platform — 12-Month Roadmap:
──────────────────────────────────────────
PLATFORM TEAM: 4-6 engineers
  · 2x Platform Engineers (infra, APIs)
  · 1x ML Engineer (eval, models)
  · 1x Security Engineer (guardrails)
  · 1x Developer Advocate (DX, docs)

QUARTER 1 — Foundation:
  ✓ Model Gateway (LiteLLM / Portkey)
  ✓ Basic Prompt Registry (Git + API)
  ✓ SDK v0.1 (Python + TypeScript)
  ✓ Usage dashboard

QUARTER 2 — Knowledge Layer:
  ✓ Document ingestion pipeline
  ✓ Vector DB platform (pgvector)
  ✓ Retrieval API
  ✓ RAG starter template

QUARTER 3 — Quality & Ops:
  ✓ Eval framework (RAGAS managed)
  ✓ CI/CD integration (eval gate)
  ✓ OpenTelemetry tracing
  ✓ Cost management dashboard

QUARTER 4 — Advanced:
  ✓ Agent runtime (LangGraph hosted)
  ✓ Tool registry
  ✓ Governance & audit logs
  ✓ Developer portal v1.0

SUCCESS METRICS:
  · Time to first app: 6wk → 2 days
  · Teams using platform: 0 → 20+
  · LLM cost per team: -40%
  · Security incidents: 0`}
          />
        </section>

      </div>
    </ModuleLayout>
  );
}
