import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useInView } from "../../hooks/useScrollProgress";
import { gsap, ScrollTrigger } from "../../lib/gsap";

const avatars = [
  {
    name: "Alex",
    color: "#09daed",
    x: "12%",
    y: "25%",
    icon: (
      <svg viewBox="0 0 24 24" fill="white" width="16" height="16">
        <path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z" />
      </svg>
    ),
  },
  {
    name: "Sam",
    color: "#7c3aed",
    x: "58%",
    y: "18%",
    icon: (
      <svg viewBox="0 0 24 24" fill="white" width="16" height="16">
        <path d="M4 20h4V12H4v8zm6 0h4V4h-4v16zm6 0h4v-6h-4v6z" />
      </svg>
    ),
  },
  {
    name: "Jordan",
    color: "#f59e0b",
    x: "78%",
    y: "48%",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" width="16" height="16">
        <circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="4" /><circle cx="12" cy="12" r="1" fill="white" />
      </svg>
    ),
  },
  {
    name: "Taylor",
    color: "#10b981",
    x: "22%",
    y: "62%",
    icon: (
      <svg viewBox="0 0 24 24" fill="white" width="16" height="16">
        <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" />
      </svg>
    ),
  },
  {
    name: "Casey",
    color: "#ef4444",
    x: "52%",
    y: "66%",
    icon: (
      <svg viewBox="0 0 24 24" fill="white" width="16" height="16">
        <path d="M7 2v11h3v9l7-12h-4l4-8z" />
      </svg>
    ),
  },
  {
    name: "Morgan",
    color: "#8b5cf6",
    x: "38%",
    y: "38%",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" width="16" height="16">
        <circle cx="11" cy="11" r="7" /><path d="m21 21-4.35-4.35" />
      </svg>
    ),
  },
];

const bubbles = [
  { text: "How does this actually work?", confused: false, x: "14%", y: "14%" },
  { text: "What's the pricing model?", confused: true, x: "52%", y: "8%" },
  { text: "Can I integrate with Slack?", confused: true, x: "72%", y: "34%" },
  { text: "Love the validation loop!", confused: false, x: "46%", y: "55%" },
  { text: "Is there a free trial?", confused: true, x: "16%", y: "48%" },
  { text: "How long does setup take?", confused: true, x: "62%", y: "76%" },
  { text: "Does it support my niche?", confused: false, x: "8%", y: "76%" },
  { text: "What kind of data does it collect?", confused: true, x: "34%", y: "84%" },
  { text: "This is exactly what I needed!", confused: false, x: "70%", y: "14%" },
];

export default function ProductSimSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { ref: titleRef, inView } = useInView(0.2);
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    ScrollTrigger.create({
      trigger: section,
      start: "top 70%",
      end: "bottom 30%",
      scrub: 1,
      onUpdate: (self) => {
        setPhase(Math.floor(self.progress * 3));
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => {
        if (t.vars.trigger === section) t.kill();
      });
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative bg-white py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div ref={titleRef as React.RefObject<HTMLDivElement>} className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-[#09daed] text-xs font-medium tracking-widest uppercase mb-4"
          >
            Product Simulation
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl md:text-4xl font-bold text-gray-900"
          >
            Every question reveals what your idea is missing.
          </motion.h2>
        </div>

        <div
          className="relative h-[520px] border border-gray-100 overflow-hidden"
          style={{ background: "linear-gradient(135deg, #f8fafd, #f0fdfe)" }}
        >
          {/* Grid background */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `linear-gradient(rgba(9,218,237,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(9,218,237,0.8) 1px, transparent 1px)`,
              backgroundSize: "40px 40px",
            }}
          />

          {/* Avatars */}
          {avatars.map((avatar, i) => (
            <motion.div
              key={avatar.name}
              initial={{ opacity: 0, scale: 0 }}
              animate={phase >= 0 ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="absolute"
              style={{ left: avatar.x, top: avatar.y }}
            >
              <div
                className="w-10 h-10 flex items-center justify-center"
                style={{ background: avatar.color, boxShadow: `0 4px 12px ${avatar.color}40` }}
              >
                {avatar.icon}
              </div>
              <div className="w-2 h-2 bg-green-400 absolute -bottom-0.5 -right-0.5 border border-white" />
            </motion.div>
          ))}

          {/* Chat bubbles */}
          {bubbles.map((bubble, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10, scale: 0.9 }}
              animate={phase >= 1 ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.4, delay: i * 0.12 }}
              className="absolute max-w-[180px]"
              style={{ left: bubble.x, top: bubble.y }}
            >
              <div
                className={`px-3 py-2 text-xs border ${
                  bubble.confused
                    ? "bg-red-50 border-red-200 text-red-600"
                    : "bg-[#09daed]/6 border-[#09daed]/20 text-gray-700"
                }`}
                style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}
              >
                {bubble.text}
                {bubble.confused && <span className="ml-1 text-red-400">⚠</span>}
              </div>
            </motion.div>
          ))}

          {/* Gap Detection Overlay */}
          {phase >= 2 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="absolute bottom-6 left-1/2 -translate-x-1/2 w-11/12"
            >
              <div
                className="border border-[#09daed]/30 bg-white/90 p-4 backdrop-blur-sm"
                style={{ boxShadow: "0 8px 32px rgba(9,218,237,0.1)" }}
              >
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-2 h-2 bg-[#09daed] animate-pulse" />
                  <span className="text-[#09daed] text-xs font-semibold tracking-widest uppercase">Gap Detection Active</span>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { label: "Pricing Clarity", val: 34, color: "#ef4444" },
                    { label: "Integration Docs", val: 52, color: "#f59e0b" },
                    { label: "Use Cases", val: 78, color: "#09daed" },
                  ].map((item) => (
                    <div key={item.label}>
                      <div className="flex justify-between mb-1">
                        <span className="text-gray-500 text-[10px]">{item.label}</span>
                        <span className="text-gray-700 text-[10px] font-semibold">{item.val}%</span>
                      </div>
                      <div className="h-1 bg-gray-100">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${item.val}%` }}
                          transition={{ duration: 0.8, delay: 0.2 }}
                          className="h-full"
                          style={{ background: item.color, boxShadow: `0 0 6px ${item.color}40` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* Scanning line */}
          <motion.div
            className="absolute left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#09daed]/40 to-transparent pointer-events-none"
            animate={{ top: ["0%", "100%"] }}
            transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
          />
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#09daed]/20 to-transparent" />
    </section>
  );
}
