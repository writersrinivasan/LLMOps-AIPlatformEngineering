"use client";

import { useState } from "react";
import ModuleLayout from "@/components/ui/ModuleLayout";
import HandsOnExercise from "@/components/ui/HandsOnExercise";

const gradient = "linear-gradient(135deg, #10b981 0%, #059669 100%)";

/* ── Why LLM testing is different ── */
const testingDifferences = [
  {
    aspect: "Output type",
    traditional: "Deterministic — same input = same output",
    llm: "Probabilistic — same input ≠ same output",
    icon: "🎲",
    color: "#818cf8",
  },
  {
    aspect: "Test assertion",
    traditional: "Exact match: assertEqual(result, expected)",
    llm: "Semantic match: similarity(result, expected) ≥ 0.85",
    icon: "🎯",
    color: "#60a5fa",
  },
  {
    aspect: "Pass/Fail",
    traditional: "Binary — pass or fail",
    llm: "Scored — 0.0 to 1.0 across multiple dimensions",
    icon: "📊",
    color: "#34d399",
  },
  {
    aspect: "Test data",
    traditional: "Edge cases & unit scenarios",
    llm: "Golden datasets with query + context + expected behavior",
    icon: "📋",
    color: "#f472b6",
  },
  {
    aspect: "Regression",
    traditional: "Did the code break?",
    llm: "Did quality, faithfulness, or safety regress?",
    icon: "🔁",
    color: "#fb923c",
  },
];

/* ── Evaluation layers ── */
const evalLayers = [
  {
    id: "model",
    layer: "Layer 1",
    title: "Model Evaluation",
    icon: "🤖",
    color: "#818cf8",
    question: "Is the model capable enough for this task?",
    metrics: [
      { name: "Accuracy", desc: "Correct answers on benchmark tasks", target: "≥ 85%" },
      { name: "Capability", desc: "Task-specific benchmark scores (MMLU, HumanEval)", target: "Varies" },
      { name: "Context Handling", desc: "Performance at full context window", target: "< 5% degradation" },
      { name: "Latency", desc: "Time to first token / end-to-end", target: "< 2s TTFT" },
      { name: "Token Usage", desc: "Average tokens per request", target: "Budget-specific" },
    ],
    tools: ["OpenAI Evals", "EleutherAI LM Eval", "HELM", "BIG-bench"],
  },
  {
    id: "prompt",
    layer: "Layer 2",
    title: "Prompt Evaluation",
    icon: "✍️",
    color: "#60a5fa",
    question: "Does the prompt reliably produce high-quality outputs?",
    metrics: [
      { name: "Instruction Following", desc: "Does the model follow all instructions in the prompt?", target: "≥ 95%" },
      { name: "Consistency", desc: "Same prompt → similar quality across runs", target: "Std dev < 0.05" },
      { name: "Response Quality", desc: "Human-rated quality score", target: "≥ 4.0/5.0" },
      { name: "Format Compliance", desc: "Output matches expected structure (JSON, markdown)", target: "100%" },
      { name: "Prompt Robustness", desc: "Quality stable across input phrasings", target: "< 10% variance" },
    ],
    tools: ["PromptFoo", "Braintrust", "LangSmith", "Custom harness"],
  },
  {
    id: "rag",
    layer: "Layer 3",
    title: "RAG Evaluation",
    icon: "🔍",
    color: "#34d399",
    question: "Does the retrieval + generation pipeline produce grounded answers?",
    metrics: [
      { name: "Retrieval Precision", desc: "What fraction of retrieved chunks are relevant?", target: "≥ 0.80" },
      { name: "Retrieval Recall", desc: "What fraction of relevant chunks were retrieved?", target: "≥ 0.75" },
      { name: "Context Relevance", desc: "Is the retrieved context relevant to the query?", target: "≥ 0.80" },
      { name: "Faithfulness", desc: "Are answers grounded in the retrieved context?", target: "≥ 0.85" },
      { name: "Answer Groundedness", desc: "Can every claim be traced to a source?", target: "≥ 0.85" },
    ],
    tools: ["RAGAS", "DeepEval", "TruLens", "Arize Phoenix"],
  },
  {
    id: "agent",
    layer: "Layer 4",
    title: "Agent Evaluation",
    icon: "🤖",
    color: "#f472b6",
    question: "Does the agent plan, select tools, and complete tasks correctly?",
    metrics: [
      { name: "Planning Quality", desc: "Does the agent decompose tasks correctly?", target: "≥ 0.85" },
      { name: "Tool Selection", desc: "Does it choose the right tool for each step?", target: "≥ 0.90" },
      { name: "Tool-call Correctness", desc: "Are tool arguments correct and valid?", target: "≥ 0.90" },
      { name: "Task Completion", desc: "Does the agent successfully complete end-to-end tasks?", target: "≥ 0.80" },
      { name: "Multi-step Execution", desc: "Can it chain 5+ steps without losing context?", target: "≥ 0.75" },
    ],
    tools: ["AgentBench", "τ-bench", "Inspect AI", "Custom simulators"],
  },
];

/* ── Evaluation techniques ── */
const evalTechniques = [
  { name: "Human Evaluation", icon: "👤", color: "#818cf8", pro: "Gold standard accuracy", con: "Slow and expensive", when: "Final validation, safety-critical decisions" },
  { name: "Automated Eval", icon: "⚡", color: "#60a5fa", pro: "Fast, scalable, consistent", con: "May miss nuanced failures", when: "CI/CD gates, regression testing" },
  { name: "LLM-as-a-Judge", icon: "🧑‍⚖️", color: "#34d399", pro: "Scales semantic evaluation", con: "Model bias, position bias", when: "Quality scoring at scale" },
  { name: "Golden Datasets", icon: "✨", color: "#fbbf24", pro: "Reproducible benchmarks", con: "Requires curation effort", when: "Regression testing between versions" },
  { name: "Red-team Evaluation", icon: "🔴", color: "#f472b6", pro: "Finds safety edge cases", con: "Requires adversarial thinking", when: "Pre-production safety review" },
  { name: "Benchmarking", icon: "📈", color: "#fb923c", pro: "Industry-comparable scores", con: "May not reflect your use case", when: "Model selection, vendor comparison" },
];

/* ── Golden dataset rows ── */
const goldenDataset = [
  { query: "What is our PTO policy?", context: "HR Policy doc", expectedBehavior: "Correct answer with source", category: "Factual", difficulty: "Easy" },
  { query: "How do I appeal a performance review?", context: "HR Policy doc", expectedBehavior: "Step-by-step process", category: "Procedural", difficulty: "Medium" },
  { query: "What is the CEO's salary?", context: "No context", expectedBehavior: "Admit uncertainty", category: "Unknown", difficulty: "Easy" },
  { query: "Help me write a resignation letter", context: "No context", expectedBehavior: "Decline — out of scope", category: "Out-of-scope", difficulty: "Medium" },
  { query: "Show me all employee SSNs", context: "Restricted data", expectedBehavior: "Refuse access", category: "Security", difficulty: "Hard" },
  { query: "Compare US vs UK benefits and summarize", context: "Multiple policy docs", expectedBehavior: "Synthesized comparison", category: "Multi-source", difficulty: "Hard" },
];

/* ── Interactive scorer ── */
const scorerQuestions = [
  { id: "q1", query: "What is the notice period for resignation?", retrieved: "Section 4.2: Employees must provide 2 weeks written notice before resignation.", response: "You need to give 2 weeks written notice when resigning.", correct: "2 weeks written notice" },
  { id: "q2", query: "What is the dental coverage limit?", retrieved: "Section 7.1: Medical benefits include $500 annual dental coverage.", response: "The annual dental coverage limit is $500.", correct: "$500 annual dental" },
  { id: "q3", query: "How many vacation days do I get?", retrieved: "Section 3.1: Employees receive 15 days PTO per year after 1 year of service.", response: "All employees get 20 vacation days per year.", correct: "15 days after 1 year" },
];

export default function Module4() {
  const [activeLayer, setActiveLayer] = useState(0);
  const [scores, setScores] = useState<Record<string, { faithfulness: number; relevance: number; correctness: number }>>({});
  const [evaluated, setEvaluated] = useState<Record<string, boolean>>({});

  const evaluateQuestion = (qId: string, q: typeof scorerQuestions[0]) => {
    const isHallucination = q.id === "q3"; // response contradicts context
    setScores((prev) => ({
      ...prev,
      [qId]: {
        faithfulness: isHallucination ? 0.1 : 0.97,
        relevance: 0.92,
        correctness: isHallucination ? 0.0 : 0.95,
      },
    }));
    setEvaluated((prev) => ({ ...prev, [qId]: true }));
  };

  const getScoreColor = (score: number) => {
    if (score >= 0.85) return "#34d399";
    if (score >= 0.6) return "#fbbf24";
    return "#f87171";
  };

  const getScoreLabel = (score: number) => {
    if (score >= 0.85) return "✅ Pass";
    if (score >= 0.6) return "⚠️ Review";
    return "❌ Fail";
  };

  return (
    <ModuleLayout
      moduleNumber={4}
      title="LLM Evaluation, Testing & Quality Engineering"
      duration="45 minutes"
      gradient={gradient}
      description="Master the art of evaluating probabilistic AI systems. Build multi-layer evaluation pipelines, create golden datasets, and design quality gates that catch regressions before they hit production."
      prevHref="/modules/module3"
      prevLabel="CI/CD Pipeline"
      nextHref="/modules/module5"
      nextLabel="Observability & Security"
    >
      <div className="space-y-16">

        {/* ── Section 4.1 — Why testing LLMs is different ── */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-black text-white" style={{ background: gradient }}>4.1</div>
            <h2 className="text-2xl font-bold text-white">Why Testing LLM Applications Is Different</h2>
          </div>

          {/* Core insight banner */}
          <div className="glass rounded-2xl p-6 border border-emerald-500/30 mb-6">
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="rounded-xl p-4 border border-slate-500/30 bg-slate-500/10">
                <div className="text-sm font-bold text-slate-300 mb-3">⚙️ Traditional Software</div>
                <div className="flex items-center gap-3 text-sm">
                  <div className="px-3 py-2 rounded-lg bg-slate-700 text-slate-300 font-mono">Input</div>
                  <span className="text-slate-500">→</span>
                  <div className="px-3 py-2 rounded-lg bg-slate-700 text-slate-300 font-mono">Expected Output</div>
                </div>
                <p className="text-xs text-slate-500 mt-3">Deterministic. Test once, trust forever.</p>
              </div>
              <div className="rounded-xl p-4 border border-emerald-500/30 bg-emerald-500/10">
                <div className="text-sm font-bold text-emerald-300 mb-3">🧠 LLM Application</div>
                <div className="flex items-center gap-3 text-sm flex-wrap">
                  <div className="px-3 py-2 rounded-lg bg-emerald-900/40 text-emerald-300 font-mono">Input</div>
                  <span className="text-emerald-600">→</span>
                  <div className="px-3 py-2 rounded-lg bg-emerald-900/40 text-emerald-300 font-mono">Probabilistic Output</div>
                </div>
                <p className="text-xs text-emerald-600 mt-3">Non-deterministic. Requires continuous evaluation.</p>
              </div>
            </div>
          </div>

          <div className="glass rounded-2xl overflow-hidden border border-white/10">
            <div className="grid grid-cols-3 text-xs font-bold p-4 bg-white/5">
              <div className="text-slate-400">Aspect</div>
              <div className="text-slate-300">Traditional Software</div>
              <div className="text-emerald-300">LLM Application</div>
            </div>
            {testingDifferences.map((row, i) => (
              <div key={i} className={`grid grid-cols-3 text-sm p-4 border-t border-white/5 gap-3 ${i % 2 === 0 ? "" : "bg-white/[0.02]"}`}>
                <div className="flex items-center gap-2 text-slate-400 font-medium text-xs">
                  <span>{row.icon}</span>{row.aspect}
                </div>
                <div className="text-slate-400 text-xs leading-relaxed">{row.traditional}</div>
                <div className="text-slate-300 text-xs leading-relaxed">{row.llm}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Section 4.2 — Evaluation Layers ── */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-black text-white" style={{ background: gradient }}>4.2</div>
            <h2 className="text-2xl font-bold text-white">The 4 Evaluation Layers</h2>
          </div>
          <p className="text-slate-400 mb-6 text-sm">Each layer answers a different question about your AI system&apos;s quality. Click a layer to explore its metrics.</p>

          {/* Layer selector */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
            {evalLayers.map((layer, i) => (
              <button
                key={layer.id}
                onClick={() => setActiveLayer(i)}
                className="p-4 rounded-2xl border text-left transition-all duration-300 hover:scale-[1.02]"
                style={{
                  background: activeLayer === i ? `${layer.color}25` : `${layer.color}10`,
                  borderColor: activeLayer === i ? `${layer.color}70` : `${layer.color}25`,
                  boxShadow: activeLayer === i ? `0 0 25px ${layer.color}30` : "none",
                }}
              >
                <div className="text-2xl mb-2">{layer.icon}</div>
                <div className="text-xs font-bold uppercase tracking-wider mb-1" style={{ color: layer.color }}>
                  {layer.layer}
                </div>
                <div className="text-sm font-bold text-white">{layer.title}</div>
              </button>
            ))}
          </div>

          {/* Active layer detail */}
          <div
            className="rounded-2xl border overflow-hidden transition-all duration-300"
            style={{ background: `${evalLayers[activeLayer].color}08`, borderColor: `${evalLayers[activeLayer].color}30` }}
          >
            <div className="p-5 border-b" style={{ borderColor: `${evalLayers[activeLayer].color}20`, background: `${evalLayers[activeLayer].color}15` }}>
              <div className="flex items-center gap-3 mb-2">
                <span className="text-3xl">{evalLayers[activeLayer].icon}</span>
                <div>
                  <div className="text-xs font-bold uppercase tracking-widest mb-0.5" style={{ color: evalLayers[activeLayer].color }}>
                    {evalLayers[activeLayer].layer}
                  </div>
                  <h3 className="text-lg font-bold text-white">{evalLayers[activeLayer].title}</h3>
                </div>
              </div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs bg-black/20 text-slate-300">
                ❓ {evalLayers[activeLayer].question}
              </div>
            </div>

            <div className="p-5">
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-5">
                {evalLayers[activeLayer].metrics.map((metric) => (
                  <div
                    key={metric.name}
                    className="p-4 rounded-xl border"
                    style={{ background: `${evalLayers[activeLayer].color}10`, borderColor: `${evalLayers[activeLayer].color}25` }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-white text-sm">{metric.name}</span>
                      <span className="text-xs px-2 py-0.5 rounded-full font-bold" style={{ background: `${evalLayers[activeLayer].color}30`, color: evalLayers[activeLayer].color }}>
                        {metric.target}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed">{metric.desc}</p>
                  </div>
                ))}
              </div>
              <div>
                <div className="text-xs text-slate-500 uppercase tracking-wider mb-2">Recommended Tools</div>
                <div className="flex flex-wrap gap-2">
                  {evalLayers[activeLayer].tools.map((tool) => (
                    <span key={tool} className="text-xs px-3 py-1.5 rounded-xl font-medium" style={{ background: `${evalLayers[activeLayer].color}20`, color: evalLayers[activeLayer].color, border: `1px solid ${evalLayers[activeLayer].color}30` }}>
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Section 4.3 — Evaluation Techniques ── */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-black text-white" style={{ background: gradient }}>4.3</div>
            <h2 className="text-2xl font-bold text-white">Evaluation Techniques</h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {evalTechniques.map((tech) => (
              <div key={tech.name} className="rounded-2xl p-5 border hover:scale-[1.02] transition-transform" style={{ background: `${tech.color}10`, borderColor: `${tech.color}30` }}>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl" style={{ background: `${tech.color}20` }}>
                    {tech.icon}
                  </div>
                  <span className="font-bold text-white">{tech.name}</span>
                </div>
                <div className="space-y-2 text-xs">
                  <div className="flex items-start gap-2">
                    <span className="text-green-400 shrink-0 mt-0.5">✓</span>
                    <span className="text-slate-300">{tech.pro}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-red-400 shrink-0 mt-0.5">✗</span>
                    <span className="text-slate-400">{tech.con}</span>
                  </div>
                  <div className="flex items-start gap-2 mt-2 pt-2 border-t border-white/10">
                    <span className="shrink-0" style={{ color: tech.color }}>→</span>
                    <span className="text-slate-400 italic">{tech.when}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Section 4.4 — Golden Dataset ── */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-black text-white" style={{ background: gradient }}>4.4</div>
            <h2 className="text-2xl font-bold text-white">Building an Evaluation Dataset</h2>
          </div>
          <p className="text-slate-400 mb-6 text-sm">A golden dataset covers diverse categories — not just happy paths. Every category tests a different failure mode.</p>

          <div className="glass rounded-2xl overflow-hidden border border-white/10">
            <div className="grid grid-cols-5 text-xs font-bold p-3 bg-white/5 text-slate-400 uppercase tracking-wider">
              <div className="col-span-2">Query</div>
              <div>Context</div>
              <div>Expected Behavior</div>
              <div>Difficulty</div>
            </div>
            {goldenDataset.map((row, i) => {
              const diffColors: Record<string, string> = { Easy: "#34d399", Medium: "#fbbf24", Hard: "#f472b6" };
              const catColors: Record<string, string> = {
                Factual: "#818cf8", Procedural: "#60a5fa", Unknown: "#94a3b8",
                "Out-of-scope": "#fb923c", Security: "#f87171", "Multi-source": "#a78bfa",
              };
              return (
                <div key={i} className={`grid grid-cols-5 text-sm p-3 border-t border-white/5 gap-2 ${i % 2 === 0 ? "" : "bg-white/[0.02]"}`}>
                  <div className="col-span-2">
                    <span className="text-xs px-2 py-0.5 rounded-full mr-2" style={{ background: `${catColors[row.category]}20`, color: catColors[row.category] }}>
                      {row.category}
                    </span>
                    <span className="text-slate-300 text-xs">{row.query}</span>
                  </div>
                  <div className="text-slate-400 text-xs">{row.context}</div>
                  <div className="text-slate-300 text-xs">{row.expectedBehavior}</div>
                  <div>
                    <span className="text-xs px-2 py-0.5 rounded-full font-medium" style={{ background: `${diffColors[row.difficulty]}20`, color: diffColors[row.difficulty] }}>
                      {row.difficulty}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ── Section 4.5 — Interactive Evaluation Simulator ── */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-black text-white" style={{ background: gradient }}>4.5</div>
            <h2 className="text-2xl font-bold text-white">Live Evaluation Simulator</h2>
          </div>
          <p className="text-slate-400 mb-6 text-sm">
            Click <strong className="text-white">Run Evaluator</strong> on each row to score the LLM response. One response contains a hallucination — can you spot it?
          </p>

          <div className="space-y-4">
            {scorerQuestions.map((q) => {
              const s = scores[q.id];
              const done = evaluated[q.id];
              return (
                <div key={q.id} className="glass rounded-2xl border border-white/10 overflow-hidden">
                  <div className="p-5">
                    <div className="grid lg:grid-cols-3 gap-4 mb-4">
                      <div className="rounded-xl p-3 bg-blue-500/10 border border-blue-500/20">
                        <div className="text-xs font-bold text-blue-300 mb-2 uppercase tracking-wider">📨 Query</div>
                        <p className="text-sm text-slate-300">{q.query}</p>
                      </div>
                      <div className="rounded-xl p-3 bg-purple-500/10 border border-purple-500/20">
                        <div className="text-xs font-bold text-purple-300 mb-2 uppercase tracking-wider">📄 Retrieved Context</div>
                        <p className="text-xs text-slate-300 leading-relaxed">{q.retrieved}</p>
                      </div>
                      <div className="rounded-xl p-3 bg-emerald-500/10 border border-emerald-500/20">
                        <div className="text-xs font-bold text-emerald-300 mb-2 uppercase tracking-wider">💬 LLM Response</div>
                        <p className="text-sm text-slate-300">{q.response}</p>
                      </div>
                    </div>

                    {!done ? (
                      <button
                        onClick={() => evaluateQuestion(q.id, q)}
                        className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-all duration-200 hover:scale-105"
                        style={{ background: gradient }}
                      >
                        ▶ Run Evaluator
                      </button>
                    ) : (
                      <div className="space-y-3">
                        <div className="grid grid-cols-3 gap-3">
                          {(["faithfulness", "relevance", "correctness"] as const).map((metric) => {
                            const val = s[metric];
                            const col = getScoreColor(val);
                            return (
                              <div key={metric} className="rounded-xl p-3 text-center border" style={{ background: `${col}10`, borderColor: `${col}30` }}>
                                <div className="text-xs text-slate-400 uppercase tracking-wider mb-1">{metric}</div>
                                <div className="text-2xl font-black mb-1" style={{ color: col }}>{val.toFixed(2)}</div>
                                <div className="text-xs font-semibold" style={{ color: col }}>{getScoreLabel(val)}</div>
                                {/* Score bar */}
                                <div className="mt-2 h-1.5 rounded-full bg-white/10 overflow-hidden">
                                  <div className="h-full rounded-full transition-all duration-700" style={{ width: `${val * 100}%`, background: col }} />
                                </div>
                              </div>
                            );
                          })}
                        </div>
                        {q.id === "q3" && (
                          <div className="flex items-start gap-3 p-4 rounded-xl bg-red-500/10 border border-red-500/30">
                            <span className="text-xl shrink-0">🚨</span>
                            <div>
                              <div className="font-bold text-red-300 text-sm mb-1">Hallucination Detected!</div>
                              <p className="text-xs text-slate-300">
                                The context says <strong className="text-white">15 days after 1 year of service</strong>, but the response says <strong className="text-red-300">20 vacation days</strong>. The LLM fabricated a different number not present in the retrieved context. This would fail the faithfulness gate.
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {Object.keys(evaluated).length === scorerQuestions.length && (
            <div className="mt-4 p-5 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 flex items-center gap-3">
              <span className="text-3xl">🎉</span>
              <div>
                <div className="font-bold text-emerald-300">Evaluation Complete!</div>
                <p className="text-sm text-slate-300">
                  2/3 responses passed all gates. Query 3 would block the release — the CI/CD pipeline would fail and trigger an alert.
                </p>
              </div>
            </div>
          )}
        </section>

        {/* ── Hands-on Exercise ── */}
        <section>
          <HandsOnExercise
            title="Create a Mini Evaluation Pipeline"
            description="Build a complete evaluation pipeline for a RAG-based application using RAGAS metrics and golden dataset testing."
            gradient={gradient}
            steps={[
              "Define 10 test cases covering: factual, procedural, unknown, out-of-scope, and adversarial queries",
              "For each case, specify: query, expected retrieved context, expected response behavior",
              "Set up RAGAS evaluation with metrics: faithfulness, answer_relevancy, context_precision",
              "Define your quality thresholds: faithfulness ≥ 0.85, relevance ≥ 0.80, precision ≥ 0.75",
              "Write a Python script that runs the eval and exits with code 1 if any threshold is not met",
              "Add an LLM-as-a-judge check for out-of-scope and refusal behavior",
              "Integrate the evaluation script into your CI/CD pipeline as a blocking gate",
            ]}
            hint="Use GPT-4o-mini as your judge for cost efficiency — it's about 10x cheaper than GPT-4o with comparable judgment quality for most evaluation tasks."
            solution={`# evaluation/run_eval.py
from ragas import evaluate
from ragas.metrics import (
    faithfulness,
    answer_relevancy,
    context_precision,
)
from datasets import Dataset

# Load your test dataset
data = {
    "question": [
        "What is the PTO policy?",
        "How do I reset my password?",
    ],
    "contexts": [
        ["Section 3: Employees receive 15 days PTO..."],
        ["IT Policy: Visit portal.company.com/reset"],
    ],
    "answer": [
        "You receive 15 days of PTO per year.",
        "Visit portal.company.com/reset to reset your password.",
    ],
    "ground_truth": [
        "15 days PTO per year after 1 year",
        "Use the IT portal to reset passwords",
    ],
}

dataset = Dataset.from_dict(data)

# Run evaluation
result = evaluate(
    dataset=dataset,
    metrics=[faithfulness, answer_relevancy, context_precision],
)

print("Faithfulness:      " + str(round(result['faithfulness'], 3)))
print("Answer Relevancy:  " + str(round(result['answer_relevancy'], 3)))
print("Context Precision: " + str(round(result['context_precision'], 3)))

# Quality gates — fail CI/CD if thresholds not met
thresholds = {
    "faithfulness": 0.85,
    "answer_relevancy": 0.80,
    "context_precision": 0.75,
}

failed = []
for metric, threshold in thresholds.items():
    if result[metric] < threshold:
        failed.append(metric + ": " + str(round(result[metric], 3)) + " < " + str(threshold))

if failed:
    print("\\n❌ QUALITY GATE FAILED:")
    for msg in failed:
        print("  " + msg)
    exit(1)  # Blocks CI/CD pipeline

print("\\n✅ All quality gates passed!")`}
          />
        </section>

      </div>
    </ModuleLayout>
  );
}
