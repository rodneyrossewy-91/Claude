"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";

export default function CTASection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-deep via-blue-deep to-anthracite" />

      {/* Paint stroke decoration */}
      <div className="absolute inset-0">
        <svg className="absolute top-0 left-0 w-full h-full opacity-10" viewBox="0 0 1440 400" fill="none" preserveAspectRatio="none">
          <path d="M0,100 C200,20 400,180 600,100 C800,20 1000,180 1200,100 C1300,60 1380,120 1440,90" stroke="#FBBF24" strokeWidth="60" strokeLinecap="round" fill="none"/>
          <path d="M0,250 C300,320 600,180 900,250 C1050,290 1200,220 1440,270" stroke="white" strokeWidth="40" strokeLinecap="round" fill="none"/>
        </svg>
      </div>

      {/* Floating circles */}
      <div className="absolute top-10 right-10 w-64 h-64 bg-yellow/10 rounded-full blur-3xl" />
      <div className="absolute bottom-10 left-10 w-48 h-48 bg-white/5 rounded-full blur-2xl" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 bg-yellow/20 border border-yellow/30 text-yellow px-4 py-2 rounded-full text-sm font-medium mb-8">
            Vrijblijvend advies · Binnen 24 uur reactie
          </div>

          <h2 className="text-4xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Klaar voor een{" "}
            <span className="relative">
              <span className="text-yellow">frisse nieuwe</span>
              <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 400 16" fill="none">
                <path d="M5,12 C80,4 180,14 260,8 C320,4 370,12 395,8" stroke="#FBBF24" strokeWidth="4" strokeLinecap="round" fill="none" opacity="0.5"/>
              </svg>
            </span>{" "}
            uitstraling?
          </h2>

          <p className="text-xl text-white/70 mb-10 max-w-2xl mx-auto leading-relaxed">
            Vraag vandaag nog een gratis en vrijblijvende offerte aan.
            Wij nemen binnen 24 uur contact met u op.
          </p>

          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-yellow hover:bg-yellow/90 text-anthracite font-bold px-8 py-4 rounded-xl transition-all duration-200 hover:shadow-xl hover:shadow-yellow/30 hover:-translate-y-1 text-lg"
            >
              Vraag Direct Een Offerte Aan
              <ArrowRight size={20} />
            </Link>
            <a
              href="tel:+31612345678"
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white font-semibold px-8 py-4 rounded-xl border border-white/20 transition-all duration-200 hover:-translate-y-1 text-lg"
            >
              <Phone size={20} />
              Bel 06-12345678
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
