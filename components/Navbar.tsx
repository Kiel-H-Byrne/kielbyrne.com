import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { useSectionTracker } from "@/hooks/useSectionTracker";

const navItems = [
  { id: "hero", label: "Home" },
  { id: "about", label: "Story" },
  { id: "dimensions", label: "What I Do" },
  { id: "creations", label: "Creations" },
  { id: "audio-lab", label: "Audio Lab" },
  { id: "ethos", label: "Life & Ethos" },
  { id: "connect", label: "Connect" },
];

const Navbar: React.FC = () => {
  const [navOpen, setNavOpen] = useState(false);
  const activeSection = useSectionTracker(navItems.map((item) => item.id));

  const handleNavClick = (id: string) => {
    setNavOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 backdrop-blur-xl bg-slate-950/80 border-b border-slate-800/60 transition-all duration-300">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-4 sm:px-6 py-3.5">
        {/* Brand Logo */}
        <button
          onClick={() => handleNavClick("hero")}
          className="text-left group flex items-center gap-2 text-white font-bold tracking-tight text-lg sm:text-xl"
        >
          <span className="w-8 h-8 rounded-lg bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-sm font-black shadow-md shadow-cyan-500/20 group-hover:scale-105 transition transform">
            KB
          </span>
          <span className="group-hover:text-cyan-300 transition">
            Kiel H. Byrne
          </span>
        </button>

        {/* Desktop Menu */}
        <ul className="hidden lg:flex items-center space-x-1 sm:space-x-2">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <li key={item.id}>
                <button
                  onClick={() => handleNavClick(item.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all ${
                    isActive
                      ? "text-cyan-300 bg-cyan-950/60 border border-cyan-500/30 shadow-sm shadow-cyan-900/40"
                      : "text-slate-300 hover:text-white hover:bg-slate-800/60"
                  }`}
                >
                  {item.label}
                </button>
              </li>
            );
          })}
        </ul>

        {/* Action Button (Desktop) */}
        <div className="hidden lg:flex items-center">
          <button
            onClick={() => handleNavClick("connect")}
            className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 rounded-lg shadow-md shadow-cyan-900/20 transition transform hover:-translate-y-0.5"
          >
            Get In Touch
          </button>
        </div>

        {/* Mobile Hamburger Icon */}
        <div className="lg:hidden">
          <button
            onClick={() => setNavOpen(!navOpen)}
            aria-label="Toggle Menu"
            className="p-2 text-slate-300 hover:text-white focus:outline-none"
          >
            {navOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {navOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[57px] bg-slate-950/95 backdrop-blur-2xl border-b border-slate-800 py-6 px-6 shadow-2xl transition-all">
          <ul className="flex flex-col space-y-4">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <li key={item.id}>
                  <button
                    onClick={() => handleNavClick(item.id)}
                    className={`w-full text-left py-2 px-3 rounded-lg text-base font-medium transition ${
                      isActive
                        ? "text-cyan-300 bg-cyan-950/60 border-l-4 border-cyan-400"
                        : "text-slate-300 hover:text-white hover:bg-slate-900"
                    }`}
                  >
                    {item.label}
                  </button>
                </li>
              );
            })}
            <li className="pt-2">
              <button
                onClick={() => handleNavClick("connect")}
                className="w-full py-3 text-center text-sm font-semibold uppercase tracking-wider text-white bg-gradient-to-r from-cyan-600 to-blue-600 rounded-lg shadow-md"
              >
                Get In Touch
              </button>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
