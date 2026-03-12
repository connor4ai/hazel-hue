import { SpeedInsights } from '@vercel/speed-insights/react';
import { useCallback, useEffect, useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { HowItWorks } from './components/HowItWorks';
import { ResultsPreview } from './components/ResultsPreview';
import { SeasonMarquee } from './components/SeasonMarquee';
import { GetStarted } from './components/GetStarted';
import { FAQ } from './components/FAQ';
import { Testimonials } from './components/Testimonials';
import { Footer } from './components/Footer';
import { PrivacyPolicy } from './components/PrivacyPolicy';
import { TermsOfService } from './components/TermsOfService';
import { AnalysisPage } from './components/AnalysisPage';
import { BlogList } from './components/BlogList';
import { BlogPost } from './components/BlogPost';
import { BLOG_POSTS } from './data/blogPosts';

type Route = { page: 'home' } | { page: 'privacy' } | { page: 'terms' } | { page: 'analyze' } | { page: 'blog' } | { page: 'blog-post'; slug: string };

function getRoute(): Route {
  const path = window.location.pathname;
  if (path === '/privacy') return { page: 'privacy' };
  if (path === '/terms') return { page: 'terms' };
  if (path === '/analyze') return { page: 'analyze' };
  if (path === '/blog') return { page: 'blog' };
  if (path.startsWith('/blog/')) {
    const slug = path.slice(6);
    return { page: 'blog-post', slug };
  }
  return { page: 'home' };
}

/** Simple client-side navigation without a router library */
export function navigate(to: string) {
  window.history.pushState({}, '', to);
  window.dispatchEvent(new PopStateEvent('popstate'));
}

export function App() {
  const [route, setRoute] = useState<Route>(getRoute);

  useEffect(() => {
    const onPopState = () => setRoute(getRoute());
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  // Intercept internal link clicks for SPA navigation
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement).closest('a');
      if (!anchor) return;
      const href = anchor.getAttribute('href');
      if (!href || href.startsWith('http') || href.startsWith('mailto:')) return;
      if (anchor.getAttribute('target') === '_blank') return;

      // Handle anchor links — if not on home page, navigate home first then scroll
      if (href.startsWith('#')) {
        if (window.location.pathname !== '/') {
          e.preventDefault();
          navigate('/');
          // Wait for home page to render, then scroll to the section
          requestAnimationFrame(() => {
            setTimeout(() => {
              const el = document.querySelector(href);
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }, 100);
          });
        }
        return;
      }

      e.preventDefault();
      navigate(href);
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);

  const handleGetStarted = useCallback(() => {
    navigate('/analyze');
  }, []);

  if (route.page === 'analyze') {
    return (
      <div className="min-h-screen">
        <Header onGetStarted={handleGetStarted} />
        <AnalysisPage />
        <SpeedInsights />
      </div>
    );
  }

  if (route.page === 'privacy') {
    return (
      <div className="min-h-screen bg-cream-50">
        <Header onGetStarted={handleGetStarted} />
        <PrivacyPolicy />
        <Footer />
        <SpeedInsights />
      </div>
    );
  }

  if (route.page === 'terms') {
    return (
      <div className="min-h-screen bg-cream-50">
        <Header onGetStarted={handleGetStarted} />
        <TermsOfService />
        <Footer />
        <SpeedInsights />
      </div>
    );
  }

  if (route.page === 'blog') {
    return (
      <div className="min-h-screen bg-cream-50">
        <Header onGetStarted={handleGetStarted} />
        <BlogList />
        <Footer />
        <SpeedInsights />
      </div>
    );
  }

  if (route.page === 'blog-post') {
    const post = BLOG_POSTS.find((p) => p.slug === route.slug);
    if (!post) {
      // Redirect to blog index if post not found
      navigate('/blog');
      return null;
    }
    return (
      <div className="min-h-screen bg-cream-50">
        <Header onGetStarted={handleGetStarted} />
        <BlogPost post={post} />
        <Footer />
        <SpeedInsights />
      </div>
    );
  }

  return (
    <div className="min-h-screen overflow-hidden">
      <Header onGetStarted={handleGetStarted} />
      <main id="main-content">
        <Hero onGetStarted={handleGetStarted} />
        <SeasonMarquee />
        <HowItWorks />
        <ResultsPreview />
        <GetStarted onGetStarted={handleGetStarted} />
        <Testimonials />
        <FAQ />
      </main>
      <Footer />
      <SpeedInsights />
    </div>
  );
}
