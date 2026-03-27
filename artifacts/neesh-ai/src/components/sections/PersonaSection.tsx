import { motion } from "framer-motion";
import { useInView } from "../../hooks/useScrollProgress";

const PERSONAS = [
  { role: "Developer", icon: "⌨", question: "How does this integrate with my stack?", color: "#09daed" },
  { role: "Marketer", icon: "📈", question: "What's the ROI on validation?", color: "#7c3aed" },
  { role: "Investor", icon: "💹", question: "Who is this for and what's the market?", color: "#f59e0b" },
  { role: "Designer", icon: "◱", question: "How does the feedback UX flow work?", color: "#10b981" },
  { role: "Entrepreneur", icon: "⚡", question: "How fast can I validate my MVP?", color: "#ef4444" },
  { role: "Researcher", icon: "◎", question: "What data does the gap engine analyze?", color: "#06b6d4" },
];

function PersonaCard({ persona, index }: { persona: typeof PERSONAS[0]; index: number }) {
  const { ref, inView } = useInView(0.1);

  return (
    <motion.div
      ref={ref as React.RefObject<HTMLDivElement>}
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="relative group animate-hologram"
      style={{ animationDelay: `${index * 0.3}s` }}
    >
      <div
        className="border p-5 transition-all duration-300 group-hover:shadow-lg"
        style={{
          background: `linear-gradient(135deg, ${persona.color}08, transparent)`,
          borderColor: `${persona.color}20`,
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = `${persona.color}50`;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = `${persona.color}20`;
        }}
      >
        {/* Hologram scan line */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute left-0 right-0 h-px opacity-30"
            style={{ background: `linear-gradient(90deg, transparent, ${persona.color}, transparent)` }}
            animate={{ top: ["0%", "100%"] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear", delay: index * 0.5 }}
          />
        </div>

        <div className="flex items-center gap-3 mb-4">
          <div
            className="w-10 h-10 flex items-center justify-center text-lg"
            style={{ background: `${persona.color}15`, border: `1px solid ${persona.color}30` }}
          >
            <span>{persona.icon}</span>
          </div>
          <div>
            <div className="text-xs font-bold tracking-widest uppercase text-white/30">Persona</div>
            <div className="text-sm font-semibold text-white">{persona.role}</div>
          </div>
        </div>

        <div
          className="px-3 py-2 text-xs text-white/70 border-l-2"
          style={{ borderColor: persona.color, background: `${persona.color}08` }}
        >
          "{persona.question}"
        </div>

        <div className="mt-3 flex items-center gap-1.5">
          <div className="w-1.5 h-1.5 animate-pulse" style={{ background: persona.color }} />
          <span className="text-[10px] text-white/30">Engaging with your idea</span>
        </div>
      </div>
    </motion.div>
  );
}

export default function PersonaSection() {
  const { ref, inView } = useInView(0.1);

  return (
    <section className="relative section-mid py-24">
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
            className="text-3xl md:text-4xl font-bold text-white mb-4"
          >
            See exactly who understands — and who doesn't.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="text-white/50 max-w-lg mx-auto"
          >
            Six distinct personas actively engaging with your idea, each revealing unique clarity gaps.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {PERSONAS.map((persona, i) => (
            <PersonaCard key={persona.role} persona={persona} index={i} />
          ))}
        </div>
      </div>

      {/* Section separator */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#09daed]/20 to-transparent" />
    </section>
  );
}
