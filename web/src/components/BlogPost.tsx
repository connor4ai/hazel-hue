import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { BLOG_POSTS, type BlogPost as BlogPostType } from '../data/blogPosts';

interface Props {
  post: BlogPostType;
}

export function BlogPost({ post }: Props) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [post]);

  // Get related posts
  const relatedPosts = (post.relatedSlugs || [])
    .map((slug) => BLOG_POSTS.find((p) => p.slug === slug))
    .filter((p): p is BlogPostType => p != null)
    .slice(0, 3);

  // Convert markdown-like content to simple HTML
  const renderContent = (content: string) => {
    const lines = content.trim().split('\n');
    const elements: JSX.Element[] = [];
    let listItems: string[] = [];
    let listType: 'ul' | 'ol' | null = null;
    let key = 0;

    const flushList = () => {
      if (listItems.length > 0 && listType) {
        const Tag = listType;
        elements.push(
          <Tag key={key++} className={listType === 'ul' ? 'list-disc pl-6 space-y-2' : 'list-decimal pl-6 space-y-2'}>
            {listItems.map((item, i) => (
              <li key={i} className="text-charcoal/60 leading-relaxed" dangerouslySetInnerHTML={{ __html: formatInline(item) }} />
            ))}
          </Tag>
        );
        listItems = [];
        listType = null;
      }
    };

    const formatInline = (text: string): string => {
      return text
        .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-hazel underline decoration-hazel/30 underline-offset-2 transition hover:decoration-hazel">$1</a>')
        .replace(/\*\*(.+?)\*\*/g, '<strong class="text-charcoal font-semibold">$1</strong>')
        .replace(/\*(.+?)\*/g, '<em>$1</em>')
        .replace(/`(.+?)`/g, '<code>$1</code>');
    };

    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed) {
        flushList();
        continue;
      }

      // Headings
      if (trimmed.startsWith('### ')) {
        flushList();
        const headingText = trimmed.slice(4);
        const headingId = headingText.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
        elements.push(
          <h3 key={key++} id={headingId} className="mt-8 mb-3 font-display text-lg font-semibold text-charcoal">
            {headingText}
          </h3>
        );
      } else if (trimmed.startsWith('## ')) {
        flushList();
        const headingText = trimmed.slice(3);
        const headingId = headingText.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
        elements.push(
          <h2 key={key++} id={headingId} className="mt-12 mb-4 font-display text-xl font-bold text-charcoal">
            {headingText}
          </h2>
        );
      }
      // List items
      else if (trimmed.startsWith('- ')) {
        if (listType !== 'ul') {
          flushList();
          listType = 'ul';
        }
        listItems.push(trimmed.slice(2));
      } else if (/^\d+\.\s/.test(trimmed)) {
        if (listType !== 'ol') {
          flushList();
          listType = 'ol';
        }
        listItems.push(trimmed.replace(/^\d+\.\s/, ''));
      }
      // Paragraphs
      else {
        flushList();
        elements.push(
          <p
            key={key++}
            className="my-4 leading-relaxed text-charcoal/60"
            dangerouslySetInnerHTML={{ __html: formatInline(trimmed) }}
          />
        );
      }
    }
    flushList();
    return elements;
  };

  return (
    <article className="mx-auto max-w-3xl px-6 pb-24 pt-32 lg:px-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Breadcrumb */}
        <nav className="mb-8 flex items-center gap-2 text-xs text-charcoal/30">
          <a href="/" className="transition hover:text-hazel">Home</a>
          <span>/</span>
          <a href="/blog" className="transition hover:text-hazel">Blog</a>
          <span>/</span>
          <span className="text-charcoal/50">{post.category}</span>
        </nav>

        {/* Header */}
        <div className="mb-10">
          <span className="inline-block rounded-full bg-hazel/10 px-3 py-1 text-xs font-semibold text-hazel">
            {post.category}
          </span>
          <h1 className="mt-4 font-display text-display-lg font-bold text-charcoal text-balance leading-tight">
            {post.title}
          </h1>
          <div className="mt-4 flex items-center gap-4 text-sm text-charcoal/35">
            <time dateTime={post.publishedAt}>
              {new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </time>
            <span className="h-1 w-1 rounded-full bg-charcoal/20" />
            <span>{post.readTime}</span>
          </div>
        </div>

        {/* Content */}
        <div className="prose-hazel">
          {renderContent(post.content)}
        </div>

        {/* CTA */}
        <div className="mt-16 rounded-2xl border border-hazel/10 bg-gradient-to-br from-hazel/5 to-cream-100 p-8 text-center">
          <h3 className="font-display text-xl font-bold text-charcoal">
            Ready to discover your season?
          </h3>
          <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-charcoal/50">
            Upload a selfie and get your complete color analysis — palette, style guide, makeup,
            hair, and more — in under 60 seconds. Completely free.
          </p>
          <a
            href="/analyze"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-charcoal px-8 py-3 text-sm font-semibold text-cream-50 transition-all duration-500 hover:shadow-xl hover:shadow-charcoal/20"
          >
            Get My Colors — Free
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>
        </div>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <div className="mt-16">
            <h3 className="text-xs font-semibold uppercase tracking-[0.15em] text-charcoal/25">
              Keep reading
            </h3>
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              {relatedPosts.map((related) => (
                <a
                  key={related.slug}
                  href={`/blog/${related.slug}`}
                  className="group rounded-xl border border-cream-200 bg-white/50 p-4 transition-all duration-300 hover:border-hazel/20 hover:bg-white/80 hover:shadow-md hover:shadow-hazel/5"
                >
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-hazel/60">
                    {related.category}
                  </span>
                  <h4 className="mt-1.5 text-sm font-semibold leading-snug text-charcoal transition-colors group-hover:text-hazel line-clamp-2">
                    {related.title}
                  </h4>
                  <p className="mt-1.5 text-xs text-charcoal/30">{related.readTime}</p>
                </a>
              ))}
            </div>
          </div>
        )}

        {/* Back link */}
        <div className="mt-12">
          <a
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-medium text-hazel transition hover:text-hazel-600"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M11 17l-5-5m0 0l5-5m-5 5h12" />
            </svg>
            All articles
          </a>
        </div>
      </motion.div>
    </article>
  );
}
