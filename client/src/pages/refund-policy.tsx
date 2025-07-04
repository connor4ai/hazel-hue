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
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">1. Our Commitment to Satisfaction</h2>
              <p className="text-gray-700">
                At Hazel & Hue, we stand behind the quality of our AI color analysis service. We want you to be completely satisfied with your results. 
                This refund policy outlines when and how refunds are available.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">2. Satisfaction Guarantee</h2>
              <div className="space-y-3 text-gray-700">
                <p>We offer a <strong>7-day satisfaction guarantee</strong> from the date of your analysis completion.</p>
                <p>You may request a full refund if:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Our AI was unable to process your photos due to technical issues</li>
                  <li>You received incomplete or corrupted analysis results</li>
                  <li>The analysis failed to generate due to system errors</li>
                  <li>You did not receive your results via email within 24 hours</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">3. Refund Eligibility Criteria</h2>
              <div className="space-y-4 text-gray-700">
                <h3 className="text-lg font-medium text-green-700">✓ Eligible for Full Refund:</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Technical failure in processing your analysis</li>
                  <li>System error preventing result generation</li>
                  <li>Non-delivery of results due to our error</li>
                  <li>Duplicate charges or billing errors</li>
                  <li>Service unavailable for extended periods</li>
                </ul>

                <h3 className="text-lg font-medium text-orange-700">△ Case-by-Case Review:</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Dissatisfaction with color recommendations (we'll offer guidance first)</li>
                  <li>Results that don't match personal preferences</li>
                  <li>Quality issues due to poor photo submission</li>
                </ul>

                <h3 className="text-lg font-medium text-red-700">✗ Not Eligible for Refund:</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Change of mind after receiving complete results</li>
                  <li>Disagreement with AI analysis based on personal preference</li>
                  <li>Poor results due to low-quality photo uploads</li>
                  <li>Requests made more than 7 days after completion</li>
                  <li>Use of promotional codes or discounts (unless technical failure)</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">4. Refund Process</h2>
              <div className="space-y-3 text-gray-700">
                <p>To request a refund:</p>
                <ol className="list-decimal pl-6 space-y-2">
                  <li>Contact us at refunds@hazelandhue.com within 7 days</li>
                  <li>Include your order number and reason for the refund request</li>
                  <li>Provide any relevant details about technical issues experienced</li>
                  <li>Our team will review your request within 1-2 business days</li>
                  <li>If approved, refunds are processed within 3-5 business days</li>
                </ol>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">5. Refund Methods</h2>
              <div className="space-y-3 text-gray-700">
                <ul className="list-disc pl-6 space-y-2">
                  <li>Refunds are issued to the original payment method</li>
                  <li>Credit card refunds appear within 3-5 business days</li>
                  <li>PayPal refunds are typically processed within 1-2 business days</li>
                  <li>Bank transfers may take 5-10 business days depending on your bank</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">6. Partial Refunds</h2>
              <p className="text-gray-700">
                In some cases, we may offer partial refunds or service credits. This might apply when you've received 
                some value from the service but experienced issues that impacted the overall experience.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">7. Technical Support First</h2>
              <div className="space-y-3 text-gray-700">
                <p>Before requesting a refund, we encourage you to contact our support team:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>We can often resolve technical issues quickly</li>
                  <li>Our team can provide additional guidance on your results</li>
                  <li>We may be able to reprocess your analysis with better parameters</li>
                  <li>Many concerns can be addressed without requiring a refund</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">8. Promotional Codes and Discounts</h2>
              <div className="space-y-3 text-gray-700">
                <p>Special terms for promotional orders:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Free analyses (100% discount codes) are generally non-refundable</li>
                  <li>Heavily discounted orders may have limited refund eligibility</li>
                  <li>Technical failures are still eligible for refund regardless of discount</li>
                  <li>Each promotional campaign may have specific terms</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">9. Processing Fees</h2>
              <p className="text-gray-700">
                We do not charge processing fees for legitimate refund requests. However, payment processor fees 
                (typically 2.9% + $0.30) are non-refundable as they have already been charged by Stripe.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">10. Dispute Resolution</h2>
              <div className="space-y-3 text-gray-700">
                <p>If you're not satisfied with our refund decision:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>You may escalate to our management team</li>
                  <li>We'll conduct a thorough review of your case</li>
                  <li>You have the right to dispute charges with your credit card company</li>
                  <li>We're committed to fair and reasonable resolutions</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">11. Contact Information</h2>
              <div className="text-gray-700">
                <p>For refund requests or questions about this policy:</p>
                <div className="mt-3 p-4 bg-gray-50 rounded-lg">
                  <p><strong>Refund Department</strong></p>
                  <p>Email: refunds@hazelandhue.com</p>
                  <p>Support: support@hazelandhue.com</p>
                  <p>Response Time: 1-2 business days</p>
                  <p>Business Hours: Monday-Friday, 9 AM - 5 PM EST</p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">12. Policy Updates</h2>
              <p className="text-gray-700">
                We may update this refund policy from time to time. Any changes will be posted on this page with an updated effective date. 
                Changes will not affect refund requests already in progress.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}