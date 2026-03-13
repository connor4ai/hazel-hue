import { BLOG_POSTS } from './data/blogPosts';

export interface RouteMeta {
  path: string;
  title: string;
  description: string;
  canonical: string;
  ogTitle?: string;
  ogDescription?: string;
  ogType?: string;
  structuredData?: object | object[];
}

const STATIC_ROUTES: RouteMeta[] = [
  {
    path: '/',
    title: 'AI Color Analysis Online — Free Seasonal Color Palette | Hazel & Hue',
    description:
      'Get your AI color analysis online for free. Discover your seasonal color palette in under 60 seconds — personalized style, makeup, and hair recommendations powered by AI. Trusted by 2,400+ users.',
    canonical: 'https://hazelandhue.com',
    ogTitle: 'AI Color Analysis Online — Discover Your Season Free | Hazel & Hue',
    ogDescription:
      'Free AI-powered seasonal color analysis. Upload a selfie and get your personalized color palette, style guide, makeup & hair recommendations in under a minute.',
  },
  {
    path: '/blog',
    title: 'Blog — Color Analysis Guides & Tips | Hazel & Hue',
    description:
      'Expert guides on seasonal color analysis, finding your undertone, building a palette-based wardrobe, and more. Learn everything about color analysis from Hazel & Hue.',
    canonical: 'https://hazelandhue.com/blog',
  },
  {
    path: '/privacy',
    title: 'Privacy Policy | Hazel & Hue',
    description:
      'Read the Hazel & Hue privacy policy. Learn how we handle your data, photos, and personal information.',
    canonical: 'https://hazelandhue.com/privacy',
  },
  {
    path: '/terms',
    title: 'Terms of Service | Hazel & Hue',
    description:
      'Read the Hazel & Hue terms of service. Understand the terms and conditions for using our AI color analysis platform.',
    canonical: 'https://hazelandhue.com/terms',
  },
  {
    path: '/analyze',
    title: 'Get Your AI Color Analysis — Free | Hazel & Hue',
    description:
      'Upload a selfie and get your personalized seasonal color palette, style guide, makeup, and hair recommendations in under 60 seconds. Completely free.',
    canonical: 'https://hazelandhue.com/analyze',
  },
];

function getBlogRoutes(): RouteMeta[] {
  return BLOG_POSTS.map((post) => ({
    path: `/blog/${post.slug}`,
    title: `${post.title} | Hazel & Hue`,
    description: post.description,
    canonical: `https://hazelandhue.com/blog/${post.slug}`,
    ogType: 'article',
    structuredData: [
      {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: post.title,
        description: post.description,
        datePublished: post.publishedAt,
        dateModified: post.updatedAt || post.publishedAt,
        author: {
          '@type': 'Organization',
          name: 'Hazel & Hue',
          url: 'https://hazelandhue.com',
        },
        publisher: {
          '@type': 'Organization',
          name: 'Hazel & Hue',
          logo: {
            '@type': 'ImageObject',
            url: 'https://hazelandhue.com/favicon.svg',
          },
        },
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': `https://hazelandhue.com/blog/${post.slug}`,
        },
        keywords: post.keywords.join(', '),
      },
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://hazelandhue.com' },
          { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://hazelandhue.com/blog' },
          {
            '@type': 'ListItem',
            position: 3,
            name: post.title,
            item: `https://hazelandhue.com/blog/${post.slug}`,
          },
        ],
      },
    ],
  }));
}

export function getAllRoutes(): RouteMeta[] {
  return [...STATIC_ROUTES, ...getBlogRoutes()];
}
