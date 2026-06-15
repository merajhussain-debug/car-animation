"use client";

import { motion, useInView, useSpring, useTransform, MotionValue } from "framer-motion";
import { useRef, useEffect, useState } from "react";

function AnimatedCounter({
  target,
  suffix = "",
  prefix = "",
  duration = 2,
  decimals = 0,
}: {
  target: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  decimals?: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const end = target;
    const startTime = Date.now();
    const durationMs = duration * 1000;

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / durationMs, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = start + (end - start) * eased;
      setDisplay(current.toFixed(decimals));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [isInView, target, duration, decimals]);

  return (
    <span ref={ref}>
      {prefix}
      {display}
      {suffix}
    </span>
  );
}

function Speedometer() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div ref={ref} className="relative w-64 h-64 mx-auto">
      <svg viewBox="0 0 200 200" className="w-full h-full">
        {/* Outer ring */}
        <circle
          cx="100" cy="100" r="90"
          stroke="rgba(255,255,255,0.05)"
          strokeWidth="1"
          fill="none"
        />

        {/* Speed arc background */}
        <motion.path
          d="M 30 140 A 80 80 0 1 1 170 140"
          stroke="rgba(255,255,255,0.08)"
          strokeWidth="6"
          fill="none"
          strokeLinecap="round"
        />

        {/* Speed arc filled */}
        <motion.path
          d="M 30 140 A 80 80 0 1 1 170 140"
          stroke="url(#speedGradient)"
          strokeWidth="6"
          fill="none"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={isInView ? { pathLength: 0.85 } : {}}
          transition={{ duration: 2.5, ease: [0.4, 0, 0.2, 1], delay: 0.3 }}
        />

        {/* Tick marks */}
        {[...Array(12)].map((_, i) => {
          const angle = -210 + i * (240 / 11);
          const rad = (angle * Math.PI) / 180;
          const x1 = 100 + 75 * Math.cos(rad);
          const y1 = 100 + 75 * Math.sin(rad);
          const x2 = 100 + 82 * Math.cos(rad);
          const y2 = 100 + 82 * Math.sin(rad);
          return (
            <motion.line
              key={i}
              x1={x1} y1={y1} x2={x2} y2={y2}
              stroke="rgba(255,255,255,0.3)"
              strokeWidth="1.5"
              strokeLinecap="round"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: i * 0.1 + 0.5 }}
            />
          );
        })}

        {/* Needle */}
        <motion.line
          x1="100" y1="100"
          x2="100" y2="35"
          stroke="url(#needleGradient)"
          strokeWidth="2"
          strokeLinecap="round"
          style={{ transformOrigin: "100px 100px" }}
          initial={{ rotate: -120 }}
          animate={isInView ? { rotate: 85 } : {}}
          transition={{ duration: 2.5, ease: [0.4, 0, 0.2, 1], delay: 0.3 }}
        />

        {/* Center dot */}
        <circle cx="100" cy="100" r="6" fill="url(#centerGradient)" />
        <circle cx="100" cy="100" r="3" fill="#0a0a0a" />

        {/* Gradients */}
        <defs>
          <linearGradient id="speedGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#0066ff" />
            <stop offset="100%" stopColor="#00d4ff" />
          </linearGradient>
          <linearGradient id="needleGradient" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#0066ff" />
            <stop offset="100%" stopColor="#ff3333" />
          </linearGradient>
          <radialGradient id="centerGradient">
            <stop offset="0%" stopColor="#0066ff" />
            <stop offset="100%" stopColor="#0044aa" />
          </radialGradient>
        </defs>
      </svg>

      {/* Speed value */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pt-8">
        <span className="text-4xl font-bold text-white font-mono" style={{ fontFamily: "var(--font-outfit)" }}>
          <AnimatedCounter target={350} duration={2.5} />
        </span>
        <span className="text-gray-500 text-xs tracking-widest uppercase">km/h</span>
      </div>
    </div>
  );
}

const specs = [
  {
    value: 350,
    suffix: "",
    label: "Top Speed",
    unit: "km/h",
    icon: "⚡",
  },
  {
    value: 2.9,
    suffix: "s",
    label: "0 — 100 km/h",
    unit: "",
    decimals: 1,
    icon: "🏁",
  },
  {
    value: 800,
    suffix: "",
    label: "Range",
    unit: "km",
    icon: "🔋",
  },
  {
    value: 1200,
    suffix: "",
    label: "Peak Power",
    unit: "hp",
    icon: "💪",
  },
];

export default function PerformanceSection() {
  return (
    <section id="performance" className="section-padding relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-600/3 rounded-full blur-[200px]" />
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
            Unleash the Power
          </span>
          <h2 className="section-title gradient-text mb-4" style={{ fontFamily: "var(--font-outfit)" }}>
            Performance
            <br />
            Redefined
          </h2>
          <p className="section-subtitle mx-auto">
            Dual motor all-wheel drive with instant torque delivery.
            Electric powertrain with zero emissions and zero compromise.
          </p>
        </motion.div>

        {/* Speedometer */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-20"
        >
          <Speedometer />
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          {specs.map((spec, i) => (
            <motion.div
              key={spec.label}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              viewport={{ once: true, margin: "-50px" }}
              className="glass-card rounded-2xl p-6 md:p-8 text-center group"
            >
              <span className="text-2xl mb-3 block">{spec.icon}</span>
              <div className="text-3xl md:text-4xl font-bold text-white mb-1" style={{ fontFamily: "var(--font-outfit)" }}>
                <AnimatedCounter
                  target={spec.value}
                  suffix={spec.suffix}
                  duration={2}
                  decimals={spec.decimals || 0}
                />
              </div>
              <div className="text-blue-400 text-sm font-mono mb-2">{spec.unit}</div>
              <div className="text-gray-500 text-sm">{spec.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Additional specs bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-10 glass-strong rounded-2xl p-6 md:p-8"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { label: "Drivetrain", value: "Dual Motor AWD" },
              { label: "Powertrain", value: "100% Electric" },
              { label: "Charging", value: "10→80% in 18min" },
              { label: "Torque", value: "1,100 Nm" },
            ].map((item) => (
              <div key={item.label}>
                <p className="text-gray-600 text-xs tracking-widest uppercase mb-1">
                  {item.label}
                </p>
                <p className="text-white font-semibold text-sm" style={{ fontFamily: "var(--font-outfit)" }}>
                  {item.value}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
