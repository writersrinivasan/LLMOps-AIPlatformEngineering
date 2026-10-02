"use client";

import { useEffect, useRef } from "react";

export type AgentStage =
  | "idle"
  | "classifier"
  | "retriever"
  | "builder"
  | "llm"
  | "formatter"
  | "streaming"
  | "done";

interface Stage {
  id: AgentStage;
  label: string;
  icon: string;
  color: string;
  glow: string;
  description: string;
}

const STAGES: Stage[] = [
  {
    id: "classifier",
    label: "Query Classifier",
    icon: "🔍",
    color: "#818cf8",
    glow: "rgba(129,140,248,0.5)",
    description: "Analysing intent & topic scope",
  },
  {
    id: "retriever",
    label: "Knowledge Retriever",
    icon: "📚",
    color: "#60a5fa",
    glow: "rgba(96,165,250,0.5)",
    description: "Searching LLMOps knowledge base",
  },
  {
    id: "builder",
    label: "Context Builder",
    icon: "🏗️",
    color: "#34d399",
    glow: "rgba(52,211,153,0.5)",
    description: "Assembling relevant context",
  },
  {
    id: "llm",
    label: "GROQ LLM",
    icon: "🧠",
    color: "#a78bfa",
    glow: "rgba(167,139,250,0.5)",
    description: "qwen/qwen3.8-27b generating response",
  },
  {
    id: "formatter",
    label: "Response Formatter",
    icon: "✨",
    color: "#f472b6",
    glow: "rgba(244,114,182,0.5)",
    description: "Structuring & validating output",
  },
];

interface Props {
  activeStage: AgentStage;
  completedStages: AgentStage[];
}

/* ── Orbiting particle canvas ── */
function OrbitalCanvas({
  color,
  active,
}: {
  color: string;
  active: boolean;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const particles = useRef<
    { angle: number; radius: number; speed: number; size: number; opacity: number }[]
  >([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const W = canvas.width;
    const H = canvas.height;
    const cx = W / 2;
    const cy = H / 2;

    // Init particles
    particles.current = Array.from({ length: 8 }, (_, i) => ({
      angle: (i / 8) * Math.PI * 2,
      radius: 18 + Math.random() * 8,
      speed: (0.02 + Math.random() * 0.03) * (active ? 1 : 0.1),
      size: 1.5 + Math.random() * 1.5,
      opacity: 0.4 + Math.random() * 0.6,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, W, H);

      if (!active) {
        animRef.current = requestAnimationFrame(draw);
        return;
      }

      particles.current.forEach((p) => {
        p.angle += p.speed;
        const x = cx + Math.cos(p.angle) * p.radius;
        const y = cy + Math.sin(p.angle) * p.radius;

        // Trail
        const grad = ctx.createRadialGradient(x, y, 0, x, y, p.size * 2);
        grad.addColorStop(0, color + "ff");
        grad.addColorStop(1, color + "00");
        ctx.beginPath();
        ctx.arc(x, y, p.size * 2, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.globalAlpha = p.opacity * 0.4;
        ctx.fill();

        // Core dot
        ctx.beginPath();
        ctx.arc(x, y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.globalAlpha = p.opacity;
        ctx.fill();
      });

      animRef.current = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(animRef.current);
  }, [active, color]);

  return (
    <canvas
      ref={canvasRef}
      width={60}
      height={60}
      className="absolute inset-0 pointer-events-none"
      style={{ opacity: active ? 1 : 0, transition: "opacity 0.3s" }}
    />
  );
}

/* ── Connection line between nodes ── */
function ConnectorLine({
  active,
  completed,
  color,
}: {
  active: boolean;
  completed: boolean;
  color: string;
}) {
  return (
    <div className="flex-1 flex items-center justify-center px-1 min-w-[20px]">
      <div
        className="w-full h-0.5 rounded-full transition-all duration-700 relative overflow-hidden"
        style={{
          background: completed || active ? color : "rgba(255,255,255,0.08)",
          boxShadow: active ? `0 0 8px ${color}` : "none",
        }}
      >
        {/* Animated pulse along the line */}
        {active && (
          <div
            className="absolute top-0 left-0 h-full w-8 rounded-full"
            style={{
              background: `linear-gradient(90deg, transparent, ${color}, transparent)`,
              animation: "slideAlongLine 1s linear infinite",
            }}
          />
        )}
      </div>
    </div>
  );
}

export default function AgentViz({ activeStage, completedStages }: Props) {
  const isIdle = activeStage === "idle";
  const isDone = activeStage === "done";
  const isStreaming = activeStage === "streaming";

  const getStageStatus = (stage: Stage) => {
    if (completedStages.includes(stage.id)) return "completed";
    if (activeStage === stage.id) return "active";
    if (activeStage === "streaming" && stage.id === "llm") return "active";
    return "pending";
  };

  if (isIdle) return null;

  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <div className="flex items-center gap-2">
          <div
            className="w-2 h-2 rounded-full"
            style={{
              background: isDone ? "#34d399" : "#a78bfa",
              boxShadow: isDone
                ? "0 0 8px #34d399"
                : "0 0 8px #a78bfa",
              animation: isDone ? "none" : "pulseDot 1s infinite",
            }}
          />
          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
            {isDone
              ? "Pipeline Complete"
              : isStreaming
              ? "⚡ GROQ Streaming..."
              : "Agent Pipeline Running"}
          </span>
        </div>
        {!isDone && !isIdle && (
          <div className="ml-auto flex gap-1">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="w-1.5 h-1.5 rounded-full bg-indigo-400"
                style={{
                  animation: `bounce 1.2s ${i * 0.2}s infinite`,
                  opacity: 0.8,
                }}
              />
            ))}
          </div>
        )}
      </div>

      {/* Pipeline nodes — horizontal on desktop, vertical on mobile */}
      <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-0">
        {STAGES.map((stage, idx) => {
          const status = getStageStatus(stage);
          const isActive = status === "active";
          const isCompleted = status === "completed";

          return (
            <div key={stage.id} className="flex sm:flex-row flex-col items-center w-full sm:w-auto sm:flex-1">
              {/* Node */}
              <div className="flex flex-col items-center gap-2 shrink-0">
                {/* Circle with orbital canvas */}
                <div
                  className="relative w-[60px] h-[60px] rounded-full flex items-center justify-center transition-all duration-500"
                  style={{
                    background: isCompleted
                      ? `${stage.color}25`
                      : isActive
                      ? `${stage.color}20`
                      : "rgba(255,255,255,0.04)",
                    border: `2px solid ${
                      isCompleted
                        ? stage.color
                        : isActive
                        ? stage.color
                        : "rgba(255,255,255,0.1)"
                    }`,
                    boxShadow: isActive
                      ? `0 0 20px ${stage.glow}, 0 0 40px ${stage.glow}50`
                      : isCompleted
                      ? `0 0 10px ${stage.glow}40`
                      : "none",
                    transform: isActive ? "scale(1.12)" : "scale(1)",
                  }}
                >
                  <OrbitalCanvas color={stage.color} active={isActive} />
                  <span
                    className="text-2xl z-10 transition-all duration-300 select-none"
                    style={{
                      filter: isActive
                        ? `drop-shadow(0 0 6px ${stage.color})`
                        : "none",
                      opacity: isCompleted || isActive ? 1 : 0.35,
                    }}
                  >
                    {isCompleted ? "✅" : stage.icon}
                  </span>
                </div>

                {/* Label */}
                <div className="text-center">
                  <div
                    className="text-[10px] font-bold leading-tight transition-colors duration-300"
                    style={{
                      color: isActive
                        ? stage.color
                        : isCompleted
                        ? "#94a3b8"
                        : "rgba(255,255,255,0.25)",
                    }}
                  >
                    {stage.label}
                  </div>
                  {isActive && (
                    <div
                      className="text-[9px] mt-0.5 opacity-80"
                      style={{ color: stage.color }}
                    >
                      {stage.description}
                    </div>
                  )}
                </div>
              </div>

              {/* Connector (not after last) */}
              {idx < STAGES.length - 1 && (
                <div className="sm:flex-1 w-full sm:w-auto flex sm:flex-row flex-col items-center justify-center my-1 sm:my-0 sm:mx-1">
                  <ConnectorLine
                    active={isActive}
                    completed={isCompleted}
                    color={stage.color}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Active stage detail banner */}
      {!isIdle && !isDone && (
        <div
          className="mt-4 rounded-xl p-3 border transition-all duration-500"
          style={{
            background: isStreaming
              ? "rgba(167,139,250,0.08)"
              : "rgba(255,255,255,0.04)",
            borderColor: isStreaming
              ? "rgba(167,139,250,0.3)"
              : "rgba(255,255,255,0.08)",
          }}
        >
          {isStreaming ? (
            <div className="flex items-center gap-3">
              <div className="text-lg">⚡</div>
              <div>
                <div className="text-xs font-bold text-purple-300">
                  GROQ qwen/qwen3.8-27b is generating your answer
                </div>
                <div className="text-xs text-slate-500 mt-0.5">
                  Streaming tokens at ultra-low latency via GROQ inference engine
                </div>
              </div>
              <div className="ml-auto flex gap-1">
                {["█", "█", "█"].map((b, i) => (
                  <span
                    key={i}
                    className="text-purple-400 text-xs"
                    style={{ animation: `fadeInOut 1s ${i * 0.3}s infinite` }}
                  >
                    {b}
                  </span>
                ))}
              </div>
            </div>
          ) : (
            STAGES.filter((s) => s.id === activeStage).map((s) => (
              <div key={s.id} className="flex items-center gap-3">
                <div className="text-lg">{s.icon}</div>
                <div>
                  <div
                    className="text-xs font-bold"
                    style={{ color: s.color }}
                  >
                    {s.label} — Active
                  </div>
                  <div className="text-xs text-slate-500 mt-0.5">
                    {s.description}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      <style jsx>{`
        @keyframes slideAlongLine {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(500%); }
        }
        @keyframes bounce {
          0%, 80%, 100% { transform: translateY(0); }
          40% { transform: translateY(-4px); }
        }
        @keyframes fadeInOut {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 1; }
        }
      `}</style>
    </div>
  );
}
