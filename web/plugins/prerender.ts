import { type Plugin } from 'vite';
import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { getAllRoutes, type RouteMeta } from '../src/seo-routes';

/**
 * Vite plugin that generates pre-rendered HTML files for each route at build time.
 * Each file gets unique <title>, meta description, canonical URL, OpenGraph tags,
 * Twitter Card tags, and structured data baked into the HTML.
 *
 * The JS bundle still hydrates on the client for SPA navigation.
 */
export function prerenderPlugin(): Plugin {
  let outDir: string;

  return {
    name: 'prerender-seo',
    apply: 'build',

    configResolved(config) {
      outDir = config.build.outDir;
    },

    closeBundle() {
      const templatePath = join(outDir, 'index.html');
      const template = readFileSync(templatePath, 'utf-8');
      const routes = getAllRoutes();

      console.log(`\n[prerender] Generating ${routes.length} static pages...`);

      for (const route of routes) {
        const html = injectMeta(template, route);
        const filePath =
          route.path === '/'
            ? join(outDir, 'index.html')
            : join(outDir, route.path, 'index.html');

        mkdirSync(dirname(filePath), { recursive: true });
        writeFileSync(filePath, html, 'utf-8');
      }

      console.log(`[prerender] Done. ${routes.length} pages written to ${outDir}/\n`);
    },
  };
}

function injectMeta(template: string, route: RouteMeta): string {
  let html = template;

  // Replace <title>
  html = html.replace(
    /<title>[^<]*<\/title>/,
    `<title>${escapeHtml(route.title)}</title>`,
  );

  // Replace meta description
  html = html.replace(
    /<meta name="description" content="[^"]*"/,
    `<meta name="description" content="${escapeAttr(route.description)}"`,
  );

  // Replace canonical
  html = html.replace(
    /<link rel="canonical" href="[^"]*"/,
    `<link rel="canonical" href="${escapeAttr(route.canonical)}"`,
  );

  // Replace OpenGraph tags
  const ogTitle = route.ogTitle || route.title;
  const ogDesc = route.ogDescription || route.description;
  const ogType = route.ogType || 'website';

  html = html.replace(
    /<meta property="og:title" content="[^"]*"/,
    `<meta property="og:title" content="${escapeAttr(ogTitle)}"`,
  );
  html = html.replace(
    /<meta property="og:description" content="[^"]*"/,
    `<meta property="og:description" content="${escapeAttr(ogDesc)}"`,
  );
  html = html.replace(
    /<meta property="og:type" content="[^"]*"/,
    `<meta property="og:type" content="${escapeAttr(ogType)}"`,
  );
  html = html.replace(
    /<meta property="og:url" content="[^"]*"/,
    `<meta property="og:url" content="${escapeAttr(route.canonical)}"`,
  );

  // Replace Twitter Card tags
  html = html.replace(
    /<meta name="twitter:title" content="[^"]*"/,
    `<meta name="twitter:title" content="${escapeAttr(ogTitle)}"`,
  );
  html = html.replace(
    /<meta name="twitter:description" content="[^"]*"/,
    `<meta name="twitter:description" content="${escapeAttr(ogDesc)}"`,
  );

  // Replace hreflang alternates
  html = html.replace(
    /<link rel="alternate" hreflang="en" href="[^"]*"/,
    `<link rel="alternate" hreflang="en" href="${escapeAttr(route.canonical)}"`,
  );
  html = html.replace(
    /<link rel="alternate" hreflang="x-default" href="[^"]*"/,
    `<link rel="alternate" hreflang="x-default" href="${escapeAttr(route.canonical)}"`,
  );

  // Inject route-specific structured data (before </head>)
  if (route.structuredData) {
    const jsonLd = `\n    <!-- Route-specific structured data -->\n    <script type="application/ld+json">\n    ${JSON.stringify(route.structuredData)}\n    </script>`;
    html = html.replace('</head>', `${jsonLd}\n  </head>`);
  }

  return html;
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function escapeAttr(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}
