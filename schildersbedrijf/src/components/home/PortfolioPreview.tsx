'use client';

import { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import Link from 'next/link';
import { MapPin, ArrowRight } from 'lucide-react';
import { portfolioProjects } from '@/lib/data';

export default function PortfolioPreview() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  const shouldReduceMotion = useReducedMotion();

  const preview = portfolioProjects.slice(0, 3);

  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: shouldReduceMotion ? 0 : 0.12 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: shouldReduceMotion ? 0 : 0.5, ease: 'easeOut' as const },
    },
  };

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="mb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <span
              className="text-sm font-semibold tracking-widest uppercase mb-3 block"
              style={{ color: '#1E3A8A' }}
            >
              Ons Portfolio
            </span>
            <h2 className="font-serif font-bold text-4xl md:text-5xl" style={{ color: '#1F2937' }}>
              Bekijk ons werk
            </h2>
          </div>
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 font-semibold transition-colors duration-200 hover:gap-3 flex-shrink-0"
            style={{ color: '#1E3A8A' }}
          >
            Volledig portfolio
            <ArrowRight size={18} />
          </Link>
        </div>

        {/* Cards */}
        <div ref={ref}>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {preview.map((project) => (
              <motion.div key={project.id} variants={cardVariants}>
                <Link href="/portfolio" className="group block rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300">
                  {/* Gradient placeholder */}
                  <div
                    className={`relative h-56 bg-gradient-to-br ${project.gradient} flex items-end p-6`}
                  >
                    {/* Category badge */}
                    <span
                      className="absolute top-4 right-4 text-xs font-semibold px-3 py-1 rounded-full"
                      style={{ background: 'rgba(255,255,255,0.15)', color: '#ffffff', backdropFilter: 'blur(4px)' }}
                    >
                      {project.type}
                    </span>

                    {/* Hover overlay */}
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
                      style={{ background: 'rgba(0,0,0,0.3)' }}
                    >
                      <span className="text-white font-semibold flex items-center gap-2">
                        Bekijk project <ArrowRight size={16} />
                      </span>
                    </div>
                  </div>

                  {/* Card content */}
                  <div className="p-5 bg-white border border-gray-100 rounded-b-xl">
                    <div className="flex items-center gap-1 mb-2">
                      <MapPin size={13} style={{ color: '#6B7280' }} />
                      <span className="text-xs" style={{ color: '#6B7280' }}>
                        {project.location}
                      </span>
                    </div>
                    <h3 className="font-serif font-semibold text-base" style={{ color: '#1F2937' }}>
                      {project.title}
                    </h3>
                    <p className="text-sm mt-1 line-clamp-2" style={{ color: '#6B7280' }}>
                      {project.description}
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
