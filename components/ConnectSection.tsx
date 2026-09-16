import React, { useState } from "react";
import {
  FaCommentDots,
  FaExternalLinkAlt,
  FaGithub,
  FaGlobe,
  FaLinkedin,
  FaMapMarkerAlt,
  FaPaperPlane,
} from "react-icons/fa";

const ConnectSection: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    subject: "IT Systems Architecture & Consulting (TenK Solutions)",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

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
                className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-bold text-sm text-center shadow-lg shadow-emerald-950/50 transition transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
              >
                <span>Book Discovery Call at TenK</span>
                <FaExternalLinkAlt size={12} />
              </a>

              <a
                href="https://www.linkedin.com/in/kielbyrne"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-6 rounded-xl bg-slate-800/90 hover:bg-slate-800 border border-slate-700 hover:border-slate-500 text-slate-200 font-semibold text-sm text-center transition flex items-center justify-center gap-2"
              >
                <FaLinkedin className="text-blue-400" />
                <span>Direct Message on LinkedIn</span>
              </a>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Verified Channels (No Scrapeable PII) */}
          <div className="lg:col-span-5 space-y-8">
            <div className="rounded-3xl bg-slate-900/90 border border-slate-800 p-8 shadow-xl space-y-6">
              <h3 className="text-xl font-bold text-white mb-2">
                Verified Channels
              </h3>
              <p className="text-xs text-slate-400 font-light mb-4">
                To prevent spam and automated harvesting, direct communication
                is channeled through verified professional portals:
              </p>

              <div className="space-y-4">
                <a
                  href="https://www.linkedin.com/in/kielbyrne"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 rounded-xl bg-slate-950/60 hover:bg-slate-800/80 border border-slate-800 hover:border-blue-500/50 transition group"
                >
                  <div className="w-11 h-11 rounded-xl bg-blue-950/80 text-blue-400 flex items-center justify-center text-xl group-hover:scale-110 transition">
                    <FaLinkedin />
                  </div>
                  <div className="flex-1">
                    <div className="text-xs text-slate-400">
                      Professional Network
                    </div>
                    <div className="text-sm font-semibold text-white group-hover:text-blue-300 flex items-center justify-between">
                      <span>Connect on LinkedIn</span>
                      <span className="text-xs text-slate-500">→</span>
                    </div>
                  </div>
                </a>

                <a
                  href="https://github.com/kiel-h-byrne"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 rounded-xl bg-slate-950/60 hover:bg-slate-800/80 border border-slate-800 hover:border-slate-500/50 transition group"
                >
                  <div className="w-11 h-11 rounded-xl bg-slate-800/80 text-slate-300 flex items-center justify-center text-xl group-hover:scale-110 transition">
                    <FaGithub />
                  </div>
                  <div className="flex-1">
                    <div className="text-xs text-slate-400">
                      Code &amp; Open Source
                    </div>
                    <div className="text-sm font-semibold text-white group-hover:text-slate-200 flex items-center justify-between">
                      <span>github.com/kiel-h-byrne</span>
                      <span className="text-xs text-slate-500">→</span>
                    </div>
                  </div>
                </a>

                <a
                  href="https://www.tenksolutions.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 rounded-xl bg-slate-950/60 hover:bg-slate-800/80 border border-slate-800 hover:border-emerald-500/50 transition group"
                >
                  <div className="w-11 h-11 rounded-xl bg-emerald-950/80 text-emerald-400 flex items-center justify-center text-xl group-hover:scale-110 transition">
                    <FaGlobe />
                  </div>
                  <div className="flex-1">
                    <div className="text-xs text-slate-400">
                      IT Systems &amp; Consulting
                    </div>
                    <div className="text-sm font-semibold text-white group-hover:text-emerald-300 flex items-center justify-between">
                      <span>TenK Solutions</span>
                      <span className="text-xs text-slate-500">→</span>
                    </div>
                  </div>
                </a>

                <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-950/40 border border-slate-800/60">
                  <div className="w-11 h-11 rounded-xl bg-slate-900 text-slate-400 flex items-center justify-center text-lg">
                    <FaMapMarkerAlt />
                  </div>
                  <div>
                    <div className="text-xs text-slate-400">
                      Base of Operations
                    </div>
                    <div className="text-sm font-medium text-slate-300">
                      Washington, DC Metro Area / Remote
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Dispatch Form */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl bg-slate-900/90 border border-slate-800 p-8 sm:p-10 shadow-xl">
              <h3 className="text-xl font-bold text-white mb-2">
                Send an Inquiry
              </h3>
              <p className="text-slate-400 text-sm mb-6">
                Fill in your message topic below to initiate a conversation via
                LinkedIn or consulting portal.
              </p>

              {submitted ? (
                <div className="p-8 rounded-2xl bg-slate-950/90 border border-emerald-500/40 text-center space-y-4">
                  <div className="w-12 h-12 rounded-full bg-emerald-950 text-emerald-400 flex items-center justify-center mx-auto text-xl">
                    <FaCommentDots />
                  </div>
                  <div className="text-xl font-bold text-white">
                    Thank You, {formData.name || "Friend"}!
                  </div>

                  {formData.subject.includes("TenK") ||
                  formData.subject.includes("Systems") ? (
                    <>
                      <p className="text-slate-300 text-sm max-w-md mx-auto font-light leading-relaxed">
                        To discuss your systems architecture or book a free
                        discovery consultation directly with{" "}
                        <strong className="text-white">TenK Solutions</strong>,
                        proceed below:
                      </p>
                      <div className="flex flex-wrap justify-center gap-3 pt-2">
                        <a
                          href="https://www.tenksolutions.com"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-bold text-xs sm:text-sm transition shadow-lg shadow-emerald-950"
                        >
                          Book Discovery Call at TenK Solutions →
                        </a>
                        <a
                          href="https://www.linkedin.com/in/kielbyrne"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs sm:text-sm border border-slate-700 transition"
                        >
                          Message on LinkedIn →
                        </a>
                      </div>
                    </>
                  ) : (
                    <>
                      <p className="text-slate-300 text-sm max-w-md mx-auto font-light leading-relaxed">
                        To connect directly without email harvesting, message me
                        on LinkedIn or visit the TenK Solutions portal:
                      </p>
                      <div className="flex flex-wrap justify-center gap-3 pt-2">
                        <a
                          href="https://www.linkedin.com/in/kielbyrne"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs sm:text-sm transition shadow-lg shadow-blue-950"
                        >
                          Open LinkedIn Message →
                        </a>
                        <a
                          href="https://www.tenksolutions.com"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs sm:text-sm border border-slate-700 transition"
                        >
                          TenK Solutions Portal →
                        </a>
                      </div>
                    </>
                  )}

                  <div>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="text-xs text-slate-500 hover:text-slate-300 underline pt-4"
                    >
                      Reset form
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-slate-400 font-semibold mb-1">
                      Your Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. Alex Taylor"
                      className="w-full px-4 py-3 rounded-xl bg-slate-950/80 border border-slate-800 text-white focus:outline-none focus:border-cyan-400 text-sm transition"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-slate-400 font-semibold mb-1">
                      Topic / Inquiry Type
                    </label>
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl bg-slate-950/80 border border-slate-800 text-white focus:outline-none focus:border-cyan-400 text-sm transition"
                    >
                      <option value="IT Systems Architecture & Consulting (TenK Solutions)">
                        IT Systems Architecture &amp; Consulting (TenK
                        Solutions)
                      </option>
                      <option value="Business Operations & AI Automation (TenK Solutions)">
                        Business Operations &amp; AI Automation (TenK Solutions)
                      </option>
                      <option value="Frontend Software Engineering & Web Architecture">
                        Frontend Software Engineering &amp; Web Architecture
                      </option>
                      <option value="Board Advisory & Technology Governance">
                        Board Advisory &amp; Technology Governance
                      </option>
                      <option value="Voiceover & Narration Booking">
                        Voiceover &amp; Narration Booking
                      </option>
                      <option value="General Collaboration / Say Hello">
                        General Collaboration / Say Hello
                      </option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-slate-400 font-semibold mb-1">
                      Message / Project Details
                    </label>
                    <textarea
                      name="message"
                      rows={4}
                      required
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Describe your systems challenge, automation goals, timeline, or collaboration idea..."
                      className="w-full px-4 py-3 rounded-xl bg-slate-950/80 border border-slate-800 text-white focus:outline-none focus:border-cyan-400 text-sm transition"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-sm tracking-wide shadow-lg shadow-cyan-950 transition transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
                  >
                    <FaPaperPlane />
                    <span>Continue to Message</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Minimal Footer */}
        <div className="mt-24 pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
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
