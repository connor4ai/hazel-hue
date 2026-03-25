import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { BLOG_POSTS } from '../data/blogPosts';

// Featured post is the pillar content
const FEATURED_SLUG = 'what-is-seasonal-color-analysis';

// Category display order
const CATEGORY_ORDER = ['Guides', 'Season Guides', 'Season Comparisons', 'Beauty', 'Style', 'Trends'];

export function BlogList() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const featured = BLOG_POSTS.find((p) => p.slug === FEATURED_SLUG);
  const restPosts = BLOG_POSTS.filter((p) => p.slug !== FEATURED_SLUG);

  // Get categories in display order, then any remaining
  const categories = CATEGORY_ORDER.filter((c) => restPosts.some((p) => p.category === c));
  const remaining = [...new Set(restPosts.map((p) => p.category))].filter((c) => !categories.includes(c));
  const allCategories = [...categories, ...remaining];

  return (
    <div className="mx-auto max-w-5xl px-6 pb-24 pt-32 lg:px-12">
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

      {/* Featured post */}
      {featured && (
        <motion.a
          href={`/blog/${featured.slug}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="group mt-12 block rounded-2xl border border-hazel/10 bg-gradient-to-br from-hazel/5 to-cream-100 p-8 transition-all duration-500 hover:shadow-xl hover:shadow-hazel/10 sm:p-10"
        >
          <div className="flex items-center gap-3">
            <span className="inline-block rounded-full bg-hazel/15 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-hazel">
              Featured
            </span>
            <span className="text-[10px] font-semibold uppercase tracking-wider text-charcoal/25">
              {featured.category}
            </span>
          </div>
          <h2 className="mt-4 font-display text-2xl font-bold leading-snug text-charcoal transition-colors group-hover:text-hazel sm:text-3xl">
            {featured.title}
          </h2>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-charcoal/45">
            {featured.description}
          </p>
          <div className="mt-5 flex items-center gap-3 text-xs text-charcoal/25">
            <time dateTime={featured.publishedAt}>
              {new Date(featured.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
            </time>
            <span className="h-1 w-1 rounded-full bg-charcoal/15" />
            <span>{featured.readTime}</span>
          </div>
        </motion.a>
      )}

      {/* Posts by category */}
      {allCategories.map((category) => {
        const posts = restPosts.filter((p) => p.category === category);
        if (posts.length === 0) return null;
        return (
          <div key={category} className="mt-14">
            <div className="flex items-center gap-3">
              <h2 className="text-xs font-semibold uppercase tracking-[0.15em] text-charcoal/25">
                {category}
              </h2>
              <span className="text-[10px] text-charcoal/15">{posts.length} articles</span>
            </div>
            <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post, i) => (
                <motion.a
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-20px' }}
                  transition={{ delay: i * 0.03, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="group rounded-2xl border border-cream-200 bg-white/50 p-6 transition-all duration-500 hover:border-hazel/20 hover:bg-white/80 hover:shadow-lg hover:shadow-hazel/5"
                >
                  <span className="inline-block rounded-full bg-hazel/10 px-2.5 py-0.5 text-[10px] font-semibold text-hazel">
                    {post.category}
                  </span>
                  <h3 className="mt-3 font-display text-base font-semibold leading-snug text-charcoal transition-colors group-hover:text-hazel line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-charcoal/40 line-clamp-2">
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
        );
      })}
    </div>
  );
}
