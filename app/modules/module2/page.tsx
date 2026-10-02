"use client";

import { useState } from "react";
import ModuleLayout from "@/components/ui/ModuleLayout";
import InfoCard from "@/components/ui/InfoCard";
import HandsOnExercise from "@/components/ui/HandsOnExercise";

const gradient = "linear-gradient(135deg, #a78bfa 0%, #6366f1 100%)";

/* ── Reference Architecture layers ── */
const archLayers = [
  {
    id: "users",
    label: "Users / Applications",
    icon: "👤",
    color: "#94a3b8",
    nodes: ["Web App", "Mobile App", "API Client", "Internal Tool"],
    desc: "End users and applications interact with the AI platform through a unified interface.",
  },
  {
    id: "gateway",
    label: "API / AI Gateway",
    icon: "🔀",
    color: "#818cf8",
    nodes: ["Auth", "Rate Limit", "Routing", "Logging"],
    desc: "Central entry point that handles authentication, rate limiting, routing, and request logging for all AI traffic.",
  },
  {
    id: "services",
    label: "Core AI Services",
    icon: "🧠",
    color: "#a78bfa",
    nodes: ["LLMs", "Agents", "RAG", "Tools"],
    desc: "The core AI capabilities — language models, autonomous agents, retrieval-augmented generation, and tool integrations.",
  },
  {
    id: "platform",
    label: "AI Platform Layer",
    icon: "🏗️",
    color: "#60a5fa",
    nodes: ["Model Registry", "Prompt Registry", "Vector DB", "Feature Store"],
    desc: "Reusable platform infrastructure that all AI services consume — registries, storage, and shared data layers.",
  },
  {
    id: "ops",
    label: "Operations Layer",
    icon: "📊",
    color: "#34d399",
    nodes: ["Evaluation", "Observability", "Security", "Governance"],
    desc: "Cross-cutting concerns: how you evaluate quality, observe behavior, enforce security policies, and govern AI usage.",
  },
  {
    id: "infra",
    label: "Infrastructure Layer",
    icon: "☁️",
    color: "#fbbf24",
    nodes: ["Kubernetes", "GPU Infra", "Databases", "Cloud APIs"],
    desc: "The foundational compute, storage, and networking infrastructure everything runs on.",
  },
];

/* ── Model types ── */
const modelTypes = [
  { label: "Foundation Models", icon: "🌐", color: "#818cf8", examples: ["GPT-4o", "Claude 3.5", "Gemini 1.5"], desc: "Large pre-trained models from major AI labs" },
  { label: "Open-Source Models", icon: "🔓", color: "#34d399", examples: ["Llama 3", "Mistral", "Qwen 2.5"], desc: "Community models for self-hosted deployment" },
  { label: "Fine-tuned Models", icon: "🎯", color: "#f472b6", examples: ["Domain-specific", "Task-specific", "Instruction-tuned"], desc: "Base models adapted for specific tasks or domains" },
  { label: "Local Models", icon: "💻", color: "#fb923c", examples: ["Ollama", "LM Studio", "vLLM"], desc: "Models running on-premises for privacy & latency" },
];

/* ── Gateway features ── */
const gatewayFeatures = [
  { icon: "🔐", title: "Authentication", desc: "API keys, OAuth, JWT validation", color: "#818cf8" },
  { icon: "🔀", title: "Routing", desc: "Route to model based on task type, cost, latency", color: "#a78bfa" },
  { icon: "🔁", title: "Retry & Fallback", desc: "Auto-retry on failure, switch to backup model", color: "#60a5fa" },
  { icon: "💰", title: "Cost Controls", desc: "Per-user/team budget limits, token caps", color: "#34d399" },
  { icon: "⏱️", title: "Rate Limiting", desc: "Protect downstream providers from overload", color: "#f472b6" },
  { icon: "🔌", title: "Provider Abstraction", desc: "Single API for OpenAI, Anthropic, Azure, Cohere", color: "#fb923c" },
];

/* ── Prompt lifecycle ── */
const promptLifecycle = [
  { step: "Author", icon: "✍️", desc: "Write prompt templates with variables", color: "#818cf8" },
  { step: "Version", icon: "🏷️", desc: "Tag versions: v1.0, v1.1, v2.0", color: "#a78bfa" },
  { step: "Test", icon: "🧪", desc: "Run against evaluation dataset", color: "#60a5fa" },
  { step: "Review", icon: "👀", desc: "Peer review prompt changes", color: "#34d399" },
  { step: "Promote", icon: "🚀", desc: "Deploy to staging → production", color: "#f472b6" },
  { step: "Monitor", icon: "📊", desc: "Track performance metrics", color: "#fb923c" },
  { step: "Rollback", icon: "↩️", desc: "Revert to prior version if quality drops", color: "#fbbf24" },
];

/* ── RAG pipeline stages ── */
const ragStages = [
  {
    phase: "Indexing",
    color: "#818cf8",
    icon: "📥",
    steps: [
      { label: "Document Ingestion", detail: "PDFs, web pages, databases, APIs" },
      { label: "Chunking", detail: "Split into 256–1024 token chunks with overlap" },
      { label: "Embedding", detail: "Convert chunks to dense vectors" },
      { label: "Vector Storage", detail: "Store in Pinecone, Weaviate, pgvector" },
    ],
  },
  {
    phase: "Retrieval",
    color: "#34d399",
    icon: "🔍",
    steps: [
      { label: "Query Embedding", detail: "Embed user query using same model" },
      { label: "Vector Search", detail: "ANN search — top-k similar chunks" },
      { label: "Reranking", detail: "Cross-encoder rerank for precision" },
      { label: "Metadata Filter", detail: "Filter by date, source, access level" },
    ],
  },
  {
    phase: "Generation",
    color: "#f472b6",
    icon: "💬",
    steps: [
      { label: "Context Construction", detail: "Combine query + retrieved chunks" },
      { label: "Prompt Assembly", detail: "Insert context into prompt template" },
      { label: "LLM Generation", detail: "Generate grounded response" },
      { label: "Citation Extraction", detail: "Return source references with answer" },
    ],
  },
];

export default function Module2() {
  const [activeLayer, setActiveLayer] = useState(2);
  const [activeRagPhase, setActiveRagPhase] = useState(0);
  const [activeTab, setActiveTab] = useState<"model" | "gateway" | "prompt" | "rag">("model");

  const tabs = [
    { id: "model", label: "Model Management", icon: "🤖" },
    { id: "gateway", label: "Model Gateway", icon: "🔀" },
    { id: "prompt", label: "Prompt Management", icon: "✍️" },
    { id: "rag", label: "RAG Pipeline", icon: "🔍" },
  ] as const;

  return (
    <ModuleLayout
      moduleNumber={2}
      title="LLMOps Architecture & Core Components"
      duration="50 minutes"
      gradient={gradient}
      description="Deep dive into the reference architecture for LLMOps, explore model management, the AI gateway, prompt lifecycle, and retrieval-augmented generation pipelines."
      prevHref="/modules/module1"
      prevLabel="MLOps → LLMOps"
      nextHref="/modules/module3"
      nextLabel="CI/CD Pipeline"
    >
      <div className="space-y-16">

        {/* ── Section 2.1 — Reference Architecture ── */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-black text-white" style={{ background: gradient }}>2.1</div>
            <h2 className="text-2xl font-bold text-white">Reference Architecture for LLMOps</h2>
          </div>
          <p className="text-slate-400 mb-6 text-sm leading-relaxed">
            Click each layer to explore its role in the overall architecture.
          </p>

          <div className="grid lg:grid-cols-2 gap-6">
            {/* Interactive stack */}
            <div className="space-y-2">
              {archLayers.map((layer, i) => (
                <div
                  key={layer.id}
                  onClick={() => setActiveLayer(i)}
                  className="flex items-center gap-4 p-4 rounded-2xl border cursor-pointer transition-all duration-300"
                  style={{
                    background: activeLayer === i ? `${layer.color}20` : `${layer.color}08`,
                    borderColor: activeLayer === i ? `${layer.color}60` : `${layer.color}20`,
                    boxShadow: activeLayer === i ? `0 0 20px ${layer.color}25` : "none",
                    transform: activeLayer === i ? "translateX(4px)" : "none",
                  }}
                >
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl shrink-0" style={{ background: `${layer.color}20` }}>
                    {layer.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-white text-sm">{layer.label}</div>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {layer.nodes.map((n) => (
                        <span key={n} className="text-xs px-2 py-0.5 rounded-full" style={{ background: `${layer.color}15`, color: layer.color }}>
                          {n}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="w-2 h-2 rounded-full shrink-0" style={{ background: activeLayer === i ? layer.color : "rgba(255,255,255,0.2)" }} />
                </div>
              ))}
            </div>

            {/* Detail panel */}
            <div
              className="rounded-2xl p-6 border sticky top-24 h-fit"
              style={{
                background: `${archLayers[activeLayer].color}10`,
                borderColor: `${archLayers[activeLayer].color}40`,
              }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="text-4xl">{archLayers[activeLayer].icon}</div>
                <div>
                  <div className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: archLayers[activeLayer].color }}>
                    Layer {activeLayer + 1} of {archLayers.length}
                  </div>
                  <h3 className="text-xl font-bold text-white">{archLayers[activeLayer].label}</h3>
                </div>
              </div>
              <p className="text-slate-300 text-sm leading-relaxed mb-5">{archLayers[activeLayer].desc}</p>
              <div className="grid grid-cols-2 gap-2">
                {archLayers[activeLayer].nodes.map((node) => (
                  <div key={node} className="flex items-center gap-2 p-3 rounded-xl" style={{ background: `${archLayers[activeLayer].color}15` }}>
                    <div className="w-1.5 h-1.5 rounded-full" style={{ background: archLayers[activeLayer].color }} />
                    <span className="text-sm text-slate-300 font-medium">{node}</span>
                  </div>
                ))}
              </div>
              {/* Arrow indicators */}
              <div className="mt-5 flex items-center justify-between text-xs text-slate-500">
                {activeLayer > 0 && (
                  <button onClick={() => setActiveLayer(activeLayer - 1)} className="flex items-center gap-1 hover:text-white transition-colors">
                    ↑ {archLayers[activeLayer - 1].label}
                  </button>
                )}
                {activeLayer < archLayers.length - 1 && (
                  <button onClick={() => setActiveLayer(activeLayer + 1)} className="flex items-center gap-1 hover:text-white transition-colors ml-auto">
                    {archLayers[activeLayer + 1].label} ↓
                  </button>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* ── Sections 2.2–2.5 with tabs ── */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-black text-white" style={{ background: gradient }}>2.2–2.5</div>
            <h2 className="text-2xl font-bold text-white">Core Components Deep Dive</h2>
          </div>

          {/* Tabs */}
          <div className="flex flex-wrap gap-2 mb-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${
                  activeTab === tab.id ? "text-white scale-105" : "glass text-slate-400 hover:text-white"
                }`}
                style={activeTab === tab.id ? { background: gradient, boxShadow: "0 0 20px rgba(99,102,241,0.4)" } : {}}
              >
                <span>{tab.icon}</span> {tab.label}
              </button>
            ))}
          </div>

          {/* Model Management */}
          {activeTab === "model" && (
            <div className="space-y-6 animate-fade-in">
              <div className="glass rounded-2xl p-5 border border-white/10">
                <h3 className="font-bold text-white mb-4">🤖 Model Types & Selection</h3>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {modelTypes.map((mt) => (
                    <div key={mt.label} className="rounded-xl p-4 border" style={{ background: `${mt.color}12`, borderColor: `${mt.color}30` }}>
                      <div className="text-2xl mb-2">{mt.icon}</div>
                      <div className="font-semibold text-white text-sm mb-1">{mt.label}</div>
                      <div className="text-xs text-slate-400 mb-3">{mt.desc}</div>
                      <div className="space-y-1">
                        {mt.examples.map((ex) => (
                          <div key={ex} className="text-xs px-2 py-1 rounded-lg" style={{ background: `${mt.color}20`, color: mt.color }}>
                            {ex}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid sm:grid-cols-3 gap-4">
                {[
                  { icon: "🏷️", title: "Model Versioning", items: ["Semantic versioning (v1.2.0)", "Immutable model snapshots", "Rollback to prior version", "Changelog & release notes"], color: "#818cf8" },
                  { icon: "📋", title: "Model Metadata", items: ["Training data lineage", "Benchmark scores", "Token limits & pricing", "Safety evaluations"], color: "#a78bfa" },
                  { icon: "🗂️", title: "Model Registry", items: ["Centralized catalog", "Approval workflows", "Environment promotion", "Access control per model"], color: "#60a5fa" },
                ].map((card) => (
                  <InfoCard key={card.title} icon={card.icon} title={card.title} items={card.items} color={card.color} bgColor={`${card.color}10`} />
                ))}
              </div>
            </div>
          )}

          {/* Model Gateway */}
          {activeTab === "gateway" && (
            <div className="space-y-6 animate-fade-in">
              <div className="glass rounded-2xl p-6 border border-white/10">
                <h3 className="font-bold text-white mb-2 text-lg">🔀 AI Gateway — How it works</h3>
                <p className="text-slate-400 text-sm mb-6">A model gateway is the single entry point for all LLM calls across your organisation. It abstracts provider differences and enforces platform policies.</p>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {gatewayFeatures.map((f) => (
                    <div key={f.title} className="flex items-start gap-3 p-4 rounded-xl border" style={{ background: `${f.color}10`, borderColor: `${f.color}25` }}>
                      <div className="text-2xl shrink-0">{f.icon}</div>
                      <div>
                        <div className="font-semibold text-white text-sm mb-1">{f.title}</div>
                        <div className="text-xs text-slate-400">{f.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Gateway flow diagram */}
              <div className="glass rounded-2xl p-6 border border-white/10">
                <h4 className="font-semibold text-white mb-4">Request Flow</h4>
                <div className="flex flex-wrap items-center justify-center gap-3 text-sm">
                  {[
                    { label: "App Request", color: "#94a3b8", icon: "📱" },
                    { label: "Auth Check", color: "#818cf8", icon: "🔐" },
                    { label: "Rate Limit", color: "#a78bfa", icon: "⏱️" },
                    { label: "Router", color: "#60a5fa", icon: "🔀" },
                    { label: "Provider A", color: "#34d399", icon: "🟢" },
                    { label: "Provider B", color: "#f472b6", icon: "🔴" },
                    { label: "Response", color: "#fbbf24", icon: "✅" },
                  ].map((node, i, arr) => (
                    <div key={node.label} className="flex items-center gap-2">
                      <div className="flex flex-col items-center gap-1.5 px-4 py-3 rounded-xl border text-center min-w-[90px]"
                        style={{ background: `${node.color}15`, borderColor: `${node.color}40` }}>
                        <span className="text-xl">{node.icon}</span>
                        <span className="text-xs font-medium text-slate-300">{node.label}</span>
                      </div>
                      {i < arr.length - 1 && <span className="text-slate-600 hidden sm:block">→</span>}
                    </div>
                  ))}
                </div>
                <p className="text-xs text-slate-500 text-center mt-4">If Provider A fails, router automatically falls back to Provider B</p>
              </div>
            </div>
          )}

          {/* Prompt Management */}
          {activeTab === "prompt" && (
            <div className="space-y-6 animate-fade-in">
              <div className="glass rounded-2xl p-6 border border-white/10">
                <h3 className="font-bold text-white mb-2 text-lg">✍️ Prompt Lifecycle Management</h3>
                <p className="text-slate-400 text-sm mb-6">Treat prompts as first-class software artifacts — with versioning, testing, and deployment pipelines.</p>
                <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
                  {promptLifecycle.map((stage, i) => (
                    <div key={stage.step} className="flex flex-col items-center gap-2 text-center">
                      <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl" style={{ background: `${stage.color}20`, border: `1px solid ${stage.color}40` }}>
                        {stage.icon}
                      </div>
                      <div className="text-xs font-bold text-white">{stage.step}</div>
                      <div className="text-xs text-slate-500 leading-tight">{stage.desc}</div>
                      {i < promptLifecycle.length - 1 && (
                        <div className="hidden lg:block absolute" style={{ display: "none" }} />
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Prompt template example */}
              <div className="glass rounded-2xl p-6 border border-white/10">
                <h4 className="font-semibold text-white mb-4">📝 Prompt Template Example</h4>
                <pre className="code-block text-xs leading-relaxed overflow-x-auto">
{`# prompt-registry/hr-assistant/v2.1.0.yaml
name: hr-assistant
version: "2.1.0"
model: gpt-4o
temperature: 0.3

system: |
  You are an HR assistant for {{company_name}}.
  Answer questions based ONLY on the provided context.
  If unsure, say "I don't have that information."

user: |
  Context:
  {{retrieved_chunks}}
  
  Question: {{user_query}}

variables:
  - company_name
  - retrieved_chunks  
  - user_query

changelog: "Improved groundedness, added citation format"`}
                </pre>
              </div>
            </div>
          )}

          {/* RAG Pipeline */}
          {activeTab === "rag" && (
            <div className="space-y-6 animate-fade-in">
              <div className="glass rounded-2xl p-6 border border-white/10">
                <h3 className="font-bold text-white mb-2 text-lg">🔍 RAG Pipeline — 3 Phases</h3>
                <p className="text-slate-400 text-sm mb-6">Retrieval-Augmented Generation grounds LLM responses in real enterprise data.</p>

                <div className="flex gap-2 mb-6">
                  {ragStages.map((phase, i) => (
                    <button
                      key={phase.phase}
                      onClick={() => setActiveRagPhase(i)}
                      className="flex-1 py-3 px-4 rounded-xl font-semibold text-sm transition-all duration-300"
                      style={
                        activeRagPhase === i
                          ? { background: phase.color, color: "white", boxShadow: `0 0 20px ${phase.color}50` }
                          : { background: `${phase.color}15`, color: phase.color, border: `1px solid ${phase.color}30` }
                      }
                    >
                      <span className="mr-2">{phase.icon}</span>{phase.phase}
                    </button>
                  ))}
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  {ragStages[activeRagPhase].steps.map((step, i) => (
                    <div
                      key={step.label}
                      className="p-4 rounded-xl border"
                      style={{
                        background: `${ragStages[activeRagPhase].color}12`,
                        borderColor: `${ragStages[activeRagPhase].color}35`,
                      }}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-black text-white"
                          style={{ background: ragStages[activeRagPhase].color }}>
                          {i + 1}
                        </div>
                        <span className="font-semibold text-white text-sm">{step.label}</span>
                      </div>
                      <p className="text-xs text-slate-400 leading-relaxed">{step.detail}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Context metrics */}
              <div className="grid sm:grid-cols-4 gap-4">
                {[
                  { metric: "Chunk Size", value: "512", unit: "tokens", tip: "Balance context coverage vs precision", color: "#818cf8" },
                  { metric: "Overlap", value: "10", unit: "%", tip: "Prevent context loss at chunk boundaries", color: "#60a5fa" },
                  { metric: "Top-K", value: "5–10", unit: "chunks", tip: "Retrieved candidates before reranking", color: "#34d399" },
                  { metric: "Context Window", value: "8K–128K", unit: "tokens", tip: "How much context can fit in the prompt", color: "#f472b6" },
                ].map((m) => (
                  <div key={m.metric} className="metric-card text-center">
                    <div className="text-xs text-slate-500 uppercase tracking-wider mb-2">{m.metric}</div>
                    <div className="text-2xl font-black mb-1" style={{ color: m.color }}>{m.value}</div>
                    <div className="text-xs font-medium text-slate-400 mb-2">{m.unit}</div>
                    <div className="text-xs text-slate-500 italic">{m.tip}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>

        {/* ── Hands-on Architecture Exercise ── */}
        <section>
          <HandsOnExercise
            title="Design: Enterprise HR Knowledge Assistant"
            description="Apply everything from Module 2 to design the architecture for an HR Knowledge Assistant that serves employees across your organisation."
            gradient={gradient}
            steps={[
              "Define the data sources: internal HR documents, policy PDFs, FAQs, employee handbook",
              "Choose your embedding model and vector database (e.g. text-embedding-3-small + pgvector)",
              "Design the RAG pipeline: chunking strategy, retrieval top-k, reranking approach",
              "Select 2–3 LLM providers and define routing rules (e.g. GPT-4o for complex, GPT-4o-mini for simple)",
              "Design the Model Gateway configuration: auth, rate limits, cost caps per team",
              "Create a prompt template with system role, context injection, and user query format",
              "Define authentication: which employees can access which HR documents (RBAC)",
              "Specify monitoring: what metrics to track, what constitutes a quality degradation alert",
            ]}
            hint="Think about multi-tenancy: HR data may be regionally sensitive — an employee in the UK shouldn't retrieve US-specific payroll policies. Use metadata filtering in your vector store to enforce this."
            solution={`Enterprise HR Knowledge Assistant Architecture:
──────────────────────────────────────────────
INGESTION PIPELINE:
  SharePoint/Confluence → Document Loader
  → Text Splitter (512 tokens, 10% overlap)
  → text-embedding-3-small
  → pgvector (with tenant_id + country metadata)

RETRIEVAL:
  Query → Embed → pgvector ANN search (top-10)
  → Cohere Rerank (top-3) 
  → Metadata filter: country, department, clearance

MODEL GATEWAY (LiteLLM):
  Simple queries → gpt-4o-mini ($0.15/1M in)
  Complex queries → gpt-4o ($2.50/1M in)
  Fallback → Claude 3 Haiku

PROMPT REGISTRY:
  hr-assistant/v2.1 (production)
  hr-assistant/v3.0 (canary 10% traffic)

SECURITY:
  Azure AD SSO → JWT → Gateway Auth
  Per-department rate limits
  PII detection guardrail (Presidio)

MONITORING:
  Faithfulness score > 0.85 (RAGAS)
  P95 latency < 3s
  Cost/query < $0.02`}
          />
        </section>

      </div>
    </ModuleLayout>
  );
}
