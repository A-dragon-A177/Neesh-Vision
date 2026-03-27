import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "../../hooks/useScrollProgress";
import { gsap, ScrollTrigger } from "../../lib/gsap";

const NODES = [
  { label: "Ingest", angle: -90, desc: "Raw ideas, docs, notes" },
  { label: "Generate", angle: -18, desc: "Blog + chatbot creation" },
  { label: "Engage", angle: 54, desc: "Real user interactions" },
  { label: "Detect", angle: 126, desc: "Gap & confusion signals" },
  { label: "Refine", angle: 198, desc: "AI-driven improvements" },
];

function polarToXY(angleDeg: number, r: number) {
  const rad = (angleDeg * Math.PI) / 180;
  return { x: r * Math.cos(rad), y: r * Math.sin(rad) };
}

export default function ProblemLoopSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeNode, setActiveNode] = useState(-1);
  const { ref: textRef, inView } = useInView(0.3);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top 80%",
        end: "bottom 20%",
        scrub: 1,
        onUpdate: (self) => {
          const idx = Math.floor(self.progress * 5);
          setActiveNode(Math.min(idx, 4));
        },
      },
    });

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach((t) => {
        if (t.vars.trigger === section) t.kill();
      });
    };
  }, []);

  const R = 140;
  const cx = 175;
  const cy = 175;

  return (
    <section ref={sectionRef} className="relative section-dark py-24 overflow-hidden">
      <div className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(#09daed 1px, transparent 1px)`,
          backgroundSize: "32px 32px",
        }}
      />

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Loop Diagram */}
          <div className="flex items-center justify-center">
            <div className="relative" style={{ width: 350, height: 350 }}>
              <svg width="350" height="350" className="absolute inset-0">
                {/* Outer ring */}
                <circle cx={cx} cy={cy} r={R} fill="none" stroke="rgba(9,218,237,0.1)" strokeWidth="1" />
                <circle cx={cx} cy={cy} r={R} fill="none" stroke="rgba(9,218,237,0.3)" strokeWidth="1"
                  strokeDasharray={`${2 * Math.PI * R * ((activeNode + 1) / 5)} ${2 * Math.PI * R}`}
                  className="transition-all duration-700"
                  style={{ transform: `rotate(-90deg)`, transformOrigin: `${cx}px ${cy}px` }}
                />
                {/* Connection lines */}
                {NODES.map((node, i) => {
                  const from = polarToXY(node.angle, R);
                  const to = polarToXY(NODES[(i + 1) % NODES.length].angle, R);
                  return (
                    <line
                      key={`line-${i}`}
                      x1={cx + from.x} y1={cy + from.y}
                      x2={cx + to.x} y2={cy + to.y}
                      stroke={i <= activeNode ? "rgba(9,218,237,0.4)" : "rgba(255,255,255,0.05)"}
                      strokeWidth="1"
                      className="transition-all duration-500"
                    />
                  );
                })}
              </svg>

              {/* Center */}
              <div className="absolute" style={{ left: cx - 40, top: cy - 40 }}>
                <div
                  className="w-20 h-20 border border-[#09daed]/30 flex items-center justify-center"
                  style={{ background: "rgba(9,218,237,0.05)" }}
                >
                  <div className="w-8 h-8 bg-[#09daed]/80 flex items-center justify-center">
                    <span className="text-black text-xs font-bold">AI</span>
                  </div>
                </div>
              </div>

              {/* Nodes */}
              {NODES.map((node, i) => {
                const { x, y } = polarToXY(node.angle, R);
                const isActive = i <= activeNode;
                return (
                  <div
                    key={node.label}
                    className="absolute flex flex-col items-center"
                    style={{
                      left: cx + x - 32,
                      top: cy + y - 32,
                      width: 64,
                    }}
                  >
                    <div
                      className={`w-14 h-14 border flex items-center justify-center text-xs font-semibold transition-all duration-500 ${
                        isActive
                          ? "border-[#09daed] bg-[#09daed]/20 text-[#09daed] shadow-[0_0_20px_rgba(9,218,237,0.4)]"
                          : "border-white/10 bg-white/5 text-white/30"
                      }`}
                    >
                      <div className="text-center">
                        <div className="text-[10px] font-bold">{i + 1}</div>
                        <div className="text-[9px] leading-tight">{node.label}</div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Text */}
          <div ref={textRef as React.RefObject<HTMLDivElement>} className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7 }}
            >
              <div className="text-[#09daed] text-xs font-medium tracking-widest uppercase mb-4">The Problem</div>
              <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight mb-4">
                90% of startups fail because nobody understands the idea.
              </h2>
              <p className="text-white/50 text-lg">
                Feedback is messy. Signals are invisible.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="border-l-2 border-[#09daed] pl-4"
            >
              <p className="text-white/80 text-xl font-medium">
                Neesh AI turns confusion into clarity.
              </p>
            </motion.div>

            <div className="space-y-3">
              {NODES.map((node, i) => (
                <motion.div
                  key={node.label}
                  initial={{ opacity: 0, x: 20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.1 * i }}
                  className={`flex items-center gap-3 p-3 border transition-all duration-500 ${
                    i <= activeNode
                      ? "border-[#09daed]/30 bg-[#09daed]/5"
                      : "border-white/5 bg-transparent"
                  }`}
                >
                  <div className={`w-6 h-6 flex items-center justify-center text-xs font-bold transition-all duration-500 ${
                    i <= activeNode ? "bg-[#09daed] text-black" : "bg-white/5 text-white/30"
                  }`}>
                    {i + 1}
                  </div>
                  <div>
                    <div className={`text-sm font-semibold transition-colors duration-500 ${i <= activeNode ? "text-white" : "text-white/30"}`}>
                      {node.label}
                    </div>
                    <div className="text-xs text-white/40">{node.desc}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
