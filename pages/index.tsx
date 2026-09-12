import type { NextPage } from "next";
import Head from "next/head";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import GoogleRabbitHole from "@/components/GoogleRabbitHole";
import DimensionsSection from "@/components/DimensionsSection";
import CreationsSection from "@/components/CreationsSection";
import AudioLabSection from "@/components/AudioLabSection";
import EthosSection from "@/components/EthosSection";
import ConnectSection from "@/components/ConnectSection";

const Home: NextPage = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Kiel Hamilton Byrne",
    alternateName: "Kiel Byrne",
    url: "https://www.kielbyrne.com",
    image: "https://www.kielbyrne.com/img/coolkiel.jpg",
    jobTitle: "Frontend Software Developer",
    worksFor: {
      "@type": "Organization",
      name: "Lyntris (LYNX)",
    },
    alumniOf: [
      {
        "@type": "CollegeOrUniversity",
        name: "University of Maryland, Baltimore County",
      },
      {
        "@type": "CollegeOrUniversity",
        name: "Excelsior College",
      },
      {
        "@type": "CollegeOrUniversity",
        name: "NYU School of Professional Studies",
      },
    ],
    sameAs: [
      "https://www.linkedin.com/in/kielbyrne",
      "https://github.com/kiel-h-byrne",
      "https://www.tenksolutions.com",
    ],
    knowsAbout: [
      "Frontend Software Development",
      "Mechanical Engineering",
      "Enterprise IT Infrastructure",
      "Voiceover & Audio Engineering",
      "Internationalization and Localization",
      "Community Development",
    ],
  };

  return (
    <>
      <Head>
        <title>
          Kiel H. Byrne | Frontend Developer • Systems &amp; Creative Problem
          Solver
        </title>
        <meta
          name="description"
          content="Personal website of Kiel Hamilton Byrne. Frontend Software Developer at Lyntris (LYNX), IT consultant at TenK Solutions, voice actor, and mechanical engineering graduate."
        />
        <meta
          name="keywords"
          content="Kiel Byrne, Frontend Developer, Lyntris, LYNX, Systems Architect, Voiceover, TenK Solutions, The MOBB"
        />
        <meta name="author" content="Kiel Hamilton Byrne" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.kielbyrne.com/" />
        <meta
          property="og:title"
          content="Kiel H. Byrne | Frontend Developer • Systems &amp; Creative Problem Solver"
        />
        <meta
          property="og:description"
          content="Frontend Software Developer at Lyntris (LYNX), systems consultant, and creative problem solver."
        />
        <meta
          property="og:image"
          content="https://www.kielbyrne.com/img/coolkiel.jpg"
        />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://www.kielbyrne.com/" />
        <meta
          property="twitter:title"
          content="Kiel H. Byrne | Frontend Developer • Systems &amp; Creative Problem Solver"
        />
        <meta
          property="twitter:description"
          content="Frontend Software Developer at Lyntris (LYNX), systems consultant, and creative problem solver."
        />
        <meta
          property="twitter:image"
          content="https://www.kielbyrne.com/img/coolkiel.jpg"
        />

        {/* JSON-LD Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </Head>

      <Navbar />

      <main className="bg-slate-950 text-white min-h-screen selection:bg-cyan-500 selection:text-slate-950">
        <HeroSection />
        <GoogleRabbitHole />
        <AboutSection />
        <DimensionsSection />
        <CreationsSection />
        <AudioLabSection />
        <EthosSection />
        <ConnectSection />
      </main>
    </>
  );
};

export default Home;
