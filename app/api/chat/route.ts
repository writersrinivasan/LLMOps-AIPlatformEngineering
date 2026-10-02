import Groq from "groq-sdk";
import { NextRequest } from "next/server";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

// ── System prompt: scoped ONLY to LLMOps & AI Platform Engineering ──
const SYSTEM_PROMPT = `You are an expert AI assistant specialising exclusively in LLMOps and AI Platform Engineering.

Your knowledge covers exactly these 7 domains (matching the course modules):
1. MLOps vs LLMOps evolution, AI Platform Engineering, LLM application lifecycle
2. LLMOps reference architecture, Model Gateway, Model Registry, Prompt Management, RAG pipelines, vector databases
3. AI application CI/CD, deployment strategies (canary, blue/green, shadow, A/B), evaluation gates, infrastructure
4. LLM evaluation & testing, RAGAS metrics, LLM-as-a-judge, golden datasets, hallucination detection
5. LLM observability, distributed tracing, AI security (prompt injection, PII, jailbreaking), cost engineering
6. Enterprise AI Platform building, developer experience, platform capabilities, team topology
7. Capstone architecture: designing enterprise AI platforms supporting 100+ applications

STRICT RULES:
- ONLY answer questions related to the 7 domains above.
- If a question is outside these domains, respond EXACTLY with:
  "⚠️ I can only answer questions about LLMOps & AI Platform Engineering. Please ask about topics covered in the 7 modules: MLOps→LLMOps, Architecture, CI/CD, Evaluation, Observability & Security, Enterprise AI Platform, or the Capstone Challenge."
- Never answer questions about unrelated topics like general programming, personal advice, politics, news, cooking, etc.
- Be precise, technical, and practical. Use examples from the course where relevant.
- Format responses with clear structure: use bullet points, numbered steps, or code blocks where helpful.
- Keep responses concise but comprehensive — aim for 150–400 words unless a detailed explanation is explicitly needed.
- When relevant, reference specific tools: RAGAS, LiteLLM, LangGraph, pgvector, Pinecone, OpenTelemetry, ArgoCD, etc.`;

// ── Off-topic guard: fast keyword check before calling GROQ ──
const LLMOPS_KEYWORDS = [
  "llm", "llmops", "mlops", "rag", "vector", "embedding", "prompt", "model",
  "agent", "gateway", "registry", "evaluation", "eval", "ragas", "hallucination",
  "fine-tun", "inference", "deployment", "canary", "observability", "tracing",
  "token", "cost", "guardrail", "grounding", "faithfulness", "relevance",
  "retrieval", "rerank", "chunk", "context", "platform", "pipeline", "ci/cd",
  "ci cd", "devops", "kubernetes", "docker", "container", "gpu", "openai",
  "anthropic", "groq", "langchain", "langgraph", "litellm", "pinecone",
  "weaviate", "qdrant", "opentelemetry", "monitoring", "logging", "security",
  "injection", "pii", "jailbreak", "architecture", "enterprise", "foundation",
  "transformer", "bert", "gpt", "claude", "llama", "mistral", "gemini",
  "semantic", "similarity", "benchmark", "dataset", "golden", "judge",
  "a/b test", "shadow", "blue green", "feature flag", "rollback", "drift",
  "what", "how", "why", "when", "explain", "describe", "compare", "difference",
  "best practice", "example", "define", "what is", "how to", "module",
];

function isOnTopic(message: string): boolean {
  const lower = message.toLowerCase();
  return LLMOPS_KEYWORDS.some((kw) => lower.includes(kw));
}

// ── Agent stages emitted as SSE events before the LLM streams ──
const AGENT_STAGES = [
  { id: "classifier",  label: "Query Classifier",      icon: "🔍", ms: 300  },
  { id: "retriever",   label: "Knowledge Retriever",   icon: "📚", ms: 600  },
  { id: "builder",     label: "Context Builder",       icon: "🏗️", ms: 900  },
  { id: "llm",         label: "GROQ LLM (qwen3.8-27b)", icon: "🧠", ms: 1200 },
  { id: "formatter",   label: "Response Formatter",    icon: "✨", ms: 1500 },
];

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { messages } = body as {
      messages: Array<{ role: "user" | "assistant"; content: string }>;
    };

    const lastMessage = messages[messages.length - 1]?.content ?? "";

    const encoder = new TextEncoder();

    const stream = new ReadableStream({
      async start(controller) {
        const send = (data: object) => {
          controller.enqueue(
            encoder.encode(`data: ${JSON.stringify(data)}\n\n`)
          );
        };

        // 1. Emit agent stage events sequentially
        for (const stage of AGENT_STAGES) {
          await new Promise((r) => setTimeout(r, stage.ms === AGENT_STAGES[0].ms ? 0 : 250));
          send({ type: "stage", stage: stage.id, label: stage.label, icon: stage.icon });
        }

        // 2. Off-topic guard
        if (!isOnTopic(lastMessage)) {
          send({ type: "stage", stage: "done" });
          send({
            type: "token",
            content:
              "⚠️ I can only answer questions about LLMOps & AI Platform Engineering. Please ask about topics covered in the 7 modules: MLOps→LLMOps, Architecture, CI/CD, Evaluation, Observability & Security, Enterprise AI Platform, or the Capstone Challenge.",
          });
          send({ type: "done" });
          controller.close();
          return;
        }

        // 3. Stream GROQ response token by token
        send({ type: "stage", stage: "streaming" });

        const groqStream = await groq.chat.completions.create({
          model: "qwen/qwen3.8-27b",
          messages: [
            { role: "system", content: SYSTEM_PROMPT },
            ...messages,
          ],
          stream: true,
          temperature: 0.4,
          max_tokens: 1024,
        });

        for await (const chunk of groqStream) {
          const token = chunk.choices[0]?.delta?.content ?? "";
          if (token) {
            send({ type: "token", content: token });
          }
        }

        send({ type: "done" });
        controller.close();
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  } catch (err) {
    console.error("Chat API error:", err);
    return new Response(
      JSON.stringify({ error: "Failed to process request" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
