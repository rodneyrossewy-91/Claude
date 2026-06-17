import type { Metadata } from 'next';
import ContactForm from '@/components/contact/ContactForm';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Contact | Van der Berg Schilderwerken',
  description: 'Neem contact op met Van der Berg Schilderwerken. Gratis offerte aanvragen, bel ons of stuur een e-mail.',
};

export default function ContactPage() {
  return (
    <>
      <div className="bg-[#1F2937] pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="text-[#FBBF24] text-sm font-semibold tracking-widest uppercase block mb-4">Neem contact op</span>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-white max-w-3xl">
            Vraag een <span className="text-[#FBBF24]">gratis offerte</span> aan
          </h1>
        </div>
      </div>

      {/* 24u CTA bar */}
      <div className="bg-[#FBBF24] py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center font-semibold text-[#1F2937]">
          Binnen 24 uur een reactie op uw aanvraag — gegarandeerd.
        </div>
      </div>

      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact info */}
            <div>
              <h2 className="font-serif text-2xl font-bold text-[#1F2937] mb-8">Contactgegevens</h2>
              <div className="space-y-6 mb-10">
                {([
                  { icon: Phone, label: 'Telefoon', value: '020 123 4567', href: 'tel:+31201234567' },
                  { icon: Mail, label: 'E-mail', value: 'info@vanderbergschilderwerken.nl', href: 'mailto:info@vanderbergschilderwerken.nl' },
                  { icon: MapPin, label: 'Adres', value: 'Hoofdstraat 42, 1234 AB Amsterdam', href: undefined },
                  { icon: Clock, label: 'Openingstijden', value: 'Ma–Vr: 07:00–18:00 | Za: 08:00–14:00', href: undefined },
                ] as const).map(item => (
                  <div key={item.label} className="flex items-start gap-4">
                    <div className="w-11 h-11 rounded-xl bg-[#1E3A8A]/10 flex items-center justify-center flex-shrink-0">
                      <item.icon size={20} className="text-[#1E3A8A]" aria-hidden="true" />
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-[#6B7280] uppercase tracking-wide mb-1">{item.label}</div>
                      {item.href ? (
                        <a href={item.href} className="text-[#1F2937] font-medium hover:text-[#1E3A8A] transition-colors">{item.value}</a>
                      ) : (
                        <span className="text-[#1F2937] font-medium">{item.value}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Map placeholder */}
              <div className="rounded-2xl overflow-hidden h-56 bg-gradient-to-br from-[#1E3A8A]/20 to-[#1F2937]/10 flex items-center justify-center border border-gray-200">
                <div className="text-center">
                  <MapPin size={32} className="text-[#1E3A8A] mx-auto mb-2" aria-hidden="true" />
                  <p className="text-[#6B7280] font-medium text-sm">Google Maps</p>
                  <p className="text-[#9CA3AF] text-xs">Hoofdstraat 42, Amsterdam</p>
                </div>
              </div>
            </div>

            {/* Form */}
            <div>
              <h2 className="font-serif text-2xl font-bold text-[#1F2937] mb-8">Stuur ons een bericht</h2>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
