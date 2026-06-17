'use client';

import { motion, useReducedMotion } from 'framer-motion';
import Link from 'next/link';

export default function Hero() {
  const shouldReduceMotion = useReducedMotion();

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: shouldReduceMotion ? 0 : 0.7, ease: 'easeOut' as const },
    },
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background gradient */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(135deg, #1F2937 0%, #1E3A8A 60%, #1F2937 100%)',
        }}
      />

      {/* Decorative circles */}
      <div
        className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full opacity-10"
        style={{ background: '#FBBF24', filter: 'blur(80px)' }}
      />
      <div
        className="absolute bottom-1/3 left-1/4 w-64 h-64 rounded-full opacity-10"
        style={{ background: '#2563EB', filter: 'blur(60px)' }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-32 text-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants}>
            <span
              className="inline-block text-sm font-semibold tracking-widest uppercase mb-6 px-4 py-2 rounded-full"
              style={{ color: '#FBBF24', background: 'rgba(251,191,36,0.1)', border: '1px solid rgba(251,191,36,0.3)' }}
            >
              Erkend Schildersbedrijf Utrecht
            </span>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="font-serif font-bold leading-tight mb-6 text-white"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}
          >
            Vakmanschap in
            <br />
            <span style={{ color: '#FBBF24' }}>Schilderwerk</span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-xl md:text-2xl leading-relaxed mb-10 max-w-2xl mx-auto"
            style={{ color: 'rgba(255,255,255,0.8)' }}
          >
            Meer dan 15 jaar betrouwbaar schilderwerk voor particulieren en bedrijven.
            Binnenschilderwerk, buitenschilderwerk, spuitwerk en houtrot reparatie.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              href="/contact"
              className="inline-flex items-center px-8 py-4 text-lg font-semibold rounded transition-all duration-200 hover:scale-105"
              style={{ background: '#1E3A8A', color: '#ffffff', border: '2px solid #1E3A8A' }}
            >
              Vraag Offerte Aan
            </Link>
            <Link
              href="/portfolio"
              className="inline-flex items-center px-8 py-4 text-lg font-semibold rounded transition-all duration-200 hover:scale-105"
              style={{ background: 'transparent', color: '#ffffff', border: '2px solid #ffffff' }}
            >
              Bekijk Portfolio
            </Link>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-8 text-white/70 text-sm"
          >
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5" style={{ color: '#FBBF24' }} fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span>4.9/5 gemiddelde beoordeling</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5" style={{ color: '#FBBF24' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>500+ afgeronde projecten</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5" style={{ color: '#FBBF24' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Reactie binnen 24 uur</span>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* SVG wave divider */}
      <div className="absolute bottom-0 left-0 right-0" aria-hidden="true">
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path d="M0,40 C360,80 720,0 1080,40 C1260,60 1380,30 1440,40 L1440,80 L0,80 Z" fill="white" />
        </svg>
      </div>
    </section>
  );
}
