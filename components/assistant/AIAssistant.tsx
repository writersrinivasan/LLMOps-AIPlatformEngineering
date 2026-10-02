"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import AgentViz, { AgentStage } from "./AgentViz";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  stages?: AgentStage[];
  durationMs?: number;
}

const SUGGESTED_QUESTIONS = [
  "What is the difference between MLOps and LLMOps?",
  "How does a Model Gateway work in an AI platform?",
  "Explain RAG pipeline stages with examples",
  "What are the 4 evaluation layers for LLM applications?",
  "How do I detect and prevent prompt injection attacks?",
  "What is LLM-as-a-judge and when should I use it?",
  "Explain canary deployment for LLM applications",
  "How do I calculate and optimise LLM token costs?",
  "What metrics should I track for LLM observability?",
  "What does an enterprise AI platform team topology look like?",
];

function TypingIndicator() {
  return (
    <div className="flex items-center gap-1.5 px-4 py-3">
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className="w-2 h-2 rounded-full bg-indigo-400"
          style={{
            animation: `typingBounce 1.2s ${i * 0.2}s ease-in-out infinite`,
          }}
        />
      ))}
      <style jsx>{`
        @keyframes typingBounce {
          0%, 60%, 100% { transform: translateY(0); opacity: 0.5; }
          30% { transform: translateY(-6px); opacity: 1; }
        }
      `}</style>
    </div>
  );
}

function MessageBubble({ message }: { message: Message }) {
  const isUser = message.role === "user";

  // Format markdown-ish content: bold, code, bullet points
  const formatContent = (text: string) => {
    const lines = text.split("\n");
    return lines.map((line, i) => {
      // Code block markers
      if (line.startsWith("```")) return null;
      // Bullet points
      if (line.match(/^[-•*]\s/)) {
        return (
          <div key={i} className="flex items-start gap-2 my-0.5">
            <span className="text-indigo-400 mt-1 shrink-0">▸</span>
            <span>{formatInline(line.replace(/^[-•*]\s/, ""))}</span>
          </div>
        );
      }
      // Numbered list
      if (line.match(/^\d+\.\s/)) {
        const num = line.match(/^(\d+)\./)?.[1];
        return (
          <div key={i} className="flex items-start gap-2 my-0.5">
            <span className="text-purple-400 font-bold shrink-0 w-5">{num}.</span>
            <span>{formatInline(line.replace(/^\d+\.\s/, ""))}</span>
          </div>
        );
      }
      // Heading ##
      if (line.startsWith("## ")) {
        return (
          <div key={i} className="text-base font-bold text-white mt-3 mb-1">
            {line.replace("## ", "")}
          </div>
        );
      }
      if (line.startsWith("# ")) {
        return (
          <div key={i} className="text-lg font-black text-white mt-3 mb-1">
            {line.replace("# ", "")}
          </div>
        );
      }
      // Empty line → spacer
      if (line.trim() === "") return <div key={i} className="h-2" />;
      // Normal line
      return <div key={i}>{formatInline(line)}</div>;
    });
  };

  const formatInline = (text: string) => {
    // Bold **text**
    const parts = text.split(/(\*\*[^*]+\*\*|`[^`]+`)/g);
    return parts.map((part, i) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return <strong key={i} className="text-white font-bold">{part.slice(2, -2)}</strong>;
      }
      if (part.startsWith("`") && part.endsWith("`")) {
        return (
          <code key={i} className="px-1.5 py-0.5 rounded text-xs font-mono bg-black/40 text-cyan-300 border border-white/10">
            {part.slice(1, -1)}
          </code>
        );
      }
      return part;
    });
  };

  return (
    <div className={`flex gap-3 ${isUser ? "flex-row-reverse" : "flex-row"} items-start`}>
      {/* Avatar */}
      <div
        className="w-8 h-8 rounded-xl flex items-center justify-center text-sm shrink-0 mt-1"
        style={{
          background: isUser
            ? "linear-gradient(135deg, #667eea, #764ba2)"
            : "linear-gradient(135deg, #1e1b4b, #312e81)",
          border: isUser ? "none" : "1px solid rgba(99,102,241,0.4)",
        }}
      >
        {isUser ? "👤" : "🧠"}
      </div>

      {/* Bubble */}
      <div
        className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
          isUser ? "rounded-tr-sm" : "rounded-tl-sm"
        }`}
        style={
          isUser
            ? {
                background: "linear-gradient(135deg, rgba(102,126,234,0.25), rgba(118,75,162,0.25))",
                border: "1px solid rgba(102,126,234,0.35)",
                color: "#e2e8f0",
              }
            : {
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
                color: "#e2e8f0",
              }
        }
      >
        <div className="space-y-0.5">{formatContent(message.content)}</div>

        {/* Footer: timestamp + duration */}
        <div className="flex items-center gap-3 mt-2 pt-2 border-t border-white/5">
          <span className="text-[10px] text-slate-600">
            {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
          </span>
          {message.durationMs && (
            <span className="text-[10px] text-indigo-500 flex items-center gap-1">
              ⚡ {(message.durationMs / 1000).toFixed(1)}s via GROQ
            </span>
          )}
          {message.stages && message.stages.length > 0 && (
            <div className="flex gap-1 ml-auto">
              {message.stages.map((s) => (
                <span key={s} className="text-[10px] text-slate-600">✓</span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function AIAssistant() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content:
        "👋 Hi! I'm your **LLMOps & AI Platform Engineering** assistant powered by GROQ.\n\nI can answer questions across all **7 modules** of this course:\n- MLOps → LLMOps evolution\n- Reference architecture & components\n- AI CI/CD pipelines\n- LLM evaluation & testing\n- Observability, security & cost\n- Enterprise AI platform building\n- Capstone architecture design\n\nWhat would you like to explore?",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [activeStage, setActiveStage] = useState<AgentStage>("idle");
  const [completedStages, setCompletedStages] = useState<AgentStage[]>([]);
  const [tokenCount, setTokenCount] = useState(0);
  const [totalQueries, setTotalQueries] = useState(0);
  const [avgLatency, setAvgLatency] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const startTimeRef = useRef<number>(0);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, activeStage]);

  const sendMessage = useCallback(
    async (text: string) => {
      if (!text.trim() || isLoading) return;

      const userMsg: Message = {
        id: Date.now().toString(),
        role: "user",
        content: text.trim(),
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, userMsg]);
      setInput("");
      setIsLoading(true);
      setActiveStage("classifier");
      setCompletedStages([]);
      setTokenCount(0);
      startTimeRef.current = Date.now();

      const history = [
        ...messages
          .filter((m) => m.id !== "welcome")
          .map((m) => ({ role: m.role, content: m.content })),
        { role: "user" as const, content: text.trim() },
      ];

      let assistantContent = "";
      const completedSoFar: AgentStage[] = [];
      const assistantId = (Date.now() + 1).toString();

      // Optimistic assistant message placeholder
      setMessages((prev) => [
        ...prev,
        {
          id: assistantId,
          role: "assistant",
          content: "",
          timestamp: new Date(),
        },
      ]);

      try {
        const response = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ messages: history }),
        });

        if (!response.ok) throw new Error("API error");

        const reader = response.body!.getReader();
        const decoder = new TextDecoder();
        let buffer = "";

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split("\n");
          buffer = lines.pop() ?? "";

          for (const line of lines) {
            if (!line.startsWith("data: ")) continue;
            const raw = line.slice(6).trim();
            if (!raw) continue;

            try {
              const event = JSON.parse(raw);

              if (event.type === "stage") {
                if (event.stage === "done") {
                  setActiveStage("done");
                } else if (event.stage === "streaming") {
                  setActiveStage("streaming");
                } else {
                  // Mark previous stage complete, activate next
                  if (event.stage !== "classifier") {
                    const prev = completedSoFar[completedSoFar.length - 1];
                    if (prev) {
                      completedSoFar.push(prev);
                      setCompletedStages([...completedSoFar]);
                    }
                  }
                  setActiveStage(event.stage as AgentStage);
                }
              } else if (event.type === "token") {
                assistantContent += event.content;
                setTokenCount((n) => n + 1);
                setMessages((prev) =>
                  prev.map((m) =>
                    m.id === assistantId
                      ? { ...m, content: assistantContent }
                      : m
                  )
                );
              } else if (event.type === "done") {
                const elapsed = Date.now() - startTimeRef.current;
                setMessages((prev) =>
                  prev.map((m) =>
                    m.id === assistantId
                      ? { ...m, durationMs: elapsed, stages: [...completedSoFar] }
                      : m
                  )
                );
                setTotalQueries((q) => q + 1);
                setAvgLatency((prev) =>
                  prev === 0 ? elapsed : Math.round((prev + elapsed) / 2)
                );
                setActiveStage("done");
                setTimeout(() => {
                  setActiveStage("idle");
                  setCompletedStages([]);
                }, 2500);
              }
            } catch {
              // malformed JSON line — skip
            }
          }
        }
      } catch (err) {
        console.error(err);
        setMessages((prev) =>
          prev.map((m) =>
            m.id === assistantId
              ? {
                  ...m,
                  content:
                    "⚠️ Something went wrong connecting to GROQ. Please check your API key and try again.",
                }
              : m
          )
        );
        setActiveStage("idle");
      } finally {
        setIsLoading(false);
      }
    },
    [isLoading, messages]
  );

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  return (
    <div className="flex flex-col h-full min-h-[calc(100vh-4rem)]" style={{ background: "transparent" }}>

      {/* ── Stats bar ── */}
      <div
        className="flex items-center gap-4 px-4 py-2 border-b text-xs flex-wrap"
        style={{ borderColor: "rgba(255,255,255,0.06)", background: "rgba(0,0,0,0.2)" }}
      >
        {[
          { label: "Model", value: "qwen/qwen3.8-27b", icon: "🧠", color: "#a78bfa" },
          { label: "Provider", value: "GROQ", icon: "⚡", color: "#fbbf24" },
          { label: "Scope", value: "LLMOps Only", icon: "🎯", color: "#34d399" },
          { label: "Queries", value: String(totalQueries), icon: "💬", color: "#60a5fa" },
          {
            label: "Avg Latency",
            value: avgLatency ? `${(avgLatency / 1000).toFixed(1)}s` : "—",
            icon: "⏱️",
            color: "#f472b6",
          },
          {
            label: "Tokens streamed",
            value: tokenCount > 0 ? String(tokenCount) : "—",
            icon: "🔢",
            color: "#fb923c",
          },
        ].map((s) => (
          <div key={s.label} className="flex items-center gap-1.5">
            <span>{s.icon}</span>
            <span className="text-slate-500">{s.label}:</span>
            <span className="font-semibold" style={{ color: s.color }}>
              {s.value}
            </span>
          </div>
        ))}
      </div>

      {/* ── Agent Viz panel ── */}
      {activeStage !== "idle" && (
        <div
          className="px-4 pt-4 pb-3 border-b transition-all duration-500"
          style={{
            borderColor: "rgba(99,102,241,0.15)",
            background:
              "linear-gradient(135deg, rgba(99,102,241,0.06), rgba(167,139,250,0.04))",
          }}
        >
          <AgentViz activeStage={activeStage} completedStages={completedStages} />
        </div>
      )}

      {/* ── Messages ── */}
      <div className="flex-1 overflow-y-auto px-4 py-5 space-y-5">
        {messages.map((msg) => (
          <MessageBubble key={msg.id} message={msg} />
        ))}
        {isLoading && messages[messages.length - 1]?.content === "" && (
          <div className="flex justify-start">
            <div
              className="rounded-2xl rounded-tl-sm"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              <TypingIndicator />
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* ── Suggested questions (shown only at start) ── */}
      {messages.length <= 1 && (
        <div className="px-4 pb-3">
          <div className="text-xs text-slate-500 uppercase tracking-wider mb-2 font-semibold">
            Suggested questions
          </div>
          <div className="flex flex-wrap gap-2">
            {SUGGESTED_QUESTIONS.slice(0, 5).map((q) => (
              <button
                key={q}
                onClick={() => sendMessage(q)}
                disabled={isLoading}
                className="text-xs px-3 py-2 rounded-xl border transition-all duration-200 hover:scale-[1.02] text-left disabled:opacity-40"
                style={{
                  background: "rgba(99,102,241,0.08)",
                  borderColor: "rgba(99,102,241,0.25)",
                  color: "#a5b4fc",
                }}
              >
                {q}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ── Input area ── */}
      <div
        className="px-4 py-3 border-t"
        style={{
          borderColor: "rgba(255,255,255,0.08)",
          background: "rgba(0,0,0,0.25)",
        }}
      >
        <div
          className="flex items-end gap-3 rounded-2xl p-3 border transition-all duration-300"
          style={{
            background: "rgba(255,255,255,0.04)",
            borderColor: isLoading
              ? "rgba(99,102,241,0.5)"
              : "rgba(255,255,255,0.10)",
            boxShadow: isLoading ? "0 0 20px rgba(99,102,241,0.15)" : "none",
          }}
        >
          <textarea
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isLoading}
            placeholder="Ask anything about LLMOps & AI Platform Engineering..."
            rows={1}
            className="flex-1 bg-transparent resize-none outline-none text-sm placeholder:text-slate-600 text-slate-100 leading-relaxed"
            style={{
              minHeight: "24px",
              maxHeight: "120px",
              height: "auto",
            }}
            onInput={(e) => {
              const el = e.currentTarget;
              el.style.height = "auto";
              el.style.height = Math.min(el.scrollHeight, 120) + "px";
            }}
          />
          <button
            onClick={() => sendMessage(input)}
            disabled={isLoading || !input.trim()}
            className="shrink-0 w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:scale-100"
            style={{
              background: "linear-gradient(135deg, #667eea, #764ba2)",
              boxShadow: input.trim() ? "0 0 16px rgba(99,102,241,0.5)" : "none",
            }}
          >
            {isLoading ? (
              <div
                className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                style={{ animation: "spin 0.8s linear infinite" }}
              />
            ) : (
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            )}
          </button>
        </div>
        <p className="text-center text-[10px] text-slate-600 mt-2">
          Press <kbd className="px-1 py-0.5 rounded bg-white/5 text-slate-500 font-mono">Enter</kbd> to send · <kbd className="px-1 py-0.5 rounded bg-white/5 text-slate-500 font-mono">Shift+Enter</kbd> for new line
        </p>
      </div>

      <style jsx global>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
