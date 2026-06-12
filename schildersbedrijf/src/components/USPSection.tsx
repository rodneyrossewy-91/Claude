"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Award, Package, ShieldCheck, Tag } from "lucide-react";

const usps = [
  {
    icon: Award,
    title: "Meer dan 15 jaar ervaring",
    description: "Wij hebben jarenlange ervaring in alle aspecten van schilderwerk, van klein onderhoud tot grootschalige renovaties.",
    color: "from-blue-deep to-blue-light",
  },
  {
    icon: Package,
    title: "Hoogwaardige materialen",
    description: "Wij werken uitsluitend met A-merken zoals Histor, Sikkens en Sigma voor een duurzaam en mooi eindresultaat.",
    color: "from-yellow to-amber-300",
  },
  {
    icon: ShieldCheck,
    title: "Garantie op werkzaamheden",
    description: "Al onze werkzaamheden worden uitgevoerd met garantie. Uw tevredenheid en een kwalitatief resultaat staan bij ons centraal.",
    color: "from-blue-deep to-blue-light",
  },
  {
    icon: Tag,
    title: "Gratis en vrijblijvende offerte",
    description: "Vraag vrijblijvend een offerte aan. Wij komen graag langs voor een gratis inspectie en sturen u een heldere, gedetailleerde offerte.",
    color: "from-yellow to-amber-300",
  },
];

export default function USPSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gray-light/50 rounded-l-[80px]" />

      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 text-blue-deep text-sm font-semibold uppercase tracking-wider mb-4">
            <div className="w-8 h-0.5 bg-yellow" />
            Waarom ons kiezen
            <div className="w-8 h-0.5 bg-yellow" />
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-anthracite mb-4">
            Waarom Kiezen Voor <span className="text-blue-deep">Ons?</span>
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Wij combineren vakmanschap met persoonlijke service voor het beste resultaat.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {usps.map((usp, index) => {
            const Icon = usp.icon;
            const isYellow = usp.color.includes("yellow");
            return (
              <motion.div
                key={usp.title}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="group bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 relative overflow-hidden"
              >
                {/* Top color bar */}
                <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${usp.color}`} />

                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${usp.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon size={24} className={isYellow ? "text-anthracite" : "text-white"} />
                </div>

                <h3 className="text-lg font-bold text-anthracite mb-3 leading-tight">{usp.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{usp.description}</p>

                {/* Hover brush stroke */}
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-yellow to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
