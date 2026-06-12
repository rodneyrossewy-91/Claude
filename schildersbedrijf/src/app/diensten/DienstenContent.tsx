"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import Link from "next/link";
import { Home, Building2, Sparkles, Hammer, Check, ChevronDown, ArrowRight } from "lucide-react";
import CTASection from "@/components/CTASection";

const services = [
  {
    id: "binnenschilderwerk",
    icon: Home,
    title: "Binnenschilderwerk",
    tagline: "Perfecte afwerking voor elk interieur",
    description:
      "Wij verzorgen al uw binnenschilderwerk met oog voor detail en vakmanschap. Van plafonds en wanden tot kozijnen, deuren en radiatoren. Wij zorgen voor een vlekkeloos eindresultaat dat jarenlang mooi blijft.",
    image: "from-blue-900 to-blue-600",
    steps: [
      "Gratis opname en advies",
      "Zorgvuldig afdekken en beschermen",
      "Schuren en voorstrijken",
      "Schilderen met hoogwaardige verven",
      "Controle en oplevering",
    ],
    benefits: [
      "Meer dan 15 jaar ervaring",
      "Gebruik van A-merken zoals Histor en Sikkens",
      "Nette werkplekomstandigheden",
      "Garantie op de werkzaamheden",
    ],
    faqs: [
      { q: "Hoe lang duurt een binnenschilderbeurt?", a: "Afhankelijk van de omvang duurt een gemiddelde woning 3-5 werkdagen." },
      { q: "Welke verf gebruiken jullie?", a: "Wij werken met A-merken zoals Histor, Sikkens en Sigma voor een duurzaam resultaat." },
      { q: "Kunnen jullie ook kleuradvies geven?", a: "Ja! Wij bieden gratis kleuradvies en kunnen staalkaarten meebrengen." },
    ],
  },
  {
    id: "buitenschilderwerk",
    icon: Building2,
    title: "Buitenschilderwerk",
    tagline: "Bescherming en uitstraling voor uw gevel",
    description:
      "Buitenschilderwerk beschermt uw woning tegen vocht, schimmel en weersinvloeden. Wij schilderen gevels, kozijnen, dakranden en al het buitenhoutwerk professioneel en duurzaam met de beste buitenverven.",
    image: "from-amber-700 to-orange-500",
    steps: [
      "Inspectie en conditiebepaling",
      "Reiniging en ontvetting van alle oppervlakken",
      "Schuren en eventueel houtrot herstel",
      "Grondlaag aanbrengen",
      "Afwerkslagen met UV-bestendige verven",
    ],
    benefits: [
      "Langdurige bescherming",
      "Gebruik van weerbestendige buitenverven",
      "Houtrot herstel inbegrepen indien nodig",
      "Tot 10 jaar garantie mogelijk",
    ],
    faqs: [
      { q: "Wanneer is het beste moment voor buitenschilderwerk?", a: "Ideaal is droog, bewolkt weer boven 10°C – doorgaans lente en zomer." },
      { q: "Hoe lang gaat het schilderwerk mee?", a: "Met onze premium verven gemiddeld 8-10 jaar bij goed onderhoud." },
      { q: "Reinigen jullie de gevel ook?", a: "Ja, reiniging is altijd onderdeel van ons proces voor een hechte verf." },
    ],
  },
  {
    id: "spuitwerk",
    icon: Sparkles,
    title: "Spuitwerk",
    tagline: "Strak, snel en perfect resultaat",
    description:
      "Voor een perfect strak en efficiënt resultaat bieden wij professioneel spuitwerk aan. Met onze airless-spuittechnieken en hoogwaardige lakken bereiken wij een vlakke, uniforme afwerking die er perfect uitziet.",
    image: "from-slate-700 to-slate-500",
    steps: [
      "Afdekken van alle oppervlakken die niet gespoten worden",
      "Schuren en plamuren indien nodig",
      "Grondlaag spuiten",
      "Eindlak in gewenste kleur spuiten",
      "Controle en eventuele bijwerking",
    ],
    benefits: [
      "Ultra strak eindresultaat zonder kwaststrepen",
      "Sneller dan traditioneel verfwerk",
      "Geschikt voor grote oppervlakken",
      "Ideaal voor deuren, kozijnen en meubels",
    ],
    faqs: [
      { q: "Is spuitwerk ook geschikt voor mijn woning?", a: "Ja! Spuitwerk is zeer geschikt voor deuren, kozijnen, keukens en grote wanden." },
      { q: "Wat wordt er afgedekt tijdens het spuiten?", a: "Alles wat niet gespoten wordt – vloeren, meubels, ramen – dekken wij zorgvuldig af." },
      { q: "Hoe lang moet ik wachten voordat ik weer in de ruimte kan?", a: "De meeste ruimtes zijn na 4-8 uur weer te gebruiken." },
    ],
  },
  {
    id: "houtrot",
    icon: Hammer,
    title: "Houtrot Reparatie",
    tagline: "Duurzame oplossingen voor beschadigd hout",
    description:
      "Houtrot is een veel voorkomend probleem bij houten kozijnen en dakranden. Tijdig ingrijpen bespaart u veel kosten. Wij repareren verrot hout duurzaam met professionele vulmiddelen of vervangen de aangetaste delen volledig.",
    image: "from-green-800 to-green-600",
    steps: [
      "Inspectie van het aangetaste hout",
      "Verwijderen van verrot materiaal",
      "Behandeling met houtrot verdelger",
      "Opvullen met epoxy vulmiddel of houtvervanging",
      "Schuren, grunderen en schilderen",
    ],
    benefits: [
      "Voorkomen van verdere aantasting",
      "Goedkoper dan volledige vervanging",
      "Duurzame reparatie met garantie",
      "Inclusief afwerkschilder",
    ],
    faqs: [
      { q: "Hoe herken ik houtrot?", a: "Zacht, vezelig of verkleurd hout dat makkelijk ingeeft bij druk is een teken van houtrot." },
      { q: "Is repareren goedkoper dan vervangen?", a: "Ja, in de meeste gevallen wel. Wij adviseren eerlijk of reparatie zinvol is." },
      { q: "Hoe voorkomen jullie dat houtrot terugkeert?", a: "Door goede behandeling, juiste verven en preventief onderhoud." },
    ],
  },
];

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-gray-100 rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-5 text-left bg-white hover:bg-gray-50 transition-colors"
      >
        <span className="font-semibold text-anthracite text-sm">{q}</span>
        <ChevronDown
          size={18}
          className={`text-gray-400 flex-shrink-0 ml-4 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>
      <div className={`overflow-hidden transition-all duration-300 ${open ? "max-h-40" : "max-h-0"}`}>
        <p className="px-5 pb-5 text-gray-600 text-sm leading-relaxed">{a}</p>
      </div>
    </div>
  );
}

function ServiceBlock({ service, index }: { service: typeof services[0]; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const Icon = service.icon;
  const isEven = index % 2 === 0;

  return (
    <section id={service.id} ref={ref} className={`py-20 ${index % 2 === 0 ? "bg-white" : "bg-gray-light"}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-16 items-center ${isEven ? "" : "lg:flex-row-reverse"}`}>
          {/* Visual */}
          <motion.div
            initial={{ opacity: 0, x: isEven ? -40 : 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className={isEven ? "order-1" : "order-1 lg:order-2"}
          >
            <div className={`bg-gradient-to-br ${service.image} rounded-3xl aspect-[4/3] flex items-center justify-center relative overflow-hidden`}>
              <Icon size={80} className="text-white/30" />
              <div className="absolute inset-0 opacity-10"
                style={{ backgroundImage: "repeating-linear-gradient(45deg, rgba(255,255,255,0.1) 0px, rgba(255,255,255,0.1) 1px, transparent 1px, transparent 12px)" }}
              />
              <div className="absolute bottom-6 left-6 right-6">
                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
                  <div className="text-white font-bold text-lg">{service.title}</div>
                  <div className="text-white/70 text-sm">{service.tagline}</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: isEven ? 40 : -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className={isEven ? "order-2" : "order-2 lg:order-1"}
          >
            <div className="inline-flex items-center gap-2 text-blue-deep text-sm font-semibold uppercase tracking-wider mb-4">
              <div className="w-8 h-0.5 bg-yellow" />
              {service.title}
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-anthracite mb-4">{service.tagline}</h2>
            <p className="text-gray-600 leading-relaxed mb-8">{service.description}</p>

            {/* Werkwijze */}
            <div className="mb-8">
              <h3 className="font-bold text-anthracite mb-4">Onze werkwijze</h3>
              <div className="space-y-3">
                {service.steps.map((step, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-blue-deep text-white text-xs flex items-center justify-center flex-shrink-0 font-bold mt-0.5">
                      {i + 1}
                    </div>
                    <span className="text-gray-600 text-sm">{step}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Voordelen */}
            <div className="mb-8">
              <h3 className="font-bold text-anthracite mb-4">Voordelen</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {service.benefits.map((benefit, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm text-gray-600">
                    <Check size={16} className="text-yellow flex-shrink-0" />
                    {benefit}
                  </div>
                ))}
              </div>
            </div>

            {/* FAQ */}
            <div className="mb-8">
              <h3 className="font-bold text-anthracite mb-4">Veelgestelde vragen</h3>
              <div className="space-y-2">
                {service.faqs.map((faq, i) => (
                  <FAQItem key={i} q={faq.q} a={faq.a} />
                ))}
              </div>
            </div>

            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-yellow hover:bg-yellow/90 text-anthracite font-bold px-6 py-3 rounded-xl transition-all duration-200 hover:-translate-y-0.5"
            >
              Offerte Aanvragen
              <ArrowRight size={18} />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default function DienstenContent() {
  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-anthracite to-blue-deep relative overflow-hidden">
        <div className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 bg-yellow/20 border border-yellow/30 text-yellow px-4 py-2 rounded-full text-sm font-medium mb-6">
              Volledig pakket schilderdiensten
            </div>
            <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6">
              Onze <span className="text-yellow">Diensten</span>
            </h1>
            <p className="text-xl text-white/70 max-w-2xl mx-auto">
              Van binnenschilderwerk tot houtrot reparatie — wij bieden een compleet pakket professionele schilderdiensten.
            </p>
            {/* Quick nav */}
            <div className="flex flex-wrap gap-3 justify-center mt-10">
              {services.map((s) => (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  className="bg-white/10 hover:bg-yellow hover:text-anthracite backdrop-blur-sm text-white border border-white/20 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200"
                >
                  {s.title}
                </a>
              ))}
            </div>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" fill="none" preserveAspectRatio="none" className="w-full h-12">
            <path d="M0,30 C360,60 720,0 1080,40 C1260,55 1380,20 1440,30 L1440,60 L0,60 Z" fill="white"/>
          </svg>
        </div>
      </section>

      {/* Service blocks */}
      {services.map((service, index) => (
        <ServiceBlock key={service.id} service={service} index={index} />
      ))}

      <CTASection />
    </>
  );
}
