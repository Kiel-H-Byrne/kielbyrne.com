import React from "react";
import {
  FaArrowRight,
  FaCalendarAlt,
  FaComments,
  FaExternalLinkAlt,
  FaGithub,
  FaGlobe,
  FaLinkedin,
  FaMapMarkerAlt,
  FaRocket,
} from "react-icons/fa";
import { trackLeadOrChannel } from "@/lib/gtag";

const ConnectSection: React.FC = () => {
  return (
    <section id="connect" className="py-24 bg-slate-950 text-white relative">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-800/60 text-xs font-semibold uppercase tracking-wider text-cyan-400 mb-3">
            Say Hello
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
            Let&apos;s Connect
          </h2>
          <p className="mt-4 text-slate-300 text-base sm:text-lg font-light leading-relaxed">
            Whether you need a systems engineering partner to eliminate business
            bottlenecks, want to discuss frontend architecture, or simply wish
            to say hello.
          </p>
        </div>

        {/* Dedicated Systems & Consulting Lead Funnel Banner */}
        <div className="mb-14 rounded-3xl bg-gradient-to-br from-slate-900 via-indigo-950/40 to-slate-900 border border-emerald-500/40 p-8 sm:p-10 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-700/80 text-xs font-semibold text-emerald-300">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>
                  TenK Solutions, LLC • Systems &amp; Operations Consulting
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                Need to Eliminate Operational Bottlenecks or Upgrade Your
                Infrastructure?
              </h3>

              <p className="text-slate-300 text-sm sm:text-base font-light leading-relaxed">
                Through <strong className="text-white">TenK Solutions</strong>,
                I partner with companies across the Washington, DC, Maryland,
                and Virginia (DMV) area and nationally to engineer high-velocity
                systems:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800">
                  <div className="text-sm font-bold text-cyan-300 mb-1">
                    AI &amp; Operations Automation
                  </div>
                  <div className="text-xs text-slate-400 font-light">
                    Automated client intake, staff knowledge systems, and
                    process elimination.
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800">
                  <div className="text-sm font-bold text-emerald-300 mb-1">
                    Executive Dashboards
                  </div>
                  <div className="text-xs text-slate-400 font-light">
                    Live operational visibility and automated reporting—built in
                    weeks, not months.
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800">
                  <div className="text-sm font-bold text-amber-300 mb-1">
                    Fractional Systems Lead
                  </div>
                  <div className="text-xs text-slate-400 font-light">
                    Cloud migration, secure VPN/SCIF setups, and automated
                    endpoint telemetry.
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-center">
              <a
                href="https://www.tenksolutions.com"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() =>
                  trackLeadOrChannel("click_discovery_call", {
                    channelName: "TenK Solutions Discovery Call Banner",
                    url: "https://www.tenksolutions.com",
                  })
                }
                className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-bold text-sm text-center shadow-lg shadow-emerald-950/50 transition transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
              >
                <span>Book Discovery Call at TenK</span>
                <FaExternalLinkAlt size={12} />
              </a>

              <a
                href="https://www.linkedin.com/in/kielbyrne"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() =>
                  trackLeadOrChannel("click_channel", {
                    channelName: "LinkedIn Direct Message Banner",
                    url: "https://www.linkedin.com/in/kielbyrne",
                  })
                }
                className="w-full py-3.5 px-6 rounded-xl bg-slate-800/90 hover:bg-slate-800 border border-slate-700 hover:border-slate-500 text-slate-200 font-semibold text-sm text-center transition flex items-center justify-center gap-2"
              >
                <FaLinkedin className="text-blue-400" />
                <span>Direct Message on LinkedIn</span>
              </a>
            </div>
          </div>
        </div>

        {/* Primary Direct Contact Channels Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Card 1: Professional Network & Direct Messaging */}
          <div className="rounded-3xl bg-slate-900/90 border border-slate-800 p-8 sm:p-10 shadow-xl flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-blue-950/80 border border-blue-800/60 text-blue-400 flex items-center justify-center text-2xl">
                  <FaLinkedin />
                </div>
                <span className="text-[11px] font-semibold uppercase tracking-wider text-blue-300 bg-blue-950/60 border border-blue-800/60 px-3 py-1 rounded-full">
                  Fastest Response
                </span>
              </div>

              <h3 className="text-2xl font-bold text-white">
                Connect Directly on LinkedIn
              </h3>

              <p className="text-slate-300 text-sm sm:text-base font-light leading-relaxed">
                Direct messaging is open on LinkedIn for software engineering inquiries,
                board advisory, voiceover casting, systems consulting, or general collaboration.
              </p>

              <div className="pt-2 text-xs text-slate-400 space-y-2">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                  <span>Direct 1-on-1 dialogue with no intermediate filters</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                  <span>Resume, CV, and credential requests welcome</span>
                </div>
              </div>
            </div>

            <div>
              <a
                href="https://www.linkedin.com/in/kielbyrne"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() =>
                  trackLeadOrChannel("click_channel", {
                    channelName: "LinkedIn Primary Card",
                    url: "https://www.linkedin.com/in/kielbyrne",
                  })
                }
                className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-sm text-center shadow-lg shadow-blue-950/50 transition transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
              >
                <FaComments />
                <span>Message on LinkedIn</span>
                <FaArrowRight size={12} className="ml-1" />
              </a>
            </div>
          </div>

          {/* Card 2: TenK Solutions Consulting & Discovery */}
          <div className="rounded-3xl bg-slate-900/90 border border-emerald-500/30 p-8 sm:p-10 shadow-xl flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-emerald-950/80 border border-emerald-800/60 text-emerald-400 flex items-center justify-center text-2xl">
                  <FaGlobe />
                </div>
                <span className="text-[11px] font-semibold uppercase tracking-wider text-emerald-300 bg-emerald-950/60 border border-emerald-800/60 px-3 py-1 rounded-full">
                  Systems &amp; Advisory
                </span>
              </div>

              <h3 className="text-2xl font-bold text-white">
                TenK Solutions Consulting Portal
              </h3>

              <p className="text-slate-300 text-sm sm:text-base font-light leading-relaxed">
                Looking to eliminate operational bottlenecks, automate business workflows,
                or bring in fractional systems architecture for your enterprise?
              </p>

              <div className="pt-2 text-xs text-slate-400 space-y-2">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span>Free discovery call for organizations across DMV &amp; USA</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span>Solutions delivered in weeks without ongoing agency bloat</span>
                </div>
              </div>
            </div>

            <div>
              <a
                href="https://www.tenksolutions.com"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() =>
                  trackLeadOrChannel("click_discovery_call", {
                    channelName: "TenK Solutions Primary Card",
                    url: "https://www.tenksolutions.com",
                  })
                }
                className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-bold text-sm text-center shadow-lg shadow-emerald-950/50 transition transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
              >
                <FaCalendarAlt />
                <span>Visit TenK Solutions &amp; Book Call</span>
                <FaArrowRight size={12} className="ml-1" />
              </a>
            </div>
          </div>
        </div>

        {/* Secondary Channels & Base of Operations */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <a
            href="https://github.com/kiel-h-byrne"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() =>
              trackLeadOrChannel("click_channel", {
                channelName: "GitHub Bottom Pill",
                url: "https://github.com/kiel-h-byrne",
              })
            }
            className="flex items-center gap-4 p-4 rounded-2xl bg-slate-900/60 hover:bg-slate-800/80 border border-slate-800 hover:border-slate-600 transition group"
          >
            <div className="w-10 h-10 rounded-xl bg-slate-800 text-slate-300 flex items-center justify-center text-lg group-hover:scale-110 transition">
              <FaGithub />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[11px] text-slate-400">Open Source &amp; Code</div>
              <div className="text-sm font-semibold text-white truncate group-hover:text-slate-200">
                github.com/kiel-h-byrne
              </div>
            </div>
            <span className="text-xs text-slate-500 group-hover:translate-x-0.5 transition">→</span>
          </a>

          <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-900/40 border border-slate-800/60">
            <div className="w-10 h-10 rounded-xl bg-slate-800/70 text-cyan-400 flex items-center justify-center text-lg">
              <FaMapMarkerAlt />
            </div>
            <div>
              <div className="text-[11px] text-slate-400">Base of Operations</div>
              <div className="text-sm font-semibold text-slate-200">
                Washington, DC Metro / Remote
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-900/40 border border-slate-800/60 sm:col-span-2 lg:col-span-1">
            <div className="w-10 h-10 rounded-xl bg-slate-800/70 text-amber-400 flex items-center justify-center text-lg">
              <FaRocket />
            </div>
            <div>
              <div className="text-[11px] text-slate-400">Stewardship &amp; Community</div>
              <div className="text-sm font-semibold text-slate-200">
                PHFAMOESCEF &bull; SEED SPOT
              </div>
            </div>
          </div>
        </div>

        {/* Minimal Footer */}
        <div className="mt-20 pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <div>
            &copy; {new Date().getFullYear()} Kiel Hamilton Byrne. All rights
            reserved.
          </div>
          <div className="flex items-center gap-6">
            <a href="#hero" className="hover:text-slate-300 transition">
              Back to Top ↑
            </a>
            <a
              href="https://github.com/Kiel-H-Byrne/kielbyrne.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-slate-300 transition"
            >
              Open Source on GitHub
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ConnectSection;
