import { SEOHead } from '@/components/SEOHead';

export default function RefundPolicyPage() {
  return (
    <div className="min-h-screen bg-cream paper-texture">
      <SEOHead 
        title="Refund Policy | Hazel & Hue - AI Color Analysis"
        description="Our refund policy for AI color analysis services. Learn about eligibility, process, and timelines for refunds and satisfaction guarantees."
        path="/refund-policy"
      />
      
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Refund Policy</h1>
          <p className="text-gray-600 mb-6">Effective Date: July 4, 2025</p>

          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">1. No Refund Policy</h2>
              <p className="text-gray-700">
                At Hazel & Hue, all sales are final. Due to the digital nature of our AI color analysis service and the immediate delivery of personalized results, we do not offer refunds once your analysis has been completed and delivered.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">2. Service Delivery</h2>
              <div className="space-y-3 text-gray-700">
                <p>Once you complete your purchase:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Your photos are immediately processed through our AI system</li>
                  <li>A personalized color analysis report is generated within 30 seconds</li>
                  <li>Results are delivered via email with lifetime access</li>
                  <li>The service is considered fully delivered upon email receipt</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">3. Understanding Our Policy</h2>
              <div className="space-y-3 text-gray-700">
                <p>This policy exists because:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Digital analysis results are delivered immediately and cannot be "returned"</li>
                  <li>Each analysis is personalized and cannot be resold to another customer</li>
                  <li>Processing costs and AI analysis resources are consumed upon delivery</li>
                  <li>Industry standard for digital services with immediate delivery</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">4. Quality Assurance</h2>
              <div className="space-y-3 text-gray-700">
                <p>We ensure service quality through:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Advanced AI algorithms trained on professional color analysis principles</li>
                  <li>Comprehensive photo guidelines for optimal results</li>
                  <li>Detailed analysis reports with 180+ personalized colors</li>
                  <li>Professional makeup and styling recommendations</li>
                  <li>Customer support for questions about your results</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">5. Technical Support</h2>
              <div className="space-y-3 text-gray-700">
                <p>If you experience technical issues:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Contact support@hazelandhue.com for assistance</li>
                  <li>We can help interpret your results and recommendations</li>
                  <li>Our team can provide additional styling guidance</li>
                  <li>Technical delivery issues will be resolved promptly</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">6. Billing and Payment</h2>
              <div className="space-y-3 text-gray-700">
                <p>Payment terms:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>All payments are processed securely through Stripe</li>
                  <li>Billing disputes should be directed to support@hazelandhue.com</li>
                  <li>Unauthorized charges will be investigated and resolved</li>
                  <li>Payment processing fees are non-refundable</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">7. Customer Rights</h2>
              <div className="space-y-3 text-gray-700">
                <p>Your rights include:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Lifetime access to your color analysis results</li>
                  <li>Customer support for questions about your analysis</li>
                  <li>The right to dispute unauthorized charges with your bank</li>
                  <li>Access to accurate and professional color recommendations</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">8. Contact Information</h2>
              <div className="text-gray-700">
                <p>For questions about this policy or technical support:</p>
                <div className="mt-3 p-4 bg-gray-50 rounded-lg">
                  <p><strong>Hazel & Hue Support</strong></p>
                  <p>Email: support@hazelandhue.com</p>
                  <p>Website: hazelandhue.com</p>
                  <p>Response Time: 1-2 business days</p>
                  <p>Business Hours: Monday-Friday, 9 AM - 5 PM EST</p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">9. Policy Updates</h2>
              <p className="text-gray-700">
                We may update this refund policy from time to time. Any changes will be posted on this page with an updated effective date. 
                This policy applies to all purchases made after the effective date listed above.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}