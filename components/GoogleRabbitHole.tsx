import React, { useState } from "react";
import {
  FaSearch,
  FaGamepad,
  FaMicrophone,
  FaRocket,
  FaLaptopCode,
  FaSmileBeam,
  FaPuzzlePiece,
  FaArrowRight,
  FaServer,
} from "react-icons/fa";

interface StoryPrompt {
  id: string;
  icon: React.ReactNode;
  shortTag: string;
  question: string;
  answer: string;
  actionText: string;
  targetId: string;
}

const prompts: StoryPrompt[] = [
  {
    id: "snes",
    icon: <FaGamepad className="text-purple-400" />,
    shortTag: "Retro Gaming",
    question: "Wait, did you really test Super Nintendo games as a kid?",
    answer:
      "Yep, that's true! Back in 1995, my first gig in tech was QA testing for 'War 2410' on the Super Nintendo. Spending hours trying to find every glitch taught me early on that understanding how things break is the best way to learn how to build things that last.",
    actionText: "See My Journey →",
    targetId: "about",
  },
  {
    id: "voice",
    icon: <FaMicrophone className="text-amber-400" />,
    shortTag: "Voiceover & Audio",
    question: "Did I hear your voice on an ad or presentation somewhere?",
    answer:
      "That could very well be me! I do character voices for commercials, narrate children's books, and have done informational voice work like the municipal transit presentations for the City of New Orleans (NORTA). I also love making beats and producing tracks in Logic Pro.",
    actionText: "Listen in the Audio Lab →",
    targetId: "audio-lab",
  },
  {
    id: "community",
    icon: <FaRocket className="text-emerald-400" />,
    shortTag: "SEED SPOT / PAKKE",
    question: "Did we meet through SEED SPOT, PAKKE, or around DC?",
    answer:
      "Very likely! I'm big on community initiatives—whether mentoring mission-driven founders with SEED SPOT, hosting cultural events with PAKKE, or building The MOBB to help people find and support local Black-owned businesses.",
    actionText: "See Community Projects →",
    targetId: "creations",
  },
  {
    id: "code",
    icon: <FaLaptopCode className="text-cyan-400" />,
    shortTag: "Frontend & Code",
    question: "I came across your GitHub, PWITW, or Lyntris (LYNX) work.",
    answer:
      "Welcome! Right now I'm building frontend interfaces at Lyntris (LYNX). Before this, I tracked 2,500+ workstations across 7 countries at Perkins&Will, and worked on internationalized frontend platforms across 7+ languages and 155 currencies at CoStar and Gopuff.",
    actionText: "Browse My Work →",
    targetId: "creations",
  },
  {
    id: "consulting",
    icon: <FaServer className="text-emerald-400" />,
    shortTag: "IT Systems & Consulting",
    question:
      "We need an IT systems architect, infrastructure lead, or automation partner.",
    answer:
      "That's exactly what I do through TenK Solutions (tenksolutions.com). I partner with growing companies and organizations across the DMV and nationwide to eliminate operational bottlenecks. From client intake and AI workflow automation to enterprise asset tracking (like my 2,500+ device build for Perkins&Will) and cloud infrastructure, I build systems that run smoothly so your team can scale.",
    actionText: "Explore Systems Consulting & Connect →",
    targetId: "connect",
  },
  {
    id: "vibe",
    icon: <FaSmileBeam className="text-rose-400" />,
    shortTag: "Roller Skating & Golf",
    question: "Someone told me you roller skate and play golf?",
    answer:
      "Guilty as charged! When I'm away from the keyboard, you'll usually find me cruising on roller skates, trying to keep my golf drive in the short grass, hanging out with my wife and two sons, or participating in Masonic brotherhood.",
    actionText: "Life Beyond the Screen →",
    targetId: "ethos",
  },
  {
    id: "puzzle",
    icon: <FaPuzzlePiece className="text-blue-400" />,
    shortTag: "Problem Solving",
    question:
      "Someone said: 'Talk to Kiel, he likes solving complex problems.'",
    answer:
      "I do really enjoy untangling problems that don't fit neatly into a single box. Having a background that spans mechanical engineering (UMBC), plumbing systems (NYU), IT infrastructure, and modern frontend development lets me look at challenges from a few different angles.",
    actionText: "Say Hello →",
    targetId: "connect",
  },
];

const GoogleRabbitHole: React.FC = () => {
  const [selectedPromptId, setSelectedPromptId] = useState<string>("snes");
  const currentPrompt =
    prompts.find((p) => p.id === selectedPromptId) || prompts[0];

  const handleJump = (targetId: string) => {
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="py-16 bg-slate-950/60 border-y border-slate-800/80 relative">
      <div className="max-w-5xl mx-auto px-6">
        {/* Friendly Google Search Bar Header */}
        <div className="max-w-2xl mx-auto mb-10 text-center">
          <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-slate-900/90 border border-slate-700/80 shadow-inner text-sm text-slate-300 w-full max-w-lg mb-3">
            <FaSearch className="text-cyan-400 flex-shrink-0" />
            <span className="font-mono text-white font-semibold">
              Kiel Byrne
            </span>
            <span className="animate-pulse text-cyan-400 font-black">|</span>
            <span className="ml-auto text-xs text-slate-500 font-mono hidden sm:inline">
              Looking for something specific?
            </span>
          </div>

          <h3 className="text-xl sm:text-2xl font-bold text-white mt-4">
            So, you Googled my name...
          </h3>
          <p className="text-slate-300 text-xs sm:text-sm mt-1.5 font-light leading-relaxed">
            Welcome! Chances are you ran across one of my projects, heard a
            voice clip, or we met somewhere along the way. Here’s a quick guide
            to what might have brought you here:
          </p>
        </div>

        {/* Prompt Selector Chips */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-2.5 mb-8">
          {prompts.map((p) => {
            const isSelected = selectedPromptId === p.id;
            return (
              <button
                key={p.id}
                onClick={() => setSelectedPromptId(p.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium transition duration-200 border ${
                  isSelected
                    ? "bg-slate-800 text-white border-cyan-400 shadow-md shadow-cyan-950"
                    : "bg-slate-900/80 text-slate-400 hover:text-slate-200 border-slate-800 hover:border-slate-700"
                }`}
              >
                <span>{p.icon}</span>
                <span>{p.shortTag}</span>
              </button>
            );
          })}
        </div>

        {/* Dynamic Story Answer Card */}
        <div className="rounded-2xl bg-gradient-to-br from-slate-900 via-slate-900/90 to-slate-950 border border-slate-800 p-6 sm:p-8 shadow-xl relative overflow-hidden transition-all duration-300">
          <div className="flex items-start gap-4">
            <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 text-xl flex-shrink-0 hidden sm:block">
              {currentPrompt.icon}
            </div>

            <div className="space-y-3 flex-1">
              <div className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <span className="sm:hidden">{currentPrompt.icon}</span>
                <span>&ldquo;{currentPrompt.question}&rdquo;</span>
              </div>

              <p className="text-slate-300 text-sm sm:text-base font-light leading-relaxed">
                {currentPrompt.answer}
              </p>

              <div className="pt-2">
                <button
                  onClick={() => handleJump(currentPrompt.targetId)}
                  className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-cyan-400 hover:text-cyan-300 transition group"
                >
                  <span>{currentPrompt.actionText}</span>
                  <FaArrowRight className="text-xs group-hover:translate-x-1 transition transform" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GoogleRabbitHole;
