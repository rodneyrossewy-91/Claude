"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import { Award, Users, Heart, ArrowRight } from "lucide-react";
import CTASection from "@/components/CTASection";

const milestones = [
  { year: "2008", title: "Oprichting SchilderPro", desc: "Gestart als eenmanszaak vanuit Amsterdam." },
  { year: "2011", title: "Team uitbreiding", desc: "Gegroeid naar een team van 5 vakbekwame schilders." },
  { year: "2014", title: "Zakelijke dienstverlening", desc: "Uitbreiding naar zakelijke klanten en bedrijfspanden." },
  { year: "2017", title: "Certificering", desc: "Behaald SVGV keurmerk en erkend schilder certificering." },
  { year: "2020", title: "250+ Projecten", desc: "Meer dan 250 succesvolle projecten afgerond." },
  { year: "2024", title: "350+ Tevreden klanten", desc: "Groeien door vertrouwen en mond-tot-mondreclame." },
];

const teamMembers = [
  {
    name: "Jan de Schilder",
    role: "Eigenaar & Hoofdschilder",
    experience: "20 jaar ervaring",
    initials: "JS",
    color: "from-blue-deep to-blue-light",
  },
  {
    name: "Mark Verf",
    role: "Senior Schilder",
    experience: "12 jaar ervaring",
    initials: "MV",
    color: "from-amber-500 to-yellow",
  },
  {
    name: "Lisa Kwast",
    role: "Kleuradvies & Binnenwerk",
    experience: "8 jaar ervaring",
    initials: "LK",
    color: "from-blue-deep to-blue-light",
  },
  {
    name: "Tom Penseel",
    role: "Buitenwerk Specialist",
    experience: "10 jaar ervaring",
    initials: "TP",
    color: "from-amber-500 to-yellow",
  },
];

const values = [
  { icon: Award, title: "Vakmanschap", desc: "Wij leveren kwaliteit die de tand des tijds doorstaat." },
  { icon: Heart, title: "Betrouwbaarheid", desc: "Wij doen wat we beloven, op tijd en binnen budget." },
  { icon: Users, title: "Persoonlijke service", desc: "U bent geen nummer – persoonlijk contact staat centraal." },
];

function TimelineItem({ milestone, index }: { milestone: typeof milestones[0]; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const isLeft = index % 2 === 0;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.1 }}
      className={`flex items-start gap-6 ${isLeft ? "lg:flex-row" : "lg:flex-row-reverse"} flex-row`}
    >
      <div className={`hidden lg:block flex-1 ${isLeft ? "text-right" : "text-left"}`}>
        {isLeft && (
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 inline-block text-left">
            <span className="text-yellow font-bold text-2xl">{milestone.year}</span>
            <h3 className="text-anthracite font-bold mt-1">{milestone.title}</h3>
            <p className="text-gray-500 text-sm mt-1">{milestone.desc}</p>
          </div>
        )}
      </div>
      {/* Center dot */}
      <div className="flex flex-col items-center">
        <div className="w-4 h-4 rounded-full bg-yellow border-4 border-blue-deep flex-shrink-0 mt-1" />
        <div className="w-0.5 bg-gray-200 flex-1 min-h-12" />
      </div>
      <div className={`flex-1 ${!isLeft ? "hidden lg:block" : ""} lg:${isLeft ? "hidden" : "block"}`}>
        {!isLeft && (
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 lg:inline-block">
            <span className="text-yellow font-bold text-2xl">{milestone.year}</span>
            <h3 className="text-anthracite font-bold mt-1">{milestone.title}</h3>
            <p className="text-gray-500 text-sm mt-1">{milestone.desc}</p>
          </div>
        )}
      </div>
      {/* Mobile layout */}
      <div className="lg:hidden flex-1">
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <span className="text-yellow font-bold text-xl">{milestone.year}</span>
          <h3 className="text-anthracite font-bold text-sm mt-1">{milestone.title}</h3>
          <p className="text-gray-500 text-xs mt-1">{milestone.desc}</p>
        </div>
      </div>
    </motion.div>
  );
}

export default function OverOnsContent() {
  const heroRef = useRef(null);
  const valuesRef = useRef(null);
  const teamRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true });
  const valuesInView = useInView(valuesRef, { once: true, margin: "-100px" });
  const teamInView = useInView(teamRef, { once: true, margin: "-100px" });

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
        <div ref={heroRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 bg-yellow/20 border border-yellow/30 text-yellow px-4 py-2 rounded-full text-sm font-medium mb-6">
              Ons verhaal
            </div>
            <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6">
              Over <span className="text-yellow">SchilderPro</span>
            </h1>
            <p className="text-xl text-white/70 max-w-2xl mx-auto">
              Meer dan 15 jaar vakmanschap, passie voor kwaliteit en persoonlijke service.
              Wij zijn trots op elk project dat wij opleveren.
            </p>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" fill="none" preserveAspectRatio="none" className="w-full h-12">
            <path d="M0,30 C360,60 720,0 1080,40 C1260,55 1380,20 1440,30 L1440,60 L0,60 Z" fill="white"/>
          </svg>
        </div>
      </section>

      {/* Story */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl font-bold text-anthracite mb-6">
                Ons Verhaal
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                SchilderPro werd in 2008 opgericht door Jan de Schilder vanuit een passie voor vakmanschap en
                een drive om het beter te doen. Begonnen als eenmanszaak in Amsterdam, groeide het bedrijf
                snel dankzij tevreden klanten en mond-tot-mondreclame.
              </p>
              <p className="text-gray-600 leading-relaxed mb-4">
                Wij geloven dat goed schilderwerk meer is dan verf op een muur. Het gaat om vakmanschap,
                persoonlijke aandacht, eerlijk advies en trots op het eindresultaat. Die mentaliteit heeft
                ons gemaakt tot wat we vandaag zijn: een betrouwbaar schildersbedrijf met meer dan 350
                tevreden klanten.
              </p>
              <p className="text-gray-600 leading-relaxed mb-8">
                Of het nu gaat om een complete binnenschilderbeurt, een gevelrenovatie of delicate
                restauratiewerkzaamheden — wij zetten altijd het beste resultaat centraal.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-blue-deep hover:bg-blue-deep/90 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-200 hover:-translate-y-0.5"
              >
                Neem Contact Op
                <ArrowRight size={18} />
              </Link>
            </motion.div>

            {/* Visual placeholder */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="bg-gradient-to-br from-blue-deep to-anthracite rounded-3xl aspect-[4/3] flex items-center justify-center relative overflow-hidden">
                <div className="text-white text-center p-8">
                  <div className="text-7xl font-bold text-yellow mb-2">15+</div>
                  <div className="text-2xl font-semibold">Jaar Vakmanschap</div>
                  <div className="text-white/60 mt-2">Elke dag beter worden</div>
                </div>
                <div className="absolute top-4 right-4 w-20 h-20 bg-yellow/10 rounded-full" />
                <div className="absolute bottom-4 left-4 w-12 h-12 bg-white/5 rounded-full" />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-yellow rounded-2xl p-6 shadow-xl">
                <div className="text-anthracite font-bold text-2xl">350+</div>
                <div className="text-anthracite/70 text-sm">Tevreden klanten</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section ref={valuesRef} className="py-20 bg-gray-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={valuesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-anthracite mb-4">Onze Kernwaarden</h2>
            <p className="text-gray-600 text-lg">Wat ons drijft in alles wat we doen.</p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {values.map((value, i) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 40 }}
                  animate={valuesInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: i * 0.15 }}
                  className="bg-white rounded-2xl p-8 text-center shadow-sm border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-deep to-blue-light rounded-2xl flex items-center justify-center mx-auto mb-5">
                    <Icon size={28} className="text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-anthracite mb-3">{value.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{value.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-anthracite mb-4">Onze Geschiedenis</h2>
            <p className="text-gray-600 text-lg">Van eenmanszaak tot een gerenommeerd schildersbedrijf.</p>
          </div>
          <div className="space-y-0">
            {milestones.map((milestone, index) => (
              <TimelineItem key={milestone.year} milestone={milestone} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section ref={teamRef} className="py-20 bg-gray-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={teamInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-anthracite mb-4">Ons Team</h2>
            <p className="text-gray-600 text-lg">Vakkundige professionals die trots zijn op hun werk.</p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 40 }}
                animate={teamInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 text-center group"
              >
                <div className={`h-32 bg-gradient-to-br ${member.color} flex items-center justify-center`}>
                  <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center text-white text-2xl font-bold">
                    {member.initials}
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-anthracite">{member.name}</h3>
                  <p className="text-blue-deep text-sm font-medium mb-1">{member.role}</p>
                  <p className="text-gray-400 text-xs">{member.experience}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
