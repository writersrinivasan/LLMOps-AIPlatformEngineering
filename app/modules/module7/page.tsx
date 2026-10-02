"use client";

import { useState } from "react";
import Link from "next/link";
import ModuleLayout from "@/components/ui/ModuleLayout";

const gradient = "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)";

/* ── Architecture layers to design ── */
const architectureLayers = [
  {
    id: "apps",
    label: "AI Applications",
    icon: "📱",
    color: "#94a3b8",
    nodes: ["RAG App", "AI Assistant", "Coding Agent", "Doc Intelligence", "Customer Service"],
    position: "top",
  },
  {
    id: "gateway",
    label: "AI Gateway",
    icon: "🔀",
    color: "#818cf8",
    nodes: ["Auth", "Rate Limit", "Routing", "Cost Control"],
    position: "middle",
  },
  {
    id: "core",
    label: "Core Services",
    icon: "🧠",
    color: "#a78bfa",
    nodes: ["Model Layer", "Knowledge Layer", "Agent Layer"],
    position: "middle",
  },
  {
    id: "platform",
    label: "Platform Services",
    icon: "🏗️",
    color: "#60a5fa",
    nodes: ["Evaluation", "Observability", "Governance", "CI/CD"],
    position: "middle",
  },
  {
    id: "infra",
    label: "Infrastructure",
    icon: "☁️",
    color: "#34d399",
    nodes: ["Kubernetes", "Cloud APIs", "GPU Pool", "Databases"],
    position: "bottom",
  },
];

/* ── Design decisions ── */
const designDecisions = [
  {
    decision: "Model Strategy",
    icon: "🤖",
    color: "#818cf8",
    options: [
      { label: "All-in on single provider (OpenAI)", pros: "Simple, fast to start", cons: "Vendor lock-in, outage risk" },
      { label: "Multi-provider via gateway", pros: "Resilience, cost optimisation", cons: "More complexity to manage" },
      { label: "Hybrid: managed + self-hosted", pros: "Cost control for high-volume", cons: "Infrastructure overhead" },
    ],
  },
  {
    decision: "Vector Database",
    icon: "🗄️",
    color: "#60a5fa",
    options: [
      { label: "pgvector (PostgreSQL)", pros: "Familiar ops, SQL joins, ACID", cons: "Scales to ~100M vectors" },
      { label: "Pinecone (managed)", pros: "Fully managed, scales to billions", cons: "Vendor dependency, cost" },
      { label: "Weaviate / Qdrant (self-hosted)", pros: "Full control, OSS", cons: "Ops burden, expertise needed" },
    ],
  },
  {
    decision: "Agent Framework",
    icon: "🤖",
    color: "#34d399",
    options: [
      { label: "LangGraph", pros: "Stateful graphs, production-ready", cons: "Learning curve" },
      { label: "AutoGen / CrewAI", pros: "Multi-agent, easy to define roles", cons: "Less control over flow" },
      { label: "Custom orchestration", pros: "Full control, no framework lock-in", cons: "Build everything yourself" },
    ],
  },
  {
    decision: "Evaluation Strategy",
    icon: "📐",
    color: "#fbbf24",
    options: [
      { label: "RAGAS (open source)", pros: "Free, customisable, community", cons: "Requires setup & maintenance" },
      { label: "Braintrust / Arize", pros: "Managed, rich UI, integrations", cons: "Cost per evaluation" },
      { label: "Custom LLM judge", pros: "Domain-specific criteria", cons: "Bias risk, maintenance" },
    ],
  },
];

/* ── Module summary ── */
const moduleSummary = [
  { num: 1, title: "MLOps → LLMOps", icon: "🚀", color: "#818cf8", keyTakeaway: "LLMOps requires versioning prompts, context, and evaluation — not just code." },
  { num: 2, title: "Architecture", icon: "🏗️", color: "#a78bfa", keyTakeaway: "Model Gateway + Prompt Registry + RAG Pipeline = the core LLMOps stack." },
  { num: 3, title: "CI/CD", icon: "⚙️", color: "#60a5fa", keyTakeaway: "AI releases ship code + prompt + model + eval results as a bundle." },
  { num: 4, title: "Evaluation", icon: "🧪", color: "#34d399", keyTakeaway: "LLM testing requires semantic evaluation, not just input/output matching." },
  { num: 5, title: "Observability", icon: "📊", color: "#f472b6", keyTakeaway: "Trace every agent step; monitor faithfulness, cost, and security in real time." },
  { num: 6, title: "AI Platform", icon: "🏢", color: "#fb923c", keyTakeaway: "Platform mindset: build reusable capabilities, not one-off AI applications." },
];

/* ── Checklist groups ── */
const checklistGroups = [
  {
    title: "Architecture Design",
    color: "#818cf8",
    icon: "🏗️",
    items: [
      "AI Applications layer defined (list all app types)",
      "AI Gateway designed with auth, routing, cost controls",
      "Model Layer: provider mix, routing rules, registry",
      "Knowledge Layer: ingestion, embedding, vector DB, retrieval",
      "Agent Layer: runtime, tool registry, MCP plan",
    ],
  },
  {
    title: "Operations & Quality",
    color: "#34d399",
    icon: "📐",
    items: [
      "Evaluation framework chosen (RAGAS / Braintrust / custom)",
      "Quality gates defined with numeric thresholds",
      "CI/CD pipeline designed with AI-specific stages",
      "Observability: tracing, metrics, alerting strategy",
      "Cost governance: per-team budgets, routing rules",
    ],
  },
  {
    title: "Security & Governance",
    color: "#f472b6",
    icon: "🔐",
    items: [
      "Authentication and authorisation model defined",
      "Guardrails for prompt injection, PII, toxicity",
      "Audit logging strategy documented",
      "Data access controls: who can retrieve what?",
      "Compliance requirements mapped (GDPR / SOC2 / HIPAA)",
    ],
  },
  {
    title: "Developer Experience",
    color: "#fbbf24",
    icon: "👨‍💻",
    items: [
      "SDK / API surface defined for product teams",
      "Starter templates for RAG, agent, assistant",
      "Onboarding flow: time to first working app",
      "Documentation and developer portal planned",
      "Team topology and platform team size defined",
    ],
  },
];

export default function Module7() {
  const [selectedDecisions, setSelectedDecisions] = useState<Record<string, number>>({});
  const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set());
  const [activeLayer, setActiveLayer] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const selectDecision = (decisionId: string, optionIdx: number) => {
    setSelectedDecisions((prev) => ({ ...prev, [decisionId]: optionIdx }));
  };

  const toggleCheck = (key: string) => {
    const next = new Set(checkedItems);
    if (next.has(key)) next.delete(key);
    else next.add(key);
    setCheckedItems(next);
  };

  const totalChecklistItems = checklistGroups.reduce((s, g) => s + g.items.length, 0);
  const completionPct = Math.round((checkedItems.size / totalChecklistItems) * 100);
  const decisionsMade = Object.keys(selectedDecisions).length;

  return (
    <ModuleLayout
      moduleNumber={7}
      title="Capstone Architecture Challenge"
      duration="20 minutes"
      gradient={gradient}
      description="Put everything together. Design a complete Enterprise AI Platform, make key architectural decisions, and present your architecture to the group."
      prevHref="/modules/module6"
      prevLabel="Enterprise AI Platform"
    >
      <div className="space-y-16">

        {/* ── Course Complete Banner ── */}
        <section>
          <div className="rounded-3xl overflow-hidden border border-yellow-500/30" style={{ background: "linear-gradient(135deg, rgba(245,158,11,0.15), rgba(217,119,6,0.15))" }}>
            <div className="p-8 text-center">
              <div className="text-5xl mb-4">🎯</div>
              <h2 className="text-3xl font-black text-white mb-3">Final Challenge</h2>
              <p className="text-slate-300 text-lg max-w-2xl mx-auto leading-relaxed mb-6">
                Apply everything from all 6 modules to design an Enterprise AI Platform supporting <strong className="text-yellow-300">100+ AI applications</strong> in production.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <div className="glass rounded-xl px-5 py-3 text-sm font-semibold text-white">
                  👥 Team Exercise
                </div>
                <div className="glass rounded-xl px-5 py-3 text-sm font-semibold text-white">
                  ⏱️ 20 Minutes
                </div>
                <div className="glass rounded-xl px-5 py-3 text-sm font-semibold text-white">
                  🎤 Team Presentation
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Problem Statement ── */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-black text-white" style={{ background: gradient }}>📋</div>
            <h2 className="text-2xl font-bold text-white">Problem Statement</h2>
          </div>

          <div className="glass rounded-2xl p-6 border border-white/10 mb-6">
            <p className="text-slate-300 text-base leading-relaxed mb-6">
              Your organisation is building an internal Enterprise AI Platform. Design a production architecture that satisfies all of the following requirements:
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { icon: "📱", label: "100+ AI Applications", desc: "RAG, agents, assistants, coding tools", color: "#818cf8" },
                { icon: "🤖", label: "Multiple LLM Providers", desc: "OpenAI, Anthropic, Azure, open-source", color: "#a78bfa" },
                { icon: "🔒", label: "Internal Enterprise Data", desc: "Sensitive docs, PII, confidential IP", color: "#60a5fa" },
                { icon: "📊", label: "Production Monitoring", desc: "Quality, cost, latency, security", color: "#34d399" },
                { icon: "🧪", label: "AI Evaluation", desc: "Automated gates in every release", color: "#f472b6" },
                { icon: "🔐", label: "Security", desc: "Prompt injection, PII, access control", color: "#fb923c" },
                { icon: "💰", label: "Cost Governance", desc: "Per-team budgets, routing, caching", color: "#fbbf24" },
                { icon: "☸️", label: "Cloud / Kubernetes", desc: "Cloud-native, autoscaling, HA", color: "#4ade80" },
              ].map((req) => (
                <div key={req.label} className="rounded-xl p-4 border" style={{ background: `${req.color}12`, borderColor: `${req.color}30` }}>
                  <div className="text-2xl mb-2">{req.icon}</div>
                  <div className="font-semibold text-white text-sm mb-1">{req.label}</div>
                  <div className="text-xs text-slate-400 leading-relaxed">{req.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Interactive Architecture Builder ── */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-black text-white" style={{ background: gradient }}>🏗️</div>
            <h2 className="text-2xl font-bold text-white">Architecture Visual</h2>
          </div>
          <p className="text-slate-400 mb-6 text-sm">Click any layer to explore what sits there in your design.</p>

          <div className="glass rounded-2xl p-6 border border-white/10">
            <div className="space-y-3">
              {architectureLayers.map((layer) => (
                <div key={layer.id}>
                  <button
                    onClick={() => setActiveLayer(activeLayer === layer.id ? null : layer.id)}
                    className="w-full rounded-2xl border transition-all duration-300 p-4 text-left"
                    style={{
                      background: activeLayer === layer.id ? `${layer.color}20` : `${layer.color}10`,
                      borderColor: activeLayer === layer.id ? `${layer.color}60` : `${layer.color}25`,
                      boxShadow: activeLayer === layer.id ? `0 0 20px ${layer.color}20` : "none",
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-xl">{layer.icon}</span>
                        <span className="font-bold text-white">{layer.label}</span>
                      </div>
                      <div className="flex flex-wrap gap-2 justify-end">
                        {layer.nodes.map((node) => (
                          <span key={node} className="text-xs px-2 py-1 rounded-lg"
                            style={{ background: `${layer.color}20`, color: layer.color }}>
                            {node}
                          </span>
                        ))}
                      </div>
                    </div>
                  </button>
                  {layer.id !== architectureLayers[architectureLayers.length - 1].id && (
                    <div className="flex justify-center my-1">
                      <div className="w-0.5 h-4 rounded-full" style={{ background: `linear-gradient(to bottom, ${layer.color}60, transparent)` }} />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Design Decisions ── */}
        <section>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-black text-white" style={{ background: gradient }}>🔧</div>
            <h2 className="text-2xl font-bold text-white">Make Key Design Decisions</h2>
          </div>
          <p className="text-slate-400 mb-6 text-sm">
            Choose one option for each decision. <strong className="text-white">{decisionsMade}/{designDecisions.length}</strong> decisions made.
          </p>

          <div className="space-y-6">
            {designDecisions.map((decision) => (
              <div key={decision.decision} className="glass rounded-2xl border border-white/10 overflow-hidden">
                <div className="p-4 border-b border-white/10 flex items-center gap-3" style={{ background: `${decision.color}12` }}>
                  <span className="text-2xl">{decision.icon}</span>
                  <h3 className="font-bold text-white">{decision.decision}</h3>
                  {selectedDecisions[decision.decision] !== undefined && (
                    <span className="ml-auto text-xs px-2 py-1 rounded-full bg-green-500/20 text-green-300">✓ Decided</span>
                  )}
                </div>
                <div className="p-4 grid sm:grid-cols-3 gap-3">
                  {decision.options.map((opt, i) => (
                    <button
                      key={opt.label}
                      onClick={() => selectDecision(decision.decision, i)}
                      className="text-left p-4 rounded-xl border transition-all duration-200 hover:scale-[1.02]"
                      style={{
                        background: selectedDecisions[decision.decision] === i
                          ? `${decision.color}25`
                          : `${decision.color}08`,
                        borderColor: selectedDecisions[decision.decision] === i
                          ? `${decision.color}70`
                          : `${decision.color}20`,
                      }}
                    >
                      <div className="font-semibold text-white text-sm mb-2">{opt.label}</div>
                      <div className="space-y-1 text-xs">
                        <div className="flex items-start gap-1.5">
                          <span className="text-green-400 shrink-0">✓</span>
                          <span className="text-slate-300">{opt.pros}</span>
                        </div>
                        <div className="flex items-start gap-1.5">
                          <span className="text-red-400 shrink-0">✗</span>
                          <span className="text-slate-400">{opt.cons}</span>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Delivery Checklist ── */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-black text-white" style={{ background: gradient }}>✅</div>
            <h2 className="text-2xl font-bold text-white">Architecture Delivery Checklist</h2>
          </div>

          {/* Progress */}
          <div className="glass rounded-2xl p-5 border border-white/10 mb-6">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-semibold text-slate-300">Overall Completion</span>
              <span className="text-2xl font-black" style={{ color: completionPct === 100 ? "#34d399" : "#fbbf24" }}>
                {completionPct}%
              </span>
            </div>
            <div className="h-3 rounded-full bg-white/10 overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{
                  width: `${completionPct}%`,
                  background: completionPct === 100
                    ? "linear-gradient(135deg, #34d399, #059669)"
                    : gradient,
                }}
              />
            </div>
            <div className="text-xs text-slate-500 mt-2">{checkedItems.size} of {totalChecklistItems} items completed</div>
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            {checklistGroups.map((group) => (
              <div key={group.title} className="rounded-2xl border overflow-hidden"
                style={{ background: `${group.color}08`, borderColor: `${group.color}25` }}>
                <div className="p-4 flex items-center gap-3 border-b"
                  style={{ background: `${group.color}15`, borderColor: `${group.color}20` }}>
                  <span className="text-xl">{group.icon}</span>
                  <span className="font-bold text-white text-sm">{group.title}</span>
                  <span className="ml-auto text-xs" style={{ color: group.color }}>
                    {group.items.filter((_, i) => checkedItems.has(`${group.title}-${i}`)).length}/{group.items.length}
                  </span>
                </div>
                <div className="p-4 space-y-2">
                  {group.items.map((item, i) => {
                    const key = `${group.title}-${i}`;
                    const checked = checkedItems.has(key);
                    return (
                      <button
                        key={i}
                        onClick={() => toggleCheck(key)}
                        className="w-full flex items-start gap-3 p-2.5 rounded-xl text-left transition-all hover:bg-white/5"
                      >
                        <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center shrink-0 mt-0.5 transition-all ${checked ? "border-green-400 bg-green-400" : "border-white/20"}`}
                          style={checked ? {} : { borderColor: `${group.color}50` }}>
                          {checked && (
                            <svg className="w-3 h-3 text-black" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          )}
                        </div>
                        <span className={`text-sm transition-colors ${checked ? "line-through text-slate-500" : "text-slate-300"}`}>
                          {item}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {completionPct === 100 && !submitted && (
            <div className="mt-6 text-center">
              <button
                onClick={() => setSubmitted(true)}
                className="px-10 py-4 rounded-2xl text-white font-bold text-lg transition-all hover:scale-105 hover:shadow-2xl"
                style={{ background: gradient, boxShadow: "0 0 40px rgba(245,158,11,0.4)" }}
              >
                🎤 Present Architecture →
              </button>
            </div>
          )}

          {submitted && (
            <div className="mt-6 rounded-2xl p-8 text-center border border-yellow-500/40"
              style={{ background: "linear-gradient(135deg, rgba(245,158,11,0.15), rgba(217,119,6,0.15))" }}>
              <div className="text-5xl mb-4">🏆</div>
              <h3 className="text-2xl font-black text-white mb-2">Architecture Complete!</h3>
              <p className="text-slate-300 mb-6 leading-relaxed max-w-lg mx-auto">
                Congratulations — you&apos;ve designed a production-ready Enterprise AI Platform covering all 7 dimensions of LLMOps &amp; AI Platform Engineering.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <Link href="/">
                  <button className="px-6 py-3 rounded-xl glass glass-hover text-white font-semibold">
                    📋 Review All Modules
                  </button>
                </Link>
                <Link href="/modules/module1">
                  <button className="px-6 py-3 rounded-xl text-white font-semibold" style={{ background: gradient }}>
                    🔄 Start Again
                  </button>
                </Link>
              </div>
            </div>
          )}
        </section>

        {/* ── Module Summary ── */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-black text-white" style={{ background: gradient }}>📚</div>
            <h2 className="text-2xl font-bold text-white">Key Takeaways — All Modules</h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {moduleSummary.map((mod) => (
              <Link key={mod.num} href={`/modules/module${mod.num}`}>
                <div className="glass rounded-2xl p-5 border border-white/10 hover:border-white/25 hover:scale-[1.02] transition-all duration-300 h-full cursor-pointer">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl"
                      style={{ background: `${mod.color}20` }}>
                      {mod.icon}
                    </div>
                    <div>
                      <div className="text-xs text-slate-500 font-medium">Module {mod.num}</div>
                      <div className="font-bold text-white text-sm">{mod.title}</div>
                    </div>
                  </div>
                  <p className="text-sm text-slate-400 leading-relaxed">{mod.keyTakeaway}</p>
                  <div className="mt-3 text-xs font-semibold" style={{ color: mod.color }}>
                    Review module →
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

      </div>
    </ModuleLayout>
  );
}
