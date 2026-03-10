import { SpeedInsights } from '@vercel/speed-insights/react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { HowItWorks } from './components/HowItWorks';
import { ResultsPreview } from './components/ResultsPreview';
import { SeasonMarquee } from './components/SeasonMarquee';
import { Testimonials } from './components/Testimonials';
import { GetStarted } from './components/GetStarted';
import { FAQ } from './components/FAQ';
import { Footer } from './components/Footer';

export function App() {
  return (
    <div className="min-h-screen overflow-hidden">
      <Header />
      <main>
        <Hero />
        <SeasonMarquee />
        <HowItWorks />
        <ResultsPreview />
        <Testimonials />
        <GetStarted />
        <FAQ />
      </main>
      <Footer />
      <SpeedInsights />
    </div>
  );
}
