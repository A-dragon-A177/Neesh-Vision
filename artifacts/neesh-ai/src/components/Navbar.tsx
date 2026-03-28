import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm"
          : "bg-white/80 backdrop-blur-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 bg-[#09daed] flex items-center justify-center">
            <span className="text-black font-bold text-xs">N</span>
          </div>
          <span className="text-gray-900 font-semibold text-sm tracking-wide">Neesh AI</span>
        </div>

        <div className="hidden md:flex items-center gap-8">
          {["Features", "Pricing", "Docs", "Blog"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-gray-500 hover:text-gray-900 text-sm transition-colors duration-200 font-medium"
            >
              {item}
            </a>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <button className="text-gray-600 hover:text-gray-900 text-sm transition-colors px-4 py-2 font-medium">
            Sign in
          </button>
          <button className="bg-[#09daed] text-black text-sm font-semibold px-4 py-2 hover:bg-[#07c4d4] transition-colors">
            Start Free
          </button>
        </div>

        <button
          className="md:hidden text-gray-700 p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          <div className="w-5 h-0.5 bg-gray-700 mb-1" />
          <div className="w-5 h-0.5 bg-gray-700 mb-1" />
          <div className="w-5 h-0.5 bg-gray-700" />
        </button>
      </div>

      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="md:hidden bg-white border-t border-gray-100 px-6 py-4 flex flex-col gap-4"
        >
          {["Features", "Pricing", "Docs", "Blog"].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} className="text-gray-600 text-sm font-medium">
              {item}
            </a>
          ))}
          <button className="bg-[#09daed] text-black text-sm font-semibold px-4 py-2 w-full">
            Start Free
          </button>
        </motion.div>
      )}
    </motion.nav>
  );
}
