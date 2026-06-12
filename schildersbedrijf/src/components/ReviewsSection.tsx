"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";

const reviews = [
  {
    id: 1,
    name: "Marianne de Vries",
    location: "Amsterdam",
    rating: 5,
    work: "Binnenschilderwerk",
    text: "Geweldig werk geleverd door het team van SchilderPro! Onze woning is volledig opgeknapt en het resultaat is prachtig. Ze waren punctueel, netjes en erg professioneel. Zeker een aanrader!",
    avatar: "M",
  },
  {
    id: 2,
    name: "Peter Janssen",
    location: "Utrecht",
    rating: 5,
    work: "Buitenschilderwerk",
    text: "Uitstekende service van begin tot eind. De gevel van ons huis ziet er als nieuw uit. Goede communicatie, nette werkploeg en prachtig eindresultaat. Wij zijn meer dan tevreden!",
    avatar: "P",
  },
  {
    id: 3,
    name: "Sandra Bakker",
    location: "Rotterdam",
    rating: 5,
    work: "Spuitwerk",
    text: "Het spuitwerk in ons nieuwe kantoor is perfect geworden. Strak, gelijkmatig en binnen de afgesproken tijd klaar. De werknemers waren vriendelijk en hebben alles netjes opgeruimd.",
    avatar: "S",
  },
  {
    id: 4,
    name: "Hans Visser",
    location: "Haarlem",
    rating: 4,
    work: "Houtrot Reparatie",
    text: "SchilderPro heeft de houtrot aan onze kozijnen vakkundig gerepareerd en daarna prachtig geschilderd. Eerlijk advies over wat wel en niet nodig was. Kwaliteitsbedrijf.",
    avatar: "H",
  },
  {
    id: 5,
    name: "Inge Smits",
    location: "Den Haag",
    rating: 5,
    work: "Binnenschilderwerk",
    text: "Wat een heerlijk team! Snel, nauwkeurig en het resultaat overtrof onze verwachtingen. De kleuradvies die zij gaven was geweldig en de uitvoering was vlekkeloos. Top bedrijf!",
    avatar: "I",
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          size={18}
          className={star <= rating ? "text-yellow fill-yellow" : "text-gray-300"}
        />
      ))}
    </div>
  );
}

export default function ReviewsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((c) => (c === 0 ? reviews.length - 1 : c - 1));
  const next = () => setCurrent((c) => (c === reviews.length - 1 ? 0 : c + 1));

  const review = reviews[current];

  return (
    <section className="py-24 bg-gray-light relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-1/2 left-0 w-32 h-64 bg-blue-deep/5 rounded-r-full transform -translate-y-1/2" />
      <div className="absolute top-1/2 right-0 w-32 h-64 bg-yellow/10 rounded-l-full transform -translate-y-1/2" />

      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 text-blue-deep text-sm font-semibold uppercase tracking-wider mb-4">
            <div className="w-8 h-0.5 bg-yellow" />
            Klantreviews
            <div className="w-8 h-0.5 bg-yellow" />
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-anthracite mb-4">
            Wat Onze Klanten <span className="text-blue-deep">Zeggen</span>
          </h2>

          {/* Overall rating */}
          <div className="flex items-center justify-center gap-3 mt-6">
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star key={s} size={24} className="text-yellow fill-yellow" />
              ))}
            </div>
            <span className="text-3xl font-bold text-anthracite">9.2</span>
            <span className="text-gray-500">/ 10 · gebaseerd op 350+ reviews</span>
          </div>
        </motion.div>

        {/* Slider */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-4xl mx-auto"
        >
          <div className="relative bg-white rounded-3xl shadow-xl p-8 lg:p-12">
            {/* Quote icon */}
            <div className="absolute top-8 right-8 opacity-10">
              <Quote size={80} className="text-blue-deep" />
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={review.id}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-deep to-blue-light flex items-center justify-center text-white text-xl font-bold flex-shrink-0">
                    {review.avatar}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-anthracite">{review.name}</h3>
                    <p className="text-gray-500 text-sm">{review.location} · {review.work}</p>
                    <StarRating rating={review.rating} />
                  </div>
                </div>

                <p className="text-gray-600 text-lg leading-relaxed italic">
                  &quot;{review.text}&quot;
                </p>
              </motion.div>
            </AnimatePresence>

            {/* Navigation */}
            <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-100">
              <div className="flex gap-2">
                {reviews.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrent(i)}
                    className={`rounded-full transition-all duration-200 ${
                      i === current ? "w-8 h-2.5 bg-blue-deep" : "w-2.5 h-2.5 bg-gray-300 hover:bg-gray-400"
                    }`}
                    aria-label={`Review ${i + 1}`}
                  />
                ))}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={prev}
                  className="w-10 h-10 rounded-full border border-gray-200 hover:border-blue-deep hover:bg-blue-deep hover:text-white text-anthracite flex items-center justify-center transition-all duration-200"
                  aria-label="Vorige"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  onClick={next}
                  className="w-10 h-10 rounded-full border border-gray-200 hover:border-blue-deep hover:bg-blue-deep hover:text-white text-anthracite flex items-center justify-center transition-all duration-200"
                  aria-label="Volgende"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
