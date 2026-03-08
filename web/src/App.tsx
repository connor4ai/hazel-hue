import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Pricing } from './components/Pricing';
import { Footer } from './components/Footer';

export function App() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <Pricing />
      </main>
      <Footer />
    </div>
  );
}
