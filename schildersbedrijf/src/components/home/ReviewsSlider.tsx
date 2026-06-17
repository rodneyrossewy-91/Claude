'use client';
import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import SectionHeading from '@/components/shared/SectionHeading';
import { reviews } from '@/lib/data';

function StarRating({ stars }: { stars: number }) {
  return (
    <div className="flex gap-1" aria-label={`${stars} van de 5 sterren`}>
      {[1,2,3,4,5].map(i => (
        <Star key={i} size={16} className={i <= stars ? 'text-[#FBBF24] fill-[#FBBF24]' : 'text-gray-300'} aria-hidden="true" />
      ))}
    </div>
  );
}

export default function ReviewsSlider() {
  const [current, setCurrent] = useState(0);
  const prefersReduced = useReducedMotion();
  const displayReviews = reviews.slice(0, 5);

  const next = useCallback(() => setCurrent(c => (c + 1) % displayReviews.length), [displayReviews.length]);
  const prev = () => setCurrent(c => (c - 1 + displayReviews.length) % displayReviews.length);

  useEffect(() => {
    if (prefersReduced) return;
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next, prefersReduced]);

  return (
    <section className="py-20 md:py-28 bg-[#F3F4F6]" aria-labelledby="reviews-heading">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading id="reviews-heading" label="Klantreviews" title="Wat onze klanten zeggen" subtitle="Lees de ervaringen van onze tevreden klanten." centered />

        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={prefersReduced ? {} : { opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={prefersReduced ? {} : { opacity: 0, x: -40 }}
              transition={{ duration: 0.4 }}
              className="bg-white rounded-2xl p-10 shadow-lg text-center"
              role="group"
              aria-label={`Review ${current + 1} van ${displayReviews.length}`}
            >
              <div className="flex justify-center mb-4">
                <StarRating stars={displayReviews[current].stars} />
              </div>
              <blockquote className="font-serif text-xl md:text-2xl text-[#1F2937] italic leading-relaxed mb-8">
                &ldquo;{displayReviews[current].quote}&rdquo;
              </blockquote>
              <div className="font-semibold text-[#1F2937]">{displayReviews[current].name}</div>
              <div className="text-[#6B7280] text-sm mt-1">{displayReviews[current].city} · {displayReviews[current].werkzaamheden}</div>
            </motion.div>
          </AnimatePresence>

          <button onClick={prev} aria-label="Vorige review" className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-[#1F2937] hover:bg-[#1E3A8A] hover:text-white transition-colors cursor-pointer">
            <ChevronLeft size={20} aria-hidden="true" />
          </button>
          <button onClick={next} aria-label="Volgende review" className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-[#1F2937] hover:bg-[#1E3A8A] hover:text-white transition-colors cursor-pointer">
            <ChevronRight size={20} aria-hidden="true" />
          </button>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-8" role="tablist" aria-label="Review navigatie">
          {displayReviews.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              role="tab"
              aria-selected={i === current}
              aria-label={`Ga naar review ${i + 1}`}
              className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${i === current ? 'w-8 bg-[#1E3A8A]' : 'w-2 bg-gray-300 hover:bg-gray-400'}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
