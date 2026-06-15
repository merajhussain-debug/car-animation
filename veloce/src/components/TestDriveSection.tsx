"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const locations = [
  "New York — Manhattan Showroom",
  "Los Angeles — Beverly Hills",
  "London — Mayfair Centre",
  "Dubai — Downtown Experience Hub",
  "Tokyo — Ginza Gallery",
  "Singapore — Marina Bay",
];

export default function TestDriveSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    location: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section id="testdrive" className="section-padding relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 -left-40 w-80 h-80 bg-blue-600/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 -right-40 w-80 h-80 bg-cyan-600/5 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-6xl mx-auto relative">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left - Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <span className="text-blue-400 text-sm font-medium tracking-[0.3em] uppercase mb-4 block" style={{ fontFamily: "var(--font-outfit)" }}>
              Experience VELOCE
            </span>
            <h2 className="section-title gradient-text mb-6" style={{ fontFamily: "var(--font-outfit)" }}>
              Book Your
              <br />
              Test Drive
            </h2>
            <p className="section-subtitle mb-8">
              Step into the future of driving. Schedule a personalized test
              drive experience at one of our exclusive showrooms worldwide.
            </p>

            <div className="space-y-4">
              {[
                {
                  icon: "🏎️",
                  title: "Personal Concierge",
                  desc: "Dedicated specialist for your experience",
                },
                {
                  icon: "🛤️",
                  title: "Scenic Routes",
                  desc: "Curated driving routes to feel every feature",
                },
                {
                  icon: "🥂",
                  title: "VIP Lounge",
                  desc: "Complimentary refreshments & luxury amenities",
                },
              ].map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: i * 0.15 }}
                  viewport={{ once: true }}
                  className="flex items-start gap-4 p-4 rounded-xl glass-card"
                >
                  <span className="text-2xl">{item.icon}</span>
                  <div>
                    <h4 className="text-white font-semibold text-sm">
                      {item.title}
                    </h4>
                    <p className="text-gray-500 text-sm">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right - Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <AnimatePresence mode="wait">
              {!submitted ? (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  className="glass-strong rounded-2xl p-8 md:p-10 space-y-5"
                  exit={{ opacity: 0, scale: 0.95 }}
                >
                  <h3
                    className="text-xl font-bold text-white mb-2"
                    style={{ fontFamily: "var(--font-outfit)" }}
                  >
                    Schedule Your Visit
                  </h3>
                  <p className="text-gray-500 text-sm mb-6">
                    Fill in your details and we&apos;ll confirm your appointment
                    within 24 hours.
                  </p>

                  {[
                    {
                      name: "name",
                      type: "text",
                      placeholder: "Full Name",
                      icon: (
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      ),
                    },
                    {
                      name: "email",
                      type: "email",
                      placeholder: "Email Address",
                      icon: (
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      ),
                    },
                    {
                      name: "phone",
                      type: "tel",
                      placeholder: "Phone Number",
                      icon: (
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                        />
                      ),
                    },
                    {
                      name: "date",
                      type: "date",
                      placeholder: "Preferred Date",
                      icon: (
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      ),
                    },
                  ].map((field) => (
                    <div key={field.name} className="relative">
                      <svg
                        className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors duration-300 ${
                          focused === field.name
                            ? "text-blue-400"
                            : "text-gray-600"
                        }`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        {field.icon}
                      </svg>
                      <input
                        type={field.type}
                        name={field.name}
                        placeholder={field.placeholder}
                        value={formData[field.name as keyof typeof formData]}
                        onChange={handleChange}
                        onFocus={() => setFocused(field.name)}
                        onBlur={() => setFocused(null)}
                        required
                        className="form-input !pl-12"
                      />
                    </div>
                  ))}

                  {/* Location select */}
                  <div className="relative">
                    <svg
                      className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors duration-300 ${
                        focused === "location"
                          ? "text-blue-400"
                          : "text-gray-600"
                      }`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    <select
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      onFocus={() => setFocused("location")}
                      onBlur={() => setFocused(null)}
                      required
                      className="form-input !pl-12 appearance-none cursor-pointer"
                    >
                      <option value="">Select Showroom Location</option>
                      {locations.map((loc) => (
                        <option key={loc} value={loc}>
                          {loc}
                        </option>
                      ))}
                    </select>
                  </div>

                  <button type="submit" className="btn-primary w-full !mt-8">
                    Confirm Booking
                    <svg
                      className="w-5 h-5 ml-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      />
                    </svg>
                  </button>
                </motion.form>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: "spring", duration: 0.8 }}
                  className="glass-strong rounded-2xl p-10 md:p-14 text-center"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{
                      type: "spring",
                      stiffness: 200,
                      delay: 0.2,
                    }}
                    className="w-20 h-20 rounded-full bg-gradient-to-br from-green-500 to-emerald-400 mx-auto mb-6 flex items-center justify-center"
                  >
                    <svg
                      className="w-10 h-10 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={3}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </motion.div>
                  <h3
                    className="text-2xl font-bold text-white mb-3"
                    style={{ fontFamily: "var(--font-outfit)" }}
                  >
                    Booking Confirmed!
                  </h3>
                  <p className="text-gray-400 mb-6">
                    Thank you, {formData.name}. We&apos;ll send a confirmation to{" "}
                    <span className="text-blue-400">{formData.email}</span>{" "}
                    within 24 hours.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({
                        name: "",
                        email: "",
                        phone: "",
                        date: "",
                        location: "",
                      });
                    }}
                    className="btn-secondary text-sm"
                  >
                    Book Another
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
