import { motion } from "framer-motion";
import { useInView } from "../../hooks/useScrollProgress";

export default function FinalCTASection() {
  const { ref, inView } = useInView(0.3);

  return (
    <section className="relative section-dark py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#09daed]/3 blur-[150px] pointer-events-none" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(#09daed 1px, transparent 1px), linear-gradient(90deg, #09daed 1px, transparent 1px)`,
            backgroundSize: "80px 80px",
          }}
        />
      </div>

      <div ref={ref as React.RefObject<HTMLDivElement>} className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8 }}
        >
          {/* Minimal UI collapse animation */}
          <motion.div
            initial={{ width: "100%", opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex items-center justify-center gap-1 mb-8"
          >
            {[1, 2, 3, 4, 5, 6, 7].map((i) => (
              <motion.div
                key={i}
                initial={{ width: 40 }}
                animate={inView ? { width: i === 4 ? 80 : 20 } : { width: 40 }}
                transition={{ duration: 0.8, delay: 0.3 + i * 0.05 }}
                className="h-1"
                style={{
                  background: i === 4 ? "#09daed" : "rgba(255,255,255,0.1)",
                }}
              />
            ))}
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-white/40 text-sm tracking-widest uppercase mb-4"
          >
            The final step
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.1] mb-6"
          >
            You don't need more ideas.{" "}
            <span className="text-[#09daed] cyan-text-glow">You need clarity.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-white/50 text-lg mb-10 max-w-lg mx-auto"
          >
            Join thousands of founders closing the gap between assumption and reality — one validation loop at a time.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-3 justify-center"
          >
            <button className="bg-[#09daed] text-black font-semibold px-8 py-4 text-sm hover:bg-[#07c4d4] transition-all duration-200 animate-pulse-glow">
              Start Your First Validation Loop
            </button>
            <button className="border border-white/20 text-white px-8 py-4 text-sm hover:border-[#09daed]/40 transition-all duration-200">
              Schedule a Demo
            </button>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="text-white/25 text-xs mt-6"
          >
            No credit card required · Free forever plan · Cancel anytime
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
