import type { Metadata } from 'next';
import { Star } from 'lucide-react';
import { reviews } from '@/lib/data';
import Link from 'next/link';
import CTASection from '@/components/home/CTASection';

export const metadata: Metadata = {
  title: 'Reviews | Van der Berg Schilderwerken',
  description: 'Lees de ervaringen van onze klanten. Gemiddeld 4.9 sterren uit 127 beoordelingen.',
};

function StarRating({ stars }: { stars: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${stars} van de 5 sterren`}>
      {[1,2,3,4,5].map(i => (
        <Star key={i} size={14} className={i <= stars ? 'text-[#FBBF24] fill-[#FBBF24]' : 'text-gray-300'} aria-hidden="true" />
      ))}
    </div>
  );
}

export default function ReviewsPage() {
  return (
    <>
      <div className="bg-[#1F2937] pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="text-[#FBBF24] text-sm font-semibold tracking-widest uppercase block mb-4">Klantbeoordelingen</span>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-white max-w-3xl">
            Wat onze <span className="text-[#FBBF24]">klanten zeggen</span>
          </h1>
        </div>
      </div>

      {/* Score bar */}
      <section className="py-12 bg-[#1E3A8A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-center gap-12 text-center">
          <div>
            <div className="font-serif text-6xl font-bold text-white">4.9</div>
            <div className="flex gap-1 justify-center mt-2" aria-label="4.9 van de 5 sterren">
              {[1,2,3,4,5].map(i => <Star key={i} size={20} className="text-[#FBBF24] fill-[#FBBF24]" aria-hidden="true" />)}
            </div>
            <div className="text-white/60 text-sm mt-1">Gemiddelde score</div>
          </div>
          <div className="w-px h-16 bg-white/20 hidden md:block" aria-hidden="true" />
          <div>
            <div className="font-serif text-6xl font-bold text-white">127</div>
            <div className="text-white/60 text-sm mt-3">Beoordelingen</div>
          </div>
          <div className="w-px h-16 bg-white/20 hidden md:block" aria-hidden="true" />
          <div>
            <div className="font-serif text-6xl font-bold text-white">98%</div>
            <div className="text-white/60 text-sm mt-3">Tevreden klanten</div>
          </div>
        </div>
      </section>

      {/* Reviews grid */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviews.map(review => (
              <div key={review.id} className="bg-[#F3F4F6] rounded-2xl p-7 hover:shadow-lg transition-shadow border-t-4 border-[#1E3A8A]">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <StarRating stars={review.stars} />
                    <div className="font-bold text-[#1F2937] mt-2">{review.name}</div>
                    <div className="text-[#6B7280] text-xs">{review.city} · {review.werkzaamheden}</div>
                  </div>
                  <div className="text-[#6B7280] text-xs flex-shrink-0">{review.date}</div>
                </div>
                <blockquote className="text-[#6B7280] text-sm leading-relaxed italic">&ldquo;{review.quote}&rdquo;</blockquote>
              </div>
            ))}
          </div>

          {/* Leave a review CTA */}
          <div className="text-center mt-16 p-10 bg-[#F3F4F6] rounded-2xl">
            <h2 className="font-serif text-2xl font-bold text-[#1F2937] mb-3">Laat ook uw beoordeling achter</h2>
            <p className="text-[#6B7280] mb-6">Heeft u recent gebruik gemaakt van onze diensten? Wij stellen uw review zeer op prijs.</p>
            <Link href="/contact" className="inline-flex items-center gap-2 bg-[#FBBF24] text-[#1F2937] font-bold px-6 py-3 rounded-lg hover:bg-[#F59E0B] transition-colors">
              Beoordeling achterlaten
            </Link>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
