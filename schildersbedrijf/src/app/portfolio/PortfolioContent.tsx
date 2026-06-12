"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { MapPin, X, ChevronLeft, ChevronRight } from "lucide-react";
import CTASection from "@/components/CTASection";

const filters = ["Alle", "Binnenschilderwerk", "Buitenschilderwerk", "Zakelijk", "Particulier"];

const projects = [
  {
    id: 1,
    title: "Volledig binnenschilderwerk villa",
    location: "Amsterdam, Noord-Holland",
    type: "Binnenschilderwerk",
    category: ["Binnenschilderwerk", "Particulier"],
    description: "Complete renovatie van een 4-kamervilla inclusief plafonds, wanden, kozijnen en deuren. Kleur: Histor Crispy White.",
    materials: ["Histor Crispy White", "Sikkens Rubbol BL Satura", "Sigma Grondverf"],
    gradient: "from-blue-900 to-blue-600",
  },
  {
    id: 2,
    title: "Gevelrenovatie klassiek herenhuis",
    location: "Utrecht, Utrecht",
    type: "Buitenschilderwerk",
    category: ["Buitenschilderwerk", "Particulier"],
    description: "Volledige gevelrenovatie: schuren, herstellen van houtrot en schilderen met weathershield exterieurverf.",
    materials: ["Dulux Weathershield", "Sikkens Rubbol Exterior", "Polyfilla houtplamuur"],
    gradient: "from-amber-700 to-amber-500",
  },
  {
    id: 3,
    title: "Kantoorruimte spuitwerk 500m²",
    location: "Rotterdam, Zuid-Holland",
    type: "Spuitwerk",
    category: ["Binnenschilderwerk", "Zakelijk"],
    description: "Volledig gespoten kantoor van 500m². Strakke witte wanden en plafonds met professionele airless techniek.",
    materials: ["Flexa AkroFloor", "Sigma S2U Nova", "AkzoNobel primer"],
    gradient: "from-slate-700 to-slate-500",
  },
  {
    id: 4,
    title: "Houtrot reparatie & kozijnschilder",
    location: "Haarlem, Noord-Holland",
    type: "Houtrot Reparatie",
    category: ["Buitenschilderwerk", "Particulier"],
    description: "Uitgebreide houtrot reparatie aan 12 kozijnen, gevolgd door een complete buitenschilderbeurt.",
    materials: ["Owatrol Rot Stop", "Houtepoxy vulmiddel", "Sikkens Rubbol BL Satura"],
    gradient: "from-green-800 to-green-600",
  },
  {
    id: 5,
    title: "Luxe penthouse binnenschilderwerk",
    location: "Den Haag, Zuid-Holland",
    type: "Binnenschilderwerk",
    category: ["Binnenschilderwerk", "Particulier"],
    description: "Hoogwaardige afwerking van een penthouse van 280m² met speciale stucco-decoratieve techniek.",
    materials: ["Farrow & Ball Estate Emulsion", "Histor Stucco Effect", "Tikkurila primer"],
    gradient: "from-purple-800 to-purple-600",
  },
  {
    id: 6,
    title: "Bedrijfspand nieuwe huisstijl",
    location: "Eindhoven, Noord-Brabant",
    type: "Buitenschilderwerk",
    category: ["Buitenschilderwerk", "Zakelijk"],
    description: "Volledig buitenschilderwerk van een bedrijfspand van 2.000m² in de nieuwe corporate huisstijlkleuren.",
    materials: ["Sigma Coatings Industrial", "AkzoNobel Industrial", "Sigma Primer"],
    gradient: "from-indigo-800 to-blue-600",
  },
  {
    id: 7,
    title: "Restaurant interieur renovatie",
    location: "Amsterdam, Noord-Holland",
    type: "Binnenschilderwerk",
    category: ["Binnenschilderwerk", "Zakelijk"],
    description: "Volledige verfsbeurt van een restaurant: van keuken tot eetzaal. Voedselveilige verven gebruikt.",
    materials: ["Histor Food Safe", "Sigma Muurverf Extra Mat", "AkzoNobel Ceiling"],
    gradient: "from-rose-800 to-rose-600",
  },
  {
    id: 8,
    title: "Jaren 30 woning renovatie",
    location: "Leiden, Zuid-Holland",
    type: "Buitenschilderwerk",
    category: ["Buitenschilderwerk", "Particulier"],
    description: "Complete buitenrenovatie van een jaren '30 woning met authentieke kleurstelling en houtrot herstel.",
    materials: ["Sikkens Rubbol Exterior", "Owatrol Rot Stop", "Histor Buitenverf"],
    gradient: "from-teal-800 to-teal-600",
  },
  {
    id: 9,
    title: "Modern appartementencomplex",
    location: "Almere, Flevoland",
    type: "Buitenschilderwerk",
    category: ["Buitenschilderwerk", "Zakelijk"],
    description: "Buitenschilderwerk van 48 appartementen inclusief balkons, gevels en gemeenschappelijke ruimtes.",
    materials: ["Dulux Trade", "Sigma Coatings", "AkzoNobel Primer Plus"],
    gradient: "from-cyan-800 to-cyan-600",
  },
];

type Project = typeof projects[0];

function ProjectModal({ project, onClose, onPrev, onNext }: {
  project: Project;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 lightbox-overlay bg-black/80"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-white rounded-3xl overflow-hidden max-w-3xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Image */}
        <div className={`bg-gradient-to-br ${project.gradient} aspect-video relative flex items-center justify-center`}>
          <div className="text-white/20 text-9xl font-bold select-none">
            {project.id}
          </div>
          <div className="absolute top-4 right-4 flex gap-2">
            <span className="bg-yellow text-anthracite text-xs font-bold px-3 py-1.5 rounded-full">
              {project.type}
            </span>
            <button
              onClick={onClose}
              className="w-8 h-8 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-colors"
            >
              <X size={16} />
            </button>
          </div>
          {/* Prev/Next */}
          <button
            onClick={onPrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-colors"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={onNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-colors"
          >
            <ChevronRight size={20} />
          </button>
          {/* Before/After indicator */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            <div className="bg-white/90 text-anthracite text-xs font-semibold px-3 py-1 rounded-l-full">Voor</div>
            <div className="bg-yellow text-anthracite text-xs font-semibold px-3 py-1 rounded-r-full">Na</div>
          </div>
        </div>

        {/* Content */}
        <div className="p-8">
          <div className="flex items-start justify-between gap-4 mb-4">
            <h2 className="text-2xl font-bold text-anthracite">{project.title}</h2>
          </div>
          <div className="flex items-center gap-2 text-gray-500 text-sm mb-4">
            <MapPin size={16} className="text-blue-deep" />
            {project.location}
          </div>
          <p className="text-gray-600 leading-relaxed mb-6">{project.description}</p>
          <div>
            <h3 className="font-bold text-anthracite mb-3">Gebruikte materialen</h3>
            <div className="flex flex-wrap gap-2">
              {project.materials.map((mat, i) => (
                <span key={i} className="bg-gray-light text-anthracite text-xs font-medium px-3 py-1.5 rounded-lg">
                  {mat}
                </span>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function PortfolioContent() {
  const [activeFilter, setActiveFilter] = useState("Alle");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filtered = activeFilter === "Alle"
    ? projects
    : projects.filter((p) => p.category.includes(activeFilter));

  const currentIndex = selectedProject ? filtered.findIndex((p) => p.id === selectedProject.id) : -1;

  const openPrev = () => {
    if (currentIndex > 0) setSelectedProject(filtered[currentIndex - 1]);
  };
  const openNext = () => {
    if (currentIndex < filtered.length - 1) setSelectedProject(filtered[currentIndex + 1]);
  };

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
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="inline-flex items-center gap-2 bg-yellow/20 border border-yellow/30 text-yellow px-4 py-2 rounded-full text-sm font-medium mb-6">
              350+ voltooide projecten
            </div>
            <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6">
              Ons <span className="text-yellow">Portfolio</span>
            </h1>
            <p className="text-xl text-white/70 max-w-2xl mx-auto">
              Bekijk een selectie van onze mooiste schilderprojecten — van particuliere woningen tot grote bedrijfspanden.
            </p>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" fill="none" preserveAspectRatio="none" className="w-full h-12">
            <path d="M0,30 C360,60 720,0 1080,40 C1260,55 1380,20 1440,30 L1440,60 L0,60 Z" fill="white"/>
          </svg>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-wrap gap-3 justify-center mb-12"
          >
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
                  activeFilter === filter
                    ? "bg-blue-deep text-white shadow-lg shadow-blue-deep/30"
                    : "bg-gray-light text-anthracite hover:bg-gray-medium"
                }`}
              >
                {filter}
              </button>
            ))}
          </motion.div>

          {/* Grid */}
          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filtered.map((project, index) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="group relative rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 cursor-pointer aspect-[4/3]"
                  onClick={() => setSelectedProject(project)}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient}`} />
                  <div className="absolute inset-0 opacity-10"
                    style={{ backgroundImage: "repeating-linear-gradient(45deg, rgba(255,255,255,0.1) 0px, rgba(255,255,255,0.1) 1px, transparent 1px, transparent 10px)" }}
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-yellow text-anthracite text-xs font-bold px-3 py-1.5 rounded-full">
                      {project.type}
                    </span>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-70 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="text-white font-bold text-base mb-1">{project.title}</h3>
                    <div className="flex items-center gap-1.5 text-white/70 text-xs">
                      <MapPin size={12} />
                      {project.location}
                    </div>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="bg-white/20 backdrop-blur-sm rounded-xl px-4 py-2 text-white text-sm font-semibold border border-white/30">
                      Bekijk project
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {filtered.length === 0 && (
            <div className="text-center py-20 text-gray-400">
              Geen projecten gevonden voor dit filter.
            </div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
            onPrev={openPrev}
            onNext={openNext}
          />
        )}
      </AnimatePresence>

      <CTASection />
    </>
  );
}
