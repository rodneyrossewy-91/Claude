import type { Metadata } from 'next';
import Hero from '@/components/home/Hero';
import USPs from '@/components/home/USPs';
import ServicesPreview from '@/components/home/ServicesPreview';
import PortfolioPreview from '@/components/home/PortfolioPreview';
import ReviewsSlider from '@/components/home/ReviewsSlider';
import CTASection from '@/components/home/CTASection';

export const metadata: Metadata = {
  title: 'Van der Berg Schilderwerken | Professioneel Schildersbedrijf Amsterdam',
  description: 'Meer dan 15 jaar professioneel schilderwerk. Binnenschilderwerk, buitenschilderwerk, spuitwerk en houtrot reparatie. Gratis offerte aan huis.',
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <USPs />
      <ServicesPreview />
      <PortfolioPreview />
      <ReviewsSlider />
      <CTASection />
    </>
  );
}
