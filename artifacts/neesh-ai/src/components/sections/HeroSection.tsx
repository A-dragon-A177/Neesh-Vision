import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

function DashboardPreview2D() {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <div className="w-full max-w-sm animate-float-slow">
        {/* Dashboard card */}
        <div className="glass-dark border border-[#09daed]/20 p-4">
          {/* Header bar */}
          <div className="flex items-center gap-2 mb-4 pb-3 border-b border-white/5">
            <div className="w-2 h-2 bg-[#09daed] animate-pulse" />
            <span className="text-[#09daed] text-xs font-mono tracking-widest">VALIDATION.COMMAND.CENTER</span>
          </div>
          {/* Metrics row */}
          <div className="grid grid-cols-3 gap-2 mb-4">
            {[
              { label: "Clarity", val: "87%", color: "#09daed" },
              { label: "Signal", val: "72%", color: "#7c3aed" },
              { label: "Gaps", val: "3", color: "#f59e0b" },
            ].map((m) => (
              <div key={m.label} className="p-2 border border-white/5 bg-white/2 text-center">
                <div className="text-lg font-bold" style={{ color: m.color }}>{m.val}</div>
                <div className="text-[10px] text-white/40">{m.label}</div>
              </div>
            ))}
          </div>
          {/* Bars */}
          <div className="space-y-2">
            {[
              { label: "User Clarity", val: 87, color: "#09daed" },
              { label: "Market Fit", val: 72, color: "#7c3aed" },
              { label: "Engagement", val: 91, color: "#10b981" },
            ].map((bar, i) => (
              <div key={bar.label}>
                <div className="flex justify-between mb-1">
                  <span className="text-[10px] text-white/50">{bar.label}</span>
                  <span className="text-[10px] text-white/80">{bar.val}%</span>
                </div>
                <div className="h-1 bg-white/5">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${bar.val}%` }}
                    transition={{ duration: 1.2, delay: 0.5 + i * 0.2, ease: "easeOut" }}
                    style={{ background: bar.color, height: "100%", boxShadow: `0 0 8px ${bar.color}60` }}
                  />
                </div>
              </div>
            ))}
          </div>
          {/* Chat bubbles */}
          <div className="mt-4 space-y-2">
            {[
              { text: "How does pricing work?", confused: true },
              { text: "Love the validation loop!", confused: false },
            ].map((bubble, i) => (
              <div key={i} className={`px-3 py-1.5 text-[10px] border ${bubble.confused ? "border-red-500/20 text-red-300/70 bg-red-500/5" : "border-[#09daed]/20 text-white/60 bg-[#09daed]/5"}`}>
                {bubble.text}
              </div>
            ))}
          </div>
        </div>
        {/* Floating accent cards */}
        <div className="absolute -top-4 -right-4 glass border border-[#09daed]/20 px-3 py-2 text-[10px] text-[#09daed]">
          ◎ Gap Detected
        </div>
        <div className="absolute -bottom-3 -left-3 glass border border-white/10 px-3 py-2 text-[10px] text-white/60">
          ⊕ 12 Visitors Active
        </div>
      </div>
    </div>
  );
}

const ideaFragments = [
  { text: "User Research", color: "rgba(9,218,237,0.12)", x: "8%", y: "22%" },
  { text: "MVP Scope", color: "rgba(255,255,255,0.05)", x: "72%", y: "17%" },
  { text: "Market Fit?", color: "rgba(9,218,237,0.08)", x: "78%", y: "58%" },
  { text: "Pricing Model", color: "rgba(255,255,255,0.04)", x: "4%", y: "62%" },
  { text: "Target Users", color: "rgba(9,218,237,0.07)", x: "42%", y: "78%" },
  { text: "Feature Priority", color: "rgba(255,255,255,0.05)", x: "18%", y: "48%" },
];

function GlitchCard({ text, color, x, y, delay }: { text: string; color: string; x: string; y: string; delay: number }) {
  const [glitching, setGlitching] = useState(false);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    let glitchTimeout: ReturnType<typeof setTimeout>;
    const timer = setTimeout(() => {
      interval = setInterval(() => {
        setGlitching(true);
        glitchTimeout = setTimeout(() => setGlitching(false), 800);
      }, 2500 + Math.random() * 3000);
    }, delay);
    return () => {
      clearTimeout(timer);
      clearTimeout(glitchTimeout);
      clearInterval(interval);
    };
  }, [delay]);

  return (
    <div
      className={`absolute px-3 py-2 text-xs text-white/50 border border-white/8 font-mono hidden md:block ${glitching ? "animate-glitch" : "animate-float"}`}
      style={{ left: x, top: y, background: color, animationDelay: `${delay}ms` }}
    >
      {text}
    </div>
  );
}

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.6], [0, -80]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen section-dark flex items-center overflow-hidden"
    >
      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: `linear-gradient(#09daed 1px, transparent 1px), linear-gradient(90deg, #09daed 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Radial glows */}
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-[#09daed]/4 blur-[150px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/3 w-72 h-72 bg-[#09daed]/3 blur-[100px] pointer-events-none" />

      {/* Floating idea fragments */}
      {ideaFragments.map((frag, i) => (
        <GlitchCard key={i} {...frag} delay={i * 500} />
      ))}

      <motion.div
        style={{ opacity, y }}
        className="relative z-10 max-w-7xl mx-auto px-6 pt-24 pb-16 w-full"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left — Copy */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 border border-[#09daed]/30 bg-[#09daed]/5 mb-6"
            >
              <div className="w-1.5 h-1.5 bg-[#09daed] animate-pulse" />
              <span className="text-[#09daed] text-xs font-medium tracking-widest uppercase">AI-Powered Validation</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.7 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.1] tracking-tight mb-6"
            >
              Stop Building{" "}
              <span className="text-[#09daed] cyan-text-glow">in the Dark.</span>
              <br />
              Start Validating{" "}
              <span className="relative inline-block">
                with AI.
                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-[#09daed]" />
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="text-white/60 text-lg leading-relaxed mb-8 max-w-lg"
            >
              Upload your raw ideas, generate a live blog + chatbot, and close the gap between what you think users want and what they actually need.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="flex flex-wrap gap-3"
            >
              <button className="bg-[#09daed] text-black font-semibold px-6 py-3 text-sm hover:bg-[#07c4d4] transition-all duration-200 animate-pulse-glow">
                Start Validating for Free
              </button>
              <button className="border border-white/20 text-white px-6 py-3 text-sm hover:border-[#09daed]/50 hover:text-[#09daed] transition-all duration-200 flex items-center gap-2">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
                Watch Demo
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.6 }}
              className="flex items-center gap-6 mt-10 pt-6 border-t border-white/5"
            >
              {[["2,400+", "Ideas Validated"], ["89%", "Clarity Gain"], ["3x", "Faster Iteration"]].map(([val, label]) => (
                <div key={label}>
                  <div className="text-xl font-bold text-[#09daed]">{val}</div>
                  <div className="text-xs text-white/40">{label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right — Dashboard Preview */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="relative h-80 lg:h-[420px]"
          >
            <DashboardPreview2D />
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-white/30 text-xs tracking-widest uppercase">Scroll</span>
        <div className="w-0.5 h-8 bg-gradient-to-b from-[#09daed]/60 to-transparent animate-pulse" />
      </motion.div>
    </section>
  );
}
