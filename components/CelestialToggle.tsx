import React from "react";
import { motion } from "framer-motion";
import { useTheme } from "@/context/ThemeContext";
import { FaSun, FaMoon } from "react-icons/fa";

interface CelestialToggleProps {
  compact?: boolean;
}

export const CelestialToggle: React.FC<CelestialToggleProps> = ({
  compact = false,
}) => {
  const { theme, toggleTheme, isCelestialTransitioning } = useTheme();
  const isLight = theme === "light";

  return (
    <button
      onClick={toggleTheme}
      disabled={isCelestialTransitioning}
      aria-label={`Switch to ${
        isLight ? "dark" : "light"
      } mode (Sun pass East to West)`}
      title={
        isLight
          ? "Click to set the sun in the West (Dark Mode)"
          : "Click to rise the sun from the East (Light Mode)"
      }
      className={`relative group rounded-full border transition-all duration-300 overflow-hidden flex items-center justify-between p-1 focus:outline-none focus:ring-2 focus:ring-amber-400/50 ${
        compact ? "w-14 h-7" : "w-20 h-9"
      } ${
        isLight
          ? "bg-gradient-to-r from-sky-200 via-sky-100 to-amber-100 border-sky-300 shadow-sm"
          : "bg-gradient-to-r from-slate-950 via-slate-900 to-indigo-950 border-slate-700/80 shadow-inner"
      }`}
    >
      {/* Background Ambience: Daytime clouds or Nighttime stars */}
      {isLight ? (
        <div className="absolute inset-0 pointer-events-none flex items-center justify-end pr-2 opacity-70">
          {/* Subtle cloud silhouette */}
          <div className="w-4 h-2 bg-white/80 rounded-full blur-[0.5px]" />
          <div className="w-3 h-3 bg-white/90 rounded-full -ml-1 -mt-1 blur-[0.5px]" />
        </div>
      ) : (
        <div className="absolute inset-0 pointer-events-none flex items-center justify-start pl-2.5 opacity-80">
          {/* Tiny stars */}
          <span className="text-[7px] text-cyan-200 animate-pulse">✦</span>
          <span className="text-[5px] text-amber-200 ml-2 -mt-2">★</span>
        </div>
      )}

      {/* Orbiting Celestial Body Knob (Sun / Moon) */}
      <motion.div
        layout
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 30,
        }}
        className={`relative rounded-full flex items-center justify-center shadow-md ${
          compact ? "w-5 h-5" : "w-7 h-7"
        } ${
          isLight
            ? "ml-auto bg-gradient-to-tr from-amber-400 via-yellow-300 to-amber-100 text-amber-800 shadow-[0_0_12px_rgba(251,191,36,0.7)]"
            : "mr-auto bg-gradient-to-tr from-slate-200 to-white text-slate-900 shadow-[0_0_10px_rgba(255,255,255,0.6)]"
        }`}
      >
        {isLight ? (
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
          >
            <FaSun className={compact ? "text-[10px]" : "text-xs"} />
          </motion.div>
        ) : (
          <FaMoon className={compact ? "text-[9px]" : "text-[11px]"} />
        )}
      </motion.div>

      {/* East-West Label indicator on non-compact */}
      {!compact && (
        <span
          className={`absolute text-[9px] font-mono uppercase tracking-widest pointer-events-none font-bold ${
            isLight ? "left-2 text-sky-700/80" : "right-2 text-slate-400/80"
          }`}
        >
          {isLight ? "Day" : "Night"}
        </span>
      )}
    </button>
  );
};

export default CelestialToggle;
