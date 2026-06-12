"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import { Home, Building2, Sparkles, Hammer, ArrowRight } from "lucide-react";

const services = [
  {
    id: "binnenschilderwerk",
    icon: Home,
    title: "Binnenschilderwerk",
    description: "Muren, plafonds, kozijnen en deuren.",
    detail: "Wij verzorgen al uw binnenschilderwerk met oog voor detail. Van plafonds en wanden tot kozijnen, deuren en radiatoren.",
    color: "#1E3A8A",
    bgColor: "from-blue-50 to-blue-100",
  },
  {
    id: "buitenschilderwerk",
    icon: Building2,
    title: "Buitenschilderwerk",
    description: "Gevels, kozijnen, dakranden en houtwerk.",
    detail: "Bescherm uw woning tegen de elementen. Wij schilderen gevels, kozijnen, dakranden en al het buitenhoutwerk vakkundig.",
    color: "#FBBF24",
    bgColor: "from-amber-50 to-amber-100",
  },
  {
    id: "spuitwerk",
    icon: Sparkles,
    title: "Spuitwerk",
    description: "Strak en efficiënt resultaat.",
    detail: "Voor een perfect strak en snel resultaat gebruiken wij professionele spuittechnieken met de hoogste kwaliteitslakken.",
    color: "#1E3A8A",
    bgColor: "from-blue-50 to-blue-100",
  },
  {
    id: "houtrot",
    icon: Hammer,
    title: "Houtrot Reparatie",
    description: "Duurzame oplossingen voor beschadigd hout.",
    detail: "Houtrot tijdig aanpakken bespaart kosten. Wij repareren en herstellen beschadigd houtwerk duurzaam en professioneel.",
    color: "#FBBF24",
    bgColor: "from-amber-50 to-amber-100",
  },
];

export default function ServicesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-24 bg-gray-light relative overflow-hidden">
      {/* Decorative brush strokes */}
      <div className="absolute top-10 left-0 w-32 h-2 bg-yellow/40 rounded-r-full transform -rotate-2" />
      <div className="absolute top-14 left-0 w-20 h-1 bg-blue-deep/20 rounded-r-full transform rotate-1" />

      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 text-blue-deep text-sm font-semibold uppercase tracking-wider mb-4">
            <div className="w-8 h-0.5 bg-yellow" />
            Onze diensten
            <div className="w-8 h-0.5 bg-yellow" />
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-anthracite mb-4">
            Wat Wij Voor U <span className="text-blue-deep">Doen</span>
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Van binnenschilderwerk tot complete buitenrenovaties — wij bieden een volledig pakket aan schilderdiensten.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            const isBlue = service.color === "#1E3A8A";
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.12 }}
                className="group service-card relative bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
              >
                {/* Color accent bar */}
                <div
                  className="h-1 w-full"
                  style={{ background: `linear-gradient(90deg, ${service.color}, ${isBlue ? "#3B82F6" : "#FDE68A"})` }}
                />

                <div className="p-8">
                  <div className="flex items-start gap-5 mb-5">
                    <div
                      className="w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300"
                      style={{ backgroundColor: isBlue ? "#EFF6FF" : "#FFFBEB" }}
                    >
                      <Icon size={28} style={{ color: service.color }} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-anthracite mb-1">{service.title}</h3>
                      <p className="text-sm font-medium" style={{ color: service.color }}>{service.description}</p>
                    </div>
                  </div>

                  <p className="text-gray-500 text-sm leading-relaxed mb-6">{service.detail}</p>

                  <Link
                    href={`/diensten#${service.id}`}
                    className="inline-flex items-center gap-2 text-sm font-semibold transition-all duration-200 group/link"
                    style={{ color: service.color }}
                  >
                    Meer informatie
                    <ArrowRight size={16} className="group-hover/link:translate-x-1 transition-transform duration-200" />
                  </Link>
                </div>

                {/* Hover brush effect overlay */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                  <div
                    className="absolute bottom-0 left-0 right-0 h-1"
                    style={{ background: `linear-gradient(90deg, transparent, ${service.color}, transparent)` }}
                  />
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-12"
        >
          <Link
            href="/diensten"
            className="inline-flex items-center gap-2 bg-blue-deep hover:bg-blue-deep/90 text-white font-semibold px-8 py-4 rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-blue-deep/30 hover:-translate-y-0.5"
          >
            Bekijk Alle Diensten
            <ArrowRight size={18} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
