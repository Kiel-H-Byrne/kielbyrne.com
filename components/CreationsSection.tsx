import React, { useState } from "react";
import Image from "next/image";
import { FaExternalLinkAlt, FaGithub, FaLayerGroup } from "react-icons/fa";

interface Project {
  id: string;
  title: string;
  category: string;
  type: "community" | "enterprise" | "culture" | "ai";
  description: string;
  impact: string;
  image: string;
  url?: string;
  github?: string;
  tags: string[];
}

const projects: Project[] = [
  {
    id: "mobb",
    title: "The MOBB (Map of Black Businesses)",
    category: "Community Tech & Economic Empowerment",
    type: "community",
    description:
      "Built to help people easily discover and support Black-owned businesses nearby. Uses geospatial mapping to connect locals and visitors with community entrepreneurs.",
    impact:
      "Interactive map clusters, neighborhood search, and verified business profiles.",
    image: "/img/screencapture-mobb.png",
    url: "https://mobb.kielbyrne.com",
    tags: ["React", "Geolocation APIs", "Tailwind CSS", "Community Impact"],
  },
  {
    id: "pakke",
    title: "PAKKE",
    category: "Cultural Experiences & Live Community",
    type: "community",
    description:
      "A platform connecting curious people with immersive cultural gatherings, underground art exhibits, and live community experiences. Tagline: 'It's Happening, Go Find It.'",
    impact:
      "Brought diverse communities, creators, and venues together for authentic live events.",
    image: "/img/ss_pakke_desktop.png",
    tags: ["Community Hub", "Cultural Tech", "Live Events", "React"],
  },
  {
    id: "tenk",
    title: "TenK Solutions (Automation & Systems Consulting)",
    category: "Operations Automation & IT Architecture",
    type: "enterprise",
    description:
      "Eliminates operational bottlenecks through AI automation, client intake workflows, staff knowledge assistants, and resilient IT infrastructure for companies across the DMV and nationwide.",
    impact:
      "Built in weeks, not months: automated intake pipelines, executive reporting dashboards, and fractional IT systems advisory.",
    image: "/img/tenk-preview.svg",
    url: "https://www.tenksolutions.com",
    tags: [
      "AI Automation",
      "Operations Engineering",
      "IT Consulting",
      "Executive Dashboards",
      "DMV Metro",
    ],
  },
  {
    id: "pwitw",
    title: "PWITW (Where In The World)",
    category: "Enterprise Infrastructure & Automation",
    type: "enterprise",
    description:
      "Built for Perkins&Will to solve a real challenge: tracking 2,500+ workstations across 20+ offices in 7 countries. Combined automated PowerShell telemetry scripts with a secure web dashboard for instant audits.",
    impact:
      "Replaced manual hardware spreadsheets with automated daily telemetry and visual map clusters.",
    image: "/img/screencapture-pwitw.png",
    url: "https://pwitw.kielbyrne.com",
    tags: [
      "PowerShell",
      "Enterprise Automation",
      "Data Visualization",
      "Full-Stack",
    ],
  },
  {
    id: "todaysmath",
    title: "Today's Supreme Mathematics",
    category: "Cultural Computing & Philosophy",
    type: "culture",
    description:
      "A 365-day algorithmic calendar calculating Supreme Mathematics principles for every day of the year, providing daily reflections and room for philosophical dialogue.",
    impact:
      "Algorithmic date calculations paired with cultural education and reflection.",
    image: "/img/screencapture-todaysmath.png",
    url: "https://todaysmath.kielbyrne.com",
    tags: ["Algorithmic Computation", "Cultural Tech", "Next.js", "Education"],
  },
  {
    id: "pullup",
    title: "Pull Up!",
    category: "Hyper-Local Real-Time Social",
    type: "community",
    description:
      "A location-aware social concept: arrive at a neighborhood or venue, open the app, and see live reviews, tips, and stories left by people right in your immediate radius.",
    impact: "Bridges physical location with persistent local storytelling.",
    image: "/img/screencapture-pullup.png",
    url: "https://pullup.kielbyrne.com",
    tags: ["Geofencing", "Real-Time DB", "Mobile First", "Social"],
  },
  {
    id: "ai-authorship",
    title: "AI Youth Authorship Initiative",
    category: "AI & Family Education",
    type: "ai",
    description:
      "Documented the hands-on journey of helping my 9-year-old son use ChatGPT to brainstorm, structure, write, and self-publish his first original book. Featured on Dev.to.",
    impact:
      "Demonstrated practical, empowering prompt engineering for parent-child creative education.",
    image:
      "https://res.cloudinary.com/practicaldev/image/fetch/s--hp3sWC9l--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/88b84km32qu6yqbxpq3f.jpeg",
    url: "https://dev.to/tdotholla/unleash-your-childs-creativity-with-chatgpt-my-experience-helping-my-son-write-his-first-book-3d5n",
    tags: ["Generative AI", "Prompt Engineering", "Youth Mentorship", "Dev.to"],
  },
  {
    id: "thisweeksplays",
    title: "This Week's Plays",
    category: "Financial Literacy & Community Trading",
    type: "culture",
    description:
      "A community research hub where members share weekly stock ideas, track trade performance against an open leaderboard, and sharpen financial literacy together.",
    impact:
      "Encourages transparent trade research, risk awareness, and collaborative learning.",
    image: "/img/screencapture-thisweeksplays.png",
    url: "https://thisweeksplays.kielbyrne.com",
    tags: ["Financial Literacy", "React", "Community Analytics", "Data"],
  },
];

const filterCategories = [
  { key: "all", label: "All Creations" },
  { key: "community", label: "Community & Impact" },
  { key: "enterprise", label: "Enterprise & Systems" },
  { key: "culture", label: "Culture & Numeracy" },
  { key: "ai", label: "AI & Education" },
];

const CreationsSection: React.FC = () => {
  const [filter, setFilter] = useState("all");

  const filteredProjects =
    filter === "all" ? projects : projects.filter((p) => p.type === filter);

  return (
    <section id="creations" className="py-24 bg-slate-950 text-white relative">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-800/60 text-xs font-semibold uppercase tracking-wider text-emerald-400 mb-3">
            <FaLayerGroup />
            <span>Creations &amp; Solutions</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
            Built to Empower, Optimize &amp; Connect
          </h2>
          <p className="mt-4 text-slate-400 text-base sm:text-lg font-light">
            A curated portfolio of software products, automated enterprise
            telemetry, and community-driven tools.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-12">
          {filterCategories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setFilter(cat.key)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition border ${
                filter === cat.key
                  ? "bg-emerald-500 text-slate-950 font-bold border-emerald-400 shadow-lg shadow-emerald-950"
                  : "bg-slate-900/70 text-slate-400 hover:text-white border-slate-800"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="group rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-emerald-500/50 transition-all duration-300 flex flex-col overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-emerald-950/30 transform hover:-translate-y-1"
            >
              {/* Image Preview Container */}
              <div className="relative h-52 w-full bg-slate-950 overflow-hidden border-b border-slate-800">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover object-top transition duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60" />
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-slate-950/80 backdrop-blur-md border border-slate-700/60 text-[11px] font-semibold text-emerald-300">
                  {project.category}
                </div>
              </div>

              {/* Content Details */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="text-xl font-bold text-white group-hover:text-emerald-300 transition">
                    {project.title}
                  </h3>
                  <p className="text-slate-300 text-sm mt-2 font-light leading-relaxed">
                    {project.description}
                  </p>

                  {project.impact && (
                    <div className="mt-3 p-2.5 rounded-lg bg-slate-950/60 border border-slate-800/80 text-xs text-slate-400">
                      <strong className="text-slate-300">Impact: </strong>
                      {project.impact}
                    </div>
                  )}
                </div>

                <div>
                  {/* Tech Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-2 mb-4">
                    {project.tags.map((tag, tIndex) => (
                      <span
                        key={tIndex}
                        className="px-2 py-0.5 rounded bg-slate-800/90 text-[11px] font-medium text-slate-300 border border-slate-700/50"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-3 pt-3 border-t border-slate-800/80">
                    {project.url && (
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-400 hover:text-cyan-300 transition"
                      >
                        <span>Live Experience</span>
                        <FaExternalLinkAlt size={10} />
                      </a>
                    )}
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-white transition"
                      >
                        <FaGithub size={12} />
                        <span>Source</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CreationsSection;
