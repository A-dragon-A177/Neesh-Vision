import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useInView } from "../../hooks/useScrollProgress";
import { gsap, ScrollTrigger } from "../../lib/gsap";

function ChaosSide() {
  const items = [
    { text: "❌ No clear value prop", x: "10%", y: "15%" },
    { text: "⚠ Confused users", x: "50%", y: "10%" },
    { text: "❌ Wrong feature built", x: "20%", y: "40%" },
    { text: "⚠ Vague feedback", x: "55%", y: "38%" },
    { text: "❌ 6 months wasted", x: "10%", y: "65%" },
    { text: "⚠ No market signal", x: "45%", y: "65%" },
  ];
  return (
    <div className="relative h-full min-h-[320px]" style={{ background: "linear-gradient(135deg, #1a0505, #200a0a)" }}>
      <div className="absolute inset-0 opacity-[0.15]"
        style={{
          backgroundImage: `linear-gradient(rgba(239,68,68,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(239,68,68,0.4) 1px, transparent 1px)`,
          backgroundSize: "30px 30px",
        }}
      />
      {items.map((item, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: i * 0.1 }}
          className="absolute text-xs border border-red-500/20 px-2 py-1 text-red-300/80 bg-red-500/5"
          style={{ left: item.x, top: item.y }}
        >
          {item.text}
        </motion.div>
      ))}
      <div className="absolute bottom-6 left-6 right-6 border border-red-500/20 bg-red-500/5 p-3">
        <div className="text-red-400 text-xs font-bold mb-1">Status: LOST</div>
        <div className="text-red-300/60 text-xs">No clear direction. Building blindly.</div>
      </div>
      {/* Random noise lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-10">
        {[1, 2, 3, 4, 5].map(i => (
          <line key={i} x1={`${Math.random() * 100}%`} y1={`${Math.random() * 100}%`} x2={`${Math.random() * 100}%`} y2={`${Math.random() * 100}%`} stroke="#ef4444" strokeWidth="0.5" />
        ))}
      </svg>
    </div>
  );
}

function ClaritySide() {
  const items = [
    { label: "Clarity Index", val: 87, color: "#09daed" },
    { label: "Market Fit", val: 92, color: "#10b981" },
    { label: "Gap Closed", val: 78, color: "#09daed" },
  ];
  return (
    <div className="relative h-full min-h-[320px]" style={{ background: "linear-gradient(135deg, #030d12, #051a22)" }}>
      <div className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage: `linear-gradient(#09daed 1px, transparent 1px), linear-gradient(90deg, #09daed 1px, transparent 1px)`,
          backgroundSize: "30px 30px",
        }}
      />
      <div className="absolute inset-4 border border-[#09daed]/10 flex flex-col justify-between p-4">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-2 h-2 bg-[#09daed] animate-pulse" />
            <span className="text-[#09daed] text-xs font-semibold tracking-widest">VALIDATION LOOP ACTIVE</span>
          </div>
          <div className="space-y-3">
            {items.map((item) => (
              <div key={item.label}>
                <div className="flex justify-between mb-1">
                  <span className="text-white/60 text-xs">{item.label}</span>
                  <span className="text-white text-xs font-bold">{item.val}%</span>
                </div>
                <div className="h-1.5 bg-white/5">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${item.val}%` }}
                    transition={{ duration: 1, delay: 0.3 }}
                    className="h-full"
                    style={{ background: item.color, boxShadow: `0 0 8px ${item.color}60` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="border border-[#09daed]/20 bg-[#09daed]/5 p-3">
          <div className="text-[#09daed] text-xs font-bold mb-1">✓ Idea Validated</div>
          <div className="text-white/50 text-xs">Clear signal. Ready to build.</div>
        </div>
      </div>
    </div>
  );
}

export default function TransformSection() {
  const { ref, inView } = useInView(0.2);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [sweepX, setSweepX] = useState(50);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    ScrollTrigger.create({
      trigger: section,
      start: "top 70%",
      end: "bottom 30%",
      scrub: 1,
      onUpdate: (self) => {
        setSweepX(Math.min(50 + self.progress * 50, 100));
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => {
        if (t.vars.trigger === section) t.kill();
      });
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative section-dark py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div ref={ref as React.RefObject<HTMLDivElement>} className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            className="text-[#09daed] text-xs font-medium tracking-widest uppercase mb-4"
          >
            Transformation
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl font-bold text-white"
          >
            From idea →{" "}
            <span className="text-[#09daed]">validated product.</span>
          </motion.h2>
        </div>

        <div className="relative">
          <div className="grid grid-cols-2 gap-0 overflow-hidden">
            <div>
              <div className="text-xs font-bold text-red-400 tracking-widest uppercase mb-3 flex items-center gap-2">
                <div className="w-3 h-0.5 bg-red-400" />
                Before: Chaos
              </div>
              <ChaosSide />
            </div>
            <div>
              <div className="text-xs font-bold text-[#09daed] tracking-widest uppercase mb-3 flex items-center gap-2">
                <div className="w-3 h-0.5 bg-[#09daed]" />
                After: Clarity
              </div>
              <ClaritySide />
            </div>
          </div>

          {/* Sweep line */}
          <div
            className="absolute top-7 bottom-0 w-0.5 pointer-events-none z-10 transition-all duration-200"
            style={{
              left: `${sweepX}%`,
              background: "linear-gradient(to bottom, #09daed, #09daed88, transparent)",
              boxShadow: "0 0 10px rgba(9,218,237,0.5)",
            }}
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 border border-[#09daed] bg-[#050a12] flex items-center justify-center">
              <div className="w-1.5 h-1.5 bg-[#09daed]" />
            </div>
          </div>
        </div>
      </div>

      {/* Section separator */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#09daed]/20 to-transparent" />
    </section>
  );
}
