import { SpeedInsights } from '@vercel/speed-insights/react';
import { useEffect, useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { HowItWorks } from './components/HowItWorks';
import { ResultsPreview } from './components/ResultsPreview';
import { SeasonMarquee } from './components/SeasonMarquee';
import { Testimonials } from './components/Testimonials';
import { GetStarted } from './components/GetStarted';
import { FAQ } from './components/FAQ';
import { Footer } from './components/Footer';
import { PrivacyPolicy } from './components/PrivacyPolicy';
import { TermsOfService } from './components/TermsOfService';

function getRoute() {
  const path = window.location.pathname;
  if (path === '/privacy') return 'privacy';
  if (path === '/terms') return 'terms';
  return 'home';
}

export function App() {
  const [route, setRoute] = useState(getRoute);

  useEffect(() => {
    const onPopState = () => setRoute(getRoute());
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  if (route === 'privacy') {
    return (
      <div className="min-h-screen bg-cream-50">
        <Header />
        <PrivacyPolicy />
        <Footer />
        <SpeedInsights />
      </div>
    );
  }

  if (route === 'terms') {
    return (
      <div className="min-h-screen bg-cream-50">
        <Header />
        <TermsOfService />
        <Footer />
        <SpeedInsights />
      </div>
    );
  }

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
