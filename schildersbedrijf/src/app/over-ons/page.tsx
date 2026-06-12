import type { Metadata } from 'next';
import { teamMembers, timeline } from '@/lib/data';
import SectionHeading from '@/components/shared/SectionHeading';
import CTASection from '@/components/home/CTASection';

export const metadata: Metadata = {
  title: 'Over Ons | Van der Berg Schilderwerken',
  description: 'Ontdek het verhaal achter Van der Berg Schilderwerken. Meer dan 15 jaar vakmanschap, betrouwbaarheid en persoonlijke service.',
};

export default function OverOnsPage() {
  return (
    <>
      {/* Hero */}
      <div className="bg-[#1F2937] pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="text-[#FBBF24] text-sm font-semibold tracking-widest uppercase block mb-4">Ons verhaal</span>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-white max-w-3xl leading-tight">
            Vakmanschap met een <span className="text-[#FBBF24]">persoonlijk tintje</span>
          </h1>
        </div>
      </div>

      {/* Story + Stats */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <SectionHeading label="Over ons bedrijf" title="Meer dan 15 jaar schildersvakmanschap" />
              <div className="space-y-4 text-[#6B7280] leading-relaxed">
                <p>Van der Berg Schilderwerken is opgericht door Erik van der Berg met één duidelijke missie: het leveren van topkwaliteit schilderwerk met oprechte persoonlijke aandacht voor iedere klant.</p>
                <p>Wat begon als een eenmanszaak is uitgegroeid tot een professioneel schildersbedrijf met een vast team van vakbekwame medewerkers. Wij werken voor particulieren én bedrijven in de regio Amsterdam.</p>
                <p>Onze kracht zit in het combineren van ambacht met moderne technieken. Wij gebruiken alleen hoogwaardige materialen van A-merken en staan garant voor een duurzaam resultaat met een nette, strakke afwerking.</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6">
              {[['15+', 'Jaar ervaring'], ['500+', 'Projecten afgerond'], ['98%', 'Tevreden klanten'], ['5 jaar', 'Garantie']].map(([num, label]) => (
                <div key={label} className="bg-[#F3F4F6] rounded-2xl p-8 text-center border-t-4 border-[#1E3A8A]">
                  <div className="font-serif text-4xl font-bold text-[#1E3A8A] mb-2">{num}</div>
                  <div className="text-[#6B7280] text-sm font-medium">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 md:py-28 bg-[#F3F4F6]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading label="Onze geschiedenis" title="15 jaar Van der Berg" centered />
          <div className="relative">
            <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-0.5 bg-[#1E3A8A]/20" aria-hidden="true" />
            <div className="space-y-12">
              {timeline.map((item, i) => (
                <div key={item.year} className={`flex items-center gap-8 ${i % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                  <div className={`flex-1 ${i % 2 === 0 ? 'text-right' : 'text-left'}`}>
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 inline-block max-w-sm">
                      <div className="font-serif text-2xl font-bold text-[#FBBF24] mb-2">{item.year}</div>
                      <h3 className="font-bold text-[#1F2937] mb-2">{item.title}</h3>
                      <p className="text-[#6B7280] text-sm leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                  <div className="relative z-10 w-4 h-4 rounded-full bg-[#1E3A8A] border-4 border-white shadow-md flex-shrink-0" aria-hidden="true" />
                  <div className="flex-1" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading label="Ons team" title="De mensen achter Van der Berg" centered />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {teamMembers.map(member => (
              <div key={member.id} className="text-center group">
                <div className="w-28 h-28 mx-auto rounded-2xl bg-gradient-to-br from-[#1E3A8A] to-[#2563EB] flex items-center justify-center text-white font-serif text-3xl font-bold mb-5 group-hover:shadow-xl transition-shadow">
                  {member.initials}
                </div>
                <h3 className="font-serif font-bold text-xl text-[#1F2937] mb-1">{member.name}</h3>
                <div className="text-[#FBBF24] font-semibold text-sm mb-4">{member.role}</div>
                <p className="text-[#6B7280] text-sm leading-relaxed">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
