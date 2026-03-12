import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { BLOG_POSTS } from '../data/blogPosts';

export function BlogList() {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Blog — Color Analysis Guides & Tips | Hazel & Hue';
    const link = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (link) link.href = 'https://hazelandhue.com/blog';
    const desc = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (desc) desc.content = 'Expert guides on seasonal color analysis, finding your undertone, building a palette-based wardrobe, and more. Learn everything about color analysis from Hazel & Hue.';
    return () => {
      document.title = 'AI Color Analysis Online — Free Seasonal Color Palette | Hazel & Hue';
      if (link) link.href = 'https://hazelandhue.com';
      if (desc) desc.content = 'Get your AI color analysis online for free. Discover your seasonal color palette in under 60 seconds — personalized style, makeup, and hair recommendations powered by AI. Trusted by 2,400+ users.';
    };
  }, []);

  // Group by category
  const categories = [...new Set(BLOG_POSTS.map((p) => p.category))];

  return (
    <div className="mx-auto max-w-4xl px-6 pb-24 pt-32 lg:px-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-hazel">Blog</p>
        <h1 className="mt-4 font-display text-display-lg font-bold text-charcoal">
          Color analysis guides
        </h1>
        <p className="mt-4 max-w-xl text-lg leading-relaxed text-charcoal/40">
          Everything you need to know about seasonal color analysis — from finding your
          undertone to building a wardrobe that works.
        </p>
      </motion.div>

      {categories.map((category) => (
        <div key={category} className="mt-14">
          <h2 className="text-xs font-semibold uppercase tracking-[0.15em] text-charcoal/25">
            {category}
          </h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            {BLOG_POSTS.filter((p) => p.category === category).map((post, i) => (
              <motion.a
                key={post.slug}
                href={`/blog/${post.slug}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="group rounded-2xl border border-cream-200 bg-white/50 p-6 transition-all duration-500 hover:border-hazel/20 hover:bg-white/80 hover:shadow-lg hover:shadow-hazel/5"
              >
                <span className="inline-block rounded-full bg-hazel/10 px-2.5 py-0.5 text-[10px] font-semibold text-hazel">
                  {post.category}
                </span>
                <h3 className="mt-3 font-display text-lg font-semibold leading-snug text-charcoal transition-colors group-hover:text-hazel">
                  {post.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-charcoal/40 line-clamp-3">
                  {post.description}
                </p>
                <div className="mt-4 flex items-center gap-3 text-xs text-charcoal/25">
                  <time dateTime={post.publishedAt}>
                    {new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </time>
                  <span className="h-1 w-1 rounded-full bg-charcoal/15" />
                  <span>{post.readTime}</span>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
