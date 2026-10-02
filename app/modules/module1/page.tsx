"use client";

import { useState } from "react";
import ModuleLayout from "@/components/ui/ModuleLayout";
import InfoCard from "@/components/ui/InfoCard";
import HandsOnExercise from "@/components/ui/HandsOnExercise";

const gradient = "linear-gradient(135deg, #667eea 0%, #764ba2 100%)";

/* ── 1.1 Evolution timeline ── */
const evolutionSteps = [
  {
    era: "2000s – 2010s",
    label: "Traditional Software",
    icon: "💻",
    color: "#94a3b8",
    points: [
      "Deterministic logic, unit-testable",
      "Waterfall → Agile → DevOps",
      "Input → Expected Output",
      "Version control for code only",
    ],
  },
  {
    era: "2016 – 2020",
    label: "ML Engineering & MLOps",
    icon: "🤖",
    color: "#60a5fa",
    points: [
      "Data pipelines + feature stores",
      "Model training & experiment tracking",
      "Model registry & versioning",
      "Batch inference & A/B tests",
    ],
  },
  {
    era: "2021 – 2023",
    label: "LLMOps",
    icon: "🧠",
    color: "#a78bfa",
    points: [
      "Prompt engineering as code",
      "RAG pipelines & vector DBs",
      "Token cost & latency tracking",
      "LLM-as-a-judge evaluation",
    ],
  },
  {
    era: "2024+",
    label: "AI Platform Engineering",
    icon: "🏢",
    color: "#f472b6",
    points: [
      "Reusable platform capabilities",
      "Self-serve AI SDK & APIs",
      "Agentic workflow orchestration",
      "Enterprise governance & audit",
    ],
  },
];

/* ── 1.2 Lifecycle steps ── */
const lifecycleSteps = [
  { label: "Data", icon: "💾", color: "#818cf8", desc: "Curation, labeling, quality" },
  { label: "Model Selection", icon: "🤖", color: "#a78bfa", desc: "OSS vs proprietary, benchmarks" },
  { label: "Prompt / Context", icon: "✍️", color: "#60a5fa", desc: "Templates, few-shot, system prompts" },
  { label: "RAG / Tools", icon: "🔧", color: "#34d399", desc: "Retrieval, embeddings, function calling" },
  { label: "App Development", icon: "💻", color: "#f472b6", desc: "SDK, APIs, orchestration" },
  { label: "Evaluation", icon: "🧪", color: "#fb923c", desc: "Quality, faithfulness, safety" },
  { label: "Deployment", icon: "🚀", color: "#fbbf24", desc: "Canary, blue/green, feature flags" },
  { label: "Observability", icon: "📊", color: "#a78bfa", desc: "Tracing, metrics, alerts" },
  { label: "Feedback", icon: "🔁", color: "#60a5fa", desc: "RLHF signals, thumbs up/down" },
  { label: "Continuous Improvement", icon: "📈", color: "#34d399", desc: "Iteration, fine-tuning, re-eval" },
];

/* ── 1.3 Platform components ── */
const platformComponents = [
  { icon: "🔀", title: "Model Gateway", items: ["Unified provider interface", "Routing & fallback", "Rate limiting & auth"], color: "#818cf8", bg: "rgba(99,102,241,0.08)" },
  { icon: "📦", title: "Model Registry", items: ["Version tracking", "Metadata & lineage", "Deployment configs"], color: "#a78bfa", bg: "rgba(167,139,250,0.08)" },
  { icon: "📝", title: "Prompt Registry", items: ["Versioned templates", "A/B experiments", "Rollback support"], color: "#60a5fa", bg: "rgba(96,165,250,0.08)" },
  { icon: "🗄️", title: "Vector Database", items: ["Embedding storage", "Semantic search", "Metadata filtering"], color: "#34d399", bg: "rgba(52,211,153,0.08)" },
  { icon: "🔍", title: "RAG Pipeline", items: ["Chunking & indexing", "Retrieval & reranking", "Context construction"], color: "#f472b6", bg: "rgba(244,114,182,0.08)" },
  { icon: "🤖", title: "Agent Runtime", items: ["Tool execution", "Multi-step planning", "State management"], color: "#fb923c", bg: "rgba(251,146,60,0.08)" },
  { icon: "📐", title: "Evaluation Framework", items: ["Golden datasets", "LLM-as-a-judge", "Quality gates"], color: "#fbbf24", bg: "rgba(251,191,36,0.08)" },
  { icon: "📡", title: "Observability Layer", items: ["Distributed tracing", "Cost tracking", "Alerting"], color: "#4ade80", bg: "rgba(74,222,128,0.08)" },
  { icon: "🔐", title: "Security & Governance", items: ["Access control", "Audit logs", "Policy enforcement"], color: "#f87171", bg: "rgba(248,113,113,0.08)" },
  { icon: "🔄", title: "CI/CD & Release", items: ["Automated evaluation", "Deployment pipelines", "Prompt rollout"], color: "#22d3ee", bg: "rgba(34,211,238,0.08)" },
];

/* ── Comparison table ── */
const comparisonRows = [
  { aspect: "Versioning", mlops: "Model weights + code", llmops: "Prompts + model + context + tools" },
  { aspect: "Testing", mlops: "Accuracy metrics, unit tests", llmops: "Semantic eval, LLM-as-a-judge" },
  { aspect: "Deployment", mlops: "Model endpoints", llmops: "Model + prompt + RAG pipeline" },
  { aspect: "Monitoring", mlops: "CPU, latency, drift", llmops: "Token cost, faithfulness, hallucination" },
  { aspect: "Iteration unit", mlops: "Re-train model", llmops: "Update prompt / context / model" },
  { aspect: "Infrastructure", mlops: "GPU clusters, batch jobs", llmops: "Inference APIs, vector DBs, agents" },
];

export default function Module1() {
  const [activeEra, setActiveEra] = useState(0);
  const [activeLifecycle, setActiveLifecycle] = useState<number | null>(null);

  return (
    <ModuleLayout
      moduleNumber={1}
      title="From MLOps to LLMOps to AI Platform Engineering"
      duration="30 minutes"
      gradient={gradient}
      description="Understand the evolution from traditional software development to AI Platform Engineering, explore the LLM application lifecycle, and discover the components powering enterprise AI platforms."
      nextHref="/modules/module2"
      nextLabel="LLMOps Architecture"
    >
      <div className="space-y-16">

        {/* ── Section 1.1 ── */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-black text-white" style={{ background: gradient }}>1.1</div>
            <h2 className="text-2xl font-bold text-white">Evolution of AI Engineering</h2>
          </div>

          {/* Era selector tabs */}
          <div className="flex flex-wrap gap-2 mb-6">
            {evolutionSteps.map((era, i) => (
              <button
                key={i}
                onClick={() => setActiveEra(i)}
                className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 ${
                  activeEra === i ? "text-white scale-105" : "glass text-slate-400 hover:text-white"
                }`}
                style={activeEra === i ? { background: era.color, boxShadow: `0 0 20px ${era.color}50` } : {}}
              >
                {era.era}
              </button>
            ))}
          </div>

          {/* Active era card */}
          <div
            className="rounded-2xl p-6 border transition-all duration-500"
            style={{ background: `${evolutionSteps[activeEra].color}12`, borderColor: `${evolutionSteps[activeEra].color}40` }}
          >
            <div className="flex items-center gap-4 mb-4">
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl"
                style={{ background: `${evolutionSteps[activeEra].color}25` }}
              >
                {evolutionSteps[activeEra].icon}
              </div>
              <div>
                <div className="text-xs font-semibold uppercase tracking-widest mb-1" style={{ color: evolutionSteps[activeEra].color }}>
                  {evolutionSteps[activeEra].era}
                </div>
                <h3 className="text-xl font-bold text-white">{evolutionSteps[activeEra].label}</h3>
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-3">
              {evolutionSteps[activeEra].points.map((pt, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 p-3 rounded-xl"
                  style={{ background: `${evolutionSteps[activeEra].color}10` }}
                >
                  <div className="w-2 h-2 rounded-full shrink-0" style={{ background: evolutionSteps[activeEra].color }} />
                  <span className="text-sm text-slate-300">{pt}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Evolution timeline */}
          <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
            {evolutionSteps.map((era, i) => (
              <div key={i} className="relative">
                {i < evolutionSteps.length - 1 && (
                  <div className="absolute top-5 left-[calc(100%-0px)] w-3 h-0.5 hidden sm:block" style={{ background: `linear-gradient(to right, ${era.color}, ${evolutionSteps[i+1].color})` }} />
                )}
                <div
                  onClick={() => setActiveEra(i)}
                  className={`p-4 rounded-xl border cursor-pointer transition-all duration-300 ${activeEra === i ? "scale-105" : "opacity-60 hover:opacity-80"}`}
                  style={{ background: `${era.color}15`, borderColor: `${era.color}40` }}
                >
                  <div className="text-2xl mb-2">{era.icon}</div>
                  <div className="text-xs font-bold text-white mb-1">{era.label}</div>
                  <div className="text-xs" style={{ color: era.color }}>{era.era}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── MLOps vs LLMOps comparison ── */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-black text-white" style={{ background: gradient }}>VS</div>
            <h2 className="text-2xl font-bold text-white">MLOps vs LLMOps</h2>
          </div>
          <div className="glass rounded-2xl overflow-hidden border border-white/10">
            <div className="grid grid-cols-3 text-sm font-bold">
              <div className="p-4 text-slate-400 bg-white/5">Aspect</div>
              <div className="p-4 text-blue-300 bg-blue-500/10 border-l border-white/10">⚙️ MLOps</div>
              <div className="p-4 text-purple-300 bg-purple-500/10 border-l border-white/10">🧠 LLMOps</div>
            </div>
            {comparisonRows.map((row, i) => (
              <div key={i} className={`grid grid-cols-3 text-sm border-t border-white/5 ${i % 2 === 0 ? "" : "bg-white/[0.02]"}`}>
                <div className="p-4 text-slate-400 font-medium">{row.aspect}</div>
                <div className="p-4 text-slate-300 border-l border-white/5">{row.mlops}</div>
                <div className="p-4 text-slate-300 border-l border-white/5">{row.llmops}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Section 1.2 — LLM Lifecycle ── */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-black text-white" style={{ background: gradient }}>1.2</div>
            <h2 className="text-2xl font-bold text-white">LLM Application Lifecycle</h2>
          </div>
          <p className="text-slate-400 mb-6 text-sm leading-relaxed">
            Click any stage to learn more about it. The LLM lifecycle is cyclical — every deployment feeds back into continuous improvement.
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {lifecycleSteps.map((step, i) => (
              <div
                key={i}
                onClick={() => setActiveLifecycle(activeLifecycle === i ? null : i)}
                className="rounded-xl p-4 border cursor-pointer transition-all duration-300 hover:scale-105 text-center"
                style={{
                  background: activeLifecycle === i ? `${step.color}25` : `${step.color}10`,
                  borderColor: activeLifecycle === i ? `${step.color}70` : `${step.color}30`,
                  boxShadow: activeLifecycle === i ? `0 0 20px ${step.color}30` : "none",
                }}
              >
                <div className="text-2xl mb-2">{step.icon}</div>
                <div className="text-xs font-bold text-white mb-1">{step.label}</div>
                <div className="text-xs" style={{ color: step.color }}>{i + 1}</div>
              </div>
            ))}
          </div>

          {/* Detail panel */}
          {activeLifecycle !== null && (
            <div
              className="mt-4 p-5 rounded-2xl border transition-all duration-300"
              style={{
                background: `${lifecycleSteps[activeLifecycle].color}12`,
                borderColor: `${lifecycleSteps[activeLifecycle].color}40`,
              }}
            >
              <div className="flex items-center gap-3">
                <span className="text-3xl">{lifecycleSteps[activeLifecycle].icon}</span>
                <div>
                  <h4 className="font-bold text-white">{lifecycleSteps[activeLifecycle].label}</h4>
                  <p className="text-sm text-slate-300">{lifecycleSteps[activeLifecycle].desc}</p>
                </div>
                <div className="ml-auto text-xs px-3 py-1 rounded-full" style={{ background: `${lifecycleSteps[activeLifecycle].color}30`, color: lifecycleSteps[activeLifecycle].color }}>
                  Stage {activeLifecycle + 1} of {lifecycleSteps.length}
                </div>
              </div>
            </div>
          )}
        </section>

        {/* ── Section 1.3 — Platform Components ── */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-black text-white" style={{ background: gradient }}>1.3</div>
            <h2 className="text-2xl font-bold text-white">Components of an Enterprise AI Platform</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {platformComponents.map((comp) => (
              <InfoCard key={comp.title} {...comp} bgColor={comp.bg} />
            ))}
          </div>
        </section>

        {/* ── Section 1.4 — Enterprise Use Case ── */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-black text-white" style={{ background: gradient }}>1.4</div>
            <h2 className="text-2xl font-bold text-white">Enterprise Use Case</h2>
          </div>

          <div className="glass rounded-2xl p-6 border border-indigo-500/20 mb-6">
            <div className="flex items-start gap-4">
              <div className="text-4xl">🏢</div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Build an Internal Enterprise AI Platform</h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-4">
                  Multiple teams should be able to independently build AI-powered applications without re-implementing the underlying infrastructure every time.
                </p>
                <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-3">
                  {[
                    { icon: "📚", label: "RAG Applications", color: "#818cf8" },
                    { icon: "💬", label: "AI Assistants", color: "#a78bfa" },
                    { icon: "👨‍💻", label: "Coding Agents", color: "#60a5fa" },
                    { icon: "🎧", label: "Customer Service", color: "#34d399" },
                    { icon: "📄", label: "Document Intelligence", color: "#f472b6" },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="flex flex-col items-center gap-2 p-4 rounded-xl border text-center"
                      style={{ background: `${item.color}12`, borderColor: `${item.color}30` }}
                    >
                      <span className="text-2xl">{item.icon}</span>
                      <span className="text-xs font-semibold text-slate-300">{item.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Key insight callout */}
          <div className="p-5 rounded-2xl border border-purple-500/30 bg-purple-500/10">
            <div className="flex items-start gap-3">
              <span className="text-2xl">💡</span>
              <div>
                <h4 className="font-bold text-purple-300 mb-1">The Platform Mindset</h4>
                <p className="text-slate-300 text-sm leading-relaxed">
                  Instead of every team building their own vector database, model gateway, evaluation framework, and observability stack — the platform team builds these <strong className="text-white">once</strong>, exposes them via APIs and SDKs, and lets product teams focus purely on business logic.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── Hands-on Exercise ── */}
        <section>
          <HandsOnExercise
            title="Map Your Organization's AI Maturity"
            description="Assess where your organization currently sits on the MLOps → LLMOps → AI Platform Engineering spectrum and identify the next evolution steps."
            gradient={gradient}
            steps={[
              "Identify 3 current AI/ML initiatives in your org and classify them (Traditional ML / LLMOps / Agent)",
              "Map each initiative to the LLM lifecycle stages — where does it start and end?",
              "List which platform components (Model Gateway, Vector DB, Prompt Registry etc.) your org currently has vs. needs",
              "Identify the top 3 pain points teams face when building AI apps today",
              "Propose 2 platform capabilities that would unblock multiple teams simultaneously",
              "Sketch a 6-month roadmap to move from current state to AI Platform Engineering",
            ]}
            hint="Start with the pain points — they directly map to missing platform capabilities. A team manually copying prompts into spreadsheets signals a need for a Prompt Registry."
            solution={`Example Maturity Assessment:
─────────────────────────────────
Current State: LLMOps (early stage)
  ✓ Using OpenAI API directly
  ✓ RAG with basic vector search
  ✗ No prompt versioning
  ✗ No evaluation pipeline
  ✗ No cost tracking

Next Step: Introduce:
  1. Model Gateway (LiteLLM / AWS Bedrock)
  2. Prompt Registry (Git-based versioning)
  3. Basic eval pipeline (RAGAS / DeepEval)

6-Month Goal: AI Platform MVP
  Month 1-2: Model Gateway + Prompt Registry
  Month 3-4: Evaluation framework + CI/CD gates
  Month 5-6: Observability + Developer portal`}
          />
        </section>

      </div>
    </ModuleLayout>
  );
}
