"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ChevronDown, Star } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background gradient (replaces image for now) */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-anthracite via-blue-deep to-anthracite" />
        {/* Decorative paint splashes */}
        <div className="absolute top-20 right-10 w-96 h-96 bg-yellow/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-64 h-64 bg-blue-light/10 rounded-full blur-2xl" />
        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      {/* Floating paint brush decorations */}
      <div className="absolute top-1/4 right-1/4 opacity-10 animate-float">
        <PaintBrushSVG size={120} />
      </div>
      <div className="absolute bottom-1/3 right-1/3 opacity-5 animate-float" style={{ animationDelay: "1.5s" }}>
        <PaintBrushSVG size={80} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20">
        <div className="max-w-3xl">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-flex items-center gap-2 bg-yellow/20 border border-yellow/30 text-yellow px-4 py-2 rounded-full text-sm font-medium mb-8 backdrop-blur-sm"
          >
            <Star size={14} fill="currentColor" />
            <span>9.2/10 gemiddelde beoordeling · 350+ tevreden klanten</span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6"
          >
            Vakmanschap in{" "}
            <span className="relative inline-block">
              <span className="text-yellow">Schilderwerk</span>
              <motion.svg
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.6, delay: 1 }}
                className="absolute -bottom-2 left-0 w-full"
                viewBox="0 0 300 12"
                fill="none"
                style={{ transformOrigin: "left" }}
              >
                <path d="M2 8 C50 3, 150 10, 200 5 C250 0, 280 8, 298 6" stroke="#FBBF24" strokeWidth="3" strokeLinecap="round" fill="none"/>
              </motion.svg>
            </span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="text-xl text-white/80 leading-relaxed mb-10 max-w-2xl"
          >
            Professioneel binnen- en buitenschilderwerk voor woningen en bedrijven.
            Meer dan 15 jaar ervaring, hoogwaardige materialen en garantie op ons werk.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.7 }}
            className="flex flex-wrap gap-4 mb-16"
          >
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-yellow hover:bg-yellow/90 text-anthracite font-bold px-8 py-4 rounded-xl transition-all duration-200 hover:shadow-xl hover:shadow-yellow/30 hover:-translate-y-1 text-base"
            >
              Vraag Offerte Aan
            </Link>
            <Link
              href="/portfolio"
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white font-semibold px-8 py-4 rounded-xl border border-white/20 transition-all duration-200 hover:-translate-y-1 text-base"
            >
              Bekijk Portfolio
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.9 }}
            className="flex flex-wrap gap-8"
          >
            {[
              { value: "15+", label: "Jaar ervaring" },
              { value: "350+", label: "Projecten voltooid" },
              { value: "9.2", label: "Gemiddelde score" },
              { value: "100%", label: "Garantie" },
            ].map((stat) => (
              <div key={stat.label} className="text-white">
                <div className="text-3xl font-bold text-yellow">{stat.value}</div>
                <div className="text-sm text-white/60">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/50"
      >
        <span className="text-xs uppercase tracking-widest">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <ChevronDown size={20} />
        </motion.div>
      </motion.div>

      {/* Wave transition */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 80" fill="none" preserveAspectRatio="none" className="w-full h-16 sm:h-20">
          <path d="M0,40 C360,80 720,0 1080,50 C1260,75 1380,30 1440,40 L1440,80 L0,80 Z" fill="white"/>
        </svg>
      </div>
    </section>
  );
}

function PaintBrushSVG({ size = 100 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
      <rect x="45" y="5" width="10" height="60" rx="5" fill="white" opacity="0.5"/>
      <ellipse cx="50" cy="75" rx="12" ry="20" fill="white" opacity="0.3"/>
      <rect x="42" y="62" width="16" height="4" rx="2" fill="white" opacity="0.5"/>
    </svg>
  );
}
