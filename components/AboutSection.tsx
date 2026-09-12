import Image from "next/image";
import React from "react";
import {
  FaBriefcase,
  FaGraduationCap,
  FaExternalLinkAlt,
} from "react-icons/fa";

interface TimelineItem {
  period: string;
  role: string;
  organization: string;
  orgUrl?: string;
  badge: string;
  badgeColor: string;
  summary: string;
  details: string[];
}

const careerTimeline: TimelineItem[] = [
  {
    period: "Present",
    role: "Frontend Software Developer",
    organization: "Lyntris (LYNX)",
    badge: "Current Role",
    badgeColor: "bg-emerald-950/80 text-emerald-400 border-emerald-800/80",
    summary:
      "Developing modern, responsive frontend user interfaces and clean component architectures.",
    details: [
      "Crafting intuitive web interfaces focused on performance, modularity, and seamless user experiences.",
      "Collaborating on engineering workflows and frontend best practices.",
    ],
  },
  {
    period: "Ongoing",
    role: "Founder & Principal Systems Consultant",
    organization: "TenK Solutions",
    orgUrl: "https://www.tenksolutions.com",
    badge: "Automation & Systems",
    badgeColor: "bg-emerald-950/80 text-emerald-400 border-emerald-800/80",
    summary:
      "Partnering with businesses across the DMV and nationally to eliminate operational bottlenecks with AI automation, executive reporting dashboards, and resilient IT infrastructure.",
    details: [
      "Engineering automated client intake pipelines, staff knowledge retrieval systems, and live executive reporting.",
      "Advising organizations as a fractional systems architect on cloud migration, zero-trust VPNs, and disaster recovery.",
      "Delivering fast, high-impact solutions built in weeks without agency bloat or ongoing retainer traps.",
    ],
  },
  {
    period: "2022 – 2023",
    role: "Software Engineer – Digital Merchandising & I18N",
    organization: "GoBrands (Gopuff, BevMo)",
    badge: "Full-Stack & Mobile",
    badgeColor: "bg-blue-950/80 text-blue-400 border-blue-800/80",
    summary:
      "Engineered high-visibility ad and merchandising surfaces across home, search, and checkout using React Native, TypeScript, and GraphQL.",
    details: [
      "Built full-stack CMS features for product collections, ad placements, and localized merchandising.",
      "Bridged engineering and internationalization needs alongside product leadership.",
    ],
  },
  {
    period: "2019 – 2022",
    role: "Software Engineer – Internationalization",
    organization: "CoStar Group",
    badge: "Global Scale",
    badgeColor: "bg-purple-950/80 text-purple-400 border-purple-800/80",
    summary:
      "Built custom i18n tooling, components, tests, and automated translation pipelines for a global platform available in 7+ languages and 155 currencies.",
    details: [
      "Reduced translation turnaround time by 78% (from 9 days down to 2) using GoLang, TypeScript, and automation scripts.",
      "Cut localization syntax errors by 60% with automated linting rules.",
      "Led professional development for the 'Black Excellence Network' employee resource group.",
    ],
  },
  {
    period: "2015 – 2019",
    role: "IT Services Manager & Infrastructure Site Lead",
    organization: "Perkins&Will",
    badge: "Systems & DevOps",
    badgeColor: "bg-amber-950/80 text-amber-400 border-amber-800/80",
    summary:
      "Managed technology operations, enterprise A/V, VOIP, SCIF spaces, and built internal web tools to track 2,500+ global assets.",
    details: [
      "Engineered 'PWITW' (Perkins&Will Where In The World) web app and PowerShell collectors tracking 2,500+ devices across 20+ offices in 7 countries.",
      "Automated complex administrative and design construction tasks with PowerShell and JavaScript.",
    ],
  },
  {
    period: "2012 – 2015",
    role: "IT Support Specialist",
    organization: "HOK (NYC, LA, DC)",
    badge: "Infrastructure",
    badgeColor: "bg-slate-800 text-slate-300 border-slate-700",
    summary:
      "Administered end-user hardware, software lifecycles, and cross-office IT support for 100+ users across Manhattan, Los Angeles, and Washington DC.",
    details: [
      "Managed asset deployment, diagnostic resolution, and multi-site remote support.",
    ],
  },
  {
    period: "Foundations",
    role: "Mechanical Engineering & Systems Design",
    organization: "UMBC (B.S.) • NYU • Excelsior College",
    badge: "Education & Roots",
    badgeColor: "bg-slate-800 text-slate-300 border-slate-700",
    summary:
      "Rooted in physics, fluid mechanics, and structural systems before transitioning into computing.",
    details: [
      "B.S. in Mechanical Engineering from University of Maryland, Baltimore County (UMBC, 2006).",
      "Professional Certification in Plumbing Systems Design from NYU SPS (2009).",
      "B.P.S. in Information Technology Management from Excelsior College (2013).",
    ],
  },
  {
    period: "1995",
    role: "Video Game Tester (First Tech Job Ever)",
    organization: "War 2410 (Super Nintendo / SNES)",
    badge: "Retro Origin",
    badgeColor: "bg-purple-950/80 text-purple-400 border-purple-800/80",
    summary:
      "Spent hours methodically attempting to break a turn-based sci-fi strategy title on the Super Nintendo to log reproduction steps for developers.",
    details: [
      "Early epiphany: deliberately breaking software is the quickest way to learn how resilient systems are actually built.",
    ],
  },
];

const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-24 bg-slate-900 text-white relative">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-800/60 text-xs font-semibold uppercase tracking-wider text-cyan-400 mb-3">
            About &amp; Journey
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
            How I Got Here
          </h2>
          <p className="mt-4 text-slate-300 text-base sm:text-lg font-light leading-relaxed">
            From mechanical engineering and physical systems design to
            enterprise IT infrastructure, global frontend software, and voice
            performance.
          </p>
        </div>

        {/* Narrative Intro Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center mb-20 bg-slate-950/80 rounded-3xl p-8 sm:p-12 border border-slate-800 shadow-2xl">
          {/* Portrait & Badges */}
          <div className="lg:col-span-4 flex flex-col items-center">
            <div className="relative group mb-6">
              <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-amber-500 rounded-3xl blur-md opacity-40 group-hover:opacity-75 transition duration-500" />
              <div className="relative rounded-2xl overflow-hidden border border-slate-700 bg-slate-950 p-2 shadow-xl">
                <Image
                  src="/img/coolkiel.jpg"
                  alt="Kiel Hamilton Byrne"
                  width={280}
                  height={280}
                  className="rounded-xl object-cover w-64 h-64 sm:w-72 sm:h-72 mx-auto transition duration-500 group-hover:scale-105"
                  priority
                />
              </div>
            </div>

            <div className="text-center space-y-1">
              <div className="text-lg font-bold text-white">
                Kiel Hamilton Byrne
              </div>
              <div className="text-xs text-emerald-400 font-medium">
                Frontend Developer @ Lyntris (LYNX)
              </div>
              <div className="text-xs text-slate-400">Washington, DC Area</div>
            </div>
          </div>

          {/* Human Bio Copy */}
          <div className="lg:col-span-8 space-y-5 text-slate-300 font-light leading-relaxed text-base sm:text-lg">
            <p>
              I’ve always been someone who wants to understand how the whole
              machine works—whether that machine is a piece of software, a
              mechanical assembly, an IT network, or a piece of music.
            </p>

            <p>
              My background started in physical engineering with a{" "}
              <strong className="text-white font-medium">
                B.S. in Mechanical Engineering from UMBC
              </strong>{" "}
              and certification in{" "}
              <strong className="text-white font-medium">
                Plumbing Systems Design from NYU
              </strong>
              . That training gave me a lasting appreciation for codes, flow
              rates, and structural integrity that carried over naturally when I
              moved into technology.
            </p>

            <p>
              Over the years, I managed multi-office infrastructure for
              architecture firms like{" "}
              <strong className="text-white font-medium">
                Perkins&amp;Will
              </strong>{" "}
              (where I built an automated tracker for 2,500+ global assets),
              engineered internationalized frontend platforms for{" "}
              <strong className="text-white font-medium">CoStar Group</strong>{" "}
              and{" "}
              <strong className="text-white font-medium">Gopuff / BevMo</strong>
              , and now work as a{" "}
              <strong className="text-white font-medium">
                Frontend Software Developer at Lyntris (LYNX)
              </strong>
              .
            </p>

            <p>
              Along the way, I’ve stayed deeply plugged into community:
              mentoring social-impact founders through{" "}
              <strong className="text-white font-medium">SEED SPOT</strong>,
              creating cultural platforms with{" "}
              <strong className="text-white font-medium">PAKKE</strong>, and
              building{" "}
              <strong className="text-white font-medium">The MOBB</strong> to
              support local Black-owned businesses.
            </p>

            <p>
              I also run{" "}
              <a
                href="https://www.tenksolutions.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan-400 hover:text-cyan-300 underline underline-offset-4 font-normal inline-flex items-center gap-1"
              >
                <span>TenK Solutions</span>
                <FaExternalLinkAlt size={11} />
              </a>{" "}
              for hands-on IT consulting, voice commercials and narrations, play
              a little golf, roller skate whenever I can, and spend every
              possible moment with my wife and two sons.
            </p>
          </div>
        </div>

        {/* Chronological Career & Craft Timeline */}
        <div>
          <div className="flex items-center gap-3 mb-10">
            <div className="p-2.5 rounded-xl bg-slate-800 text-cyan-400">
              <FaBriefcase size={20} />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white">
                Experience &amp; Milestones
              </h3>
              <p className="text-xs text-slate-400 font-light">
                A timeline of hands-on roles, enterprise builds, and foundations
              </p>
            </div>
          </div>

          <div className="relative border-l-2 border-slate-800 ml-4 sm:ml-6 space-y-10">
            {careerTimeline.map((item, index) => (
              <div key={index} className="relative pl-6 sm:pl-8 group">
                {/* Timeline Node Bullet */}
                <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-slate-900 border-2 border-cyan-400 group-hover:bg-cyan-400 group-hover:scale-125 transition duration-200" />

                {/* Timeline Card */}
                <div className="rounded-2xl bg-slate-950/70 border border-slate-800/80 p-6 hover:border-slate-700 transition duration-200 shadow-lg">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="text-xs font-mono text-cyan-400 font-semibold bg-cyan-950/60 px-2.5 py-0.5 rounded border border-cyan-800/60">
                        {item.period}
                      </span>
                      <h4 className="text-lg font-bold text-white">
                        {item.role}
                      </h4>
                      <span className="text-sm text-slate-400 font-normal">
                        @{" "}
                        {item.orgUrl ? (
                          <a
                            href={item.orgUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-slate-200 hover:text-cyan-300 underline underline-offset-2 inline-flex items-center gap-1"
                          >
                            <span>{item.organization}</span>
                            <FaExternalLinkAlt size={10} />
                          </a>
                        ) : (
                          <span className="text-slate-200">
                            {item.organization}
                          </span>
                        )}
                      </span>
                    </div>

                    <span
                      className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full border ${item.badgeColor}`}
                    >
                      {item.badge}
                    </span>
                  </div>

                  <p className="text-slate-300 text-sm font-light mt-2 leading-relaxed">
                    {item.summary}
                  </p>

                  {item.details.length > 0 && (
                    <ul className="mt-3 space-y-1 text-xs text-slate-400 font-light list-disc list-inside">
                      {item.details.map((detail, dIdx) => (
                        <li key={dIdx} className="leading-normal">
                          {detail}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
