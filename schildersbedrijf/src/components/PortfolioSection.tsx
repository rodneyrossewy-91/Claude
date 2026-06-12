"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import { MapPin, ArrowRight } from "lucide-react";

const projects = [
  {
    id: 1,
    title: "Volledig binnenschilderwerk",
    location: "Amsterdam, Noord-Holland",
    type: "Binnenschilderwerk",
    description: "Complete renovatie van 4-kamerwoning, inclusief plafonds, muren en kozijnen.",
    gradient: "from-blue-900 to-blue-600",
  },
  {
    id: 2,
    title: "Gevelrenovatie herenhuis",
    location: "Utrecht, Utrecht",
    type: "Buitenschilderwerk",
    description: "Volledige gevelrenovatie met schuren, herstellen en schilderen van een klassiek herenhuis.",
    gradient: "from-amber-700 to-amber-500",
  },
  {
    id: 3,
    title: "Spuitwerk kantoorruimte",
    location: "Rotterdam, Zuid-Holland",
    type: "Spuitwerk",
    description: "Strak gespoten wanden en plafonds voor een modern kantoor van 500m².",
    gradient: "from-slate-700 to-slate-500",
  },
  {
    id: 4,
    title: "Houtrot reparatie & schilderwerk",
    location: "Haarlem, Noord-Holland",
    type: "Houtrot Reparatie",
    description: "Reparatie en herstel van verrotting aan kozijnen, gevolgd door volledig buitenschilderwerk.",
    gradient: "from-green-800 to-green-600",
  },
  {
    id: 5,
    title: "Luxe appartement afwerking",
    location: "Den Haag, Zuid-Holland",
    type: "Binnenschilderwerk",
    description: "Hoogwaardige afwerking van een luxe penthouse met speciale decoratieve technieken.",
    gradient: "from-purple-800 to-purple-600",
  },
  {
    id: 6,
    title: "Bedrijfspand buitenschilderwerk",
    location: "Eindhoven, Noord-Brabant",
    type: "Buitenschilderwerk",
    description: "Complete verffbeurt van een bedrijfspand met nieuwe huisstijlkleuren.",
    gradient: "from-blue-deep to-blue-400",
  },
];

export default function PortfolioSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-6 mb-16"
        >
          <div>
            <div className="inline-flex items-center gap-2 text-blue-deep text-sm font-semibold uppercase tracking-wider mb-4">
              <div className="w-8 h-0.5 bg-yellow" />
              Portfolio
              <div className="w-8 h-0.5 bg-yellow" />
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-anthracite mb-4">
              Uitgelichte <span className="text-blue-deep">Projecten</span>
            </h2>
            <p className="text-gray-600 text-lg max-w-xl">
              Een selectie van onze mooiste opdrachten — van interieur tot exterieur, particulier en zakelijk.
            </p>
          </div>
          <Link
            href="/portfolio"
            className="flex-shrink-0 inline-flex items-center gap-2 text-blue-deep font-semibold hover:text-yellow transition-colors duration-200"
          >
            Bekijk Alle Projecten
            <ArrowRight size={18} />
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-400 cursor-pointer aspect-[4/3]"
            >
              {/* Color gradient background (placeholder for real images) */}
              <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient}`} />

              {/* Pattern overlay */}
              <div className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage: "repeating-linear-gradient(45deg, rgba(255,255,255,0.1) 0px, rgba(255,255,255,0.1) 1px, transparent 1px, transparent 10px)",
                }}
              />

              {/* Type badge */}
              <div className="absolute top-4 left-4">
                <span className="bg-yellow text-anthracite text-xs font-bold px-3 py-1.5 rounded-full">
                  {project.type}
                </span>
              </div>

              {/* Content overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent translate-y-8 group-hover:translate-y-0 transition-transform duration-400" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="text-white font-bold text-lg mb-1">{project.title}</h3>
                <div className="flex items-center gap-1.5 text-white/70 text-sm mb-2">
                  <MapPin size={14} />
                  {project.location}
                </div>
                <p className="text-white/60 text-sm leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                  {project.description}
                </p>
              </div>

              {/* Before/after tag */}
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="bg-white/20 backdrop-blur-sm text-white text-xs font-medium px-2 py-1 rounded-lg border border-white/20">
                  Voor/Na
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-12"
        >
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 bg-blue-deep hover:bg-blue-deep/90 text-white font-semibold px-8 py-4 rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-blue-deep/30 hover:-translate-y-0.5"
          >
            Bekijk Alle Projecten
            <ArrowRight size={18} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
