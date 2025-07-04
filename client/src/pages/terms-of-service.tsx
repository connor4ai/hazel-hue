import { SEOHead } from '@/components/SEOHead';

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-cream paper-texture">
      <SEOHead 
        title="Terms of Service | Hazel & Hue - AI Color Analysis"
        description="Terms and conditions for using Hazel & Hue AI color analysis service. Learn about our service terms, user responsibilities, and policies."
        path="/terms-of-service"
      />
      
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Terms of Service</h1>
          <p className="text-gray-600 mb-6">Effective Date: July 4, 2025</p>

          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">1. Acceptance of Terms</h2>
              <p className="text-gray-700">
                By accessing and using Hazel & Hue's AI color analysis service, you accept and agree to be bound by the terms and provision of this agreement. 
                If you do not agree to abide by the above, please do not use this service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">2. Service Description</h2>
              <div className="space-y-3 text-gray-700">
                <p>Hazel & Hue provides AI-powered seasonal color analysis services that include:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Analysis of uploaded photos to determine seasonal color type</li>
                  <li>Personalized color palette recommendations (180+ colors)</li>
                  <li>Makeup and style guidance based on analysis results</li>
                  <li>Detailed PDF reports with comprehensive recommendations</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">3. User Responsibilities</h2>
              <div className="space-y-3 text-gray-700">
                <p>When using our service, you agree to:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Provide accurate photos that clearly show your natural features</li>
                  <li>Only upload photos of yourself or with explicit consent from the subject</li>
                  <li>Not upload inappropriate, offensive, or copyrighted content</li>
                  <li>Use the service for personal, non-commercial purposes only</li>
                  <li>Provide accurate contact information for result delivery</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">4. Payment Terms</h2>
              <div className="space-y-3 text-gray-700">
                <ul className="list-disc pl-6 space-y-2">
                  <li>Our color analysis service costs $29.00 USD per analysis</li>
                  <li>Payment is processed securely through Stripe</li>
                  <li>All sales are final unless otherwise stated in our refund policy</li>
                  <li>Prices are subject to change with notice</li>
                  <li>Promotional codes may have specific terms and expiration dates</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">5. Service Limitations</h2>
              <div className="space-y-3 text-gray-700">
                <p>Please understand that our AI color analysis:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Provides style guidance based on color theory principles</li>
                  <li>Results may vary based on photo quality and lighting conditions</li>
                  <li>Is not a substitute for professional color consultation</li>
                  <li>May not account for personal preferences or lifestyle factors</li>
                  <li>Requires clear, high-quality photos for optimal accuracy</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">6. Intellectual Property</h2>
              <div className="space-y-3 text-gray-700">
                <ul className="list-disc pl-6 space-y-2">
                  <li>All content on our website is owned by Hazel & Hue LLC</li>
                  <li>You retain ownership of photos you upload</li>
                  <li>Your analysis results are provided for personal use only</li>
                  <li>You may not redistribute or resell our analysis content</li>
                  <li>Our AI algorithms and methodologies are proprietary</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">7. Privacy and Data Protection</h2>
              <p className="text-gray-700">
                Your privacy is important to us. Please review our Privacy Policy to understand how we collect, use, and protect your personal information. 
                By using our service, you consent to the data practices described in our Privacy Policy.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">8. Disclaimers</h2>
              <div className="space-y-3 text-gray-700">
                <p>Our service is provided "as is" without warranties of any kind. We disclaim:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Guarantees of specific results or satisfaction</li>
                  <li>Responsibility for decisions made based on our recommendations</li>
                  <li>Liability for technical issues or service interruptions</li>
                  <li>Accuracy claims beyond the scope of AI technology capabilities</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">9. Limitation of Liability</h2>
              <p className="text-gray-700">
                In no event shall Hazel & Hue LLC be liable for any indirect, incidental, special, consequential, or punitive damages, 
                including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your use of the service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">10. Service Availability</h2>
              <div className="space-y-3 text-gray-700">
                <ul className="list-disc pl-6 space-y-2">
                  <li>We strive to maintain 99.9% service uptime</li>
                  <li>Maintenance windows may temporarily affect service availability</li>
                  <li>We reserve the right to modify or discontinue the service with notice</li>
                  <li>Force majeure events may impact service delivery</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">11. Termination</h2>
              <p className="text-gray-700">
                We may terminate or suspend access to our service immediately, without prior notice or liability, 
                for any reason whatsoever, including without limitation if you breach the Terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">12. Governing Law</h2>
              <p className="text-gray-700">
                These Terms shall be interpreted and governed by the laws of the United States. 
                Any disputes shall be resolved in the appropriate courts having jurisdiction.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">13. Changes to Terms</h2>
              <p className="text-gray-700">
                We reserve the right to modify or replace these Terms at any time. If a revision is material, 
                we will try to provide at least 30 days notice prior to any new terms taking effect.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">14. Contact Information</h2>
              <div className="text-gray-700">
                <p>If you have any questions about these Terms, please contact us:</p>
                <div className="mt-3 p-4 bg-gray-50 rounded-lg">
                  <p><strong>Hazel & Hue LLC</strong></p>
                  <p>Email: legal@hazelandhue.com</p>
                  <p>Website: hazelandhue.com</p>
                  <p>Address: Online Platform, Worldwide</p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}