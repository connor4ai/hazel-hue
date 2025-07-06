import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  trackPhotoUpload, 
  trackPaymentInitiated, 
  trackConversion, 
  trackAnalysisComplete,
  trackFunnelStep,
  getUTMParams,
  setUTMData
} from '@/lib/utm-analytics';

export default function UTMTest() {
  useEffect(() => {
    // Simulate UTM parameters for testing
    const testUTMParams = new URLSearchParams('?utm_source=reddit&utm_medium=cpc&utm_campaign=color_analysis_ads&utm_term=ai_color_analysis&utm_content=reddit_ad_01');
    
    // Initialize UTM tracking with test data
    setUTMData({
      source: testUTMParams.get('utm_source') || '',
      medium: testUTMParams.get('utm_medium') || '',
      campaign: testUTMParams.get('utm_campaign') || '',
      term: testUTMParams.get('utm_term') || '',
      content: testUTMParams.get('utm_content') || ''
    });
  }, []);

  const testPhotoUpload = () => {
    trackPhotoUpload(3); // 3 photos
    console.log('Tracked photo upload event');
  };

  const testPaymentInitiated = () => {
    trackPaymentInitiated(29.00);
    console.log('Tracked payment initiated event');
  };

  const testConversion = () => {
    trackConversion('test_payment_123', 29.00);
    console.log('Tracked conversion event');
  };

  const testAnalysisComplete = () => {
    trackAnalysisComplete('True Winter', 'test_order_123');
    console.log('Tracked analysis complete event');
  };

  const testFunnelStep = () => {
    trackFunnelStep('test_step', { custom_data: 'test_value' });
    console.log('Tracked funnel step event');
  };

  const getCurrentUTMData = () => {
    const utmData = getUTMParams();
    console.log('Current UTM Data:', utmData);
    alert('Check console for UTM data');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream via-warm-gray-50 to-terracotta-50 p-6">
      <div className="max-w-4xl mx-auto">
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">UTM Analytics Testing Dashboard</CardTitle>
            <p className="text-center text-gray-600">Test all UTM tracking functionality</p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Photo Upload Tracking</CardTitle>
                </CardHeader>
                <CardContent>
                  <Button onClick={testPhotoUpload} className="w-full">
                    Test Photo Upload Event
                  </Button>
                  <p className="text-sm text-gray-600 mt-2">
                    Simulates tracking when user uploads photos
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Payment Initiated</CardTitle>
                </CardHeader>
                <CardContent>
                  <Button onClick={testPaymentInitiated} className="w-full">
                    Test Payment Initiated Event
                  </Button>
                  <p className="text-sm text-gray-600 mt-2">
                    Simulates tracking when payment process starts
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Conversion Tracking</CardTitle>
                </CardHeader>
                <CardContent>
                  <Button onClick={testConversion} className="w-full">
                    Test Conversion Event
                  </Button>
                  <p className="text-sm text-gray-600 mt-2">
                    Simulates tracking when payment is completed
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Analysis Complete</CardTitle>
                </CardHeader>
                <CardContent>
                  <Button onClick={testAnalysisComplete} className="w-full">
                    Test Analysis Complete Event
                  </Button>
                  <p className="text-sm text-gray-600 mt-2">
                    Simulates tracking when AI analysis finishes
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Funnel Step</CardTitle>
                </CardHeader>
                <CardContent>
                  <Button onClick={testFunnelStep} className="w-full">
                    Test Funnel Step Event
                  </Button>
                  <p className="text-sm text-gray-600 mt-2">
                    Simulates tracking custom funnel events
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">UTM Data Check</CardTitle>
                </CardHeader>
                <CardContent>
                  <Button onClick={getCurrentUTMData} className="w-full">
                    Get Current UTM Data
                  </Button>
                  <p className="text-sm text-gray-600 mt-2">
                    View current UTM parameters in console
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="mt-8">
              <h3 className="text-lg font-semibold mb-4">Test UTM Parameters</h3>
              <div className="bg-gray-100 p-4 rounded-lg">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                  <div><Badge variant="outline">Source:</Badge> reddit</div>
                  <div><Badge variant="outline">Medium:</Badge> cpc</div>
                  <div><Badge variant="outline">Campaign:</Badge> color_analysis_ads</div>
                  <div><Badge variant="outline">Term:</Badge> ai_color_analysis</div>
                  <div><Badge variant="outline">Content:</Badge> reddit_ad_01</div>
                </div>
              </div>
            </div>

            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h4 className="font-semibold text-blue-900 mb-2">How to Test:</h4>
              <ol className="text-sm text-blue-800 space-y-1">
                <li>1. Open browser developer tools (F12)</li>
                <li>2. Go to Console tab</li>
                <li>3. Click any test button above</li>
                <li>4. Check console for event tracking logs</li>
                <li>5. Check Google Analytics Real-Time reports</li>
              </ol>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}