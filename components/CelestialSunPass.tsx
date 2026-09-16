import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/context/ThemeContext";

// Play a subtle, harmonious celestial audio chime using Web Audio API
function playCelestialChime(type: "sunrise" | "sunset") {
  try {
    const AudioContextClass =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext })
        .webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();

    const now = ctx.currentTime;
    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(0.06, now);
    masterGain.gain.exponentialRampToValueAtTime(0.001, now + 1.6);
    masterGain.connect(ctx.destination);

    // Frequencies: sunrise is an ascending bright major chord; sunset is a gentle descending warm ambient chord
    const freqs =
      type === "sunrise"
        ? [523.25, 659.25, 783.99, 1046.5] // C5 - E5 - G5 - C6 (Dawn Ascension)
        : [880.0, 659.25, 523.25, 392.0]; // A5 - E5 - C5 - G4 (Dusk Descent)

    freqs.forEach((f, idx) => {
      const osc = ctx.createOscillator();
      const oscGain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(f, now + idx * 0.08);

      oscGain.gain.setValueAtTime(0, now);
      oscGain.gain.linearRampToValueAtTime(0.08, now + idx * 0.08 + 0.05);
      oscGain.gain.exponentialRampToValueAtTime(0.001, now + 1.5);

      osc.connect(oscGain);
      oscGain.connect(masterGain);

      osc.start(now + idx * 0.08);
      osc.stop(now + 1.6);
    });
  } catch {
    // AudioContext blocked or not allowed by policy; fail silently
  }
}

export const CelestialSunPass: React.FC = () => {
  const { isCelestialTransitioning, transitionType } = useTheme();

  useEffect(() => {
    if (isCelestialTransitioning && transitionType) {
      playCelestialChime(transitionType);
    }
  }, [isCelestialTransitioning, transitionType]);

  return (
    <AnimatePresence>
      {isCelestialTransitioning && transitionType && (
        <motion.div
          key="celestial-pass-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden select-none"
          aria-hidden="true"
        >
          {/* 1. Atmospheric Sky Wash */}
          {transitionType === "sunrise" ? (
            <motion.div
              initial={{
                background:
                  "radial-gradient(ellipse at 10% 80%, rgba(251, 146, 60, 0.4) 0%, rgba(2, 6, 23, 0.9) 70%)",
              }}
              animate={{
                background: [
                  "radial-gradient(ellipse at 10% 80%, rgba(251, 146, 60, 0.5) 0%, rgba(30, 27, 75, 0.9) 60%)",
                  "radial-gradient(ellipse at 50% 30%, rgba(254, 240, 138, 0.7) 0%, rgba(251, 146, 60, 0.5) 45%, rgba(199, 210, 254, 0.8) 100%)",
                  "radial-gradient(ellipse at 90% 40%, rgba(255, 255, 255, 0.9) 0%, rgba(241, 245, 249, 0.8) 100%)",
                ],
              }}
              transition={{ duration: 1.8, ease: "easeInOut" }}
              className="absolute inset-0"
            />
          ) : (
            <motion.div
              initial={{
                background:
                  "radial-gradient(ellipse at 50% 20%, rgba(253, 224, 71, 0.4) 0%, rgba(255, 255, 255, 0.2) 60%)",
              }}
              animate={{
                background: [
                  "radial-gradient(ellipse at 70% 40%, rgba(244, 63, 94, 0.5) 0%, rgba(245, 158, 11, 0.4) 40%, rgba(67, 56, 202, 0.6) 100%)",
                  "radial-gradient(ellipse at 95% 75%, rgba(225, 29, 72, 0.6) 0%, rgba(88, 28, 135, 0.7) 50%, rgba(15, 23, 42, 0.9) 100%)",
                  "radial-gradient(ellipse at 50% 50%, rgba(2, 6, 23, 0.95) 0%, rgba(2, 6, 23, 0.98) 100%)",
                ],
              }}
              transition={{ duration: 1.8, ease: "easeInOut" }}
              className="absolute inset-0"
            />
          )}

          {/* 2. East-to-West Sweeping Solar Light Wave */}
          <motion.div
            initial={{ x: "-40vw", opacity: 0 }}
            animate={{
              x: ["-40vw", "40vw", "130vw"],
              opacity: [0, 0.85, 0],
            }}
            transition={{ duration: 1.7, ease: "easeInOut" }}
            className={`absolute top-0 bottom-0 w-[55vw] blur-3xl pointer-events-none ${
              transitionType === "sunrise"
                ? "bg-gradient-to-r from-amber-400/20 via-yellow-200/50 to-white/40"
                : "bg-gradient-to-r from-rose-500/20 via-amber-500/40 to-indigo-900/30"
            }`}
          />

          {/* 3. The Celestial Sun / Moon Body Arcing Overhead */}
          {transitionType === "sunrise" ? (
            /* Sunrise: Radiant Sun rising from East (left) curving high across the sky to West */
            <motion.div
              initial={{
                left: "2%",
                top: "85%",
                scale: 0.6,
                opacity: 0,
              }}
              animate={{
                left: ["2%", "48%", "92%"],
                top: ["85%", "14%", "45%"],
                scale: [0.7, 1.35, 1],
                opacity: [0, 1, 0.9, 0],
              }}
              transition={{ duration: 1.8, ease: "easeInOut" }}
              className="absolute -translate-x-1/2 -translate-y-1/2 flex items-center justify-center"
            >
              {/* Outer Corona & Pulsing Solar Rays */}
              <div className="absolute w-72 h-72 rounded-full bg-radial from-amber-300/60 via-orange-400/30 to-transparent blur-2xl animate-pulse" />
              <div className="absolute w-48 h-48 rounded-full bg-radial from-yellow-100 via-amber-400 to-transparent blur-md" />

              {/* Sun Core */}
              <div className="relative w-24 h-24 rounded-full bg-gradient-to-tr from-amber-400 via-yellow-200 to-white shadow-[0_0_60px_rgba(251,191,36,0.9)] flex items-center justify-center border-2 border-yellow-100">
                <div className="w-16 h-16 rounded-full bg-white/80 blur-xs" />
              </div>
            </motion.div>
          ) : (
            /* Sunset: Golden Sun setting in the West, leaving twilight and crescent moon */
            <>
              <motion.div
                initial={{
                  left: "30%",
                  top: "15%",
                  scale: 1.2,
                  opacity: 1,
                }}
                animate={{
                  left: ["30%", "65%", "95%"],
                  top: ["15%", "35%", "88%"],
                  scale: [1.2, 1, 0.65],
                  opacity: [1, 0.9, 0.4, 0],
                }}
                transition={{ duration: 1.8, ease: "easeInOut" }}
                className="absolute -translate-x-1/2 -translate-y-1/2 flex items-center justify-center"
              >
                {/* Setting Sun Warm Crimson/Gold Glow */}
                <div className="absolute w-64 h-64 rounded-full bg-radial from-rose-500/50 via-orange-500/30 to-transparent blur-2xl" />
                <div className="relative w-24 h-24 rounded-full bg-gradient-to-tr from-rose-600 via-amber-500 to-yellow-300 shadow-[0_0_50px_rgba(239,68,68,0.8)] border-2 border-amber-300/80" />
              </motion.div>

              {/* Emerging Night Moon on East Horizon */}
              <motion.div
                initial={{ left: "8%", top: "70%", opacity: 0, scale: 0.5 }}
                animate={{
                  left: ["8%", "15%"],
                  top: ["70%", "30%"],
                  opacity: [0, 0.2, 0.8, 0],
                  scale: [0.5, 0.9],
                }}
                transition={{ duration: 1.8, delay: 0.5, ease: "easeOut" }}
                className="absolute -translate-x-1/2 -translate-y-1/2 flex items-center justify-center"
              >
                <div className="w-16 h-16 rounded-full bg-radial from-cyan-100/60 to-transparent blur-md" />
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-slate-200 via-slate-100 to-white shadow-[0_0_30px_rgba(226,232,240,0.8)] relative overflow-hidden">
                  <div className="absolute top-1 right-2 w-7 h-7 rounded-full bg-slate-900/80" />
                </div>
              </motion.div>
            </>
          )}

          {/* 4. Horizon Compass Ribbon Banner ("East ➔ West") */}
          <div className="absolute bottom-6 inset-x-0 flex justify-center">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -10, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="px-4 py-1.5 rounded-full bg-slate-950/80 border border-amber-400/40 backdrop-blur-md shadow-2xl flex items-center gap-2 text-xs font-mono tracking-wider text-amber-300"
            >
              <span className="text-amber-400 font-bold">
                {transitionType === "sunrise" ? "☀️ SUNRISE" : "🌙 SUNSET"}
              </span>
              <span className="text-slate-400">•</span>
              <span className="text-slate-200 text-[11px]">
                Light Passing East → West
              </span>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CelestialSunPass;
