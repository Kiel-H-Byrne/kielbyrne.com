import React from "react";
import { FaCompass, FaLinkedin, FaUsers, FaLightbulb } from "react-icons/fa";
import { GiGolfFlag, GiRollerSkate } from "react-icons/gi";

const ethosItems = [
  {
    title: "Fatherhood & Legacy",
    icon: <FaUsers className="text-blue-400 text-2xl" />,
    description:
      "Raising two imaginative sons is my greatest project. Guiding them through creative AI book publishing and life's curiosities keeps me grounded in what truly matters: patience, joy, and leaving the world more enriched than we found it.",
    badge: "Family First",
  },
  {
    title: "Freemasonry & Stewardship",
    icon: <FaCompass className="text-amber-400 text-2xl" />,
    description: (
      <>
        Rooted in ancient principles of mutual support, moral self-improvement,
        and service. Serving as IT Director for the{" "}
        <a
          href="https://www.phfamoescef.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-amber-400 hover:underline font-medium"
        >
          PHFAMOESCEF
        </a>{" "}
        charitable endowment foundation unites technological stewardship with
        Masonic leadership, reminding me that all enduring edifices are built
        with true measure.
      </>
    ),
    badge: "Moral Architecture",
  },
  {
    title: "Golf & Roller Skating",
    icon: (
      <div className="flex items-center gap-1.5 text-emerald-400 text-2xl">
        <GiGolfFlag />
        <GiRollerSkate />
      </div>
    ),
    description:
      "Precision and patience on the fairway (including hunting for my ball in the rough); rhythm and good music on eight wheels. Both keep me humble, active, and having fun outside of a code editor.",
    badge: "Balance & Flow",
  },
  {
    title: "Metaphysics & Supreme Mathematics",
    icon: <FaLightbulb className="text-purple-400 text-2xl" />,
    description:
      "Studying patterns, sacred geometry, and cultural numeracy. Exploring how mathematics, cosmic rhythms, and human consciousness intersect to generate purposeful solutions for contemporary life.",
    badge: "Philosophical Inquiry",
  },
];

const EthosSection: React.FC = () => {
  return (
    <section id="ethos" className="py-24 bg-slate-900 text-white relative">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-950/60 border border-amber-800/60 text-xs font-semibold uppercase tracking-wider text-amber-400 mb-3">
            Life, Ethos &amp; Heritage
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
            Beyond the Terminal
          </h2>
          <p className="mt-4 text-slate-300 text-base sm:text-lg font-light leading-relaxed">
            The things that keep me grounded, inspired, and human—from raising
            two boys and community brotherhood to the discipline of golf and the
            freedom of roller skating.
          </p>
        </div>

        {/* 4-Card Ethos Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {ethosItems.map((item, idx) => (
            <div
              key={idx}
              className="p-8 rounded-3xl bg-slate-950/80 border border-slate-800 hover:border-amber-500/40 transition duration-300 shadow-xl flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                    {item.icon}
                  </div>
                  <span className="text-xs font-semibold text-slate-400 bg-slate-900 px-3 py-1 rounded-full border border-slate-800">
                    {item.badge}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white mb-3">
                  {item.title}
                </h3>
                <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-light">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Official Documentation & Credentials Card */}
        <div className="rounded-3xl bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border border-slate-800 p-8 sm:p-12 shadow-2xl">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="max-w-2xl text-center lg:text-left">
              <span className="text-xs font-bold uppercase tracking-widest text-cyan-400 mb-2 block">
                Official Records &amp; Credentials
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-white">
                Detailed Resume &amp; Systems CV
              </h3>
              <p className="text-slate-300 text-sm sm:text-base mt-2 font-light">
                Need a comprehensive breakdown of my software engineering
                trajectory, IT infrastructure management, or credentials?
                Available upon direct request via LinkedIn.
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <a
                href="https://www.linkedin.com/in/kielbyrne"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-semibold text-xs sm:text-sm shadow-lg shadow-cyan-950 transition flex items-center gap-2"
              >
                <FaLinkedin />
                <span>Request Resume &amp; CV on LinkedIn →</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EthosSection;
