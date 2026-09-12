import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { FaCompass, FaMicrophone, FaTerminal, FaServer } from "react-icons/fa";

const HeroSection: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [audioActive, setAudioActive] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 7;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);

    // ==========================================
    // 1. SPHERICAL PARTICLE ORB (Fibonacci Spiral)
    // ==========================================
    const orbCount = 2200;
    const orbRadius = 2.4;
    const orbPositions = new Float32Array(orbCount * 3);
    const orbBasePositions = new Float32Array(orbCount * 3);
    const orbColors = new Float32Array(orbCount * 3);

    const colorCyan = new THREE.Color("#00f0ff");
    const colorGold = new THREE.Color("#f59e0b");
    const colorBlue = new THREE.Color("#3b82f6");

    const phi = Math.PI * (3 - Math.sqrt(5)); // Golden angle

    for (let i = 0; i < orbCount; i++) {
      const y = 1 - (i / (orbCount - 1)) * 2; // y goes from 1 to -1
      const radiusAtY = Math.sqrt(1 - y * y); // radius at y
      const theta = phi * i; // golden angle increment

      const x = Math.cos(theta) * radiusAtY;
      const z = Math.sin(theta) * radiusAtY;

      const px = x * orbRadius;
      const py = y * orbRadius;
      const pz = z * orbRadius;

      orbPositions[i * 3] = px;
      orbPositions[i * 3 + 1] = py;
      orbPositions[i * 3 + 2] = pz;

      orbBasePositions[i * 3] = px;
      orbBasePositions[i * 3 + 1] = py;
      orbBasePositions[i * 3 + 2] = pz;

      // Color gradient: blend cyan at top, blue in middle, warm gold near poles/equator
      const t = (y + 1) / 2;
      const col = new THREE.Color();
      if (t > 0.6) {
        col.lerpColors(colorCyan, colorBlue, (t - 0.6) / 0.4);
      } else {
        col.lerpColors(colorBlue, colorGold, (0.6 - t) / 0.6);
      }

      orbColors[i * 3] = col.r;
      orbColors[i * 3 + 1] = col.g;
      orbColors[i * 3 + 2] = col.b;
    }

    const orbGeometry = new THREE.BufferGeometry();
    orbGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(orbPositions, 3)
    );
    orbGeometry.setAttribute("color", new THREE.BufferAttribute(orbColors, 3));

    // Particle texture (soft circle)
    const createCircleTexture = () => {
      const size = 64;
      const texCanvas = document.createElement("canvas");
      texCanvas.width = size;
      texCanvas.height = size;
      const ctx = texCanvas.getContext("2d");
      if (ctx) {
        const gradient = ctx.createRadialGradient(
          size / 2,
          size / 2,
          0,
          size / 2,
          size / 2,
          size / 2
        );
        gradient.addColorStop(0, "rgba(255, 255, 255, 1)");
        gradient.addColorStop(0.3, "rgba(255, 255, 255, 0.8)");
        gradient.addColorStop(0.8, "rgba(255, 255, 255, 0.15)");
        gradient.addColorStop(1, "rgba(255, 255, 255, 0)");
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, size, size);
      }
      return new THREE.CanvasTexture(texCanvas);
    };

    const particleTexture = createCircleTexture();

    const orbMaterial = new THREE.PointsMaterial({
      size: 0.08,
      vertexColors: true,
      map: particleTexture,
      transparent: true,
      opacity: 0.88,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const orbPoints = new THREE.Points(orbGeometry, orbMaterial);
    scene.add(orbPoints);

    // ==========================================
    // 2. EQUATORIAL SOUNDWAVE RINGS
    // ==========================================
    const ringCount = 750;
    const ringPositions = new Float32Array(ringCount * 3);
    const ringColors = new Float32Array(ringCount * 3);
    const ringBaseAngles = new Float32Array(ringCount);
    const ringBaseRadii = new Float32Array(ringCount);

    for (let i = 0; i < ringCount; i++) {
      const angle = (i / ringCount) * Math.PI * 2;
      const radius = 3.2 + Math.random() * 0.9;
      ringBaseAngles[i] = angle;
      ringBaseRadii[i] = radius;

      ringPositions[i * 3] = Math.cos(angle) * radius;
      ringPositions[i * 3 + 1] = (Math.random() - 0.5) * 0.2;
      ringPositions[i * 3 + 2] = Math.sin(angle) * radius;

      const col = new THREE.Color().lerpColors(
        colorGold,
        colorCyan,
        Math.random()
      );
      ringColors[i * 3] = col.r;
      ringColors[i * 3 + 1] = col.g;
      ringColors[i * 3 + 2] = col.b;
    }

    const ringGeometry = new THREE.BufferGeometry();
    ringGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(ringPositions, 3)
    );
    ringGeometry.setAttribute(
      "color",
      new THREE.BufferAttribute(ringColors, 3)
    );

    const ringMaterial = new THREE.PointsMaterial({
      size: 0.06,
      vertexColors: true,
      map: particleTexture,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const ringPoints = new THREE.Points(ringGeometry, ringMaterial);
    ringPoints.rotation.x = Math.PI * 0.25;
    ringPoints.rotation.z = Math.PI * 0.1;
    scene.add(ringPoints);

    // ==========================================
    // 3. MOUSE INTERACTION & AUDIO LISTENER
    // ==========================================
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;
    let audioPulse = 1.0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    const handleAudioEvent = (e: any) => {
      const detail = e.detail;
      if (detail && typeof detail.level === "number") {
        audioPulse = 1.0 + detail.level * 1.5;
        setAudioActive(true);
      } else {
        audioPulse = 1.6;
        setAudioActive(true);
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("khb-audio-pulse", handleAudioEvent);

    // ==========================================
    // 4. ANIMATION LOOP
    // ==========================================
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth camera parallax
      targetX += (mouseX * 1.2 - targetX) * 0.05;
      targetY += (-mouseY * 0.8 - targetY) * 0.05;
      camera.position.x = targetX;
      camera.position.y = targetY;
      camera.lookAt(scene.position);

      // Natural rotation
      orbPoints.rotation.y = elapsedTime * 0.12;
      orbPoints.rotation.x = Math.sin(elapsedTime * 0.08) * 0.1;
      ringPoints.rotation.y = -elapsedTime * 0.09;

      // Audio pulse decay back to 1.0
      audioPulse += (1.0 - audioPulse) * 0.05;

      // Wave deformation on the sphere
      const posAttr = orbGeometry.attributes.position as THREE.BufferAttribute;
      const posArr = posAttr.array as Float32Array;

      for (let i = 0; i < orbCount; i++) {
        const bx = orbBasePositions[i * 3];
        const by = orbBasePositions[i * 3 + 1];
        const bz = orbBasePositions[i * 3 + 2];

        // Harmonic soundwave modulation
        const wave =
          Math.sin(elapsedTime * 2.5 + bx * 2.0 + by * 3.0) *
            0.08 *
            audioPulse +
          Math.cos(elapsedTime * 1.8 + bz * 2.5) * 0.05 * audioPulse;

        posArr[i * 3] = bx * (1 + wave);
        posArr[i * 3 + 1] = by * (1 + wave);
        posArr[i * 3 + 2] = bz * (1 + wave);
      }
      posAttr.needsUpdate = true;

      // Ring wave modulation
      const ringPosAttr = ringGeometry.attributes
        .position as THREE.BufferAttribute;
      const ringPosArr = ringPosAttr.array as Float32Array;

      for (let i = 0; i < ringCount; i++) {
        const baseAngle = ringBaseAngles[i];
        const baseRadius = ringBaseRadii[i];

        // Orbit undulation
        const wave =
          Math.sin(baseAngle * 6 + elapsedTime * 3) * 0.15 * audioPulse;
        const currentR = baseRadius + wave;

        ringPosArr[i * 3] = Math.cos(baseAngle) * currentR;
        ringPosArr[i * 3 + 1] =
          Math.sin(baseAngle * 4 + elapsedTime * 2) * 0.25;
        ringPosArr[i * 3 + 2] = Math.sin(baseAngle) * currentR;
      }
      ringPosAttr.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    // Resize Handler
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("khb-audio-pulse", handleAudioEvent);
      cancelAnimationFrame(animationFrameId);
      orbGeometry.dispose();
      orbMaterial.dispose();
      ringGeometry.dispose();
      ringMaterial.dispose();
      particleTexture.dispose();
      renderer.dispose();
    };
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center bg-slate-950 overflow-hidden"
    >
      {/* 3D WebGL Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-0 pointer-events-none opacity-90"
      />

      {/* Subtle Background Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-cyan-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Main Overlay Content */}
      <div className="z-10 max-w-5xl mx-auto px-6 py-28 text-center text-white flex flex-col items-center">
        {/* Eyebrow Pill */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-800/80 border border-slate-700/60 backdrop-blur-md text-xs sm:text-sm text-cyan-300 mb-6 shadow-lg shadow-cyan-950/40">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>
            Frontend Developer @ Lyntris (LYNX) • Systems Engineering &amp; IT
            Consulting @ TenK Solutions
          </span>
        </div>

        {/* Master Name Headline */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight mb-6">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-100 to-slate-400">
            Kiel Hamilton Byrne
          </span>
        </h1>

        {/* Human, Grounded Tagline with High-Impact Systems Context */}
        <p className="text-lg sm:text-xl md:text-2xl text-slate-300 max-w-3xl mb-8 font-light leading-relaxed">
          I build high-performance frontend interfaces, engineer resilient
          business systems and automation, voice stories, and advise growing
          organizations on tech infrastructure.
        </p>

        {/* Primary Action Buttons */}
        <div className="flex flex-wrap justify-center gap-3.5 mb-12">
          <button
            onClick={() => scrollTo("dimensions")}
            className="px-5 py-3.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-medium rounded-xl shadow-lg shadow-cyan-900/30 transition transform hover:-translate-y-0.5 flex items-center gap-2 text-sm"
          >
            <FaCompass className="text-cyan-200" />
            <span>Explore What I Do</span>
          </button>

          <button
            onClick={() => scrollTo("connect")}
            className="px-5 py-3.5 bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 text-white font-medium rounded-xl shadow-lg shadow-emerald-950/40 transition transform hover:-translate-y-0.5 flex items-center gap-2 text-sm"
          >
            <FaServer className="text-emerald-200" />
            <span>IT Systems &amp; Consulting (TenK)</span>
          </button>

          <button
            onClick={() => scrollTo("creations")}
            className="px-5 py-3.5 bg-slate-900/90 hover:bg-slate-800 border border-slate-700/70 hover:border-slate-500 text-slate-200 font-medium rounded-xl backdrop-blur-md transition transform hover:-translate-y-0.5 flex items-center gap-2 text-sm"
          >
            <FaTerminal className="text-emerald-400" />
            <span>Selected Work</span>
          </button>

          <button
            onClick={() => scrollTo("audio-lab")}
            className="px-5 py-3.5 bg-slate-800/80 hover:bg-slate-700 border border-slate-700/60 hover:border-amber-500/50 text-slate-200 font-medium rounded-xl backdrop-blur-md transition transform hover:-translate-y-0.5 flex items-center gap-2 text-sm"
          >
            <FaMicrophone className="text-amber-400" />
            <span>Voice &amp; Audio Lab</span>
          </button>
        </div>

        {/* Quick-Jump Badges */}
        <div className="flex flex-wrap justify-center items-center gap-2 sm:gap-3 text-xs text-slate-400 max-w-2xl">
          <span className="text-slate-500">Quick jump:</span>
          {[
            { id: "about", label: "Story" },
            { id: "dimensions", label: "What I Do" },
            { id: "creations", label: "Projects" },
            { id: "audio-lab", label: "Audio Lab" },
            { id: "ethos", label: "Life & Ethos" },
            { id: "connect", label: "Consulting & Connect" },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className="px-3 py-1 rounded-lg bg-slate-800/50 hover:bg-slate-800 hover:text-cyan-300 border border-slate-700/40 transition"
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Down Scroll Prompt */}
      <button
        onClick={() => scrollTo("about")}
        aria-label="Scroll to content"
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 text-slate-400 hover:text-cyan-300 transition animate-bounce p-2"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </button>
    </section>
  );
};

export default HeroSection;
