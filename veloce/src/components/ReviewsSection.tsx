"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useCallback } from "react";

const reviews = [
  {
    name: "Alexander Chen",
    role: "Tech Entrepreneur",
    rating: 5,
    text: "The VELOCE has completely redefined what I expect from a luxury vehicle. The autonomous driving on my daily commute is flawless — I arrive at work relaxed and productive. The performance is breathtaking.",
    car: "VELOCE GT",
    avatar: "AC",
  },
  {
    name: "Isabella Rossi",
    role: "Formula 1 Engineer",
    rating: 5,
    text: "As someone who works with high-performance machines for a living, the VELOCE genuinely impressed me. The torque delivery is instantaneous, the handling is razor-sharp, and the tech is years ahead.",
    car: "VELOCE RS",
    avatar: "IR",
  },
  {
    name: "Marcus Webb",
    role: "Architect & Designer",
    rating: 5,
    text: "Every detail of this car speaks to a level of design thinking I rarely see. The interior materials, the ambient lighting, the way the HUD integrates with your drive — it's automotive art.",
    car: "VELOCE GT",
    avatar: "MW",
  },
  {
    name: "Dr. Sarah Park",
    role: "Neurosurgeon",
    rating: 5,
    text: "Safety was my number one priority, and the VELOCE delivers on every front. The collision avoidance system intervened once on a rainy highway — it quite literally saved my life. I'm a customer for life.",
    car: "VELOCE S",
    avatar: "SP",
  },
  {
    name: "James Okafor",
    role: "Professional Racing Driver",
    rating: 5,
    text: "I've driven every supercar on the market. The VELOCE RS is the first electric vehicle that delivers genuine track-day thrills with 350 km/h capability. The future of performance is here.",
    car: "VELOCE RS",
    avatar: "JO",
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1">
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          className={`w-4 h-4 ${i < rating ? "star-filled" : "star-empty"}`}
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );
}

export default function ReviewsSection() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);

  const next = useCallback(() => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % reviews.length);
  }, []);

  const prev = useCallback(() => {
    setDirection(-1);
    setCurrent((prev) => (prev - 1 + reviews.length) % reviews.length);
  }, []);

  // Auto rotate
  useEffect(() => {
    const interval = setInterval(next, 6000);
    return () => clearInterval(interval);
  }, [next]);

  const variants = {
    enter: (d: number) => ({ x: d > 0 ? 300 : -300, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d: number) => ({ x: d > 0 ? -300 : 300, opacity: 0 }),
  };

  return (
    <section id="reviews" className="section-padding relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-blue-600/3 rounded-full blur-[180px]" />
      </div>

      <div className="max-w-4xl mx-auto relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <span
            className="text-blue-400 text-sm font-medium tracking-[0.3em] uppercase mb-4 block"
            style={{ fontFamily: "var(--font-outfit)" }}
          >
            What Owners Say
          </span>
          <h2
            className="section-title gradient-text mb-4"
            style={{ fontFamily: "var(--font-outfit)" }}
          >
            Voices of the
            <br />
            VELOCE Community
          </h2>
        </motion.div>

        {/* Carousel */}
        <div className="relative min-h-[320px]">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={current}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.3 },
              }}
              className="glass-strong rounded-2xl p-8 md:p-12"
            >
              {/* Quote icon */}
              <svg
                className="w-10 h-10 text-blue-500/20 mb-6"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>

              <p className="text-gray-300 text-lg md:text-xl leading-relaxed mb-8 italic">
                &ldquo;{reviews[current].text}&rdquo;
              </p>

              <div className="flex items-center gap-4">
                {/* Avatar */}
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center text-white font-bold text-sm" style={{ fontFamily: "var(--font-outfit)" }}>
                  {reviews[current].avatar}
                </div>

                <div className="flex-1">
                  <h4 className="text-white font-semibold" style={{ fontFamily: "var(--font-outfit)" }}>
                    {reviews[current].name}
                  </h4>
                  <p className="text-gray-500 text-sm">
                    {reviews[current].role} · {reviews[current].car}
                  </p>
                </div>

                <StarRating rating={reviews[current].rating} />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-6 mt-8">
          <button
            onClick={prev}
            className="w-12 h-12 rounded-full glass flex items-center justify-center hover:bg-white/10 transition-all group"
            aria-label="Previous review"
          >
            <svg
              className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Dots */}
          <div className="flex gap-2">
            {reviews.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  setDirection(i > current ? 1 : -1);
                  setCurrent(i);
                }}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === current
                    ? "w-8 bg-gradient-to-r from-blue-500 to-cyan-400"
                    : "w-2 bg-white/20 hover:bg-white/40"
                }`}
                aria-label={`Go to review ${i + 1}`}
              />
            ))}
          </div>

          <button
            onClick={next}
            className="w-12 h-12 rounded-full glass flex items-center justify-center hover:bg-white/10 transition-all group"
            aria-label="Next review"
          >
            <svg
              className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
