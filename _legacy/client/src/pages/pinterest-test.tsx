import { PinterestPreview } from '@/components/PinterestPreview';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useLocation } from 'wouter';

export default function PinterestTest() {
  const [, setLocation] = useLocation();

  const testUrls = [
    'https://www.pinterest.com/HueMatcher/dark-winter-outfits/',
    'https://www.pinterest.com/HueMatcher/true-summer-outfits/',
    'https://www.pinterest.com/HueMatcher/light-summer-outfits/',
    'https://www.pinterest.com/HueMatcher/bright-winter-makeup/'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      {/* Back Button */}
      <button
        onClick={() => setLocation('/')}
        className="mb-6 inline-flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Home</span>
      </button>

      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Pinterest Preview Test
        </h1>
        
        <p className="text-gray-600 text-center mb-8">
          Testing Pinterest board previews with real HueMatcher Pinterest boards
        </p>

        <div className="grid gap-6 md:grid-cols-2">
          {testUrls.map((url, index) => (
            <div key={index} className="bg-white rounded-lg p-4 shadow-sm">
              <h3 className="text-sm font-medium text-gray-700 mb-3">
                Test URL {index + 1}:
              </h3>
              <div className="text-xs text-gray-500 mb-4 font-mono break-all">
                {url}
              </div>
              <PinterestPreview url={url} className="w-full" />
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              How Pinterest Previews Work
            </h2>
            <div className="text-gray-600 space-y-2 text-left max-w-2xl mx-auto">
              <p>• Automatically detects Pinterest board URLs</p>
              <p>• Tries Pinterest's oEmbed API first for authentic data</p>
              <p>• Falls back to parsing URL structure for preview</p>
              <p>• Shows board title, author, and description</p>
              <p>• Includes direct link to view full Pinterest board</p>
              <p>• Mobile-optimized responsive design</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}