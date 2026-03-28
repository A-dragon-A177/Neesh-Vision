import { motion } from "framer-motion";
import { useInView } from "../../hooks/useScrollProgress";

const NAV_LINKS = {
  Product: ["Features", "Pricing", "Changelog", "Roadmap"],
  Resources: ["Docs", "Blog", "API Reference", "Guides"],
  Company: ["About", "Contact", "Careers", "Press"],
  Legal: ["Privacy Policy", "Terms of Service", "Cookie Policy", "Security"],
};

export default function FooterSection() {
  const { ref, inView } = useInView(0.1);

  return (
    <footer className="bg-white border-t border-gray-100 pt-16 pb-8">
      <div className="w-full h-px bg-gradient-to-r from-transparent via-[#09daed]/30 to-transparent mb-16" />
      <div className="max-w-7xl mx-auto px-6">
        <div
          ref={ref as React.RefObject<HTMLDivElement>}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10 mb-12"
        >
          {/* Brand */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center gap-2 mb-4">
                <div className="w-7 h-7 bg-[#09daed] flex items-center justify-center">
                  <span className="text-black font-bold text-xs">N</span>
                </div>
                <span className="text-gray-900 font-semibold text-sm tracking-wide">Neesh AI</span>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed max-w-xs mb-6">
                Turn your raw ideas into validated products using AI-powered feedback loops and intelligent gap detection.
              </p>
              <div className="flex items-center gap-3">
                {["𝕏", "in", "gh", "ds"].map((social) => (
                  <div
                    key={social}
                    className="w-8 h-8 border border-gray-200 flex items-center justify-center text-gray-400 text-xs hover:border-[#09daed]/40 hover:text-[#09daed] transition-all duration-200 cursor-pointer font-medium"
                  >
                    {social}
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {Object.entries(NAV_LINKS).map(([category, links], i) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: (i + 1) * 0.08 }}
            >
              <div className="text-gray-900 text-xs font-semibold tracking-widest uppercase mb-4">{category}</div>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href={`#${link.toLowerCase().replace(/\s+/g, "-")}`}
                      className="text-gray-400 text-sm hover:text-gray-700 transition-colors duration-200"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <div className="border-t border-gray-100 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex items-center gap-2"
          >
            <div className="w-1 h-1 bg-[#09daed]" />
            <p className="text-gray-400 text-xs italic">
              "Validating the future, one loop at a time."
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="text-gray-300 text-xs"
          >
            © {new Date().getFullYear()} Neesh AI. All rights reserved.
          </motion.div>
        </div>
      </div>
    </footer>
  );
}
