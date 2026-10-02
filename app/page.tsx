import Link from "next/link";
import Navbar from "@/components/ui/Navbar";
import ModuleCard from "@/components/ui/ModuleCard";

const modules = [
  {
    number: 1,
    title: "From MLOps to LLMOps to AI Platform Engineering",
    duration: "30 min",
    description: "Understand the evolution from traditional software to AI Platform Engineering, the LLM application lifecycle, and enterprise platform components.",
    gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    glowColor: "#667eea",
    progress: 0,
    href: "/modules/module1",
    icon: "🚀",
    topics: ["AI Evolution", "LLM Lifecycle", "Platform Components", "Enterprise Use Case"],
  },
  {
    number: 2,
    title: "LLMOps Architecture & Core Components",
    duration: "50 min",
    description: "Dive deep into reference architecture, model management, gateways, prompt management, and knowledge systems powering enterprise AI.",
    gradient: "linear-gradient(135deg, #a78bfa 0%, #6366f1 100%)",
    glowColor: "#a78bfa",
    progress: 0,
    href: "/modules/module2",
    icon: "🏗️",
    topics: ["Reference Architecture", "Model Gateway", "Prompt Management", "RAG Pipelines"],
  },
  {
    number: 3,
    title: "AI Application CI/CD & Deployment Engineering",
    duration: "60 min",
    description: "Build production-grade AI pipelines. Learn deployment strategies, infrastructure patterns, and evaluation gates that go beyond traditional CI/CD.",
    gradient: "linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%)",
    glowColor: "#3b82f6",
    progress: 0,
    href: "/modules/module3",
    icon: "⚙️",
    topics: ["AI CI/CD", "Deployment Strategies", "Canary Rollout", "Infrastructure"],
  },
  {
    number: 4,
    title: "LLM Evaluation, Testing & Quality Engineering",
    duration: "45 min",
    description: "Master probabilistic output testing, build multi-layer evaluation pipelines, and create golden datasets for reliable AI quality gates.",
    gradient: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
    glowColor: "#10b981",
    progress: 0,
    href: "/modules/module4",
    icon: "🧪",
    topics: ["LLM-as-a-Judge", "RAG Evaluation", "Agent Testing", "Quality Gates"],
  },
  {
    number: 5,
    title: "LLM Observability, Security & Cost Engineering",
    duration: "55 min",
    description: "Instrument AI systems with distributed tracing, build security guardrails against prompt injection, and optimize costs across your AI stack.",
    gradient: "linear-gradient(135deg, #ec4899 0%, #f43f5e 100%)",
    glowColor: "#ec4899",
    progress: 0,
    href: "/modules/module5",
    icon: "📊",
    topics: ["Distributed Tracing", "Prompt Injection", "Cost Optimization", "Metrics"],
  },
  {
    number: 6,
    title: "Building the Enterprise AI Platform",
    duration: "40 min",
    description: "Shift from building apps to building platforms. Design reusable AI capabilities that enable 100+ teams to ship AI applications independently.",
    gradient: "linear-gradient(135deg, #f97316 0%, #ef4444 100%)",
    glowColor: "#f97316",
    progress: 0,
    href: "/modules/module6",
    icon: "🏢",
    topics: ["Platform Mindset", "Developer Experience", "Agent Runtime", "Governance"],
  },
  {
    number: 7,
    title: "Capstone Architecture Challenge",
    duration: "20 min",
    description: "Put it all together. Design a complete Enterprise AI Platform supporting 100+ applications, multiple LLM providers, and production governance.",
    gradient: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
    glowColor: "#f59e0b",
    progress: 0,
    href: "/modules/module7",
    icon: "🎯",
    topics: ["Full Architecture", "Design Challenge", "Team Exercise", "Presentation"],
  },
];

const stats = [
  { label: "Modules", value: "7", icon: "📦", color: "#818cf8" },
  { label: "Duration", value: "5h", icon: "⏱️", color: "#a78bfa" },
  { label: "Hands-on Labs", value: "7", icon: "🛠️", color: "#60a5fa" },
  { label: "Topics", value: "40+", icon: "📚", color: "#34d399" },
];

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-16">
        {/* Hero Section */}
        <section className="relative overflow-hidden py-20 px-4">
          {/* Background glow orbs */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl opacity-20 pointer-events-none"
            style={{ background: "radial-gradient(circle, #667eea, transparent)" }} />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full blur-3xl opacity-15 pointer-events-none"
            style={{ background: "radial-gradient(circle, #a78bfa, transparent)" }} />

          <div className="relative max-w-5xl mx-auto text-center">
            {/* Tag */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-indigo-500/30 text-indigo-300 text-sm font-medium mb-6">
              <span className="w-2 h-2 rounded-full bg-indigo-400 pulse-dot" />
              Advanced Technical Session · 5 Hours
            </div>

            {/* Title */}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-white mb-6 leading-tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
                LLMOps
              </span>
              <br />
              <span className="text-white">& AI Platform</span>
              <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400">
                Engineering
              </span>
            </h1>

            <p className="text-slate-400 text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
              An interactive, hands-on learning journey through modern AI platform architecture — from MLOps fundamentals to enterprise-scale AI systems.
            </p>

            {/* CTA */}
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/modules/module1">
                <button className="btn-primary text-base px-8 py-4 flex items-center gap-2">
                  🚀 Start Learning
                </button>
              </Link>
              <Link href="#modules">
                <button className="btn-secondary text-base px-8 py-4 flex items-center gap-2">
                  📋 View Modules
                </button>
              </Link>
            </div>
          </div>
        </section>

        {/* Stats bar */}
        <section className="px-4 mb-16">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {stats.map((stat) => (
                <div key={stat.label} className="glass rounded-2xl p-5 text-center group hover:scale-105 transition-transform duration-300">
                  <div className="text-3xl mb-2">{stat.icon}</div>
                  <div className="text-3xl font-black mb-1" style={{ color: stat.color }}>
                    {stat.value}
                  </div>
                  <div className="text-xs text-slate-500 font-medium uppercase tracking-wider">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* LLM Lifecycle Flow */}
        <section className="px-4 mb-16">
          <div className="max-w-5xl mx-auto">
            <div className="glass rounded-3xl p-8 border border-white/10">
              <h2 className="text-2xl font-bold text-white text-center mb-8">
                🔄 LLM Application Lifecycle
              </h2>
              <div className="flex flex-wrap justify-center items-center gap-2">
                {[
                  { label: "Data", color: "#818cf8", icon: "💾" },
                  { label: "Model Selection", color: "#a78bfa", icon: "🤖" },
                  { label: "Prompt Engineering", color: "#60a5fa", icon: "✍️" },
                  { label: "RAG / Tools", color: "#34d399", icon: "🔧" },
                  { label: "App Development", color: "#f472b6", icon: "💻" },
                  { label: "Evaluation", color: "#fb923c", icon: "🧪" },
                  { label: "Deployment", color: "#fbbf24", icon: "🚀" },
                  { label: "Observability", color: "#a78bfa", icon: "📊" },
                  { label: "Feedback", color: "#60a5fa", icon: "🔁" },
                  { label: "Continuous Improvement", color: "#34d399", icon: "📈" },
                ].map((step, i, arr) => (
                  <div key={step.label} className="flex items-center gap-2">
                    <div
                      className="flex flex-col items-center gap-1 px-4 py-3 rounded-xl border cursor-pointer hover:scale-105 transition-transform duration-200 min-w-[110px] text-center"
                      style={{
                        background: `${step.color}15`,
                        borderColor: `${step.color}40`,
                        boxShadow: `0 4px 12px ${step.color}15`,
                      }}
                    >
                      <span className="text-xl">{step.icon}</span>
                      <span className="text-xs font-medium text-slate-300 leading-tight">{step.label}</span>
                    </div>
                    {i < arr.length - 1 && (
                      <span className="text-slate-600 text-lg font-light hidden sm:block">→</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Module Cards Grid */}
        <section id="modules" className="px-4 pb-20">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-black text-white mb-3">Learning Modules</h2>
              <p className="text-slate-400">Click any module to start your interactive learning session</p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {modules.map((mod) => (
                <ModuleCard key={mod.number} {...mod} />
              ))}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="glass border-t border-white/10 py-8 px-4 text-center">
          <p className="text-slate-500 text-sm">
            LLMOps & AI Platform Engineering · 5-Hour Advanced Technical Session
          </p>
        </footer>
      </main>
    </>
  );
}
