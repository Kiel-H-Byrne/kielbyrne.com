import React, { useState } from "react";
import {
  FaCode,
  FaBuilding,
  FaDraftingCompass,
  FaMicrophoneAlt,
  FaUsers,
  FaCheckCircle,
  FaServer,
  FaExternalLinkAlt,
} from "react-icons/fa";

interface Dimension {
  id: string;
  tabLabel: string;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  accentColor: string;
  tagColor: string;
  description: string;
  highlights: string[];
  skills: string[];
  customCta?: {
    text: string;
    href: string;
    external?: boolean;
  };
}

const dimensions: Dimension[] = [
  {
    id: "software",
    tabLabel: "Software & Web",
    title: "Software & Frontend Development",
    subtitle: "Modern Web, Clean Architecture & Scale",
    icon: <FaCode className="text-cyan-400 text-2xl" />,
    accentColor: "from-cyan-500 to-blue-600",
    tagColor: "text-cyan-400 bg-cyan-950/60 border-cyan-800/60",
    description:
      "I build responsive, component-driven user interfaces and solve frontend challenges at scale—currently as a Frontend Software Developer at Lyntris (LYNX). Over the years, I've engineered internationalized UI systems across 7+ languages and 155 currencies, automated translation workflows, and built full-stack tooling.",
    highlights: [
      "Currently building modern frontend interfaces at Lyntris (LYNX).",
      "Cut translation turnaround times by 78% (from 9 days to 2) with automated pipelines at CoStar.",
      "Engineered merchandising and advertising features using React Native, TypeScript, and GraphQL at Gopuff.",
    ],
    skills: [
      "TypeScript",
      "React / Next.js",
      "React Native",
      "GoLang",
      "GraphQL",
      "Snowflake / SQL",
      "I18N / L10N",
      "Docker",
    ],
  },
  {
    id: "governance",
    tabLabel: "Systems & Consulting",
    title: "Systems Engineering, IT Consulting & Automation",
    subtitle:
      "TenK Solutions, AI Workflow Automation & Enterprise Infrastructure",
    icon: <FaServer className="text-emerald-400 text-2xl" />,
    accentColor: "from-emerald-500 to-teal-600",
    tagColor: "text-emerald-400 bg-emerald-950/60 border-emerald-800/60",
    description:
      "Good systems are like good plumbing—when engineered cleanly, everything flows effortlessly without downtime. Through TenK Solutions (tenksolutions.com), I partner with companies across the DMV and nationally to eliminate operational bottlenecks with AI automation, client intake workflows, executive dashboards, and resilient IT infrastructure. I also serve as an active IT Board Member advising on cybersecurity, risk management, and digital transformation.",
    highlights: [
      "AI & Business Operations Automation: Designing automated client intake, staff knowledge systems, and executive dashboards with TenK Solutions.",
      "Enterprise Asset Telemetry: Built custom collectors & web dashboards tracking 2,500+ endpoints across 7 countries at Perkins&Will.",
      "Fractional Systems Engineering: Hands-on consulting for companies needing senior technical architecture without full-time C-suite overhead.",
      "High-Security & SCIF Infrastructure: Deep experience with secure telework topologies, zero-trust network access, and disaster recovery.",
    ],
    skills: [
      "TenK Solutions (tenksolutions.com)",
      "AI Workflow Automation",
      "Business Operations",
      "Executive Dashboards",
      "Enterprise Asset Telemetry",
      "SCIF & Network Security",
      "IT Board Governance",
      "PowerShell & Python",
      "Disaster Recovery",
    ],
    customCta: {
      text: "Explore TenK Solutions & Book Discovery Call",
      href: "https://www.tenksolutions.com",
      external: true,
    },
  },
  {
    id: "engineering",
    tabLabel: "Physical Engineering",
    title: "Physical & Mechanical Engineering",
    subtitle: "Fluids, Fire Protection & 3D Prototyping",
    icon: <FaDraftingCompass className="text-emerald-400 text-2xl" />,
    accentColor: "from-emerald-500 to-teal-600",
    tagColor: "text-emerald-400 bg-emerald-950/60 border-emerald-800/60",
    description:
      "Before writing code full-time, I was immersed in physical engineering: earning a B.S. in Mechanical Engineering from UMBC and studying plumbing systems at NYU. Thinking in terms of tolerances, fluid flow, and safety codes permanently shaped how I design clean, reliable software.",
    highlights: [
      "Bachelor of Science in Mechanical Engineering from UMBC (2006).",
      "Professional Certificate in Plumbing Systems Design from NYU SPS (2009).",
      "Hands-on with AutoCAD, Revit, SolidWorks, Rhino, and 3D printing (Cura).",
    ],
    skills: [
      "Mechanical Engineering (BS)",
      "Plumbing & Fire Safety (NYU)",
      "AutoCAD / Revit",
      "SolidWorks",
      "3D Printing / Cura",
    ],
  },
  {
    id: "audio",
    tabLabel: "Voiceover & Audio",
    title: "Voice Talent & Music Production",
    subtitle: "Character Voiceover, Narration & Sound Design",
    icon: <FaMicrophoneAlt className="text-purple-400 text-2xl" />,
    accentColor: "from-purple-500 to-indigo-600",
    tagColor: "text-purple-400 bg-purple-950/60 border-purple-800/60",
    description:
      "I've been behind the microphone for years, voicing characters for commercials, narrating children's books, and delivering municipal presentations (like for the City of New Orleans / NORTA). I also love producing beats and original tracks in Logic Pro.",
    highlights: [
      "Official municipal voiceover for Nelson/Nygaard & City of New Orleans (NORTA transit presentation).",
      "Dynamic character vocal performances for commercials, animated spots, and games.",
      "Music production, beat making, and acoustic engineering in Logic Pro and Audacity.",
    ],
    skills: [
      "Character Voiceover",
      "Technical Narration",
      "Audiobook Narration",
      "Logic Pro",
      "Acoustic Engineering",
      "Beat Production",
    ],
  },
  {
    id: "community",
    tabLabel: "Community & Ethos",
    title: "Community, Culture & Life",
    subtitle: "The MOBB, Freemasonry, Fatherhood & Sport",
    icon: <FaUsers className="text-rose-400 text-2xl" />,
    accentColor: "from-rose-500 to-pink-600",
    tagColor: "text-rose-400 bg-rose-950/60 border-rose-800/60",
    description:
      "Code is a tool, not an identity. My purpose comes from family—raising two young sons, learning from Freemasonry's moral craftsmanship, playing a round of golf, hitting the roller rink, and building community projects like The MOBB to help people discover and support Black-owned businesses.",
    highlights: [
      "Built The MOBB (Map of Black Businesses) to drive local patronage to minority enterprises.",
      "Helped my 9-year-old son brainstorm, write, and self-publish his first book with ChatGPT.",
      "Active Freemason, dedicated father and husband, amateur golfer, and roller skater.",
    ],
    skills: [
      "The MOBB",
      "Youth AI Mentorship",
      "Freemasonry",
      "Supreme Mathematics",
      "Fatherhood",
      "Amateur Golf",
      "Roller Skating",
    ],
  },
];

const DimensionsSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("software");
  const currentDim =
    dimensions.find((d) => d.id === activeTab) || dimensions[0];

  return (
    <section id="dimensions" className="py-24 bg-slate-950 text-white relative">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-xs font-semibold uppercase tracking-wider text-cyan-400 mb-3">
            Crafts &amp; Focus Areas
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
            Different Angles. One Shared Mindset.
          </h2>
          <p className="mt-4 text-slate-400 text-base sm:text-lg font-light">
            A look at the different areas I spend time in—from frontend code and
            systems architecture to voice performance, engineering, and
            community.
          </p>
        </div>

        {/* Dimension Tabs */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-12">
          {dimensions.map((dim) => {
            const isSelected = activeTab === dim.id;
            return (
              <button
                key={dim.id}
                onClick={() => setActiveTab(dim.id)}
                className={`flex items-center gap-2.5 px-4 sm:px-5 py-3 rounded-xl font-medium text-xs sm:text-sm transition transform hover:-translate-y-0.5 border ${
                  isSelected
                    ? `bg-slate-800 text-white border-slate-600 shadow-xl shadow-slate-950`
                    : `bg-slate-900/60 text-slate-400 hover:text-slate-200 border-slate-800`
                }`}
              >
                {dim.icon}
                <span>{dim.tabLabel}</span>
              </button>
            );
          })}
        </div>

        {/* Active Dimension Showcase Card */}
        <div className="relative rounded-3xl bg-slate-900/90 border border-slate-800 p-6 sm:p-10 shadow-2xl overflow-hidden transition-all duration-300">
          {/* Ambient Corner Gradient */}
          <div
            className={`absolute top-0 right-0 w-80 h-80 bg-gradient-to-br ${currentDim.accentColor} opacity-10 blur-3xl pointer-events-none`}
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative z-10">
            {/* Main Details */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <div
                  className={`inline-block px-3 py-1 rounded-full border text-xs font-semibold mb-3 ${currentDim.tagColor}`}
                >
                  {currentDim.subtitle}
                </div>
                <h3 className="text-2xl sm:text-3xl font-black text-white flex items-center gap-3">
                  {currentDim.icon}
                  <span>{currentDim.title}</span>
                </h3>
              </div>

              <p className="text-slate-300 text-base sm:text-lg leading-relaxed font-light">
                {currentDim.description}
              </p>

              {/* Highlights Checklist */}
              <div className="space-y-3 pt-2">
                <h4 className="text-xs uppercase tracking-wider text-slate-400 font-bold">
                  Key Focus &amp; Impact:
                </h4>
                {currentDim.highlights.map((h, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 text-slate-200 text-sm sm:text-base"
                  >
                    <FaCheckCircle className="text-cyan-400 mt-1 flex-shrink-0" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Skills & Badges Box */}
            <div className="lg:col-span-5 bg-slate-950/70 border border-slate-800/80 rounded-2xl p-6 sm:p-8 space-y-5">
              <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-300">
                Competencies &amp; Capabilities
              </h4>
              <div className="flex flex-wrap gap-2">
                {currentDim.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-3 py-1.5 rounded-lg bg-slate-800/80 border border-slate-700/60 text-xs sm:text-sm font-medium text-slate-200 shadow-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              {/* Custom High-Conversion CTA if available */}
              {currentDim.customCta && (
                <div className="pt-2">
                  <a
                    href={currentDim.customCta.href}
                    target={
                      currentDim.customCta.external ? "_blank" : undefined
                    }
                    rel={
                      currentDim.customCta.external
                        ? "noopener noreferrer"
                        : undefined
                    }
                    className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/40 transition transform hover:-translate-y-0.5"
                  >
                    <span>{currentDim.customCta.text}</span>
                    <FaExternalLinkAlt size={11} />
                  </a>
                </div>
              )}

              {/* Interactive CTA links */}
              <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-xs">
                <a
                  href="#creations"
                  className="inline-flex items-center gap-1.5 font-semibold text-cyan-400 hover:text-cyan-300 transition"
                >
                  <span>Related projects</span>
                  <span>→</span>
                </a>
                <a
                  href="#connect"
                  className="inline-flex items-center gap-1.5 font-medium text-slate-400 hover:text-white transition"
                >
                  <span>Inquire / Connect</span>
                  <span>→</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DimensionsSection;
