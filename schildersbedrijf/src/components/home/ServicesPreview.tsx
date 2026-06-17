'use client';

import { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const servicesData = [
  {
    number: '01',
    title: 'Binnenschilderwerk',
    description:
      'Muren, plafonds, kozijnen en deuren — wij zorgen voor een perfecte afwerking in iedere ruimte.',
    href: '/diensten#binnenschilderwerk',
  },
  {
    number: '02',
    title: 'Buitenschilderwerk',
    description:
      'Bescherming en uitstraling voor uw gevels, kozijnen en dakranden. Duurzame producten, jaren garantie.',
    href: '/diensten#buitenschilderwerk',
  },
  {
    number: '03',
    title: 'Spuitwerk',
    description:
      'Vlekkeloos glad resultaat op grote oppervlakken. Professionele airless apparatuur voor perfecte egale afwerking.',
    href: '/diensten#spuitwerk',
  },
  {
    number: '04',
    title: 'Houtrot Reparatie',
    description:
      'Duurzame epoxy reparaties die niet van nieuw hout te onderscheiden zijn. Goedkoper dan vervanging.',
    href: '/diensten#houtrot-reparatie',
  },
];

export default function ServicesPreview() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  const shouldReduceMotion = useReducedMotion();

  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: shouldReduceMotion ? 0 : 0.1 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: shouldReduceMotion ? 0 : 0.5, ease: 'easeOut' as const },
    },
  };

  return (
    <section className="py-24" style={{ background: '#F3F4F6' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="mb-16 max-w-2xl">
          <span
            className="text-sm font-semibold tracking-widest uppercase mb-3 block"
            style={{ color: '#1E3A8A' }}
          >
            Onze Diensten
          </span>
          <h2 className="font-serif font-bold text-4xl md:text-5xl mb-4" style={{ color: '#1F2937' }}>
            Alles op het gebied van schilderwerk
          </h2>
          <p className="text-lg leading-relaxed" style={{ color: '#6B7280' }}>
            Van kleinere klussen tot grootschalige projecten — Van der Berg levert altijd kwaliteit.
          </p>
        </div>

        {/* Cards */}
        <div ref={ref}>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            className="grid grid-cols-1 sm:grid-cols-2 gap-6"
          >
            {servicesData.map((service) => (
              <motion.div key={service.number} variants={cardVariants}>
                <Link
                  href={service.href}
                  className="group block bg-white rounded-lg p-8 shadow-sm hover:shadow-md transition-all duration-200 relative overflow-hidden"
                >
                  {/* Yellow accent line */}
                  <div
                    className="absolute left-0 top-0 bottom-0 w-1 transition-all duration-300 group-hover:w-2"
                    style={{ background: '#FBBF24' }}
                  />

                  <div className="pl-4">
                    <span
                      className="font-serif text-5xl font-bold opacity-15 block mb-4 leading-none"
                      style={{ color: '#1E3A8A' }}
                    >
                      {service.number}
                    </span>
                    <h3 className="font-serif font-bold text-xl mb-3" style={{ color: '#1F2937' }}>
                      {service.title}
                    </h3>
                    <p className="text-sm leading-relaxed mb-6" style={{ color: '#6B7280' }}>
                      {service.description}
                    </p>
                    <div
                      className="flex items-center gap-2 text-sm font-semibold transition-colors duration-200 group-hover:gap-3"
                      style={{ color: '#1E3A8A' }}
                    >
                      <span>Meer informatie</span>
                      <ArrowRight size={16} />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <Link
            href="/diensten"
            className="inline-flex items-center gap-2 px-8 py-4 font-semibold rounded transition-all duration-200 hover:scale-105"
            style={{ background: '#1E3A8A', color: '#ffffff' }}
          >
            Bekijk alle diensten
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}
