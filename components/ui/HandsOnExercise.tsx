"use client";

import { useState } from "react";

interface HandsOnExerciseProps {
  title: string;
  description: string;
  steps: string[];
  hint?: string;
  solution?: string;
  gradient: string;
}

export default function HandsOnExercise({
  title,
  description,
  steps,
  hint,
  solution,
  gradient,
}: HandsOnExerciseProps) {
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());
  const [showHint, setShowHint] = useState(false);
  const [showSolution, setShowSolution] = useState(false);

  const toggleStep = (i: number) => {
    const next = new Set(completedSteps);
    if (next.has(i)) next.delete(i);
    else next.add(i);
    setCompletedSteps(next);
  };

  const progress = Math.round((completedSteps.size / steps.length) * 100);

  return (
    <div
      className="rounded-2xl overflow-hidden border border-white/10"
      style={{ background: "rgba(0,0,0,0.3)" }}
    >
      {/* Header */}
      <div
        className="p-5 flex items-center justify-between"
        style={{ background: gradient, opacity: 0.9 }}
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-black/20 flex items-center justify-center text-xl">
            🛠️
          </div>
          <div>
            <div className="text-xs font-bold uppercase tracking-widest text-white/70 mb-0.5">
              Hands-on Exercise
            </div>
            <h3 className="text-lg font-bold text-white">{title}</h3>
          </div>
        </div>
        <div className="text-right">
          <div className="text-2xl font-black text-white">{progress}%</div>
          <div className="text-xs text-white/70">Complete</div>
        </div>
      </div>

      <div className="p-5 space-y-4">
        {/* Description */}
        <p className="text-slate-300 text-sm leading-relaxed">{description}</p>

        {/* Steps checklist */}
        <div className="space-y-2">
          {steps.map((step, i) => (
            <button
              key={i}
              onClick={() => toggleStep(i)}
              className="w-full flex items-start gap-3 p-3 rounded-xl text-left transition-all duration-200 hover:bg-white/5"
            >
              <div
                className={`mt-0.5 w-5 h-5 rounded-md border-2 flex items-center justify-center shrink-0 transition-all duration-200 ${
                  completedSteps.has(i)
                    ? "border-green-400 bg-green-400"
                    : "border-white/30"
                }`}
              >
                {completedSteps.has(i) && (
                  <svg className="w-3 h-3 text-black" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </div>
              <span
                className={`text-sm transition-colors ${
                  completedSteps.has(i)
                    ? "line-through text-slate-500"
                    : "text-slate-300"
                }`}
              >
                {step}
              </span>
            </button>
          ))}
        </div>

        {/* Progress bar */}
        <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{ width: `${progress}%`, background: gradient }}
          />
        </div>

        {/* Actions */}
        <div className="flex gap-3 flex-wrap">
          {hint && (
            <button
              onClick={() => setShowHint(!showHint)}
              className="text-sm px-4 py-2 rounded-xl glass glass-hover text-yellow-300 border border-yellow-500/30"
            >
              💡 {showHint ? "Hide Hint" : "Show Hint"}
            </button>
          )}
          {solution && (
            <button
              onClick={() => setShowSolution(!showSolution)}
              className="text-sm px-4 py-2 rounded-xl glass glass-hover text-indigo-300 border border-indigo-500/30"
            >
              🔑 {showSolution ? "Hide Solution" : "View Solution"}
            </button>
          )}
          {completedSteps.size === steps.length && (
            <span className="text-sm px-4 py-2 rounded-xl bg-green-500/20 text-green-300 border border-green-500/30 flex items-center gap-2">
              ✅ Exercise Complete!
            </span>
          )}
        </div>

        {showHint && hint && (
          <div className="p-4 rounded-xl bg-yellow-500/10 border border-yellow-500/20">
            <p className="text-sm text-yellow-200 leading-relaxed">💡 {hint}</p>
          </div>
        )}

        {showSolution && solution && (
          <div className="p-4 rounded-xl bg-indigo-500/10 border border-indigo-500/20">
            <pre className="text-xs text-indigo-200 leading-relaxed whitespace-pre-wrap font-mono">
              {solution}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}
