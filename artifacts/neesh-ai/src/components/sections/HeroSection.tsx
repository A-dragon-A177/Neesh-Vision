import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

function DashboardPreview() {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <div className="w-full max-w-sm animate-float-slow">
        <div
          className="bg-white border border-[#09daed]/20 p-5"
          style={{ boxShadow: "0 20px 60px rgba(9,218,237,0.1), 0 4px 20px rgba(0,0,0,0.06)" }}
        >
          <div className="flex items-center gap-2 mb-4 pb-3 border-b border-gray-100">
            <div className="w-2 h-2 bg-[#09daed] animate-pulse" />
            <span className="text-[#09daed] text-xs font-mono tracking-widest">VALIDATION.COMMAND.CENTER</span>
          </div>
          <div className="grid grid-cols-3 gap-2 mb-4">
            {[
              { label: "Clarity", val: "87%", color: "#09daed" },
              { label: "Signal", val: "72%", color: "#7c3aed" },
              { label: "Gaps", val: "3", color: "#f59e0b" },
            ].map((m) => (
              <div key={m.label} className="p-2 border border-gray-100 bg-gray-50 text-center">
                <div className="text-lg font-bold" style={{ color: m.color }}>{m.val}</div>
                <div className="text-[10px] text-gray-400">{m.label}</div>
              </div>
            ))}
          </div>
          <div className="space-y-2">
            {[
              { label: "User Clarity", val: 87, color: "#09daed" },
              { label: "Market Fit", val: 72, color: "#7c3aed" },
              { label: "Engagement", val: 91, color: "#10b981" },
            ].map((bar, i) => (
              <div key={bar.label}>
                <div className="flex justify-between mb-1">
                  <span className="text-[10px] text-gray-500">{bar.label}</span>
                  <span className="text-[10px] text-gray-700 font-semibold">{bar.val}%</span>
                </div>
                <div className="h-1 bg-gray-100">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${bar.val}%` }}
                    transition={{ duration: 1.2, delay: 0.5 + i * 0.2, ease: "easeOut" }}
                    style={{ background: bar.color, height: "100%", boxShadow: `0 0 8px ${bar.color}40` }}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 space-y-2">
            {[
              { text: "Why is the onboarding confusing?", confused: true },
              { text: "Love how the chatbot explains it!", confused: false },
              { text: "What does gap detection actually do?", confused: true },
            ].map((bubble, i) => (
              <div
                key={i}
                className={`px-3 py-1.5 text-[10px] border ${
                  bubble.confused
                    ? "border-red-200 text-red-500 bg-red-50"
                    : "border-[#09daed]/20 text-[#09daed] bg-[#09daed]/5"
                }`}
              >
                {bubble.text}
              </div>
            ))}
          </div>
        </div>
        <div className="absolute -top-4 -right-4 glass border border-[#09daed]/20 px-3 py-2 text-[10px] text-[#09daed] bg-white">
          ◎ Gap Detected
        </div>
        <div className="absolute -bottom-3 -left-3 bg-white border border-gray-200 px-3 py-2 text-[10px] text-gray-500">
          ⊕ 12 Visitors Active
        </div>
      </div>
    </div>
  );
}

const VALIDATION_CARDS = [
  {
    label: "Gap Detected",
    value: "Pricing Clarity",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" width="16" height="16">
        <circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="4" /><circle cx="12" cy="12" r="1" fill="#ef4444" />
      </svg>
    ),
    color: "#ef4444",
    rotX: -14,
    rotY: 18,
    x: "62%",
    y: "7%",
    delay: 0,
  },
  {
    label: "Market Signal",
    value: "87% Strong",
    icon: (
      <svg viewBox="0 0 24 24" fill="#10b981" width="16" height="16">
        <path d="M4 20h4V12H4v8zm6 0h4V4h-4v16zm6 0h4v-6h-4v6z" />
      </svg>
    ),
    color: "#10b981",
    rotX: 10,
    rotY: -16,
    x: "60%",
    y: "84%",
    delay: 0.4,
  },
  {
    label: "Idea Score",
    value: "A+ Validated",
    icon: (
      <svg viewBox="0 0 24 24" fill="#7c3aed" width="16" height="16">
        <path d="M9 21c0 .5.4 1 1 1h4c.6 0 1-.5 1-1v-1H9v1zm3-19C8.1 2 5 5.1 5 9c0 2.4 1.2 4.5 3 5.7V17c0 .5.4 1 1 1h6c.6 0 1-.5 1-1v-2.3c1.8-1.3 3-3.4 3-5.7 0-3.9-3.1-7-7-7z" />
      </svg>
    ),
    color: "#7c3aed",
    rotX: -8,
    rotY: 14,
    x: "79%",
    y: "7%",
    delay: 0.8,
  },
  {
    label: "User Clarity",
    value: "94 / 100",
    icon: (
      <svg viewBox="0 0 24 24" fill="#09daed" width="16" height="16">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
      </svg>
    ),
    color: "#09daed",
    rotX: 12,
    rotY: -12,
    x: "75%",
    y: "84%",
    delay: 0.2,
  },
  {
    label: "Blog Published",
    value: "12 Responses",
    icon: (
      <svg viewBox="0 0 24 24" fill="#f59e0b" width="16" height="16">
        <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z" />
      </svg>
    ),
    color: "#f59e0b",
    rotX: -10,
    rotY: 16,
    x: "2%",
    y: "78%",
    delay: 0.6,
  },
  {
    label: "Signals Found",
    value: "8 new today",
    icon: (
      <svg viewBox="0 0 24 24" fill="#09daed" width="16" height="16">
        <path d="M7 2v11h3v9l7-12h-4l4-8z" />
      </svg>
    ),
    color: "#09daed",
    rotX: 6,
    rotY: -14,
    x: "2%",
    y: "91%",
    delay: 1.0,
  },
];

function ValidationCard3D({
  label, value, icon, color, rotX, rotY, x, y, delay,
}: {
  label: string; value: string; icon: React.ReactNode; color: string;
  rotX: number; rotY: number; x: string; y: string; delay: number;
}) {
  return (
    <div
      className="absolute hidden md:block pointer-events-none select-none z-0"
      style={{ left: x, top: y, perspective: "500px" }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{
          opacity: 1,
          scale: 1,
          rotateX: [rotX - 4, rotX + 4, rotX - 4],
          rotateY: [rotY - 6, rotY + 6, rotY - 6],
          y: [0, -10, 0],
        }}
        transition={{
          opacity: { duration: 0.7, delay },
          scale: { duration: 0.7, delay },
          rotateX: { duration: 6 + delay * 0.8, repeat: Infinity, ease: "easeInOut", delay },
          rotateY: { duration: 5 + delay * 0.5, repeat: Infinity, ease: "easeInOut", delay },
          y: { duration: 4 + delay * 0.4, repeat: Infinity, ease: "easeInOut", delay },
        }}
        className="bg-white/90 px-4 py-3 min-w-[148px]"
        style={{
          transformStyle: "preserve-3d",
          boxShadow: `0 12px 40px rgba(0,0,0,0.08), 0 4px 12px ${color}18, inset 0 1px 0 rgba(255,255,255,0.9)`,
          backdropFilter: "blur(14px)",
          border: `1px solid ${color}25`,
        }}
      >
        <div className="absolute top-0 left-0 right-0 h-0.5" style={{ background: color }} />
        <div className="flex items-center gap-2 mb-1.5">
          {icon}
          <span className="text-[9px] font-semibold tracking-widest uppercase text-gray-400">{label}</span>
        </div>
        <div className="text-gray-900 text-sm font-bold tracking-tight">{value}</div>
        <div
          className="absolute top-0 right-0 bottom-0 w-2 opacity-30"
          style={{
            transform: "rotateY(-90deg) translateX(8px)",
            background: `linear-gradient(to bottom, ${color}, transparent)`,
            transformOrigin: "right center",
          }}
        />
      </motion.div>
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
      className="relative min-h-[100vh] bg-white flex items-center overflow-hidden"
    >
      {/* Subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: `linear-gradient(#09daed 1px, transparent 1px), linear-gradient(90deg, #09daed 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Radial glow */}
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-[#09daed]/5 blur-[150px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/3 w-72 h-72 bg-[#09daed]/4 blur-[100px] pointer-events-none" />

      {/* 3D Floating Validation Cards — behind main content */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {VALIDATION_CARDS.map((card, i) => (
          <ValidationCard3D key={i} {...card} />
        ))}
      </div>

      <motion.div
        style={{ opacity, y, zIndex: 10, position: "relative" }}
        className="max-w-7xl mx-auto px-6 pt-24 pb-16 w-full"
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
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-[1.1] tracking-tight mb-6"
            >
              Stop Building{" "}
              <span className="text-[#09daed]">in the Dark.</span>
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
              className="text-gray-500 text-lg leading-relaxed mb-8 max-w-lg"
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
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.6 }}
              className="flex items-center gap-6 mt-10 pt-6 border-t border-gray-100"
            >
              {[["89%", "Clarity Gain"], ["3x", "Faster Iteration"]].map(([val, label]) => (
                <div key={label}>
                  <div className="text-xl font-bold text-[#09daed]">{val}</div>
                  <div className="text-xs text-gray-400">{label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right — Dashboard */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="relative h-80 lg:h-[440px]"
          >
            <DashboardPreview />
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
        <span className="text-gray-400 text-xs tracking-widest uppercase">Scroll</span>
        <div className="w-0.5 h-8 bg-gradient-to-b from-[#09daed]/60 to-transparent animate-pulse" />
      </motion.div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#09daed]/20 to-transparent" />
    </section>
  );
}
