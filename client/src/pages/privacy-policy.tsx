import { SEOHead } from '@/components/SEOHead';

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-cream paper-texture">
      <SEOHead 
        title="Privacy Policy | Hazel & Hue - AI Color Analysis"
        description="Our privacy policy explains how we protect your personal information and photos during AI color analysis. Learn about our data collection and security practices."
        path="/privacy-policy"
      />
      
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Privacy Policy</h1>
          <p className="text-gray-600 mb-6">Effective Date: July 4, 2025</p>

          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">1. Information We Collect</h2>
              <div className="space-y-4 text-gray-700">
                <h3 className="text-lg font-medium">Photos and Images</h3>
                <p>We collect the photos you upload for color analysis purposes. These images are processed using AI technology to determine your seasonal color palette.</p>
                
                <h3 className="text-lg font-medium">Contact Information</h3>
                <p>We collect your email address to send your color analysis results and communicate about your order.</p>
                
                <h3 className="text-lg font-medium">Payment Information</h3>
                <p>Payment processing is handled securely by Stripe. We do not store your credit card information on our servers.</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">2. How We Use Your Information</h2>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Process your uploaded photos through our AI color analysis system</li>
                <li>Generate personalized color palettes and recommendations</li>
                <li>Send your analysis results via email</li>
                <li>Process payments and maintain order records</li>
                <li>Improve our AI analysis algorithms (anonymized data only)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">3. Data Security</h2>
              <div className="space-y-3 text-gray-700">
                <p>We implement industry-standard security measures to protect your personal information:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>SSL encryption for all data transmission</li>
                  <li>Secure cloud storage with access controls</li>
                  <li>Regular security audits and updates</li>
                  <li>Limited access to personal data on a need-to-know basis</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">4. Photo Retention and Deletion</h2>
              <div className="space-y-3 text-gray-700">
                <p>Your uploaded photos are:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Processed immediately for color analysis</li>
                  <li>Stored securely for up to 30 days to allow for customer service</li>
                  <li>Automatically deleted after 30 days unless you request earlier deletion</li>
                  <li>Never shared with third parties or used for marketing purposes</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">5. Third-Party Services</h2>
              <div className="space-y-3 text-gray-700">
                <p>We use the following trusted third-party services:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>OpenAI:</strong> For AI-powered color analysis processing</li>
                  <li><strong>Stripe:</strong> For secure payment processing</li>
                  <li><strong>SendGrid:</strong> For email delivery of results</li>
                  <li><strong>Replit:</strong> For secure cloud hosting and infrastructure</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">6. Your Rights</h2>
              <div className="space-y-3 text-gray-700">
                <p>You have the right to:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Request deletion of your photos and personal data</li>
                  <li>Access information about how your data is processed</li>
                  <li>Opt out of marketing communications</li>
                  <li>Request correction of any inaccurate information</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">7. Cookies and Analytics</h2>
              <p className="text-gray-700">
                We use cookies and analytics tools to improve website functionality and understand how our service is used. 
                You can control cookie settings through your browser preferences.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">8. Children's Privacy</h2>
              <p className="text-gray-700">
                Our service is not intended for children under 13. We do not knowingly collect personal information from children under 13. 
                If you believe we have collected information from a child under 13, please contact us immediately.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">9. Changes to This Policy</h2>
              <p className="text-gray-700">
                We may update this privacy policy from time to time. Any changes will be posted on this page with an updated effective date. 
                We encourage you to review this policy periodically.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">10. Contact Us</h2>
              <div className="text-gray-700">
                <p>If you have any questions about this privacy policy, please contact us:</p>
                <div className="mt-3 p-4 bg-gray-50 rounded-lg">
                  <p><strong>Hazel & Hue LLC</strong></p>
                  <p>Email: privacy@hazelandhue.com</p>
                  <p>Website: hazelandhue.com</p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}