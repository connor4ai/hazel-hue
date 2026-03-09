import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ResultsPreview } from './components/ResultsPreview';
import { Testimonials } from './components/Testimonials';
import { Pricing } from './components/Pricing';
import { FAQ } from './components/FAQ';
import { Footer } from './components/Footer';

export function App() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <ResultsPreview />
        <Testimonials />
        <Pricing />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
}
