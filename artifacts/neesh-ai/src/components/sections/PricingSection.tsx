import { motion } from "framer-motion";
import { useInView } from "../../hooks/useScrollProgress";

const PLANS = [
  {
    name: "Seedling",
    badge: "FREE",
    price: "$0",
    period: "forever",
    desc: "Start validating your first idea",
    color: "#ffffff",
    highlight: false,
    features: [
      "1 Project",
      "Basic AI chatbot",
      "Core analytics",
      "Neesh AI branding",
      "Community support",
      "Gap detection (basic)",
    ],
    cta: "Get Started Free",
  },
  {
    name: "Founder",
    badge: "PRO",
    price: "$49",
    period: "per month",
    desc: "For serious founders building real products",
    color: "#09daed",
    highlight: true,
    features: [
      "5 Projects",
      "GPT-4o / Claude AI",
      "No Neesh AI branding",
      "Audience insights",
      "Export reports (CSV, PDF)",
      "Priority support",
    ],
    cta: "Start 14-Day Trial",
  },
  {
    name: "Visionary",
    badge: "ENTERPRISE",
    price: "Custom",
    period: "contact us",
    desc: "For teams validating at scale",
    color: "#7c3aed",
    highlight: false,
    features: [
      "Unlimited projects",
      "Full API access",
      "Team collaboration",
      "Dedicated AI instance",
      "Dedicated support",
      "SLA & compliance",
    ],
    cta: "Contact Sales",
  },
];

function PricingCard({ plan, index }: { plan: typeof PLANS[0]; index: number }) {
  const { ref, inView } = useInView(0.1);

  return (
    <motion.div
      ref={ref as React.RefObject<HTMLDivElement>}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className={`relative p-6 border flex flex-col ${
        plan.highlight
          ? "border-[#09daed]/60 bg-gradient-to-b from-[#09daed]/8 to-transparent scale-[1.03] z-10"
          : "border-white/10 bg-white/2"
      }`}
      style={plan.highlight ? { boxShadow: "0 0 40px rgba(9,218,237,0.15)" } : {}}
    >
      {plan.highlight && (
        <div className="absolute -top-px left-0 right-0 h-0.5 bg-[#09daed]" />
      )}
      {plan.highlight && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#09daed] text-black text-[10px] font-bold px-3 py-1 tracking-widest">
          MOST POPULAR
        </div>
      )}

      <div className="flex items-start justify-between mb-6">
        <div>
          <div className="text-white font-bold text-lg">{plan.name}</div>
          <div className="text-white/50 text-xs mt-0.5">{plan.desc}</div>
        </div>
        <div
          className="text-[9px] font-bold tracking-widest px-2 py-0.5 border"
          style={{ color: plan.color, borderColor: `${plan.color}40`, background: `${plan.color}10` }}
        >
          {plan.badge}
        </div>
      </div>

      <div className="mb-6">
        <div className="flex items-baseline gap-1">
          <span className="text-3xl font-bold text-white">{plan.price}</span>
          <span className="text-white/40 text-sm">/ {plan.period}</span>
        </div>
      </div>

      <ul className="space-y-2.5 mb-8 flex-1">
        {plan.features.map((feat) => (
          <li key={feat} className="flex items-center gap-2.5 text-sm text-white/70">
            <div className="w-1 h-1 flex-shrink-0" style={{ background: plan.color }} />
            {feat}
          </li>
        ))}
      </ul>

      <button
        className={`w-full py-3 text-sm font-semibold transition-all duration-200 ${
          plan.highlight
            ? "bg-[#09daed] text-black hover:bg-[#07c4d4]"
            : "border border-white/20 text-white hover:border-white/40"
        }`}
      >
        {plan.cta}
      </button>
    </motion.div>
  );
}

export default function PricingSection() {
  const { ref, inView } = useInView(0.1);

  return (
    <section id="pricing" className="section-dark py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div ref={ref as React.RefObject<HTMLDivElement>} className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            className="text-[#09daed] text-xs font-medium tracking-widest uppercase mb-4"
          >
            Pricing
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl font-bold text-white mb-4"
          >
            Start free. Scale when ready.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="text-white/50 max-w-lg mx-auto"
          >
            No hidden fees. Cancel anytime. Your first validation loop is on us.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {PLANS.map((plan, i) => (
            <PricingCard key={plan.name} plan={plan} index={i} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-12 text-white/40 text-sm"
        >
          30-day money-back guarantee • No setup fees • Cancel anytime
        </motion.div>
      </div>

      {/* Section separator */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#09daed]/20 to-transparent" />
    </section>
  );
}
