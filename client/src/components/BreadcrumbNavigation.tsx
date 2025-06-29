import { ChevronRight, Home } from 'lucide-react';
import { Link } from 'wouter';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbNavigationProps {
  items: BreadcrumbItem[];
}

export function BreadcrumbNavigation({ items }: BreadcrumbNavigationProps) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://hazelandhue.com/"
      },
      ...items.map((item, index) => ({
        "@type": "ListItem",
        "position": index + 2,
        "name": item.label,
        "item": item.href ? `https://hazelandhue.com${item.href}` : undefined
      }))
    ]
  };

  return (
    <>
      {/* Structured Data for Breadcrumbs */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      
      {/* Visual Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="flex items-center space-x-2 text-sm text-gray-600 mb-6">
        <Link href="/" className="flex items-center hover:text-gray-900 transition-colors">
          <Home className="w-4 h-4 mr-1" />
          <span>Home</span>
        </Link>
        
        {items.map((item, index) => (
          <div key={index} className="flex items-center space-x-2">
            <ChevronRight className="w-4 h-4 text-gray-400" />
            {item.href ? (
              <Link href={item.href} className="hover:text-gray-900 transition-colors">
                {item.label}
              </Link>
            ) : (
              <span className="text-gray-900 font-medium">{item.label}</span>
            )}
          </div>
        ))}
      </nav>
    </>
  );
}