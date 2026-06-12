"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Star, Quote } from "lucide-react";
import CTASection from "@/components/CTASection";

const reviews = [
  { id: 1, name: "Marianne de Vries", location: "Amsterdam", rating: 5, work: "Binnenschilderwerk", date: "Maart 2024", text: "Geweldig werk geleverd door het team! Onze woning is volledig opgeknapt. Ze waren punctueel, netjes en erg professioneel. Zeker een aanrader!", avatar: "M", color: "from-blue-deep to-blue-light" },
  { id: 2, name: "Peter Janssen", location: "Utrecht", rating: 5, work: "Buitenschilderwerk", date: "Februari 2024", text: "Uitstekende service van begin tot eind. De gevel van ons huis ziet er als nieuw uit. Goede communicatie, nette werkploeg en prachtig eindresultaat.", avatar: "P", color: "from-amber-500 to-yellow" },
  { id: 3, name: "Sandra Bakker", location: "Rotterdam", rating: 5, work: "Spuitwerk", date: "Januari 2024", text: "Het spuitwerk in ons nieuwe kantoor is perfect geworden. Strak, gelijkmatig en binnen de afgesproken tijd klaar. De werknemers waren vriendelijk.", avatar: "S", color: "from-blue-deep to-blue-light" },
  { id: 4, name: "Hans Visser", location: "Haarlem", rating: 4, work: "Houtrot Reparatie", date: "December 2023", text: "SchilderPro heeft de houtrot aan onze kozijnen vakkundig gerepareerd. Eerlijk advies over wat wel en niet nodig was. Kwaliteitsbedrijf.", avatar: "H", color: "from-amber-500 to-yellow" },
  { id: 5, name: "Inge Smits", location: "Den Haag", rating: 5, work: "Binnenschilderwerk", date: "November 2023", text: "Wat een heerlijk team! Snel, nauwkeurig en het resultaat overtrof onze verwachtingen. De kleuradviezen waren geweldig. Top bedrijf!", avatar: "I", color: "from-blue-deep to-blue-light" },
  { id: 6, name: "Robert Kooij", location: "Eindhoven", rating: 5, work: "Buitenschilderwerk", date: "Oktober 2023", text: "Fantastisch resultaat voor ons bedrijfspand. De nieuwe huisstijlkleuren zijn prachtig aangebracht. Professioneel, snel en netjes.", avatar: "R", color: "from-amber-500 to-yellow" },
  { id: 7, name: "Lisa van Dijk", location: "Leiden", rating: 5, work: "Binnenschilderwerk", date: "September 2023", text: "Al het binnenschilderwerk is perfect uitgevoerd. Ze kwamen precies op tijd, werkten netjes en het eindresultaat is prachtig. Echt super tevreden!", avatar: "L", color: "from-blue-deep to-blue-light" },
  { id: 8, name: "Kees Meijer", location: "Alkmaar", rating: 4, work: "Buitenschilderwerk", date: "Augustus 2023", text: "Goed schilderbedrijf met vakkundige mensen. Het buitenwerk is mooi geworden en ze hebben goed meegedacht over de kleurkeuze.", avatar: "K", color: "from-amber-500 to-yellow" },
  { id: 9, name: "Annemarie Boer", location: "Groningen", rating: 5, work: "Spuitwerk", date: "Juli 2023", text: "Het spuitwerk is echt van een ongelooflijke kwaliteit. Super strakke afwerking, vriendelijk personeel en scherpe prijs. Aanrader!", avatar: "A", color: "from-blue-deep to-blue-light" },
];

const ratingBreakdown = [
  { stars: 5, count: 287, pct: 82 },
  { stars: 4, count: 49, pct: 14 },
  { stars: 3, count: 10, pct: 3 },
  { stars: 2, count: 3, pct: 1 },
  { stars: 1, count: 1, pct: 0 },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <Star key={s} size={16} className={s <= rating ? "text-yellow fill-yellow" : "text-gray-300"} />
      ))}
    </div>
  );
}

function ReviewCard({ review, index }: { review: typeof reviews[0]; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: (index % 3) * 0.1 }}
      className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 relative"
    >
      <div className="absolute top-5 right-5 opacity-5">
        <Quote size={40} className="text-blue-deep" />
      </div>

      <div className="flex items-start gap-4 mb-4">
        <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${review.color} flex items-center justify-center text-white font-bold text-lg flex-shrink-0`}>
          {review.avatar}
        </div>
        <div>
          <h3 className="font-bold text-anthracite text-sm">{review.name}</h3>
          <p className="text-gray-500 text-xs">{review.location} · {review.work}</p>
          <StarRating rating={review.rating} />
        </div>
        <div className="ml-auto">
          <span className="text-gray-400 text-xs">{review.date}</span>
        </div>
      </div>

      <p className="text-gray-600 text-sm leading-relaxed">"{review.text}"</p>
    </motion.div>
  );
}

export default function ReviewsContent() {
  const statsRef = useRef(null);
  const isInView = useInView(statsRef, { once: true, margin: "-100px" });

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
              Wat onze klanten zeggen
            </div>
            <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6">
              Klant<span className="text-yellow">reviews</span>
            </h1>
            <p className="text-xl text-white/70 max-w-2xl mx-auto">
              Wij zijn trots op de beoordelingen van onze klanten. Lees wat zij van SchilderPro vinden.
            </p>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" fill="none" preserveAspectRatio="none" className="w-full h-12">
            <path d="M0,30 C360,60 720,0 1080,40 C1260,55 1380,20 1440,30 L1440,60 L0,60 Z" fill="white"/>
          </svg>
        </div>
      </section>

      {/* Stats */}
      <section ref={statsRef} className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-br from-gray-light to-white rounded-3xl p-8 lg:p-12 border border-gray-100"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Score */}
              <div className="text-center lg:text-left">
                <div className="text-8xl font-bold text-anthracite mb-2">9.2</div>
                <div className="flex justify-center lg:justify-start gap-1 mb-3">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} size={28} className="text-yellow fill-yellow" />
                  ))}
                </div>
                <p className="text-gray-500">Gebaseerd op 350+ beoordelingen</p>
              </div>

              {/* Breakdown */}
              <div className="space-y-3">
                {ratingBreakdown.map((item) => (
                  <div key={item.stars} className="flex items-center gap-3">
                    <span className="text-sm text-gray-600 w-12 text-right">{item.stars} ster</span>
                    <div className="flex-1 bg-gray-200 rounded-full h-2.5 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={isInView ? { width: `${item.pct}%` } : {}}
                        transition={{ duration: 0.8, delay: (5 - item.stars) * 0.1 }}
                        className="h-full rounded-full bg-yellow"
                      />
                    </div>
                    <span className="text-sm text-gray-500 w-8">{item.pct}%</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* All reviews */}
      <section className="py-16 bg-gray-light pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviews.map((review, index) => (
              <ReviewCard key={review.id} review={review} index={index} />
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
