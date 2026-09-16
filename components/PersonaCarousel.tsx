import React, { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaChevronLeft,
  FaChevronRight,
  FaPlay,
  FaPause,
  FaGithub,
  FaLinkedin,
  FaRobot,
  FaHatCowboy,
  FaMagic,
} from "react-icons/fa";
import { personas, Persona } from "@/data/personas";

const AUTOPLAY_INTERVAL = 6000; // 6 seconds per persona

export const PersonaCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [direction, setDirection] = useState<1 | -1>(1);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const currentPersona: Persona = personas[currentIndex] || personas[0];

  const goToNext = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % personas.length);
  }, []);

  const goToPrev = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + personas.length) % personas.length);
  }, []);

  const selectPersona = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  // Autoplay management
  useEffect(() => {
    if (isPaused) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      goToNext();
    }, AUTOPLAY_INTERVAL);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused, goToNext]);

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      goToPrev();
    } else if (e.key === "ArrowRight") {
      goToNext();
    } else if (e.key === " ") {
      e.preventDefault();
      setIsPaused((prev) => !prev);
    }
  };

  const getSourceIcon = (source: string) => {
    if (source.includes("GitHub")) return <FaGithub className="text-xs" />;
    if (source.includes("LinkedIn")) return <FaLinkedin className="text-xs" />;
    return <FaRobot className="text-xs" />;
  };

  return (
    <div
      className="w-full flex flex-col items-center select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="region"
      aria-label="Persona and Roles Carousel"
    >
      {/* Carousel Main Stage */}
      <div className="relative w-full max-w-[340px] sm:max-w-[380px]">
        {/* Ambient Glow Aura reacting to active persona palette */}
        <div
          className={`absolute -inset-2 bg-gradient-to-r ${currentPersona.glowColor} rounded-3xl blur-xl opacity-45 transition-all duration-700 pointer-events-none`}
        />

        {/* Outer Frame Card */}
        <div className="relative rounded-2xl overflow-hidden border border-slate-700/80 bg-slate-950/90 shadow-2xl p-3 sm:p-4 backdrop-blur-sm">
          {/* Header Bar inside card */}
          <div className="flex items-center justify-between gap-2 mb-3 px-1">
            <span
              className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold tracking-wide border ${currentPersona.tagBg}`}
            >
              <FaHatCowboy className="text-[10px]" />
              {currentPersona.hat}
            </span>

            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1 text-[10px] text-slate-400 font-mono bg-slate-900/80 px-2 py-0.5 rounded-full border border-slate-800">
                {getSourceIcon(currentPersona.source)}
                {currentPersona.source}
              </span>
              <span className="text-[11px] font-mono font-medium text-slate-400">
                {String(currentIndex + 1).padStart(2, "0")}/
                {String(personas.length).padStart(2, "0")}
              </span>
            </div>
          </div>

          {/* Animated Image Canvas */}
          <div className="relative w-full aspect-square rounded-xl overflow-hidden bg-slate-900 border border-slate-800/80 shadow-inner group">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={currentPersona.id}
                custom={direction}
                initial={{ opacity: 0, scale: 0.95, x: direction * 40 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.95, x: direction * -40 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="absolute inset-0 w-full h-full"
              >
                <Image
                  src={currentPersona.image}
                  alt={currentPersona.name}
                  fill
                  sizes="(max-width: 640px) 320px, 380px"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  priority={currentIndex === 0}
                />
              </motion.div>
            </AnimatePresence>

            {/* Subtle bottom gradient overlay for contrast */}
            <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent pointer-events-none" />

            {/* Interactive Prev/Next Buttons floating on sides */}
            <button
              onClick={goToPrev}
              aria-label="Previous persona"
              className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-slate-900/85 hover:bg-slate-800 text-slate-200 border border-slate-700/80 flex items-center justify-center transition-all opacity-80 hover:opacity-100 hover:scale-110 active:scale-95 shadow-lg backdrop-blur-xs"
            >
              <FaChevronLeft className="text-xs -ml-0.5" />
            </button>
            <button
              onClick={goToNext}
              aria-label="Next persona"
              className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-slate-900/85 hover:bg-slate-800 text-slate-200 border border-slate-700/80 flex items-center justify-center transition-all opacity-80 hover:opacity-100 hover:scale-110 active:scale-95 shadow-lg backdrop-blur-xs"
            >
              <FaChevronRight className="text-xs -mr-0.5" />
            </button>
          </div>

          {/* Autoplay Progress Bar */}
          <div className="w-full bg-slate-900 h-1 rounded-full mt-3 overflow-hidden border border-slate-800/50">
            {!isPaused && (
              <motion.div
                key={currentIndex}
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{
                  duration: AUTOPLAY_INTERVAL / 1000,
                  ease: "linear",
                }}
                className="h-full bg-gradient-to-r from-cyan-400 to-amber-400"
              />
            )}
            {isPaused && (
              <div className="h-full bg-slate-700 w-full opacity-60" />
            )}
          </div>

          {/* Persona Details & Real-World Hat */}
          <div className="mt-3.5 space-y-1.5 px-1">
            <div className="flex items-center justify-between">
              <h3 className="text-base sm:text-lg font-bold text-white tracking-tight flex items-center gap-1.5">
                <FaMagic className={`text-xs ${currentPersona.accentColor}`} />
                {currentPersona.name}
              </h3>

              <button
                onClick={() => setIsPaused((prev) => !prev)}
                aria-label={isPaused ? "Play carousel" : "Pause carousel"}
                className="text-slate-400 hover:text-white p-1 rounded transition text-xs flex items-center gap-1"
                title={
                  isPaused ? "Resume auto-rotation" : "Pause auto-rotation"
                }
              >
                {isPaused ? (
                  <>
                    <FaPlay className="text-[10px] text-cyan-400" />
                    <span className="text-[10px] uppercase font-mono">
                      Paused
                    </span>
                  </>
                ) : (
                  <>
                    <FaPause className="text-[10px]" />
                    <span className="text-[10px] uppercase font-mono">
                      Auto
                    </span>
                  </>
                )}
              </button>
            </div>

            <p className="text-xs font-medium text-emerald-400">
              {currentPersona.role}
            </p>

            <p className="text-xs text-slate-300 italic font-light leading-relaxed">
              &ldquo;{currentPersona.tagline}&rdquo;
            </p>

            <div className="pt-2 border-t border-slate-800/80">
              <p className="text-[11px] text-slate-400 leading-normal">
                <strong className="text-slate-200 font-medium">
                  Dimension:{" "}
                </strong>
                {currentPersona.realWorldHat}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Hat Selector Pill Bar (Instant Jumps) */}
      <div className="w-full max-w-[380px] mt-4 flex flex-wrap justify-center gap-1.5">
        {personas.map((p, idx) => {
          const isActive = idx === currentIndex;
          return (
            <button
              key={p.id}
              onClick={() => selectPersona(idx)}
              className={`px-2.5 py-1 rounded-full text-[11px] font-medium transition-all transform hover:scale-105 border ${
                isActive
                  ? `${p.tagBg} shadow-md shadow-slate-950 scale-105 font-semibold`
                  : "bg-slate-900/60 text-slate-400 border-slate-800 hover:text-slate-200 hover:border-slate-700"
              }`}
              title={`Switch to ${p.name}`}
            >
              {p.hat.split(" ")[0]}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default PersonaCarousel;
