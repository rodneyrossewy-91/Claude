'use client';

import { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { Award, Shield, CheckCircle, FileText } from 'lucide-react';

const usps = [
  {
    icon: Award,
    title: 'Meer dan 15 jaar ervaring',
    description: 'Bewezen vakmanschap in de regio. Honderden tevreden klanten gingen u voor.',
  },
  {
    icon: Shield,
    title: 'Hoogwaardige materialen',
    description: 'Wij werken alleen met A-merk producten zoals Sikkens, Sigma en Dulux.',
  },
  {
    icon: CheckCircle,
    title: 'Garantie op werkzaamheden',
    description: '5 jaar garantie op al ons werk. U kunt altijd bij ons terecht voor nazorg.',
  },
  {
    icon: FileText,
    title: 'Gratis en vrijblijvende offerte',
    description: 'Binnen 24 uur reactie. Duidelijke, transparante offerte zonder verborgen kosten.',
  },
];

export default function USPs() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  const shouldReduceMotion = useReducedMotion();

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.12,
      },
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
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={ref}>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {usps.map((usp) => {
              const Icon = usp.icon;
              return (
                <motion.div
                  key={usp.title}
                  variants={cardVariants}
                  className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-200"
                  style={{ borderLeft: '4px solid #1E3A8A' }}
                >
                  <div
                    className="w-12 h-12 rounded-lg flex items-center justify-center mb-4"
                    style={{ background: '#FBBF24' }}
                  >
                    <Icon size={22} style={{ color: '#1F2937' }} />
                  </div>
                  <h3 className="font-serif font-bold text-lg mb-2" style={{ color: '#1F2937' }}>
                    {usp.title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: '#6B7280' }}>
                    {usp.description}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
