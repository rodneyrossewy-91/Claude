'use client';
import { useState } from 'react';
import { X, MapPin, Package } from 'lucide-react';
import { portfolioProjects } from '@/lib/data';
import SectionHeading from '@/components/shared/SectionHeading';
import Link from 'next/link';

const filters = ['Alles', 'Binnenschilderwerk', 'Buitenschilderwerk', 'Zakelijk', 'Particulier'];

export default function PortfolioPage() {
  const [active, setActive] = useState('Alles');
  const [selected, setSelected] = useState<typeof portfolioProjects[0] | null>(null);

  const filtered = active === 'Alles'
    ? portfolioProjects
    : portfolioProjects.filter(p => p.category === active || p.type === active);

  return (
    <>
      <div className="bg-[#1F2937] pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="text-[#FBBF24] text-sm font-semibold tracking-widest uppercase block mb-4">Ons werk</span>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-white max-w-3xl">
            Onze <span className="text-[#FBBF24]">portfolio</span>
          </h1>
        </div>
      </div>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Filters */}
          <div className="flex flex-wrap gap-3 mb-12" role="group" aria-label="Portfolio filters">
            {filters.map(f => (
              <button
                key={f}
                onClick={() => setActive(f)}
                aria-pressed={active === f}
                className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 cursor-pointer ${active === f ? 'bg-[#1E3A8A] text-white shadow-md' : 'bg-[#F3F4F6] text-[#6B7280] hover:bg-[#1E3A8A]/10 hover:text-[#1E3A8A]'}`}
              >
                {f}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map(project => (
              <button
                key={project.id}
                onClick={() => setSelected(project)}
                className="group rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 cursor-pointer text-left w-full"
                aria-label={`Bekijk project: ${project.title}`}
              >
                <div className={`h-56 bg-gradient-to-br ${project.gradient} relative`}>
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />
                  <div className="absolute top-4 left-4 flex gap-2">
                    <span className="bg-[#FBBF24] text-[#1F2937] text-xs font-bold px-3 py-1 rounded-full">{project.category}</span>
                    <span className="bg-white/20 backdrop-blur-sm text-white text-xs font-medium px-3 py-1 rounded-full border border-white/30">{project.type}</span>
                  </div>
                </div>
                <div className="bg-white p-6">
                  <h3 className="font-serif font-bold text-lg text-[#1F2937] mb-2 group-hover:text-[#1E3A8A] transition-colors">{project.title}</h3>
                  <div className="flex items-center gap-1 text-[#6B7280] text-sm">
                    <MapPin size={14} aria-hidden="true" /><span>{project.location}</span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {selected && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4" onClick={() => setSelected(null)} role="dialog" aria-modal="true" aria-label={selected.title}>
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className={`h-64 bg-gradient-to-br ${selected.gradient} rounded-t-2xl relative`}>
              <button onClick={() => setSelected(null)} className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/30 flex items-center justify-center text-white hover:bg-black/50 transition-colors cursor-pointer" aria-label="Sluiten">
                <X size={18} aria-hidden="true" />
              </button>
              <div className="absolute bottom-4 left-4 flex gap-2">
                <span className="bg-[#FBBF24] text-[#1F2937] text-xs font-bold px-3 py-1 rounded-full">{selected.category}</span>
                <span className="bg-white/20 backdrop-blur-sm text-white text-xs font-medium px-3 py-1 rounded-full border border-white/30">Voor / Na</span>
              </div>
            </div>
            <div className="p-8">
              <h2 className="font-serif text-2xl font-bold text-[#1F2937] mb-2">{selected.title}</h2>
              <div className="flex items-center gap-2 text-[#6B7280] text-sm mb-6">
                <MapPin size={14} aria-hidden="true" /><span>{selected.location}</span>
              </div>
              <p className="text-[#6B7280] leading-relaxed mb-6">{selected.description}</p>
              <div className="flex items-start gap-2 text-sm text-[#6B7280] bg-[#F3F4F6] rounded-xl p-4">
                <Package size={16} className="flex-shrink-0 mt-0.5 text-[#1E3A8A]" aria-hidden="true" />
                <div><span className="font-semibold text-[#1F2937] block mb-1">Gebruikte materialen</span>{selected.materials}</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CTA */}
      <section className="py-20 bg-[#F3F4F6] text-center">
        <div className="max-w-2xl mx-auto px-4">
          <SectionHeading label="Interesse?" title="Ook uw project in onze portfolio?" centered />
          <Link href="/contact" className="inline-flex items-center gap-2 bg-[#1E3A8A] text-white font-semibold px-8 py-4 rounded-lg hover:bg-[#1e40af] transition-all duration-200 hover:-translate-y-0.5 shadow-md">
            Vraag een gratis offerte aan
          </Link>
        </div>
      </section>
    </>
  );
}
