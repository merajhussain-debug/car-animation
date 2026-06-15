"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const safetyFeatures = [
  {
    title: "Front Airbags",
    description:
      "Dual-stage front airbags with adaptive deployment force, calibrated in real-time based on crash severity and occupant position.",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10">
        <circle cx="24" cy="24" r="18" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 2" />
        <circle cx="24" cy="20" r="8" stroke="currentColor" strokeWidth="1.5" />
        <path d="M18 34c0-3.314 2.686-6 6-6s6 2.686 6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "Side Airbags",
    description:
      "Extended thorax-and-pelvis side airbags that deploy in under 15ms, shielding occupants from lateral impact forces.",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10">
        <rect x="8" y="12" width="32" height="24" rx="4" stroke="currentColor" strokeWidth="1.5" />
        <path d="M8 24h8M32 24h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="24" cy="24" r="5" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    title: "Curtain Airbags",
    description:
      "Full-length curtain airbags spanning all three rows, providing rollover protection and side-impact head shielding.",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10">
        <path d="M10 8v32M38 8v32" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M10 8h28M10 16h28M10 24h28" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 2" />
        <path d="M10 40h28" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    title: "Knee Airbags",
    description:
      "Driver and passenger knee airbags prevent lower extremity injuries by distributing crash forces across a wider area.",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10">
        <path d="M20 8v12a4 4 0 004 4h0a4 4 0 004-4V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="24" cy="32" r="8" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="24" cy="32" r="3" fill="currentColor" opacity="0.3" />
      </svg>
    ),
  },
  {
    title: "Collision Detection",
    description:
      "360° radar and camera fusion detects potential collisions 200ms before impact, pre-tensioning seatbelts and priming airbags.",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10">
        <circle cx="24" cy="24" r="4" fill="currentColor" />
        <circle cx="24" cy="24" r="10" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 3" />
        <circle cx="24" cy="24" r="16" stroke="currentColor" strokeWidth="1" strokeDasharray="3 4" opacity="0.5" />
        <path d="M24 4v4M24 40v4M4 24h4M40 24h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "Emergency Braking",
    description:
      "Autonomous emergency braking engages at up to 250 km/h, with pedestrian, cyclist, and large animal detection.",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10">
        <rect x="12" y="16" width="24" height="16" rx="3" stroke="currentColor" strokeWidth="1.5" />
        <path d="M18 16V12M30 16V12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M20 24h8" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M8 36l4-4M40 36l-4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
];

function SafetyRating() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div ref={ref} className="mt-16">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="glass-strong rounded-2xl p-8 md:p-10 max-w-2xl mx-auto text-center"
      >
        <p className="text-gray-500 text-sm tracking-widest uppercase mb-4" style={{ fontFamily: "var(--font-outfit)" }}>
          Global Safety Rating
        </p>

        {/* 5 Stars */}
        <div className="flex justify-center gap-2 mb-6">
          {[...Array(5)].map((_, i) => (
            <motion.svg
              key={i}
              initial={{ opacity: 0, scale: 0, rotate: -180 }}
              animate={
                isInView
                  ? { opacity: 1, scale: 1, rotate: 0 }
                  : {}
              }
              transition={{
                type: "spring",
                stiffness: 200,
                delay: i * 0.15 + 0.3,
              }}
              className="w-10 h-10 star-filled"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </motion.svg>
          ))}
        </div>

        <p className="text-white text-3xl font-bold mb-1" style={{ fontFamily: "var(--font-outfit)" }}>
          5 / 5 Stars
        </p>
        <p className="text-gray-500 text-sm">
          Euro NCAP • IIHS Top Safety Pick+ • ANCAP
        </p>

        {/* Safety score bar */}
        <div className="mt-6 space-y-3">
          {[
            { label: "Adult Occupant", score: 97 },
            { label: "Child Occupant", score: 94 },
            { label: "Pedestrian Safety", score: 91 },
            { label: "Safety Assist", score: 98 },
          ].map((item, i) => (
            <div key={item.label}>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-400">{item.label}</span>
                <span className="text-white font-semibold">{item.score}%</span>
              </div>
              <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={isInView ? { width: `${item.score}%` } : {}}
                  transition={{
                    duration: 1.2,
                    delay: i * 0.2 + 0.5,
                    ease: [0.4, 0, 0.2, 1],
                  }}
                  className="h-full rounded-full bg-gradient-to-r from-blue-500 to-cyan-400"
                />
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

export default function SafetySection() {
  return (
    <section id="safety" className="section-padding relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-blue-600/3 rounded-full blur-[150px]" />
      </div>

      <div className="max-w-6xl mx-auto relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <span className="text-blue-400 text-sm font-medium tracking-[0.3em] uppercase mb-4 block" style={{ fontFamily: "var(--font-outfit)" }}>
            Engineered for Safety
          </span>
          <h2 className="section-title gradient-text mb-4" style={{ fontFamily: "var(--font-outfit)" }}>
            Protection Beyond
            <br />
            Expectation
          </h2>
          <p className="section-subtitle mx-auto">
            Every journey deserves absolute peace of mind. Our multi-layered
            safety architecture sets the gold standard for occupant protection.
          </p>
        </motion.div>

        {/* Feature Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {safetyFeatures.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              viewport={{ once: true, margin: "-50px" }}
              className="glass-card rounded-2xl p-7 group"
            >
              <div className="text-blue-400 mb-5 group-hover:text-cyan-400 transition-colors duration-300">
                {feature.icon}
              </div>
              <h3
                className="text-white font-semibold text-lg mb-2"
                style={{ fontFamily: "var(--font-outfit)" }}
              >
                {feature.title}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Safety Rating */}
        <SafetyRating />
      </div>
    </section>
  );
}
