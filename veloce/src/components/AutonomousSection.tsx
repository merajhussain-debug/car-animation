"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

const autonomousFeatures = [
  {
    title: "Full Self-Driving",
    description: "Level 4 autonomous capability navigates city streets, highways, and complex intersections without intervention.",
    icon: "🤖",
    stat: "Level 4",
  },
  {
    title: "Lane Keeping Assist",
    description: "Neural-network-powered lane centering maintains optimal positioning even on unmarked roads.",
    icon: "🛣️",
    stat: "99.7%",
  },
  {
    title: "Auto Parking",
    description: "Ultrasonic + vision fusion parks in tight spaces with millimeter precision. Works remotely via app.",
    icon: "🅿️",
    stat: "< 30s",
  },
  {
    title: "Traffic Sign Recognition",
    description: "Real-time recognition of 500+ traffic sign types across 40 countries with instant HUD display.",
    icon: "🚦",
    stat: "500+",
  },
  {
    title: "Smart Navigation AI",
    description: "Predictive routing learns your habits, avoids congestion, and finds the most efficient path in real-time.",
    icon: "🧭",
    stat: "AI v3",
  },
  {
    title: "Voice-Controlled Assistant",
    description: "Natural language processing understands complex commands: 'Find the nearest charger with a café nearby.'",
    icon: "🎙️",
    stat: "40 lang",
  },
];

function HUDVisualization() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div ref={ref} className="relative w-full max-w-lg mx-auto aspect-[16/10]">
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 1 }}
        className="absolute inset-0"
      >
        {/* HUD Background */}
        <svg viewBox="0 0 400 250" className="w-full h-full" fill="none">
          {/* Grid lines */}
          {[...Array(8)].map((_, i) => (
            <motion.line
              key={`h-${i}`}
              x1="0" y1={30 * i + 10} x2="400" y2={30 * i + 10}
              stroke="rgba(0,102,255,0.08)"
              strokeWidth="0.5"
              initial={{ pathLength: 0 }}
              animate={isInView ? { pathLength: 1 } : {}}
              transition={{ duration: 1.5, delay: i * 0.1 }}
            />
          ))}
          {[...Array(12)].map((_, i) => (
            <motion.line
              key={`v-${i}`}
              x1={35 * i} y1="0" x2={35 * i} y2="250"
              stroke="rgba(0,102,255,0.06)"
              strokeWidth="0.5"
              initial={{ pathLength: 0 }}
              animate={isInView ? { pathLength: 1 } : {}}
              transition={{ duration: 1.5, delay: i * 0.08 }}
            />
          ))}

          {/* Road visualization */}
          <motion.path
            d="M 150 250 L 185 100 L 215 100 L 250 250"
            stroke="rgba(0,212,255,0.4)"
            strokeWidth="1.5"
            fill="rgba(0,212,255,0.03)"
            initial={{ pathLength: 0 }}
            animate={isInView ? { pathLength: 1 } : {}}
            transition={{ duration: 2, delay: 0.5 }}
          />

          {/* Lane markings */}
          <motion.path
            d="M 170 250 L 195 120"
            stroke="rgba(0,212,255,0.25)"
            strokeWidth="1"
            strokeDasharray="8 6"
            initial={{ pathLength: 0 }}
            animate={isInView ? { pathLength: 1 } : {}}
            transition={{ duration: 1.5, delay: 1 }}
          />
          <motion.path
            d="M 230 250 L 205 120"
            stroke="rgba(0,212,255,0.25)"
            strokeWidth="1"
            strokeDasharray="8 6"
            initial={{ pathLength: 0 }}
            animate={isInView ? { pathLength: 1 } : {}}
            transition={{ duration: 1.5, delay: 1 }}
          />

          {/* Car icon */}
          <motion.rect
            x="190" y="180" width="20" height="35" rx="4"
            fill="rgba(0,102,255,0.6)"
            stroke="rgba(0,212,255,0.8)"
            strokeWidth="1"
            initial={{ opacity: 0, scale: 0 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 1.5, type: "spring" }}
          />

          {/* Radar pulses */}
          {[40, 60, 80].map((r, i) => (
            <motion.circle
              key={`radar-${i}`}
              cx="200" cy="190" r={r}
              stroke="rgba(0,102,255,0.15)"
              strokeWidth="0.8"
              fill="none"
              initial={{ opacity: 0, r: 10 }}
              animate={isInView ? {
                opacity: [0, 0.4, 0],
                r: [10, r, r + 20],
              } : {}}
              transition={{
                duration: 3,
                delay: i * 0.8 + 2,
                repeat: Infinity,
                repeatDelay: 1,
              }}
            />
          ))}

          {/* Detected objects */}
          <motion.g
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 2 }}
          >
            {/* Other car ahead */}
            <rect x="193" y="110" width="14" height="22" rx="3" stroke="rgba(251,191,36,0.7)" strokeWidth="1" fill="rgba(251,191,36,0.1)" />
            <text x="200" y="105" textAnchor="middle" fill="rgba(251,191,36,0.8)" fontSize="7" fontFamily="monospace">45m</text>

            {/* Pedestrian */}
            <circle cx="145" cy="160" r="4" stroke="rgba(239,68,68,0.7)" strokeWidth="1" fill="rgba(239,68,68,0.1)" />
            <text x="145" y="150" textAnchor="middle" fill="rgba(239,68,68,0.8)" fontSize="7" fontFamily="monospace">PED</text>
          </motion.g>

          {/* Speed display */}
          <motion.g
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 1 }}
          >
            <text x="30" y="235" fill="rgba(0,212,255,0.9)" fontSize="28" fontWeight="bold" fontFamily="monospace">85</text>
            <text x="70" y="235" fill="rgba(0,212,255,0.5)" fontSize="10" fontFamily="monospace">km/h</text>
            <text x="30" y="210" fill="rgba(255,255,255,0.3)" fontSize="8" fontFamily="monospace">AUTONOMOUS MODE</text>
          </motion.g>

          {/* Status indicators */}
          <motion.g
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 1.5 }}
          >
            <circle cx="340" y="20" r="4" fill="rgba(34,197,94,0.8)" cy="20" />
            <text x="350" y="23" fill="rgba(255,255,255,0.5)" fontSize="8" fontFamily="monospace">AI ACTIVE</text>
            <circle cx="340" cy="35" r="4" fill="rgba(0,212,255,0.8)" />
            <text x="350" y="38" fill="rgba(255,255,255,0.5)" fontSize="8" fontFamily="monospace">LIDAR OK</text>
            <circle cx="340" cy="50" r="4" fill="rgba(34,197,94,0.8)" />
            <text x="350" y="53" fill="rgba(255,255,255,0.5)" fontSize="8" fontFamily="monospace">GPS LOCK</text>
          </motion.g>
        </svg>
      </motion.div>

      {/* Glow effect */}
      <div className="absolute inset-0 bg-gradient-to-t from-blue-500/5 to-transparent rounded-2xl pointer-events-none" />
    </div>
  );
}

export default function AutonomousSection() {
  const [activeFeature, setActiveFeature] = useState(0);

  return (
    <section id="autonomous" className="section-padding relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/3 rounded-full blur-[200px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-cyan-600/3 rounded-full blur-[150px]" />

        {/* Floating particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-blue-500/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.6, 0.2],
            }}
            transition={{
              duration: 3 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
          />
        ))}
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
          <span className="text-cyan-400 text-sm font-medium tracking-[0.3em] uppercase mb-4 block" style={{ fontFamily: "var(--font-outfit)" }}>
            Autonomous Intelligence
          </span>
          <h2 className="section-title mb-4" style={{ fontFamily: "var(--font-outfit)" }}>
            <span className="gradient-text">Your AI </span>
            <span className="gradient-text-blue">Co-Pilot</span>
          </h2>
          <p className="section-subtitle mx-auto">
            Powered by our proprietary neural network trained on 50 billion
            miles of driving data, VELOCE sees the road ahead better than any
            human.
          </p>
        </motion.div>

        {/* HUD Visualization */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          className="glass rounded-2xl p-6 md:p-10 mb-16"
        >
          <HUDVisualization />
        </motion.div>

        {/* Feature Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {autonomousFeatures.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              viewport={{ once: true, margin: "-50px" }}
              onHoverStart={() => setActiveFeature(i)}
              className={`glass-card rounded-2xl p-7 cursor-pointer relative overflow-hidden ${
                activeFeature === i ? "!border-blue-500/30" : ""
              }`}
            >
              {activeFeature === i && (
                <motion.div
                  layoutId="autonomousGlow"
                  className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-cyan-500/5"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-3xl">{feature.icon}</span>
                  <span className="text-blue-400 font-mono text-sm font-bold bg-blue-500/10 px-3 py-1 rounded-full">
                    {feature.stat}
                  </span>
                </div>
                <h3 className="text-white font-semibold text-lg mb-2" style={{ fontFamily: "var(--font-outfit)" }}>
                  {feature.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
