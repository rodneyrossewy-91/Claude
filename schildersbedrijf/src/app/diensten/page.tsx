import type { Metadata } from 'next';
import { CheckCircle, ChevronDown } from 'lucide-react';
import { services } from '@/lib/data';
import SectionHeading from '@/components/shared/SectionHeading';
import CTASection from '@/components/home/CTASection';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Diensten | Van der Berg Schilderwerken',
  description: 'Wij bieden binnenschilderwerk, buitenschilderwerk, spuitwerk en houtrot reparatie. Bekijk al onze schildersdiensten.',
};

function FAQ({ items }: { items: { q: string; a: string }[] }) {
  return (
    <div className="space-y-4">
      {items.map((item, i) => (
        <details key={i} className="group bg-[#F3F4F6] rounded-xl p-5 cursor-pointer">
          <summary className="flex items-center justify-between font-semibold text-[#1F2937] cursor-pointer list-none">
            {item.q}
            <ChevronDown size={18} className="flex-shrink-0 transition-transform group-open:rotate-180 text-[#1E3A8A]" aria-hidden="true" />
          </summary>
          <p className="mt-3 text-[#6B7280] text-sm leading-relaxed">{item.a}</p>
        </details>
      ))}
    </div>
  );
}

const gradients = [
  'from-[#1E3A8A] to-[#2563EB]',
  'from-[#1F2937] to-[#374151]',
  'from-[#FBBF24] to-[#F59E0B]',
  'from-[#064E3B] to-[#065F46]',
];

export default function DienstenPage() {
  return (
    <>
      <div className="bg-[#1F2937] pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="text-[#FBBF24] text-sm font-semibold tracking-widest uppercase block mb-4">Wat wij doen</span>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-white max-w-3xl leading-tight">
            Onze <span className="text-[#FBBF24]">schilderdiensten</span>
          </h1>
        </div>
      </div>

      {services.map((service, i) => (
        <section key={service.id} id={service.slug} className={`py-20 md:py-28 ${i % 2 === 0 ? 'bg-white' : 'bg-[#F3F4F6]'}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className={`grid lg:grid-cols-2 gap-16 items-start ${i % 2 === 1 ? 'lg:grid-flow-col-dense' : ''}`}>
              {/* Visual */}
              <div className={`rounded-2xl overflow-hidden ${i % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                <div className={`h-80 bg-gradient-to-br ${gradients[i]} rounded-2xl flex items-center justify-center`}>
                  <span className="font-serif text-8xl font-bold text-white/20">0{i+1}</span>
                </div>
              </div>
              {/* Content */}
              <div>
                <SectionHeading label={`Dienst 0${i+1}`} title={service.title} subtitle={service.description} />
                {/* Werkwijze */}
                <div className="mb-8">
                  <h3 className="font-bold text-[#1F2937] mb-4">Onze werkwijze</h3>
                  <ol className="space-y-3">
                    {service.werkwijze.map((step, j) => (
                      <li key={j} className="flex items-start gap-3">
                        <span className="w-6 h-6 rounded-full bg-[#1E3A8A] text-white text-xs flex items-center justify-center font-bold flex-shrink-0 mt-0.5">{j+1}</span>
                        <span className="text-[#6B7280] text-sm leading-relaxed">{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>
                {/* Voordelen */}
                <div className="mb-8">
                  <h3 className="font-bold text-[#1F2937] mb-4">Voordelen</h3>
                  <ul className="space-y-2">
                    {service.voordelen.map((v, j) => (
                      <li key={j} className="flex items-center gap-2 text-sm text-[#6B7280]">
                        <CheckCircle size={16} className="text-[#1E3A8A] flex-shrink-0" aria-hidden="true" /> {v}
                      </li>
                    ))}
                  </ul>
                </div>
                {/* FAQ */}
                <div className="mb-8">
                  <h3 className="font-bold text-[#1F2937] mb-4">Veelgestelde vragen</h3>
                  <FAQ items={service.faq} />
                </div>
                <Link href="/contact" className="inline-flex items-center gap-2 bg-[#1E3A8A] text-white font-semibold px-6 py-3 rounded-lg hover:bg-[#1e40af] transition-all duration-200 hover:-translate-y-0.5 shadow-md">
                  Vraag offerte aan
                </Link>
              </div>
            </div>
          </div>
          {/* Paint stroke divider */}
          {i < services.length - 1 && (
            <div className="mt-20 w-full overflow-hidden" aria-hidden="true">
              <svg viewBox="0 0 1440 40" preserveAspectRatio="none" className="w-full h-6">
                <path d="M0,20 C240,38 480,2 720,20 C960,38 1200,2 1440,20" stroke="#FBBF24" strokeWidth="3" fill="none" opacity="0.3" />
              </svg>
            </div>
          )}
        </section>
      ))}

      <CTASection />
    </>
  );
}
