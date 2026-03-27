import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useInView } from "../../hooks/useScrollProgress";
import { gsap, ScrollTrigger } from "../../lib/gsap";

const avatars = [
  { name: "Alex", color: "#09daed", x: "15%", y: "30%" },
  { name: "Sam", color: "#7c3aed", x: "60%", y: "20%" },
  { name: "Jordan", color: "#f59e0b", x: "80%", y: "50%" },
  { name: "Taylor", color: "#10b981", x: "25%", y: "65%" },
  { name: "Casey", color: "#ef4444", x: "55%", y: "70%" },
];

const bubbles = [
  { text: "How does this work?", confused: false, x: "18%", y: "20%" },
  { text: "Is this for enterprise?", confused: false, x: "55%", y: "10%" },
  { text: "What's the pricing?", confused: true, x: "75%", y: "38%" },
  { text: "Can I integrate with Slack?", confused: true, x: "20%", y: "52%" },
  { text: "Love the validation loop!", confused: false, x: "50%", y: "60%" },
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
    <section ref={sectionRef} className="relative section-mid py-24 overflow-hidden">
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
            className="text-3xl md:text-4xl font-bold text-white"
          >
            Every question reveals what your idea is missing.
          </motion.h2>
        </div>

        <div className="relative h-[480px] border border-white/5 overflow-hidden"
          style={{ background: "rgba(9,218,237,0.02)" }}
        >
          {/* Grid background */}
          <div className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage: `linear-gradient(rgba(9,218,237,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(9,218,237,0.5) 1px, transparent 1px)`,
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
                className="w-10 h-10 flex items-center justify-center text-xs font-bold text-black"
                style={{ background: avatar.color }}
              >
                {avatar.name[0]}
              </div>
              <div className="w-2 h-2 bg-green-400 absolute -bottom-0.5 -right-0.5" />
            </motion.div>
          ))}

          {/* Chat bubbles */}
          {bubbles.map((bubble, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10, scale: 0.9 }}
              animate={phase >= 1 ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.4, delay: i * 0.15 }}
              className="absolute max-w-[160px]"
              style={{ left: bubble.x, top: bubble.y }}
            >
              <div
                className={`px-3 py-2 text-xs border ${
                  bubble.confused
                    ? "bg-red-500/10 border-red-500/30 text-red-300"
                    : "bg-[#09daed]/10 border-[#09daed]/20 text-white/80"
                }`}
              >
                {bubble.text}
                {bubble.confused && (
                  <span className="ml-1 text-red-400">⚠</span>
                )}
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
              <div className="border border-[#09daed]/40 bg-[#09daed]/5 p-4">
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
                        <span className="text-white/50 text-[10px]">{item.label}</span>
                        <span className="text-white/80 text-[10px]">{item.val}%</span>
                      </div>
                      <div className="h-1 bg-white/5">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${item.val}%` }}
                          transition={{ duration: 0.8, delay: 0.2 }}
                          className="h-full"
                          style={{ background: item.color }}
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
            className="absolute left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#09daed]/60 to-transparent pointer-events-none"
            animate={{ top: ["0%", "100%"] }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          />
        </div>
      </div>

      {/* Section separator */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#09daed]/20 to-transparent" />
    </section>
  );
}
