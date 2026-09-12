import React, { useEffect, useRef, useState } from "react";
import {
  FaPlay,
  FaPause,
  FaVolumeUp,
  FaVolumeMute,
  FaDownload,
  FaHeadphones,
  FaMicrophone,
} from "react-icons/fa";

interface Track {
  id: string;
  title: string;
  category: string;
  duration: string;
  src: string;
  description: string;
  tags: string[];
}

const tracks: Track[] = [
  {
    id: "characters",
    title: "Characters & Commercial Spots",
    category: "Commercial & Character",
    duration: "1:35",
    src: "/audio/KielByrne_C.mp3",
    description:
      "Vibrant character voices, dynamic tonal shifts, accents, and high-energy commercial deliveries for animated and promotional campaigns.",
    tags: ["Commercial", "Accents", "Animation", "High Energy"],
  },
  {
    id: "narrative",
    title: "Literary & Children's Narration",
    category: "Audiobook & Narrative",
    duration: "1:42",
    src: "/audio/KielByrne_N.mp3",
    description:
      "Warm, engaging narrative pacing tailored for children's literature, audiobooks, educational storytelling, and immersive listening.",
    tags: ["Audiobook", "Children's Book", "Storytelling", "Warmth"],
  },
  {
    id: "technical",
    title: "Municipal Presentation (City of New Orleans)",
    category: "Technical & Informational",
    duration: "4:15",
    src: "/audio/KielByrne_NN_NORTA.mp3",
    description:
      "Authoritative, clear, and professional informational voiceover produced for Nelson/Nygaard regarding the New Orleans Regional Transit Authority (NORTA).",
    tags: [
      "Government",
      "Transit/Infrastructure",
      "Authoritative",
      "Corporate",
    ],
  },
];

const AudioLabSection: React.FC = () => {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);

  const audioRef = useRef<HTMLAudioElement>(null);
  const currentTrack = tracks[currentTrackIndex];

  // Handle Play/Pause
  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => {});
    }
  };

  const selectTrack = (index: number) => {
    setCurrentTrackIndex(index);
    setIsPlaying(false);
    setTimeout(() => {
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current
          .play()
          .then(() => setIsPlaying(true))
          .catch(() => {});
      }
    }, 50);
  };

  // Time & Pulse updates
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
      if (isPlaying) {
        // Emit audio pulse event for Hero 3D Orb
        window.dispatchEvent(
          new CustomEvent("khb-audio-pulse", {
            detail: { level: 0.8 + Math.random() * 0.4 },
          })
        );
      }
    };

    const handleLoadedMetadata = () => {
      setDuration(audio.duration || 0);
    };

    const handleEnded = () => {
      setIsPlaying(false);
    };

    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("ended", handleEnded);
    };
  }, [isPlaying]);

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = Number(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const formatTime = (secs: number) => {
    if (isNaN(secs)) return "0:00";
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  return (
    <section
      id="audio-lab"
      className="py-24 bg-slate-900 text-white relative overflow-hidden"
    >
      {/* Background Decorative Rings */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Hidden Audio Element */}
      <audio
        ref={audioRef}
        src={currentTrack.src}
        preload="metadata"
        muted={isMuted}
      />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950/60 border border-purple-800/60 text-xs font-semibold uppercase tracking-wider text-purple-400 mb-3">
            <FaHeadphones className="text-purple-400" />
            <span>Voice &amp; Audio Lab</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
            Behind the Microphone
          </h2>
          <p className="mt-4 text-slate-300 text-base sm:text-lg font-light leading-relaxed">
            I’ve always loved the expressive power of voice and sound. Here are
            three official voice reels—from commercial characters and children’s
            literature to municipal presentations.
          </p>
        </div>

        {/* Master Audio Deck Card */}
        <div className="rounded-3xl bg-slate-950/90 border border-slate-800 p-6 sm:p-10 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Column: Player & Active Track */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase font-bold tracking-widest text-cyan-400 bg-cyan-950/60 border border-cyan-800/60 px-3 py-1 rounded-full">
                  {currentTrack.category}
                </span>
                <span className="text-xs text-slate-400">
                  {formatTime(currentTime)} / {formatTime(duration)}
                </span>
              </div>

              <div>
                <h3 className="text-2xl sm:text-3xl font-black text-white flex items-center gap-3">
                  <FaMicrophone className="text-amber-400 flex-shrink-0" />
                  <span>{currentTrack.title}</span>
                </h3>
                <p className="text-slate-300 text-sm sm:text-base mt-2 font-light leading-relaxed">
                  {currentTrack.description}
                </p>
              </div>

              {/* Animated Waveform Visualizer Bars */}
              <div className="flex items-center gap-1.5 h-12 py-2 px-4 rounded-xl bg-slate-900 border border-slate-800">
                {Array.from({ length: 32 }).map((_, i) => {
                  const barHeight = isPlaying
                    ? Math.max(
                        15,
                        Math.sin((i + currentTime * 8) * 0.5) * 80 +
                          Math.random() * 20
                      )
                    : 15;
                  return (
                    <div
                      key={i}
                      className="flex-1 bg-gradient-to-t from-cyan-500 to-amber-400 rounded-full transition-all duration-100"
                      style={{
                        height: `${barHeight}%`,
                        opacity: isPlaying ? 0.9 : 0.25,
                      }}
                    />
                  );
                })}
              </div>

              {/* Progress Slider */}
              <div className="space-y-1">
                <input
                  type="range"
                  min="0"
                  max={duration || 100}
                  value={currentTime}
                  onChange={handleSeek}
                  aria-label="Seek time"
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                />
              </div>

              {/* Controls Toolbar */}
              <div className="flex items-center justify-between pt-2">
                <div className="flex items-center gap-4">
                  <button
                    onClick={togglePlay}
                    aria-label={isPlaying ? "Pause" : "Play"}
                    className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white flex items-center justify-center shadow-lg shadow-cyan-900/40 transition transform hover:scale-105"
                  >
                    {isPlaying ? (
                      <FaPause size={20} />
                    ) : (
                      <FaPlay size={20} className="ml-1" />
                    )}
                  </button>

                  <button
                    onClick={() => setIsMuted(!isMuted)}
                    aria-label={isMuted ? "Unmute" : "Mute"}
                    className="p-3 text-slate-400 hover:text-white rounded-xl bg-slate-800/80 border border-slate-700/60 transition"
                  >
                    {isMuted ? (
                      <FaVolumeMute size={18} />
                    ) : (
                      <FaVolumeUp size={18} />
                    )}
                  </button>
                </div>

                <a
                  href={currentTrack.src}
                  download
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700/60 text-xs font-semibold text-slate-200 hover:text-cyan-300 transition"
                >
                  <FaDownload />
                  <span>Download MP3</span>
                </a>
              </div>
            </div>

            {/* Right Column: Track Playlist */}
            <div className="lg:col-span-5 space-y-3">
              <h4 className="text-xs uppercase tracking-wider text-slate-400 font-bold mb-4">
                Available Voice Tracks ({tracks.length})
              </h4>

              {tracks.map((track, idx) => {
                const isSelected = currentTrackIndex === idx;
                return (
                  <div
                    key={track.id}
                    onClick={() => selectTrack(idx)}
                    className={`p-4 rounded-2xl border cursor-pointer transition transform hover:-translate-y-0.5 ${
                      isSelected
                        ? "bg-slate-900 border-cyan-500/50 shadow-lg shadow-cyan-950/40"
                        : "bg-slate-900/40 border-slate-800 hover:border-slate-700"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-9 h-9 rounded-xl flex items-center justify-center text-sm font-bold ${
                            isSelected
                              ? "bg-cyan-500 text-slate-950 font-black"
                              : "bg-slate-800 text-slate-400"
                          }`}
                        >
                          {isSelected && isPlaying ? "▶" : idx + 1}
                        </div>
                        <div>
                          <div className="font-semibold text-white text-sm">
                            {track.title}
                          </div>
                          <div className="text-xs text-slate-400">
                            {track.category}
                          </div>
                        </div>
                      </div>
                      <span className="text-xs text-slate-500 font-mono">
                        {track.duration}
                      </span>
                    </div>
                  </div>
                );
              })}

              <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 text-xs text-slate-400 mt-4">
                <p>
                  🎙️{" "}
                  <strong className="text-slate-300">
                    Need custom character spots or technical narration?
                  </strong>{" "}
                  You can inquire directly for commercial licensing or casting
                  via the{" "}
                  <a href="#connect" className="text-cyan-400 hover:underline">
                    Connect section below
                  </a>
                  .
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AudioLabSection;
