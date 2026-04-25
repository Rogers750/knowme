import { useState, useRef, useEffect, KeyboardEvent } from "react";

type Message = {
  role: "user" | "assistant";
  content: string;
};

const SYSTEM_PROMPT = `You are a knowledgeable assistant for Sagar Singh Rawal's portfolio. Your job is to help recruiters and visitors learn about Sagar quickly and accurately.

Be concise (under 120 words unless specifically asked for more), professional, and warm. Highlight impact and technical depth. For anything outside the info below, point to: sagarsinghraw77@gmail.com or linkedin.com/in/sagraw77

=== PROFILE ===
Sagar Singh Rawal is a Senior Data & ML Engineer with 3.5+ years at top Indian fintechs: Dezerv, CoinDCX, Jumbotail. He specialises in real-time streaming (Kafka, Spark, ClickHouse), MLOps, Agentic AI & RAG, and cloud cost optimisation on AWS/Snowflake. Delivered $300K+ in infrastructure savings. NIT Kurukshetra alumnus (GPA 8.0/10). Former co-founder (Alephs360, ₹5 Lakhs+ seed raised).

=== CURRENT ROLE: Dezerv (March 2025 – Present) ===
Senior Software Engineer — Data & ML, Bangalore
• Built CNN + LSTM churn prediction model across 4 time horizons (onboarding, weekly, monthly, quarterly); used SHAP for feature importance; generated next-best-action nudges → +17% user retention
• Trained follow-up prediction model on sales transcripts: K-Means clustering on conversation chunks + LLM-based intent extraction + multi-modal tabular/NLP features → +26% customer follow-up rates in 1 month post-deployment
• Built end-to-end Kafka + Debezium + ClickHouse ingestion pipeline; query latency 10 min → 500ms; benchmarked 10+ vector DBs (Pinecone, Milvus, Qdrant); implemented ClickHouse as unified vector store for all internal ML & Agentic AI (RAG + AWS Bedrock) workflows, bypassing a $360K enterprise BYOC quote
• Built Snowflake query profiling + cost attribution system across 400+ queries; reduced spend 49% ($5,500 → $2,800/month)
• Led org-wide PII tokenisation with Skyflow across S3, Snowflake, Superset; AWS Lambda external function for on-demand detokenisation; templated framework cut per-table onboarding 2 weeks → 1 day

=== COINDCX (March 2024 – March 2025) ===
Software Engineer — Data Engineering, Bangalore
• Decommissioned Confluent managed Kafka → self-managed AWS MSK, saving ~$110K/year; built complete Lambda-architecture ingestion (Bronze + Silver layers) using DMS, MSK, PySpark with evolving-schema handling, auditing, Slack alerting
• Spearheaded Databricks → Microsoft Azure Fabric migration targeting $100K annual savings; migrated medallion-architecture pipelines with full data lineage continuity
• Re-architected "Lake Trade" model (foundation for 20+ Gold-layer models serving Data Science, Analytics, CEO office) from monolith → microservices in < 1 month; became sole owner and SME
• Awarded Best Performer of the Quarter (2024)

=== JUMBOTAIL (November 2022 – March 2024) ===
Software Engineer — Data Engineering, Bangalore
• Built Spark Structured Streaming CDC system processing 100M+ events/day with checkpointed exactly-once delivery
• Deployed Trino as query engine + built custom Scala autoscaling service; annual query infra cost $36K → $25K (31% reduction)
• Implemented partition pruning + predicate pushdown on Parquet files; PySpark compute ↓98%, S3 costs ↓$1,400/month ($16.8K/year)
• Built Python + Metabase API backend with JWT auth + intelligent response caching for 1,000+ B2B customers
• Awarded Best Performer of the Year & Quarter (2023)

=== ALEPHS360 (June 2020 – March 2021) ===
Co-Founder & Product Lead, India
• Raised ₹5 Lakhs+ seed funding; built and managed 12-member cross-functional team
• Owned full product roadmap, feature specs, user onboarding strategy, end-to-end UI/UX design

=== SKILLS ===
Languages: Python, PySpark, SQL, Scala, Java, JavaScript, React
Data Engineering: Apache Spark, Apache Kafka, Debezium, Kafka Connect, ClickHouse, Snowflake, Databricks, Trino, DeltaLake, Parquet, CDC, ETL/ELT, Data Modelling
ML & AI: MLOps, SageMaker, CNN, LSTM, SHAP, K-Means, LLMs, Vector DBs (ClickHouse, Milvus, Pinecone), RAG, Agentic AI, AWS Bedrock, Feature Engineering
AWS: Lambda, S3, EMR, Glue, Athena, SageMaker, DMS, MSK, EC2, EventBridge, CloudWatch, CloudFormation, Cost Explorer
Tools: Tableau, Superset, Metabase, Cube.js, Skyflow, Argo Workflows, Docker, PagerDuty, REST, JWT

=== EDUCATION ===
NIT Kurukshetra (NIT-KUK) — B.Tech, 2017–2021, GPA 8.0/10

=== PERSONAL ===
• State-level cricket player — U-14 (Bengal) and U-16 (Uttar Pradesh)
• Technical author on Medium under CoinDCX's engineering blog (Data Engineering series)

=== PERSONAL PROJECTS ===

Meshtheorem:
A mobile app for virtual try-on and shoppable fashion. Users upload a photo and the app uses AI-powered VITON (Virtual Try-On) via Fashn AI to overlay garments onto their body in real time. Every item worn becomes a tappable link that redirects to the exact product page to shop it directly.
Stack: React Native (Expo), FastAPI, Supabase, Fashn AI, Python
Highlights: Automatic VITON using Fashn AI, tap-to-shop garment links, Supabase for auth/storage/catalogue, FastAPI handling image processing and Fashn AI orchestration.

PDF Cutter:
A clean browser-based tool to trim any PDF to an exact page range. Open a PDF, preview it inline, specify start and end page, download the trimmed PDF instantly. Entirely client-side — the file never leaves the user's device.
Stack: React, PDF.js, pdf-lib, Vite
Highlights: In-browser PDF rendering and preview, client-side page extraction with pdf-lib, instant download, no file size or page count limits.

Path18:
An AI-powered medical report interpreter. Upload any lab report (blood work, lipid panel, thyroid, etc.) and Path18 extracts every health metric, explains each one in plain English, flags out-of-range values with severity indicators, and gives a clear overall health summary.
Stack: React, FastAPI, LLM (GPT/Claude), PDF parsing, Python
Highlights: Parses medical PDFs and extracts all numeric health markers, LLM explains each metric in plain language, flags abnormal values, full plain-language health summary.

=== CONTACT ===
Email: sagarsinghraw77@gmail.com
Phone: +91 8979742667
LinkedIn: linkedin.com/in/sagraw77
Location: Bangalore, India`;

interface ChatProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Chat({ isOpen, onClose }: ChatProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hey! I'm Sagar's AI. Ask me anything — his experience, tech stack, what problems he's solved, or whether he'd be a good fit for your team.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  // In local dev, VITE_DEEPSEEK_API_KEY is set in .env.local — calls DeepSeek directly.
  // In production (Vercel), that var is absent — calls go through /api/chat serverless proxy.
  const localApiKey = import.meta.env.VITE_DEEPSEEK_API_KEY as string | undefined;

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  async function sendMessage() {
    const text = input.trim();
    if (!text || loading) return;

    const userMsg: Message = { role: "user", content: text };
    const updated = [...messages, userMsg];
    setMessages(updated);
    setInput("");
    setLoading(true);

    const payload = {
      model: "deepseek-chat",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        ...updated.map((m) => ({ role: m.role, content: m.content })),
      ],
      max_tokens: 350,
      temperature: 0.65,
    };

    try {
      const res = localApiKey
        ? await fetch("https://api.deepseek.com/chat/completions", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localApiKey}`,
            },
            body: JSON.stringify(payload),
          })
        : await fetch("/api/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          });

      if (!res.ok) throw new Error(`${res.status}`);
      const data = await res.json();
      const reply =
        data.choices?.[0]?.message?.content ??
        "Something went wrong. Please try again.";
      setMessages([...updated, { role: "assistant", content: reply }]);
    } catch {
      setMessages([
        ...updated,
        {
          role: "assistant",
          content:
            "Couldn't connect right now. You can reach Sagar at sagarsinghraw77@gmail.com.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  function handleKeyDown(e: KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  }

  const suggestions = [
    "What's his strongest skill?",
    "Has he worked with RAG/LLMs?",
    "Tell me about his ML work",
  ];

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={onClose}
        />
      )}

      <div
        className={`fixed bottom-0 right-0 md:bottom-6 md:right-6 z-50 flex flex-col w-full md:w-[420px] h-[580px] bg-[#0d0d1a] border border-white/8 md:rounded-2xl shadow-[0_24px_80px_rgba(0,0,0,0.6)] transition-all duration-300 ease-out ${
          isOpen
            ? "translate-y-0 opacity-100"
            : "translate-y-6 opacity-0 pointer-events-none"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/6 flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-accent/15 border border-accent/20 flex items-center justify-center">
              <span className="text-accent text-xs font-bold font-heading">SR</span>
            </div>
            <div>
              <p className="text-sm font-semibold text-white font-heading leading-none">
                Sagar's AI
              </p>
              <p className="text-[11px] text-text-muted mt-0.5">
                Ask about his work & experience
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-text-muted hover:text-white transition-colors p-1"
            aria-label="Close"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[88%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                  msg.role === "user"
                    ? "bg-accent text-white rounded-br-sm"
                    : "bg-white/6 text-text-primary rounded-bl-sm"
                }`}
              >
                {msg.content}
              </div>
            </div>
          ))}

          {messages.length === 1 && !loading && (
            <div className="flex flex-wrap gap-2 mt-2">
              {suggestions.map((s) => (
                <button
                  key={s}
                  onClick={() => {
                    setInput(s);
                    setTimeout(() => inputRef.current?.focus(), 50);
                  }}
                  className="text-xs px-3 py-1.5 rounded-full bg-white/5 border border-white/8 text-text-dim hover:bg-accent/10 hover:border-accent/20 hover:text-accent transition-colors"
                >
                  {s}
                </button>
              ))}
            </div>
          )}

          {loading && (
            <div className="flex justify-start">
              <div className="bg-white/6 px-4 py-3 rounded-2xl rounded-bl-sm">
                <div className="flex gap-1.5 items-center">
                  {[0, 150, 300].map((delay) => (
                    <span
                      key={delay}
                      className="w-1.5 h-1.5 bg-text-muted rounded-full animate-bounce"
                      style={{ animationDelay: `${delay}ms` }}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="px-4 pb-4 pt-2 border-t border-white/6 flex-shrink-0">
          <div className="flex gap-2 items-end bg-white/5 border border-white/8 rounded-xl px-4 py-2.5 focus-within:border-accent/30 transition-colors">
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask anything about Sagar..."
              rows={1}
              className="flex-1 bg-transparent text-sm text-white placeholder-text-muted resize-none outline-none leading-relaxed max-h-24 py-0.5"
              style={{ scrollbarWidth: "none" }}
            />
            <button
              onClick={sendMessage}
              disabled={!input.trim() || loading}
              className="text-accent disabled:text-text-muted transition-colors hover:text-white disabled:cursor-not-allowed flex-shrink-0 pb-0.5"
              aria-label="Send message"
            >
              <svg
                width="17"
                height="17"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="22" y1="2" x2="11" y2="13" />
                <polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
            </button>
          </div>
          <p className="text-[10px] text-text-muted text-center mt-2">
            Answers based on Sagar's profile
          </p>
        </div>
      </div>
    </>
  );
}
