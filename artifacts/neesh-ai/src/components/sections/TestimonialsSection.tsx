import { motion } from "framer-motion";
import { useInView } from "../../hooks/useScrollProgress";

const TESTIMONIALS = [
  {
    quote: "Neesh AI saved us 3 months of building the wrong feature.",
    author: "Marcus T.",
    role: "Co-founder, Buildify",
    avatar: "MT",
    color: "#09daed",
  },
  {
    quote: "The fastest way to turn a doc into a validated product.",
    author: "Priya K.",
    role: "Product Lead, Launchpad.io",
    avatar: "PK",
    color: "#7c3aed",
  },
];

export default function TestimonialsSection() {
  const { ref, inView } = useInView(0.2);

  return (
    <section className="bg-gray-50 border-t border-b border-gray-100 py-24">
      <div className="max-w-5xl mx-auto px-6">
        <div ref={ref as React.RefObject<HTMLDivElement>} className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            className="text-[#09daed] text-xs font-medium tracking-widest uppercase mb-4"
          >
            Testimonials
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl font-bold text-gray-900"
          >
            What founders are saying
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.2 }}
              className="p-8 border border-gray-100 bg-white relative"
              style={{ boxShadow: "0 1px 20px rgba(0,0,0,0.06)" }}
            >
              {/* Quote mark and stars */}
              <div className="flex items-center justify-between mb-4">
                <div className="text-6xl font-bold leading-none" style={{ color: `${t.color}20` }}>"</div>
                <div className="text-[#09daed] tracking-widest text-lg">★★★★★</div>
              </div>

              <blockquote className="text-gray-800 text-lg font-medium leading-relaxed mb-6">
                "{t.quote}"
              </blockquote>

              <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                <div
                  className="w-10 h-10 flex items-center justify-center text-white text-xs font-bold"
                  style={{ background: t.color }}
                >
                  {t.avatar}
                </div>
                <div>
                  <div className="text-gray-900 font-semibold text-sm">{t.author}</div>
                  <div className="text-gray-500 text-xs">{t.role}</div>
                </div>
              </div>

              {/* Accent corner */}
              <div className="absolute top-0 left-0 w-1 h-full" style={{ background: t.color }} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
