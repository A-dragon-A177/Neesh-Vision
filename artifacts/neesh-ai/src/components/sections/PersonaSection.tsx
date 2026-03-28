import { motion } from "framer-motion";
import { useInView } from "../../hooks/useScrollProgress";

const PERSONAS = [
  {
    role: "Founders",
    icon: (
      <svg viewBox="0 0 24 24" fill="#09daed" width="20" height="20">
        <path d="M7 2v11h3v9l7-12h-4l4-8z" />
      </svg>
    ),
    question: "How fast can I validate my MVP before burning runway?",
    color: "#09daed",
  },
  {
    role: "Freelancers",
    icon: (
      <svg viewBox="0 0 24 24" fill="#7c3aed" width="20" height="20">
        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
      </svg>
    ),
    question: "Can I pitch this service idea to clients before building it?",
    color: "#7c3aed",
  },
  {
    role: "Product Managers",
    icon: (
      <svg viewBox="0 0 24 24" fill="#f59e0b" width="20" height="20">
        <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z" />
      </svg>
    ),
    question: "Which feature should I prioritize next quarter?",
    color: "#f59e0b",
  },
  {
    role: "Product Designers",
    icon: (
      <svg viewBox="0 0 24 24" fill="#10b981" width="20" height="20">
        <path d="M7 14c-1.66 0-3 1.34-3 3 0 1.31-1.16 2-2 2 .92 1.22 2.49 2 4 2 2.21 0 4-1.79 4-4 0-1.66-1.34-3-3-3zm13.71-9.37l-1.34-1.34c-.39-.39-1.02-.39-1.41 0L9 12.25 11.75 15l8.96-8.96c.39-.39.39-1.02 0-1.41z" />
      </svg>
    ),
    question: "Does the feedback UX feel intuitive to new users?",
    color: "#10b981",
  },
  {
    role: "UX Researchers",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="#06b6d4" strokeWidth="2" width="20" height="20">
        <circle cx="11" cy="11" r="7" /><path d="m21 21-4.35-4.35" />
      </svg>
    ),
    question: "What pain points are users not articulating in surveys?",
    color: "#06b6d4",
  },
  {
    role: "Engineers & Scientists",
    icon: (
      <svg viewBox="0 0 24 24" fill="#ef4444" width="20" height="20">
        <path d="M7 2v11h3v9l7-12h-4l4-8z" />
      </svg>
    ),
    question: "Is there real demand before I spend months building this?",
    color: "#ef4444",
  },
  {
    role: "SaaS & MicroSaaS Devs",
    icon: (
      <svg viewBox="0 0 24 24" fill="#8b5cf6" width="20" height="20">
        <path d="M20 3H4v10c0 2.21 1.79 4 4 4h6c2.21 0 4-1.79 4-4v-3h2c1.11 0 2-.89 2-2V5c0-1.11-.89-2-2-2zm0 5h-2V5h2v3z" />
      </svg>
    ),
    question: "Will people pay $9/month for this? What's blocking them?",
    color: "#8b5cf6",
  },
  {
    role: "Fullstack Developers",
    icon: (
      <svg viewBox="0 0 24 24" fill="#0ea5e9" width="20" height="20">
        <path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z" />
      </svg>
    ),
    question: "Should I build this myself or validate product-market fit first?",
    color: "#0ea5e9",
  },
  {
    role: "Students",
    icon: (
      <svg viewBox="0 0 24 24" fill="#f59e0b" width="20" height="20">
        <path d="M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82zM12 3L1 9l11 6 9-4.91V17h2V9L12 3z" />
      </svg>
    ),
    question: "Can this idea actually become a business or is it just a project?",
    color: "#f59e0b",
  },
  {
    role: "Content Creators",
    icon: (
      <svg viewBox="0 0 24 24" fill="#ec4899" width="20" height="20">
        <path d="M21 6.5c0-2.5-2-4.5-4.5-4.5S12 4 12 6.5c0 2 1.3 3.7 3 4.3V13c0 1.1-.9 2-2 2H7c-1.1 0-2 .9-2 2v.2C3.3 17.7 2 19.2 2 21c0 1.66 1.34 3 3 3s3-1.34 3-3c0-1.2-.72-2.23-1.75-2.7.09-.3.75-.3.75-.3h6c2.2 0 4-1.8 4-4v-2.2c1.7-.6 3-2.3 3-4.3z" />
      </svg>
    ),
    question: "Will this content series build an audience or fall flat?",
    color: "#ec4899",
  },
  {
    role: "Developers",
    icon: (
      <svg viewBox="0 0 24 24" fill="#09daed" width="20" height="20">
        <path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z" />
      </svg>
    ),
    question: "How does this integrate with my existing tech stack?",
    color: "#09daed",
  },
  {
    role: "Marketers",
    icon: (
      <svg viewBox="0 0 24 24" fill="#7c3aed" width="20" height="20">
        <path d="M4 20h4V12H4v8zm6 0h4V4h-4v16zm6 0h4v-6h-4v6z" />
      </svg>
    ),
    question: "What's the ROI on validating before the campaign launch?",
    color: "#7c3aed",
  },
  {
    role: "Investors",
    icon: (
      <svg viewBox="0 0 24 24" fill="#10b981" width="20" height="20">
        <path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z" />
      </svg>
    ),
    question: "Who is this for and what's the addressable market?",
    color: "#10b981",
  },
  {
    role: "Entrepreneurs",
    icon: (
      <svg viewBox="0 0 24 24" fill="#ef4444" width="20" height="20">
        <path d="M13.49 5.48c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm-3.6 13.9l1-4.4 2.1 2v6h2v-7.5l-2.1-2 .6-3c1.3 1.5 3.3 2.5 5.5 2.5v-2c-1.9 0-3.5-1-4.3-2.4l-1-1.6c-.4-.6-1-1-1.7-1-.3 0-.5.1-.8.1l-5.2 2.2v4.7h2v-3.4l1.8-.7-1.6 8.1-4.9-1-.4 2 7 1.4z" />
      </svg>
    ),
    question: "How fast can I test this business model without wasting months?",
    color: "#ef4444",
  },
];

function PersonaCard({ persona, index }: { persona: typeof PERSONAS[0]; index: number }) {
  const { ref, inView } = useInView(0.05);

  return (
    <motion.div
      ref={ref as React.RefObject<HTMLDivElement>}
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.5, delay: (index % 5) * 0.06 }}
      className="relative group animate-hologram"
      style={{ animationDelay: `${index * 0.25}s` }}
    >
      <div
        className="border p-5 bg-white transition-all duration-300 group-hover:shadow-lg"
        style={{
          borderColor: `${persona.color}18`,
          boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLElement).style.borderColor = `${persona.color}40`;
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLElement).style.borderColor = `${persona.color}18`;
        }}
      >
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute left-0 right-0 h-px opacity-20"
            style={{ background: `linear-gradient(90deg, transparent, ${persona.color}, transparent)` }}
            animate={{ top: ["0%", "100%"] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear", delay: index * 0.4 }}
          />
        </div>

        <div className="flex items-center gap-3 mb-4">
          <div
            className="w-10 h-10 flex items-center justify-center"
            style={{ background: `${persona.color}10`, border: `1px solid ${persona.color}25` }}
          >
            {persona.icon}
          </div>
          <div>
            <div className="text-[10px] font-bold tracking-widest uppercase text-gray-400">Persona</div>
            <div className="text-sm font-semibold text-gray-900">{persona.role}</div>
          </div>
        </div>

        <div
          className="px-3 py-2 text-xs text-gray-600 border-l-2"
          style={{ borderColor: persona.color, background: `${persona.color}05` }}
        >
          "{persona.question}"
        </div>

        <div className="mt-3 flex items-center gap-1.5">
          <div className="w-1.5 h-1.5 animate-pulse" style={{ background: persona.color }} />
          <span className="text-[10px] text-gray-400">Engaging with your idea</span>
        </div>
      </div>
    </motion.div>
  );
}

export default function PersonaSection() {
  const { ref, inView } = useInView(0.1);

  return (
    <section className="relative bg-[#f0fdfe] py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div ref={ref as React.RefObject<HTMLDivElement>} className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            className="text-[#09daed] text-xs font-medium tracking-widest uppercase mb-4"
          >
            Persona Insights
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
          >
            See exactly who understands — and who doesn't.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="text-gray-500 max-w-lg mx-auto"
          >
            15 distinct personas actively engaging with your idea, each revealing unique clarity gaps.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {PERSONAS.map((persona, i) => (
            <PersonaCard key={persona.role} persona={persona} index={i} />
          ))}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#09daed]/20 to-transparent" />
    </section>
  );
}
