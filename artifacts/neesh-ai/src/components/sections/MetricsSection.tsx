import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useInView } from "../../hooks/useScrollProgress";

const METRICS = [
  { label: "Clarity Index", value: 87, color: "#09daed", desc: "How well users understand your idea" },
  { label: "Market Signal", value: 72, color: "#7c3aed", desc: "Alignment with real market demand" },
  { label: "Gap Velocity", value: 61, color: "#f59e0b", desc: "Speed of detecting missing content" },
  { label: "Validation Momentum", value: 94, color: "#10b981", desc: "Forward movement in validation loop" },
];

function CircleProgress({ value, color, size = 100 }: { value: number; color: string; size?: number }) {
  const { ref, inView } = useInView(0.3);
  const [animated, setAnimated] = useState(false);
  const r = (size - 12) / 2;
  const circ = 2 * Math.PI * r;

  useEffect(() => {
    if (inView) setAnimated(true);
  }, [inView]);

  return (
    <svg ref={ref as React.RefObject<SVGSVGElement>} width={size} height={size} className="progress-ring">
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="8" />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke={color}
        strokeWidth="8"
        strokeLinecap="square"
        strokeDasharray={circ}
        strokeDashoffset={animated ? circ * (1 - value / 100) : circ}
        style={{ transition: "stroke-dashoffset 1.5s cubic-bezier(0.4, 0, 0.2, 1)", filter: `drop-shadow(0 0 6px ${color})` }}
      />
    </svg>
  );
}

function ParticleField() {
  const particles = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    delay: Math.random() * 2,
    duration: Math.random() * 2 + 1.5,
  }));

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute bg-[#09daed]"
          style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.size, height: p.size, opacity: 0.4 }}
          animate={{ y: [0, -40, 0], opacity: [0.4, 0.8, 0] }}
          transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

export default function MetricsSection() {
  const { ref, inView } = useInView(0.2);

  return (
    <section className="relative section-dark py-24 overflow-hidden">
      <ParticleField />

      {/* AI Core Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#09daed]/5 blur-[100px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-[#09daed]/8 blur-[50px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div ref={ref as React.RefObject<HTMLDivElement>} className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            className="text-[#09daed] text-xs font-medium tracking-widest uppercase mb-4"
          >
            AI Metrics
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl font-bold text-white mb-4"
          >
            Not guesses.{" "}
            <span className="text-[#09daed]">Measured validation.</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {METRICS.map((metric, i) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="glass-dark p-6 flex flex-col items-center text-center border border-white/5"
            >
              <div className="relative mb-4">
                <CircleProgress value={metric.value} color={metric.color} size={96} />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-xl font-bold text-white">{metric.value}</span>
                </div>
              </div>
              <div className="text-sm font-semibold text-white mb-1">{metric.label}</div>
              <div className="text-xs text-white/40 text-center leading-relaxed">{metric.desc}</div>

              {/* Mini sparkline */}
              <div className="mt-3 w-full h-8 flex items-end gap-0.5">
                {Array.from({ length: 12 }, (_, j) => (
                  <motion.div
                    key={j}
                    className="flex-1"
                    style={{ background: metric.color, opacity: 0.3 + (j / 12) * 0.7 }}
                    initial={{ height: 0 }}
                    animate={inView ? { height: `${20 + Math.random() * 60}%` } : { height: 0 }}
                    transition={{ duration: 0.4, delay: i * 0.15 + j * 0.04 }}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
