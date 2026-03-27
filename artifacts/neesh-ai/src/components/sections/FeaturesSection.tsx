import { motion } from "framer-motion";
import { useInView } from "../../hooks/useScrollProgress";

const FEATURES = [
  {
    icon: "⬡",
    title: "AI-Generated Knowledge Base",
    desc: "Turn messy notes into structured clarity instantly.",
    tag: "KNOWLEDGE",
  },
  {
    icon: "◈",
    title: "Context-Aware Chatbot",
    desc: "A chatbot that represents your idea perfectly.",
    tag: "ENGAGE",
  },
  {
    icon: "◎",
    title: "Gap Detection Engine",
    desc: "Know exactly where users are confused.",
    tag: "DETECT",
  },
  {
    icon: "⊞",
    title: "Audience Insights Matrix",
    desc: "Understand who engages and why.",
    tag: "INSIGHTS",
  },
  {
    icon: "⊕",
    title: "Validation Command Center",
    desc: "Track clarity, market signal, and momentum.",
    tag: "COMMAND",
  },
];

function FeatureCard({ feature, index }: { feature: typeof FEATURES[0]; index: number }) {
  const { ref, inView } = useInView(0.1);

  return (
    <motion.div
      ref={ref as React.RefObject<HTMLDivElement>}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group relative glass-dark p-6 border border-white/5 hover:border-[#09daed]/30 transition-all duration-300"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {/* Corner accent */}
      <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-[#09daed]/0 group-hover:border-[#09daed]/40 transition-all duration-300" />
      <div className="absolute bottom-0 left-0 w-8 h-8 border-b border-l border-[#09daed]/0 group-hover:border-[#09daed]/40 transition-all duration-300" />

      <div className="flex items-start justify-between mb-4">
        <div className="text-2xl text-[#09daed]">{feature.icon}</div>
        <div className="text-[9px] font-bold tracking-widest text-[#09daed]/50 border border-[#09daed]/20 px-2 py-0.5">
          {feature.tag}
        </div>
      </div>

      <h3 className="text-white font-semibold text-base mb-2 leading-tight">{feature.title}</h3>
      <p className="text-white/50 text-sm leading-relaxed">{feature.desc}</p>

      <div className="mt-4 flex items-center gap-2 text-[#09daed]/0 group-hover:text-[#09daed]/60 transition-all duration-300">
        <span className="text-xs">Learn more</span>
        <span className="text-xs">→</span>
      </div>
    </motion.div>
  );
}

export default function FeaturesSection() {
  const { ref, inView } = useInView(0.1);

  return (
    <section id="features" className="section-dark py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div ref={ref as React.RefObject<HTMLDivElement>} className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            className="text-[#09daed] text-xs font-medium tracking-widest uppercase mb-4"
          >
            Core Features
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl font-bold text-white mb-4"
          >
            Everything you need to validate faster
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="text-white/50 max-w-lg mx-auto"
          >
            Five AI-powered modules working together to turn your raw ideas into validated products.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {FEATURES.map((f, i) => (
            <FeatureCard key={f.title} feature={f} index={i} />
          ))}
          {/* Empty cell for grid balance — decorative */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 0.3, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="border border-dashed border-white/5 p-6 flex items-center justify-center hidden lg:flex"
          >
            <div className="text-center">
              <div className="text-white/20 text-2xl mb-2">+</div>
              <div className="text-white/20 text-xs">More coming</div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
