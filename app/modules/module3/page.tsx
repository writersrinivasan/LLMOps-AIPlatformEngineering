"use client";

import { useState } from "react";
import ModuleLayout from "@/components/ui/ModuleLayout";
import InfoCard from "@/components/ui/InfoCard";
import HandsOnExercise from "@/components/ui/HandsOnExercise";

const gradient = "linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%)";

/* ── Traditional vs AI CI/CD comparison ── */
const cicdComparison = [
  { traditional: "Code", ai: "Code + Prompt + Model + Data + Context + Tools" },
  { traditional: "Unit Tests", ai: "Unit Tests + LLM Evaluation + Safety Checks" },
  { traditional: "Build artifact", ai: "Container + Prompt Config + Model Config" },
  { traditional: "Deploy service", ai: "Deploy service + Prompt version + Model version" },
  { traditional: "Monitor errors", ai: "Monitor quality, cost, latency, hallucinations" },
  { traditional: "Rollback code", ai: "Rollback code OR prompt OR model independently" },
];

/* ── AI CI/CD Pipeline stages ── */
const pipelineStages = [
  {
    id: "source",
    icon: "📁",
    label: "Source Control",
    color: "#818cf8",
    details: [
      "Code commits trigger pipeline",
      "Prompt changes tracked in Git",
      "Dataset versions as Git LFS or DVC",
      "Config via YAML / JSON",
    ],
    code: `# .github/workflows/ai-release.yml
on:
  push:
    paths:
      - 'src/**'
      - 'prompts/**'
      - 'configs/**'`,
  },
  {
    id: "test",
    icon: "🧪",
    label: "Unit & Integration Tests",
    color: "#60a5fa",
    details: [
      "Prompt template validation",
      "Schema & type checks",
      "Mock LLM response tests",
      "Tool integration tests",
    ],
    code: `# Test prompt template renders correctly
def test_prompt_renders():
    prompt = PromptTemplate.load("hr-v2.1")
    result = prompt.render(user_query="What is PTO?")
    assert "{{" not in result  # no unfilled vars`,
  },
  {
    id: "eval",
    icon: "📐",
    label: "LLM Evaluation Gate",
    color: "#34d399",
    details: [
      "Run against golden dataset",
      "Faithfulness ≥ 0.85",
      "Relevance ≥ 0.80",
      "Hallucination rate < 5%",
    ],
    code: `# evaluation gate — fail pipeline if score drops
ragas_scores = evaluate(
    dataset=golden_dataset,
    metrics=[faithfulness, answer_relevancy]
)
assert ragas_scores["faithfulness"] >= 0.85, \
    "Faithfulness gate failed!"`,
  },
  {
    id: "security",
    icon: "🔐",
    label: "Security Scanning",
    color: "#f472b6",
    details: [
      "Container image vulnerability scan",
      "Prompt injection test suite",
      "PII leakage detection",
      "Secrets scanning",
    ],
    code: `# Scan for PII leakage in LLM responses
results = pii_scanner.scan(test_responses)
assert results.leakage_rate == 0, \
    "PII detected: " + str(results.findings)`,
  },
  {
    id: "build",
    icon: "📦",
    label: "Container Build",
    color: "#fb923c",
    details: [
      "Docker image with pinned deps",
      "Embed prompt configs",
      "Model endpoint config",
      "Push to container registry",
    ],
    code: `FROM python:3.11-slim
COPY prompts/ /app/prompts/
COPY configs/ /app/configs/
RUN pip install -r requirements.txt
ENV PROMPT_VERSION=v2.1.0
ENV MODEL_CONFIG=gpt4o-production`,
  },
  {
    id: "deploy",
    icon: "🚀",
    label: "Deployment",
    color: "#a78bfa",
    details: [
      "Canary: 10% → 50% → 100%",
      "Prompt rollout independent",
      "Feature flags per tenant",
      "Automated smoke tests",
    ],
    code: `# ArgoCD canary rollout
strategy:
  canary:
    steps:
      - setWeight: 10
      - pause: {duration: 5m}
      - setWeight: 50
      - pause: {duration: 10m}
      - setWeight: 100`,
  },
  {
    id: "observe",
    icon: "📊",
    label: "Observability",
    color: "#fbbf24",
    details: [
      "LLM tracing via OpenTelemetry",
      "Quality metrics dashboard",
      "Cost per deployment alert",
      "Auto-rollback on degradation",
    ],
    code: `# Auto-rollback trigger
if metrics.faithfulness_p50 < 0.75:
    deployment.rollback()
    alert.send("Quality degradation detected")`,
  },
];

/* ── Deployment strategies ── */
const deploymentStrategies = [
  {
    name: "Blue / Green",
    icon: "🔵🟢",
    color: "#34d399",
    description: "Two identical environments. Instant switch with instant rollback.",
    flow: ["Blue (current)", "Deploy to Green", "Smoke tests pass", "Switch traffic 100%", "Blue becomes standby"],
    useCase: "Zero-downtime releases for stable model + prompt combos",
    risk: "Low",
    speed: "Fast",
  },
  {
    name: "Canary",
    icon: "🐤",
    color: "#fbbf24",
    description: "Gradually shift traffic to new version while monitoring quality metrics.",
    flow: ["Deploy new version", "Route 5% traffic", "Monitor quality", "Increase to 25%", "Promote to 100%"],
    useCase: "Model upgrades, major prompt changes, new features",
    risk: "Very Low",
    speed: "Slow (days)",
  },
  {
    name: "Shadow",
    icon: "👥",
    color: "#818cf8",
    description: "New version receives mirrored traffic but responses are discarded — pure evaluation.",
    flow: ["Clone requests", "Send to shadow", "Capture responses", "Compare vs prod", "Promote if better"],
    useCase: "Evaluating a new model without any user impact",
    risk: "Zero",
    speed: "N/A (offline)",
  },
  {
    name: "A/B Testing",
    icon: "🔀",
    color: "#f472b6",
    description: "Different user segments get different versions to compare business metrics.",
    flow: ["Define user cohorts", "Route A → version 1", "Route B → version 2", "Measure KPIs", "Promote winner"],
    useCase: "Comparing prompt variants for user engagement / satisfaction",
    risk: "Medium",
    speed: "Weeks",
  },
];

/* ── Infrastructure options ── */
const infraOptions = [
  { icon: "🐳", title: "Containers", items: ["Reproducible environments", "Prompt configs bundled", "Fast cold starts", "Multi-arch support"], color: "#60a5fa", bg: "rgba(96,165,250,0.08)" },
  { icon: "☸️", title: "Kubernetes", items: ["Auto-scaling inference", "Rolling deployments", "GPU node pools", "Health checks & probes"], color: "#818cf8", bg: "rgba(99,102,241,0.08)" },
  { icon: "⚡", title: "Serverless", items: ["AWS Lambda / Cloud Run", "Pay-per-request pricing", "Zero idle cost", "Cold-start trade-offs"], color: "#34d399", bg: "rgba(52,211,153,0.08)" },
  { icon: "🔲", title: "GPU Infra", items: ["A100 / H100 for fine-tuning", "T4 / L4 for inference", "Spot instances for batch", "MIG for multi-tenancy"], color: "#f472b6", bg: "rgba(244,114,182,0.08)" },
];

export default function Module3() {
  const [activeStage, setActiveStage] = useState(0);
  const [activeStrategy, setActiveStrategy] = useState(0);
  const [showCode, setShowCode] = useState(false);

  return (
    <ModuleLayout
      moduleNumber={3}
      title="AI Application CI/CD & Deployment Engineering"
      duration="60 minutes"
      gradient={gradient}
      description="Build production-grade AI release pipelines. Learn how CI/CD must evolve beyond code to orchestrate prompts, models, data, and evaluation gates."
      prevHref="/modules/module2"
      prevLabel="LLMOps Architecture"
      nextHref="/modules/module4"
      nextLabel="Evaluation & Testing"
    >
      <div className="space-y-16">

        {/* ── Section 3.1 — Why Traditional CI/CD Is Not Enough ── */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-black text-white" style={{ background: gradient }}>3.1</div>
            <h2 className="text-2xl font-bold text-white">Why Traditional CI/CD Is Not Enough</h2>
          </div>

          <div className="glass rounded-2xl overflow-hidden border border-white/10 mb-6">
            <div className="grid grid-cols-2 text-sm font-bold">
              <div className="p-4 text-slate-400 bg-white/5 flex items-center gap-2">
                <span>⚙️</span> Traditional CI/CD
              </div>
              <div className="p-4 text-blue-300 bg-blue-500/10 border-l border-white/10 flex items-center gap-2">
                <span>🧠</span> AI Application CI/CD
              </div>
            </div>
            {cicdComparison.map((row, i) => (
              <div key={i} className={`grid grid-cols-2 text-sm border-t border-white/5 ${i % 2 === 0 ? "" : "bg-white/[0.02]"}`}>
                <div className="p-4 text-slate-400 flex items-center gap-2">
                  <span className="text-green-400">✓</span> {row.traditional}
                </div>
                <div className="p-4 text-slate-300 border-l border-white/5 flex items-start gap-2">
                  <span className="text-blue-400 shrink-0 mt-0.5">+</span> {row.ai}
                </div>
              </div>
            ))}
          </div>

          {/* Key insight */}
          <div className="p-5 rounded-2xl border border-blue-500/30 bg-blue-500/10">
            <div className="flex items-start gap-3">
              <span className="text-2xl">💡</span>
              <div>
                <h4 className="font-bold text-blue-300 mb-1">The AI Release Unit</h4>
                <p className="text-slate-300 text-sm leading-relaxed">
                  In traditional software, you release a <strong className="text-white">code artifact</strong>. In AI, you release a <strong className="text-white">configuration bundle</strong> — code + prompt version + model config + evaluation result. All four must be versioned and releasable independently.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── Section 3.2 — Interactive Pipeline Builder ── */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-black text-white" style={{ background: gradient }}>3.2</div>
            <h2 className="text-2xl font-bold text-white">AI / LLM CI/CD Pipeline</h2>
          </div>
          <p className="text-slate-400 mb-6 text-sm">Click each stage to explore its purpose and see example code.</p>

          {/* Pipeline visual flow */}
          <div className="glass rounded-2xl p-6 border border-white/10 mb-6">
            <div className="flex flex-wrap gap-2 items-center justify-center">
              {pipelineStages.map((stage, i) => (
                <div key={stage.id} className="flex items-center gap-2">
                  <button
                    onClick={() => setActiveStage(i)}
                    className="flex flex-col items-center gap-2 px-4 py-3 rounded-2xl border transition-all duration-300 min-w-[90px] hover:scale-105"
                    style={{
                      background: activeStage === i ? `${stage.color}30` : `${stage.color}10`,
                      borderColor: activeStage === i ? `${stage.color}80` : `${stage.color}25`,
                      boxShadow: activeStage === i ? `0 0 20px ${stage.color}40` : "none",
                    }}
                  >
                    <span className="text-2xl">{stage.icon}</span>
                    <span className="text-xs font-semibold text-white text-center leading-tight">{stage.label}</span>
                    {activeStage === i && (
                      <div className="w-1.5 h-1.5 rounded-full pulse-dot" style={{ background: stage.color }} />
                    )}
                  </button>
                  {i < pipelineStages.length - 1 && (
                    <div className="text-slate-600 text-xl hidden sm:block">→</div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Stage detail panel */}
          <div
            className="rounded-2xl border overflow-hidden transition-all duration-300"
            style={{
              background: `${pipelineStages[activeStage].color}10`,
              borderColor: `${pipelineStages[activeStage].color}35`,
            }}
          >
            <div
              className="p-5 flex items-center justify-between"
              style={{ background: `${pipelineStages[activeStage].color}20`, borderBottom: `1px solid ${pipelineStages[activeStage].color}30` }}
            >
              <div className="flex items-center gap-3">
                <span className="text-3xl">{pipelineStages[activeStage].icon}</span>
                <div>
                  <div className="text-xs font-bold uppercase tracking-widest mb-0.5" style={{ color: pipelineStages[activeStage].color }}>
                    Stage {activeStage + 1} of {pipelineStages.length}
                  </div>
                  <h3 className="text-lg font-bold text-white">{pipelineStages[activeStage].label}</h3>
                </div>
              </div>
              <button
                onClick={() => setShowCode(!showCode)}
                className="text-xs px-3 py-2 rounded-xl transition-all"
                style={{
                  background: showCode ? `${pipelineStages[activeStage].color}40` : `${pipelineStages[activeStage].color}20`,
                  color: pipelineStages[activeStage].color,
                  border: `1px solid ${pipelineStages[activeStage].color}40`,
                }}
              >
                {showCode ? "📋 Details" : "💻 Code"}
              </button>
            </div>

            <div className="p-5">
              {!showCode ? (
                <div className="grid sm:grid-cols-2 gap-3">
                  {pipelineStages[activeStage].details.map((d, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 rounded-xl" style={{ background: `${pipelineStages[activeStage].color}12` }}>
                      <div className="w-2 h-2 rounded-full shrink-0" style={{ background: pipelineStages[activeStage].color }} />
                      <span className="text-sm text-slate-300">{d}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <pre className="code-block text-xs leading-relaxed overflow-x-auto">
                  {pipelineStages[activeStage].code}
                </pre>
              )}

              {/* Navigation */}
              <div className="flex justify-between mt-4">
                <button
                  onClick={() => setActiveStage(Math.max(0, activeStage - 1))}
                  disabled={activeStage === 0}
                  className="text-xs px-3 py-2 rounded-xl glass glass-hover disabled:opacity-30 text-slate-300"
                >
                  ← Previous Stage
                </button>
                <button
                  onClick={() => setActiveStage(Math.min(pipelineStages.length - 1, activeStage + 1))}
                  disabled={activeStage === pipelineStages.length - 1}
                  className="text-xs px-3 py-2 rounded-xl glass glass-hover disabled:opacity-30 text-slate-300"
                >
                  Next Stage →
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ── Section 3.3 — Git-Based AI Dev ── */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-black text-white" style={{ background: gradient }}>3.3</div>
            <h2 className="text-2xl font-bold text-white">Git-Based AI Development</h2>
          </div>

          <div className="glass rounded-2xl p-6 border border-white/10 mb-6">
            <h4 className="text-white font-semibold mb-4">📁 Recommended Repo Structure</h4>
            <pre className="code-block text-xs leading-relaxed">{`my-ai-app/
├── src/                      # Application code
│   ├── api/
│   └── services/
├── prompts/                  # Versioned prompt templates
│   ├── hr-assistant/
│   │   ├── v1.0.0.yaml
│   │   ├── v2.1.0.yaml       ← current production
│   │   └── v3.0.0-beta.yaml  ← canary
├── configs/                  # Model + env configs
│   ├── production.yaml
│   └── staging.yaml
├── evaluation/               # Eval datasets + scripts
│   ├── datasets/
│   │   ├── hr-golden-v1.json
│   │   └── hr-golden-v2.json
│   └── run_eval.py
├── .github/
│   └── workflows/
│       └── ai-release.yml    # CI/CD pipeline
└── docker/
    └── Dockerfile`}</pre>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {[
              { icon: "📝", label: "Git for Prompts", desc: "Versioned templates as YAML files", color: "#818cf8" },
              { icon: "⚙️", label: "Git for Config", desc: "Model configs per environment", color: "#60a5fa" },
              { icon: "📊", label: "Git for Datasets", desc: "Eval datasets via Git LFS / DVC", color: "#34d399" },
              { icon: "💻", label: "Git for Code", desc: "Orchestration & business logic", color: "#f472b6" },
              { icon: "🔢", label: "Semantic Versioning", desc: "Coordinate all artifact versions", color: "#fbbf24" },
            ].map((item) => (
              <div key={item.label} className="rounded-xl p-4 border text-center hover:scale-105 transition-transform duration-200" style={{ background: `${item.color}12`, borderColor: `${item.color}30` }}>
                <div className="text-2xl mb-2">{item.icon}</div>
                <div className="font-semibold text-white text-xs mb-1">{item.label}</div>
                <div className="text-xs text-slate-400">{item.desc}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Section 3.4 — Eval gates ── */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-black text-white" style={{ background: gradient }}>3.4</div>
            <h2 className="text-2xl font-bold text-white">Automated Evaluation Gates</h2>
          </div>
          <p className="text-slate-400 mb-6 text-sm">Every gate that fails <strong className="text-red-400">blocks the release</strong> until addressed.</p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { gate: "Answer Correctness", threshold: "≥ 0.85", icon: "✅", color: "#34d399", desc: "Response matches the expected answer from golden dataset" },
              { gate: "Relevance", threshold: "≥ 0.80", icon: "🎯", color: "#60a5fa", desc: "Answer is relevant to the user's question" },
              { gate: "Groundedness", threshold: "≥ 0.85", icon: "📌", color: "#818cf8", desc: "Claims in the answer are grounded in the retrieved context" },
              { gate: "Hallucination Rate", threshold: "< 5%", icon: "🚨", color: "#f472b6", desc: "LLM did not fabricate facts not present in context" },
              { gate: "Toxicity", threshold: "< 0.1%", icon: "🛡️", color: "#fb923c", desc: "Output contains no harmful or toxic content" },
              { gate: "PII Leakage", threshold: "0 instances", icon: "🔒", color: "#fbbf24", desc: "No personally identifiable information in responses" },
              { gate: "Tool-call Accuracy", threshold: "≥ 0.90", icon: "🔧", color: "#a78bfa", desc: "Agent selects the correct tool for each task" },
              { gate: "Structured Output", threshold: "100% valid", icon: "📋", color: "#4ade80", desc: "JSON / schema outputs parse successfully" },
            ].map((gate) => (
              <div key={gate.gate} className="rounded-xl p-4 border hover:scale-[1.02] transition-transform" style={{ background: `${gate.color}10`, borderColor: `${gate.color}30` }}>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xl">{gate.icon}</span>
                  <span className="text-xs font-bold px-2 py-1 rounded-full" style={{ background: `${gate.color}25`, color: gate.color }}>
                    {gate.threshold}
                  </span>
                </div>
                <div className="font-semibold text-white text-sm mb-1">{gate.gate}</div>
                <div className="text-xs text-slate-400 leading-relaxed">{gate.desc}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Section 3.5 — Deployment Strategies ── */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-black text-white" style={{ background: gradient }}>3.5</div>
            <h2 className="text-2xl font-bold text-white">Deployment Strategies</h2>
          </div>

          {/* Strategy selector */}
          <div className="flex flex-wrap gap-2 mb-6">
            {deploymentStrategies.map((s, i) => (
              <button
                key={s.name}
                onClick={() => setActiveStrategy(i)}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300"
                style={
                  activeStrategy === i
                    ? { background: s.color, color: "white", boxShadow: `0 0 20px ${s.color}50` }
                    : { background: `${s.color}15`, color: s.color, border: `1px solid ${s.color}30` }
                }
              >
                <span>{s.icon}</span> {s.name}
              </button>
            ))}
          </div>

          {/* Strategy detail */}
          <div
            className="rounded-2xl p-6 border transition-all duration-300"
            style={{
              background: `${deploymentStrategies[activeStrategy].color}10`,
              borderColor: `${deploymentStrategies[activeStrategy].color}35`,
            }}
          >
            <div className="flex items-start justify-between gap-4 mb-6 flex-wrap">
              <div>
                <h3 className="text-xl font-bold text-white mb-1">
                  {deploymentStrategies[activeStrategy].icon} {deploymentStrategies[activeStrategy].name}
                </h3>
                <p className="text-slate-300 text-sm">{deploymentStrategies[activeStrategy].description}</p>
              </div>
              <div className="flex gap-3">
                <div className="text-center px-4 py-2 rounded-xl" style={{ background: `${deploymentStrategies[activeStrategy].color}20` }}>
                  <div className="text-xs text-slate-400 mb-1">Risk</div>
                  <div className="font-bold text-sm text-white">{deploymentStrategies[activeStrategy].risk}</div>
                </div>
                <div className="text-center px-4 py-2 rounded-xl" style={{ background: `${deploymentStrategies[activeStrategy].color}20` }}>
                  <div className="text-xs text-slate-400 mb-1">Speed</div>
                  <div className="font-bold text-sm text-white">{deploymentStrategies[activeStrategy].speed}</div>
                </div>
              </div>
            </div>

            {/* Flow diagram */}
            <div className="mb-4">
              <div className="text-xs text-slate-500 uppercase tracking-wider mb-3">Deployment Flow</div>
              <div className="flex flex-wrap items-center gap-2">
                {deploymentStrategies[activeStrategy].flow.map((step, i, arr) => (
                  <div key={step} className="flex items-center gap-2">
                    <div
                      className="px-3 py-2 rounded-xl text-xs font-medium"
                      style={{ background: `${deploymentStrategies[activeStrategy].color}20`, color: deploymentStrategies[activeStrategy].color }}
                    >
                      {step}
                    </div>
                    {i < arr.length - 1 && <span className="text-slate-600">→</span>}
                  </div>
                ))}
              </div>
            </div>

            <div className="p-3 rounded-xl" style={{ background: `${deploymentStrategies[activeStrategy].color}15` }}>
              <span className="text-xs text-slate-400">Best for: </span>
              <span className="text-xs text-white">{deploymentStrategies[activeStrategy].useCase}</span>
            </div>
          </div>
        </section>

        {/* ── Section 3.6 — Infrastructure ── */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-black text-white" style={{ background: gradient }}>3.6</div>
            <h2 className="text-2xl font-bold text-white">Infrastructure for AI Applications</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {infraOptions.map((opt) => (
              <InfoCard key={opt.title} {...opt} bgColor={opt.bg} />
            ))}
          </div>
        </section>

        {/* ── Hands-on Exercise ── */}
        <section>
          <HandsOnExercise
            title="Build an AI CI/CD Pipeline"
            description="Design a complete CI/CD pipeline for an AI application that includes evaluation gates, prompt versioning, and canary deployment."
            gradient={gradient}
            steps={[
              "Define the Git repo structure: where do prompts, configs, and evaluation datasets live?",
              "Write a GitHub Actions trigger that fires on changes to src/, prompts/, and configs/",
              "Add unit test step: validate prompt templates render correctly with no unfilled variables",
              "Add LLM evaluation gate: run RAGAS on golden dataset, fail if faithfulness < 0.85",
              "Add security step: scan for PII leakage and prompt injection vulnerabilities",
              "Define a Docker build step that bundles prompt version into the container",
              "Configure a canary deployment: 10% → 50% → 100% with 5-minute observation windows",
              "Add an auto-rollback rule: if faithfulness drops below 0.75 in production, roll back automatically",
            ]}
            hint="Think about what triggers a rollback vs. what triggers an alert. Not every metric drop needs a rollback — sometimes you want a human to investigate first."
            solution={`# .github/workflows/ai-release.yml
name: AI Release Pipeline
on:
  push:
    branches: [main]
    paths: ['src/**', 'prompts/**', 'configs/**']

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Unit Tests
        run: pytest tests/ -v
      
      - name: Validate Prompts
        run: python scripts/validate_prompts.py

  evaluate:
    needs: test
    steps:
      - name: Run RAGAS Evaluation
        run: |
          python evaluation/run_eval.py \\
            --dataset evaluation/datasets/golden-v2.json \\
            --threshold-faithfulness 0.85 \\
            --threshold-relevance 0.80
        # exits non-zero (fails pipeline) if thresholds not met

  security:
    needs: test
    steps:
      - name: PII Scan
        run: python security/pii_scan.py
      - name: Prompt Injection Tests
        run: pytest security/injection_tests/ -v

  build:
    needs: [evaluate, security]
    steps:
      - name: Build & Push Container
        run: |
          docker build \\
            --build-arg PROMPT_VERSION=\${{ env.PROMPT_VERSION }} \\
            -t registry/hr-app:\${{ github.sha }} .
          docker push registry/hr-app:\${{ github.sha }}

  deploy:
    needs: build
    steps:
      - name: Canary Deploy (10%)
        run: kubectl apply -f k8s/canary-10.yaml
      - name: Wait & Observe
        run: sleep 300  # 5 minutes
      - name: Check Quality Gates
        run: python scripts/check_production_quality.py --min-faithfulness 0.80
      - name: Full Rollout
        run: kubectl apply -f k8s/full-rollout.yaml`}
          />
        </section>

      </div>
    </ModuleLayout>
  );
}
