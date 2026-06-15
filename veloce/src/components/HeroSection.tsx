"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import ScrollFrameCanvas from "./ScrollFrameCanvas";

const FRAME_COUNT = 240;
const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || "";

function getFramePath(index: number): string {
  const padded = String(index + 1).padStart(3, "0");
  return `${BASE_PATH}/frames/ezgif-frame-${padded}.jpg`;
}

export default function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [loaded, setLoaded] = useState(false);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const headlineOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const headlineY = useTransform(scrollYProgress, [0, 0.15], [0, -80]);
  const headlineVisibility = useTransform(scrollYProgress, (v) =>
    v >= 0.16 ? "hidden" : "visible"
  );
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.08], [0.45, 0]);

  useEffect(() => {
    let loadedCount = 0;
    const total = FRAME_COUNT;
    for (let i = 0; i < total; i++) {
      const img = new Image();
      img.src = getFramePath(i);
      img.onload = () => {
        loadedCount++;
        setLoadingProgress(Math.round((loadedCount / total) * 100));
        if (loadedCount === total) {
          setTimeout(() => setLoaded(true), 300);
        }
      };
      img.onerror = () => {
        loadedCount++;
        setLoadingProgress(Math.round((loadedCount / total) * 100));
        if (loadedCount === total) {
          setTimeout(() => setLoaded(true), 300);
        }
      };
    }
  }, []);

  return (
    <section id="hero" ref={sectionRef} className="relative">
      {/* Loading Screen */}
      {!loaded && (
        <div className="fixed inset-0 z-[100] bg-[#0a0a0a] flex flex-col items-center justify-center gap-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center"
          >
            <h2
              className="text-2xl font-bold tracking-[0.2em] text-white mb-2"
              style={{ fontFamily: "var(--font-outfit)" }}
            >
              VELOCE
            </h2>
            <p className="text-gray-500 text-sm">Loading experience...</p>
          </motion.div>
          <div className="w-64 h-[2px] bg-white/10 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full"
              initial={{ width: "0%" }}
              animate={{ width: `${loadingProgress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
          <span className="text-gray-600 text-xs font-mono">
            {loadingProgress}%
          </span>
        </div>
      )}

      {/* Scroll Frame Animation */}
      <ScrollFrameCanvas
        frameCount={FRAME_COUNT}
        framePath={getFramePath}
        scrollHeight="500vh"
      />

      {/* Overlay Content - Title & CTAs */}
      <motion.div
        style={{ opacity: headlineOpacity, y: headlineY, visibility: headlineVisibility }}
        className="fixed top-0 left-0 right-0 h-screen flex items-center justify-center z-10 pointer-events-none"
      >
        <div className="text-center px-6 max-w-4xl pointer-events-auto">
          {/* Decorative line */}
          <motion.div
            initial={{ width: 0 }}
            animate={loaded ? { width: 60 } : {}}
            transition={{ duration: 1, delay: 0.5 }}
            className="h-[1px] bg-gradient-to-r from-transparent via-blue-500 to-transparent mx-auto mb-8"
          />

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={loaded ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-blue-400 text-sm font-medium tracking-[0.3em] uppercase mb-4"
            style={{ fontFamily: "var(--font-outfit)" }}
          >
            Introducing the all-new 2026
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={loaded ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.5 }}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-6 gradient-text leading-tight"
            style={{ fontFamily: "var(--font-outfit)" }}
          >
            Drive the Future
            <br />
            <span className="gradient-text-blue">Today</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={loaded ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Experience next-generation performance, safety, and autonomous
            technology — engineered beyond imagination.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={loaded ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 1.1 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <a href="#testdrive" className="btn-primary">
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              Book a Test Drive
            </a>
            <a href="#safety" className="btn-secondary">
              Explore Features
              <svg
                className="w-4 h-4 ml-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </a>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={loaded ? { opacity: 1 } : {}}
            transition={{ delay: 2 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="flex flex-col items-center gap-2"
            >
              <span className="text-gray-600 text-xs tracking-widest uppercase">
                Scroll
              </span>
              <div className="w-5 h-8 border border-gray-700 rounded-full flex justify-center pt-1.5">
                <motion.div
                  animate={{ y: [0, 8, 0], opacity: [1, 0.3, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-1 h-1.5 bg-blue-500 rounded-full"
                />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Dark overlay for readability */}
      <motion.div
        style={{ opacity: overlayOpacity, visibility: headlineVisibility }}
        className="fixed inset-0 bg-black/40 z-[5] pointer-events-none"
      />
    </section>
  );
}
