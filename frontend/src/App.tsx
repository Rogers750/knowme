import { useState } from "react";
import Chat from "./components/Chat";

// ─── Data ────────────────────────────────────────────────────────────────────

const navLinks = ["Experience", "Skills", "Projects", "About", "Contact"];

const stats = [
  { value: "$300K+", label: "Infrastructure saved" },
  { value: "100M+", label: "Events / day" },
  { value: "3.5+", label: "Years in fintech" },
  { value: "3", label: "Top fintechs" },
];

const experience = [
  {
    company: "Dezerv",
    url: "https://dezerv.in",
    role: "Senior Software Engineer — Data & ML",
    period: "Mar 2025 – Present",
    dot: "#818cf8",
    tagline: "Bypassed $360K enterprise quote · 49% Snowflake cost cut",
    highlights: [
      {
        text: "Multi-window CNN + LSTM churn model (4 horizons); SHAP feature importance; next-best-action nudge engine",
        metric: "+17% retention",
        color: "#34d399",
      },
      {
        text: "Follow-up prediction on sales transcripts — K-Means clustering + LLM intent extraction + multi-modal features",
        metric: "+26% follow-ups",
        color: "#34d399",
      },
      {
        text: "Kafka + Debezium + ClickHouse ingestion pipeline; ClickHouse as unified vector store for RAG & Agentic AI (AWS Bedrock)",
        metric: "10 min → 500 ms",
        color: "#818cf8",
      },
      {
        text: "Snowflake query profiling & cost attribution across 400+ queries, eliminating unnecessary multi-cluster acceleration",
        metric: "$5.5K → $2.8K/mo",
        color: "#fbbf24",
      },
      {
        text: "Org-wide PII tokenisation with Skyflow; AWS Lambda external function for on-demand detokenisation",
        metric: "2 wks → 1 day",
        color: "#818cf8",
      },
    ],
  },
  {
    company: "CoinDCX",
    url: "https://coindcx.com",
    role: "Software Engineer — Data Engineering",
    period: "Mar 2024 – Mar 2025",
    dot: "#38bdf8",
    tagline: "~$110K/yr saved · Best Performer of the Quarter 2024",
    highlights: [
      {
        text: "Replaced Confluent managed Kafka with self-managed AWS MSK; built Lambda-architecture ingestion (Bronze + Silver) with DMS, MSK, PySpark — evolving-schema handling, auditing, Slack alerting",
        metric: "$110K/yr",
        color: "#34d399",
      },
      {
        text: "Led Databricks → Azure Fabric migration; migrated medallion-architecture pipelines with full data lineage continuity",
        metric: "$100K target",
        color: "#34d399",
      },
      {
        text: "'Lake Trade' monolith → microservices in < 1 month; sole owner for 20+ Gold-layer models serving Data Science, Analytics, CEO office",
        metric: "< 1 month",
        color: "#818cf8",
      },
    ],
  },
  {
    company: "Jumbotail",
    url: "https://jumbotail.com",
    role: "Software Engineer — Data Engineering",
    period: "Nov 2022 – Mar 2024",
    dot: "#34d399",
    tagline: "98% compute cut · Best Performer of the Year 2023",
    highlights: [
      {
        text: "Spark Structured Streaming CDC system with checkpointed exactly-once delivery guarantees",
        metric: "100M+ events/day",
        color: "#818cf8",
      },
      {
        text: "Deployed Trino as query engine; built custom Scala autoscaling service",
        metric: "$36K → $25K/yr",
        color: "#34d399",
      },
      {
        text: "Parquet partition pruning + predicate pushdown — cut PySpark compute by 98%",
        metric: "$16.8K saved/yr",
        color: "#34d399",
      },
      {
        text: "Python + Metabase API backend with JWT auth and intelligent response caching",
        metric: "1,000+ B2B clients",
        color: "#818cf8",
      },
    ],
  },
  {
    company: "Alephs360",
    url: "#",
    role: "Co-Founder & Product Lead",
    period: "Jun 2020 – Mar 2021",
    dot: "#fbbf24",
    tagline: "Seed stage · 12-person team",
    highlights: [
      {
        text: "Raised seed funding; built and managed a 12-member cross-functional team from the ground up",
        metric: "₹5 Lakhs+ raised",
        color: "#fbbf24",
      },
      {
        text: "Owned the full product roadmap, feature specs, user onboarding strategy, and end-to-end UI/UX design",
        metric: "",
        color: "",
      },
    ],
  },
];

const skillGroups = [
  {
    label: "Languages",
    color: "#818cf8",
    items: ["Python", "PySpark", "SQL", "Scala", "Java", "JavaScript", "React"],
  },
  {
    label: "Data Engineering",
    color: "#38bdf8",
    items: [
      "Apache Spark",
      "Apache Kafka",
      "Debezium",
      "Kafka Connect",
      "ClickHouse",
      "Snowflake",
      "Databricks",
      "Trino",
      "DeltaLake",
      "Parquet",
      "CDC",
      "ETL / ELT",
      "Data Modelling",
      "Data Warehousing",
    ],
  },
  {
    label: "ML & AI",
    color: "#a78bfa",
    items: [
      "MLOps",
      "SageMaker",
      "CNN / LSTM",
      "SHAP",
      "K-Means",
      "LLMs",
      "RAG",
      "Agentic AI",
      "ClickHouse Vectors",
      "Milvus",
      "Pinecone",
      "AWS Bedrock",
      "Feature Engineering",
    ],
  },
  {
    label: "AWS Cloud",
    color: "#fbbf24",
    items: [
      "Lambda",
      "S3",
      "EMR",
      "Glue",
      "Athena",
      "SageMaker",
      "DMS",
      "MSK",
      "EC2",
      "EventBridge",
      "CloudWatch",
      "CloudFormation",
      "Cost Explorer",
    ],
  },
  {
    label: "Tools & Infra",
    color: "#34d399",
    items: [
      "Docker",
      "Argo Workflows",
      "Skyflow",
      "PagerDuty",
      "Tableau",
      "Superset",
      "Metabase",
      "Cube.js",
      "REST",
      "JWT",
      "Git",
    ],
  },
];

const personalProjects = [
  {
    name: "Meshtheorem",
    tagline: "Virtual try-on & shoppable wardrobe",
    description:
      "Built a mobile app where users upload a photo and try on clothes virtually using AI-powered VITON (Virtual Try-On). The app overlays garments onto the user's body in real time, and each item worn becomes a tappable link — redirecting to the exact product page to shop it directly.",
    stack: ["React Native (Expo)", "FastAPI", "Supabase", "Fashn AI", "Python"],
    highlights: [
      "AI-powered automatic virtual try-on using Fashn AI's VITON model",
      "Tap any garment in the image to get direct shopping links",
      "Supabase for auth, storage, and real-time garment catalogue",
      "FastAPI backend handling image processing and Fashn AI orchestration",
    ],
    color: "#a78bfa",
    status: "Live",
  },
  {
    name: "PDF Cutter",
    tagline: "Trim any PDF to an exact page range",
    description:
      "A clean web tool where you open any PDF, preview it inline, specify a start and end page, and instantly download a new PDF containing only that range — no accounts, no uploads to third-party servers, processed entirely in-browser.",
    stack: ["React", "PDF.js", "pdf-lib", "Vite"],
    highlights: [
      "In-browser PDF rendering and preview with PDF.js",
      "Client-side page extraction using pdf-lib — file never leaves your device",
      "Instant download of the trimmed PDF",
      "Handles large PDFs without page-count limits",
    ],
    color: "#38bdf8",
    status: "Live",
  },
  {
    name: "Path18",
    tagline: "AI health report interpreter",
    description:
      "Upload any medical lab report (blood work, lipid panel, thyroid, etc.) and Path18 extracts every health metric, explains what each one means in plain language, flags values outside normal range, and gives a clear summary of your overall health picture.",
    stack: ["React", "FastAPI", "LLM (GPT / Claude)", "PDF parsing", "Python"],
    highlights: [
      "Parses uploaded medical PDFs and extracts all numeric health markers",
      "LLM explains each metric in plain English — no medical jargon",
      "Flags out-of-range values with severity indicators",
      "Full plain-language health summary at the top of the report",
    ],
    color: "#34d399",
    status: "Live",
  },
];

// ─── Small inline components ─────────────────────────────────────────────────

function ArrowRight({ size = 14 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}

function ExternalLinkIcon({ size = 13 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  );
}

// ─── Main App ─────────────────────────────────────────────────────────────────

export default function App() {
  const [chatOpen, setChatOpen] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <div className="min-h-screen bg-bg text-text-primary font-sans">
      {/* ── Navigation ─────────────────────────────────────────────────── */}
      <nav className="fixed top-0 left-0 right-0 z-30 bg-bg/80 backdrop-blur-md border-b border-border">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <a
            href="#hero"
            className="font-heading font-bold text-accent text-lg tracking-tight"
          >
            SR
          </a>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                className="text-sm text-text-dim hover:text-white transition-colors"
              >
                {link}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setChatOpen(true)}
              className="hidden md:flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-lg bg-white text-accent hover:bg-white/90 transition-colors"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-60" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
              </span>
              Chat with AI
            </button>

            <button
              className="md:hidden text-text-dim hover:text-white p-1"
              onClick={() => setMobileNavOpen((v) => !v)}
              aria-label="Menu"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              >
                {mobileNavOpen ? (
                  <>
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </>
                ) : (
                  <>
                    <line x1="3" y1="6" x2="21" y2="6" />
                    <line x1="3" y1="12" x2="21" y2="12" />
                    <line x1="3" y1="18" x2="21" y2="18" />
                  </>
                )}
              </svg>
            </button>
          </div>
        </div>

        {mobileNavOpen && (
          <div className="md:hidden border-t border-border bg-bg/95 px-6 py-4 flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                onClick={() => setMobileNavOpen(false)}
                className="text-sm text-text-dim hover:text-white transition-colors"
              >
                {link}
              </a>
            ))}
            <button
              onClick={() => {
                setMobileNavOpen(false);
                setChatOpen(true);
              }}
              className="text-sm font-medium text-accent text-left"
            >
              Chat with AI →
            </button>
          </div>
        )}
      </nav>

      {/* ── Hero ───────────────────────────────────────────────────────── */}
      <section id="hero" className="pt-32 pb-24 px-6 dot-grid">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-2 mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-green" />
            <span className="text-xs text-text-dim font-mono">
              Available · Bangalore, India
            </span>
          </div>

          <h1 className="font-heading text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tighter leading-none mb-6">
            <span className="gradient-text">Sagar Singh</span>
            <br />
            <span className="text-white">Rawal</span>
          </h1>

          <p className="text-xl text-text-dim max-w-xl leading-relaxed mb-4">
            Senior Data &amp; ML Engineer. Real-time pipelines, MLOps, and
            Agentic AI at scale.
          </p>
          <p className="text-sm text-text-muted max-w-lg leading-relaxed mb-10">
            3.5+ years at Dezerv, CoinDCX, and Jumbotail — building systems
            that process hundreds of millions of events daily and deliver
            measurable business outcomes.
          </p>

          <div className="flex flex-wrap items-center gap-4 mb-16">
            <a
              href="mailto:sagarsinghraw77@gmail.com"
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-accent text-white font-medium text-sm hover:bg-accent/90 transition-colors"
            >
              Get in touch <ArrowRight />
            </a>
            <a
              href="https://linkedin.com/in/sagraw77"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg border border-border-up text-text-dim font-medium text-sm hover:text-white hover:border-white/20 transition-colors"
            >
              LinkedIn <ExternalLinkIcon />
            </a>
            <button
              onClick={() => setChatOpen(true)}
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-white text-accent font-medium text-sm hover:bg-white/90 transition-colors"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-60" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
              </span>
              Ask my AI
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-border rounded-xl overflow-hidden">
            {stats.map((s) => (
              <div
                key={s.label}
                className="bg-surface px-6 py-5 hover:bg-surface-up transition-colors"
              >
                <p className="font-heading text-2xl font-bold text-white mb-1">
                  {s.value}
                </p>
                <p className="text-xs text-text-muted">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Experience ─────────────────────────────────────────────────── */}
      <section id="experience" className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="mb-14">
            <p className="text-xs font-mono text-accent tracking-wide uppercase mb-3">
              Work history
            </p>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-white tracking-tight">
              Experience
            </h2>
          </div>

          <div className="relative">
            <div className="absolute left-[7px] top-2 bottom-2 w-px timeline-line hidden md:block" />

            <div className="space-y-10">
              {experience.map((job, idx) => (
                <div key={idx} className="md:pl-10 relative">
                  <div
                    className="absolute left-0 top-1.5 w-3.5 h-3.5 rounded-full hidden md:block"
                    style={{
                      backgroundColor: job.dot,
                      boxShadow: `0 0 8px ${job.dot}60`,
                    }}
                  />

                  <div className="bg-surface border border-border rounded-xl p-6 hover:border-border-up transition-colors">
                    <div className="flex flex-wrap items-start justify-between gap-4 mb-3">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-heading text-xl font-semibold text-white">
                            {job.company}
                          </h3>
                          {job.url !== "#" && (
                            <a
                              href={job.url}
                              target="_blank"
                              rel="noreferrer"
                              className="text-text-muted hover:text-text-dim transition-colors"
                            >
                              <ExternalLinkIcon size={12} />
                            </a>
                          )}
                        </div>
                        <p className="text-sm text-text-dim">{job.role}</p>
                      </div>
                      <p className="text-xs font-mono text-text-muted">
                        {job.period}
                      </p>
                    </div>

                    <p
                      className="text-xs font-mono font-medium mb-5"
                      style={{ color: job.dot }}
                    >
                      {job.tagline}
                    </p>

                    <ul className="space-y-3">
                      {job.highlights.map((h, hi) => (
                        <li
                          key={hi}
                          className="flex items-start gap-3 text-sm text-text-dim leading-relaxed"
                        >
                          <span className="mt-2 w-1 h-1 rounded-full bg-text-muted flex-shrink-0" />
                          <span className="flex-1">{h.text}</span>
                          {h.metric && (
                            <span
                              className="flex-shrink-0 text-xs font-medium font-mono px-2 py-0.5 rounded-md whitespace-nowrap"
                              style={{
                                color: h.color,
                                backgroundColor: `${h.color}18`,
                              }}
                            >
                              {h.metric}
                            </span>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Skills ─────────────────────────────────────────────────────── */}
      <section
        id="skills"
        className="py-24 px-6"
        style={{ background: "rgba(13,13,26,0.5)" }}
      >
        <div className="max-w-5xl mx-auto">
          <div className="mb-14">
            <p className="text-xs font-mono text-accent tracking-wide uppercase mb-3">
              Tech stack
            </p>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-white tracking-tight">
              Skills
            </h2>
          </div>

          <div className="space-y-8">
            {skillGroups.map((group) => (
              <div key={group.label}>
                <p
                  className="text-xs font-mono font-medium uppercase tracking-wide mb-3"
                  style={{ color: group.color }}
                >
                  {group.label}
                </p>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((skill) => (
                    <span
                      key={skill}
                      className="text-sm px-3 py-1.5 rounded-lg border text-text-dim hover:text-white transition-colors"
                      style={{
                        borderColor: `${group.color}25`,
                        backgroundColor: `${group.color}08`,
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Personal Projects ──────────────────────────────────────────── */}
      <section id="projects" className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="mb-14">
            <p className="text-xs font-mono text-accent tracking-wide uppercase mb-3">
              Side work
            </p>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-white tracking-tight">
              Personal Projects
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {personalProjects.map((project) => (
              <div
                key={project.name}
                className="bg-surface border border-border rounded-xl p-6 flex flex-col hover:border-border-up transition-colors"
              >
                {/* Header */}
                <div className="flex items-start justify-between gap-3 mb-3">
                  <h3 className="font-heading text-lg font-semibold text-white">
                    {project.name}
                  </h3>
                  <span
                    className="flex-shrink-0 text-[10px] font-mono font-medium px-2 py-0.5 rounded-full"
                    style={{
                      color: project.color,
                      backgroundColor: `${project.color}18`,
                    }}
                  >
                    {project.status}
                  </span>
                </div>

                <p
                  className="text-xs font-mono font-medium mb-3"
                  style={{ color: project.color }}
                >
                  {project.tagline}
                </p>

                <p className="text-sm text-text-dim leading-relaxed mb-5">
                  {project.description}
                </p>

                {/* Highlights */}
                <ul className="space-y-2 mb-6 flex-1">
                  {project.highlights.map((h) => (
                    <li key={h} className="flex items-start gap-2 text-xs text-text-dim leading-relaxed">
                      <span
                        className="mt-1.5 w-1 h-1 rounded-full flex-shrink-0"
                        style={{ backgroundColor: project.color }}
                      />
                      {h}
                    </li>
                  ))}
                </ul>

                {/* Stack */}
                <div className="flex flex-wrap gap-1.5 pt-4 border-t border-border">
                  {project.stack.map((tech) => (
                    <span
                      key={tech}
                      className="text-[11px] px-2 py-0.5 rounded-md border text-text-muted"
                      style={{
                        borderColor: `${project.color}20`,
                        backgroundColor: `${project.color}08`,
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── About ──────────────────────────────────────────────────────── */}
      <section id="about" className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="mb-14">
            <p className="text-xs font-mono text-accent tracking-wide uppercase mb-3">
              Background
            </p>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-white tracking-tight">
              About
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-5 mb-5">
            {/* Education */}
            <div className="bg-surface border border-border rounded-xl p-6 hover:border-border-up transition-colors">
              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center mb-4"
                style={{ backgroundColor: "rgba(129,140,248,0.1)" }}
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#818cf8"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                  <path d="M6 12v5c3 3 9 3 12 0v-5" />
                </svg>
              </div>
              <p className="text-xs font-mono text-accent uppercase tracking-wide mb-3">
                Education
              </p>
              <p className="font-heading font-semibold text-white mb-1">
                NIT Kurukshetra
              </p>
              <p className="text-sm text-text-dim mb-1">B.Tech · 2017 – 2021</p>
              <p className="text-sm font-mono text-green">GPA 8.0 / 10.0</p>
            </div>

            {/* Sports */}
            <div className="bg-surface border border-border rounded-xl p-6 hover:border-border-up transition-colors">
              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center mb-4"
                style={{ backgroundColor: "rgba(52,211,153,0.1)" }}
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#34d399"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
                  <line x1="2" y1="12" x2="22" y2="12" />
                </svg>
              </div>
              <p className="text-xs font-mono text-green uppercase tracking-wide mb-3">
                Sports
              </p>
              <p className="font-heading font-semibold text-white mb-3">
                State-Level Cricketer
              </p>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-green flex-shrink-0" />
                  <p className="text-sm text-text-dim">U-14 — Bengal</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-green flex-shrink-0" />
                  <p className="text-sm text-text-dim">U-16 — Uttar Pradesh</p>
                </div>
              </div>
            </div>

            {/* Writing */}
            <div className="bg-surface border border-border rounded-xl p-6 hover:border-border-up transition-colors">
              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center mb-4"
                style={{ backgroundColor: "rgba(251,191,36,0.1)" }}
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#fbbf24"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 20h9" />
                  <path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z" />
                </svg>
              </div>
              <p className="text-xs font-mono text-amber uppercase tracking-wide mb-3">
                Writing
              </p>
              <p className="font-heading font-semibold text-white mb-1">
                Technical Author
              </p>
              <p className="text-sm text-text-dim leading-relaxed">
                Data Engineering series on Medium — published under CoinDCX's
                engineering blog
              </p>
            </div>
          </div>

          {/* Achievements */}
          <div className="bg-surface border border-border rounded-xl p-6">
            <p className="text-xs font-mono text-amber uppercase tracking-wide mb-5">
              Recognition
            </p>
            <div className="grid sm:grid-cols-3 gap-6">
              {[
                {
                  award: "Best Performer of the Quarter",
                  where: "CoinDCX",
                  year: "2024",
                },
                {
                  award: "Best Performer of the Year",
                  where: "Jumbotail",
                  year: "2023",
                },
                {
                  award: "Best Performer of the Quarter",
                  where: "Jumbotail",
                  year: "2023",
                },
              ].map((a) => (
                <div key={a.award + a.where} className="flex items-start gap-3">
                  <span className="mt-0.5 text-amber flex-shrink-0">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                    </svg>
                  </span>
                  <div>
                    <p className="text-sm font-medium text-white">{a.award}</p>
                    <p className="text-xs text-text-muted mt-0.5">
                      {a.where} · {a.year}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Contact ────────────────────────────────────────────────────── */}
      <section
        id="contact"
        className="py-24 px-6"
        style={{ background: "rgba(13,13,26,0.5)" }}
      >
        <div className="max-w-5xl mx-auto">
          <div className="mb-14">
            <p className="text-xs font-mono text-accent tracking-wide uppercase mb-3">
              Let's talk
            </p>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-white tracking-tight">
              Contact
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            <div className="bg-surface border border-border rounded-xl p-8">
              <p className="text-text-dim leading-relaxed mb-8">
                Open to senior IC roles in data engineering, MLOps, and AI
                infrastructure. Reach out directly or use the chat on this page.
              </p>

              <div className="space-y-4">
                <a
                  href="mailto:sagarsinghraw77@gmail.com"
                  className="flex items-center gap-3 text-sm text-text-dim hover:text-white transition-colors group"
                >
                  <span
                    className="w-8 h-8 rounded-lg flex items-center justify-center group-hover:bg-accent/15 transition-colors"
                    style={{ backgroundColor: "rgba(129,140,248,0.1)" }}
                  >
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#818cf8"
                      strokeWidth="2"
                      strokeLinecap="round"
                    >
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                      <polyline points="22,6 12,13 2,6" />
                    </svg>
                  </span>
                  sagarsinghraw77@gmail.com
                </a>

                <a
                  href="https://linkedin.com/in/sagraw77"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 text-sm text-text-dim hover:text-white transition-colors group"
                >
                  <span
                    className="w-8 h-8 rounded-lg flex items-center justify-center group-hover:bg-sky/15 transition-colors"
                    style={{ backgroundColor: "rgba(56,189,248,0.1)" }}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="#38bdf8">
                      <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
                      <circle cx="4" cy="4" r="2" />
                    </svg>
                  </span>
                  linkedin.com/in/sagraw77
                </a>

                <div className="flex items-center gap-3 text-sm text-text-dim">
                  <span
                    className="w-8 h-8 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: "rgba(52,211,153,0.1)" }}
                  >
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#34d399"
                      strokeWidth="2"
                      strokeLinecap="round"
                    >
                      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.67A2 2 0 012 .84h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
                    </svg>
                  </span>
                  +91 89797 42667
                </div>
              </div>
            </div>

            <div
              className="bg-surface border border-accent/20 rounded-xl p-8 flex flex-col justify-between cursor-pointer hover:border-accent/30 transition-colors"
              onClick={() => setChatOpen(true)}
            >
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-60" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
                  </span>
                  <p className="text-xs font-mono text-accent uppercase tracking-wide">
                    Live AI
                  </p>
                </div>
                <h3 className="font-heading text-xl font-semibold text-white mb-3">
                  Chat with Sagar's AI
                </h3>
                <p className="text-sm text-text-dim leading-relaxed">
                  Get instant answers about his background, tech stack,
                  achievements, and whether he'd be a fit for your team.
                  Powered by DeepSeek.
                </p>
              </div>
              <div className="mt-6 flex items-center gap-2 text-sm font-medium text-accent">
                Start a conversation <ArrowRight />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ─────────────────────────────────────────────────────── */}
      <footer className="py-8 px-6 border-t border-border">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-text-muted font-mono">
            © 2026 Sagar Singh Rawal · Bangalore, India
          </p>
          <p className="text-xs text-text-muted font-mono">
            sagarsinghraw77@gmail.com
          </p>
        </div>
      </footer>

      {/* ── Floating chat button ──────────────────────────────────────── */}
      {!chatOpen && (
        <button
          onClick={() => setChatOpen(true)}
          className="fixed bottom-6 right-6 z-40 rounded-full bg-accent shadow-lg flex items-center justify-center hover:scale-105 active:scale-95 transition-transform"
          style={{
            width: 52,
            height: 52,
            boxShadow: "0 8px 24px rgba(129,140,248,0.35)",
          }}
          aria-label="Open chat"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
          </svg>
        </button>
      )}

      {/* ── Chat panel ─────────────────────────────────────────────────── */}
      <Chat isOpen={chatOpen} onClose={() => setChatOpen(false)} />
    </div>
  );
}
