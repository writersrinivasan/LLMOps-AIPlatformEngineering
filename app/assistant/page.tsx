import Navbar from "@/components/ui/Navbar";
import AIAssistant from "@/components/assistant/AIAssistant";

export default function AssistantPage() {
  return (
    <>
      <Navbar />
      <div
        className="min-h-screen pt-16 flex flex-col"
        style={{ background: "transparent" }}
      >
        {/* ── Page header ── */}
        <div
          className="relative overflow-hidden"
          style={{
            background: "linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #1e1b4b 100%)",
            borderBottom: "1px solid rgba(99,102,241,0.2)",
          }}
        >
          {/* Glow orbs */}
          <div
            className="absolute -top-20 -left-20 w-80 h-80 rounded-full pointer-events-none"
            style={{
              background: "radial-gradient(circle, rgba(99,102,241,0.3), transparent 70%)",
              filter: "blur(40px)",
            }}
          />
          <div
            className="absolute -bottom-10 right-10 w-60 h-60 rounded-full pointer-events-none"
            style={{
              background: "radial-gradient(circle, rgba(167,139,250,0.2), transparent 70%)",
              filter: "blur(30px)",
            }}
          />

          <div className="relative max-w-7xl mx-auto px-4 py-8 flex flex-col sm:flex-row items-start sm:items-center gap-5">
            {/* Icon */}
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl shrink-0"
              style={{
                background: "linear-gradient(135deg, rgba(99,102,241,0.4), rgba(167,139,250,0.3))",
                border: "1px solid rgba(99,102,241,0.5)",
                boxShadow: "0 0 30px rgba(99,102,241,0.35)",
              }}
            >
              🧠
            </div>

            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <h1 className="text-2xl sm:text-3xl font-black text-white">
                  AI Assistant
                </h1>
                <span
                  className="text-xs font-bold px-2.5 py-1 rounded-full"
                  style={{
                    background: "rgba(99,102,241,0.25)",
                    color: "#a5b4fc",
                    border: "1px solid rgba(99,102,241,0.4)",
                  }}
                >
                  Powered by GROQ
                </span>
                <span
                  className="text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1.5"
                  style={{
                    background: "rgba(52,211,153,0.15)",
                    color: "#34d399",
                    border: "1px solid rgba(52,211,153,0.3)",
                  }}
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block"
                    style={{ animation: "pulseDot 2s infinite" }}
                  />
                  Live
                </span>
              </div>
              <p className="text-slate-400 text-sm max-w-xl leading-relaxed">
                Ask any question about <strong className="text-slate-200">LLMOps & AI Platform Engineering</strong>. Watch the multi-agent pipeline process your query in real time — from classification through to GROQ inference.
              </p>
            </div>

            {/* Agent pipeline preview badges */}
            <div className="hidden lg:flex items-center gap-2 shrink-0">
              {[
                { icon: "🔍", label: "Classify", color: "#818cf8" },
                { icon: "📚", label: "Retrieve", color: "#60a5fa" },
                { icon: "🏗️", label: "Build", color: "#34d399" },
                { icon: "🧠", label: "GROQ", color: "#a78bfa" },
                { icon: "✨", label: "Format", color: "#f472b6" },
              ].map((s, i, arr) => (
                <div key={s.label} className="flex items-center gap-1">
                  <div
                    className="flex flex-col items-center gap-1 px-2 py-1.5 rounded-lg"
                    style={{ background: `${s.color}15`, border: `1px solid ${s.color}30` }}
                  >
                    <span className="text-base leading-none">{s.icon}</span>
                    <span className="text-[9px] font-semibold" style={{ color: s.color }}>
                      {s.label}
                    </span>
                  </div>
                  {i < arr.length - 1 && (
                    <span className="text-slate-700 text-xs">→</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Topic scope notice ── */}
        <div
          className="max-w-7xl mx-auto w-full px-4 py-2"
        >
          <div
            className="rounded-xl px-4 py-2.5 text-xs flex items-center gap-2 flex-wrap"
            style={{
              background: "rgba(251,191,36,0.07)",
              border: "1px solid rgba(251,191,36,0.2)",
              color: "#fbbf24",
            }}
          >
            <span className="text-base">🎯</span>
            <span className="font-semibold">Topic Scope:</span>
            <span className="text-yellow-200/70">
              This assistant is scoped exclusively to{" "}
              <strong className="text-yellow-300">LLMOps & AI Platform Engineering</strong>.
              Off-topic questions will be politely declined.
            </span>
            <div className="ml-auto flex flex-wrap gap-1.5">
              {["MLOps→LLMOps", "Architecture", "CI/CD", "Evaluation", "Observability", "AI Platform", "Capstone"].map(
                (t) => (
                  <span
                    key={t}
                    className="text-[10px] px-2 py-0.5 rounded-full font-medium"
                    style={{
                      background: "rgba(251,191,36,0.12)",
                      border: "1px solid rgba(251,191,36,0.25)",
                      color: "#fbbf24",
                    }}
                  >
                    {t}
                  </span>
                )
              )}
            </div>
          </div>
        </div>

        {/* ── Main chat area ── */}
        <div className="flex-1 max-w-7xl mx-auto w-full px-4 pb-4 flex flex-col lg:flex-row gap-4">

          {/* Chat column */}
          <div
            className="flex-1 flex flex-col rounded-2xl overflow-hidden border"
            style={{
              background: "rgba(10,10,26,0.8)",
              borderColor: "rgba(99,102,241,0.15)",
              boxShadow: "0 0 40px rgba(99,102,241,0.08)",
              minHeight: "600px",
            }}
          >
            <AIAssistant />
          </div>

          {/* Sidebar: module quick reference */}
          <div className="lg:w-72 space-y-3 shrink-0">
            <div
              className="rounded-2xl overflow-hidden border"
              style={{
                background: "rgba(10,10,26,0.8)",
                borderColor: "rgba(255,255,255,0.07)",
              }}
            >
              <div
                className="px-4 py-3 border-b flex items-center gap-2"
                style={{ borderColor: "rgba(255,255,255,0.06)", background: "rgba(255,255,255,0.03)" }}
              >
                <span className="text-sm">📋</span>
                <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">Module Quick Reference</span>
              </div>
              <div className="p-3 space-y-1.5">
                {[
                  { num: 1, title: "MLOps → LLMOps", color: "#818cf8", href: "/modules/module1" },
                  { num: 2, title: "Architecture & Components", color: "#a78bfa", href: "/modules/module2" },
                  { num: 3, title: "CI/CD & Deployment", color: "#60a5fa", href: "/modules/module3" },
                  { num: 4, title: "Evaluation & Testing", color: "#34d399", href: "/modules/module4" },
                  { num: 5, title: "Observability & Security", color: "#f472b6", href: "/modules/module5" },
                  { num: 6, title: "Enterprise AI Platform", color: "#fb923c", href: "/modules/module6" },
                  { num: 7, title: "Capstone Challenge", color: "#fbbf24", href: "/modules/module7" },
                ].map((m) => (
                  <a
                    key={m.num}
                    href={m.href}
                    className="flex items-center gap-2.5 px-3 py-2 rounded-xl transition-all duration-200 hover:scale-[1.02] block"
                    style={{
                      background: `${m.color}10`,
                      border: `1px solid ${m.color}20`,
                    }}
                  >
                    <span
                      className="w-5 h-5 rounded-md flex items-center justify-center text-[10px] font-black text-white shrink-0"
                      style={{ background: m.color }}
                    >
                      {m.num}
                    </span>
                    <span className="text-xs text-slate-300 leading-tight">{m.title}</span>
                  </a>
                ))}
              </div>
            </div>

            {/* How it works */}
            <div
              className="rounded-2xl border overflow-hidden"
              style={{
                background: "rgba(10,10,26,0.8)",
                borderColor: "rgba(255,255,255,0.07)",
              }}
            >
              <div
                className="px-4 py-3 border-b"
                style={{ borderColor: "rgba(255,255,255,0.06)", background: "rgba(255,255,255,0.03)" }}
              >
                <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">⚙️ How It Works</span>
              </div>
              <div className="p-4 space-y-3">
                {[
                  { step: "1", icon: "🔍", title: "Query Classifier", desc: "Checks if question is on-topic for LLMOps", color: "#818cf8" },
                  { step: "2", icon: "📚", title: "Knowledge Retriever", desc: "Scans LLMOps knowledge across all 7 modules", color: "#60a5fa" },
                  { step: "3", icon: "🏗️", title: "Context Builder", desc: "Assembles relevant context for the LLM", color: "#34d399" },
                  { step: "4", icon: "🧠", title: "GROQ LLM", desc: "llama3-70b generates expert answer at ultra speed", color: "#a78bfa" },
                  { step: "5", icon: "✨", title: "Response Formatter", desc: "Structures and validates the final response", color: "#f472b6" },
                ].map((s) => (
                  <div key={s.step} className="flex items-start gap-2.5">
                    <div
                      className="w-6 h-6 rounded-lg flex items-center justify-center text-sm shrink-0 mt-0.5"
                      style={{ background: `${s.color}20`, border: `1px solid ${s.color}30` }}
                    >
                      {s.icon}
                    </div>
                    <div>
                      <div className="text-xs font-semibold" style={{ color: s.color }}>{s.title}</div>
                      <div className="text-[11px] text-slate-500 leading-snug">{s.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
