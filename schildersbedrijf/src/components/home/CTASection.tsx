'use client';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { useRef } from 'react';
import Link from 'next/link';
import { ArrowRight, Phone } from 'lucide-react';

export default function CTASection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const prefersReduced = useReducedMotion();

  return (
    <section className="relative py-24 md:py-32 bg-[#1E3A8A] overflow-hidden" ref={ref} aria-labelledby="cta-heading">
      {/* Paint stroke texture */}
      <div className="absolute inset-0 opacity-10" aria-hidden="true">
        <svg width="100%" height="100%">
          <defs>
            <pattern id="brush" x="0" y="0" width="120" height="120" patternUnits="userSpaceOnUse">
              <path d="M0,60 C20,40 40,80 60,60 C80,40 100,80 120,60" stroke="#FBBF24" strokeWidth="2" fill="none" />
              <path d="M0,90 C30,70 50,110 80,90 C100,75 110,100 120,90" stroke="#FBBF24" strokeWidth="1.5" fill="none" opacity="0.6" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#brush)" />
        </svg>
      </div>
      <div className="absolute top-0 left-0 right-0" aria-hidden="true">
        <svg viewBox="0 0 1440 60" preserveAspectRatio="none" className="w-full h-8 md:h-14">
          <path d="M0,30 C300,60 600,0 900,30 C1100,50 1300,15 1440,30 L1440,0 L0,0 Z" fill="#F3F4F6" />
        </svg>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={prefersReduced ? {} : { opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="text-[#FBBF24] text-sm font-semibold tracking-widest uppercase block mb-4">Klaar voor de volgende stap?</span>
          <h2 id="cta-heading" className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Klaar voor een frisse<br />nieuwe uitstraling?
          </h2>
          <p className="text-white/70 text-lg mb-10 max-w-xl mx-auto">
            Vraag vandaag nog een gratis, vrijblijvende offerte aan. Wij reageren binnen 24 uur.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/contact" className="bg-[#FBBF24] text-[#1F2937] font-bold px-8 py-4 rounded-lg text-lg hover:bg-[#F59E0B] transition-all duration-200 hover:-translate-y-1 shadow-xl hover:shadow-2xl flex items-center gap-2">
              Vraag Direct Een Offerte Aan
              <ArrowRight size={20} aria-hidden="true" />
            </Link>
            <a href="tel:+31201234567" className="flex items-center gap-2 text-white font-semibold border-2 border-white/30 px-8 py-4 rounded-lg hover:bg-white/10 transition-all duration-200">
              <Phone size={18} aria-hidden="true" /> 020 123 4567
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
