export function PrivacyPolicy() {
  return (
    <div className="mx-auto max-w-3xl px-6 pb-24 pt-32 lg:px-12">
      <h1 className="font-display text-display-lg font-bold text-charcoal">Privacy Policy</h1>
      <p className="mt-4 text-sm text-charcoal/40">Last updated: March 10, 2026</p>

      <div className="mt-10 space-y-8 text-charcoal/60 [&_h2]:mt-10 [&_h2]:font-display [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-charcoal [&_p]:mt-3 [&_p]:leading-relaxed [&_ul]:mt-3 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:leading-relaxed">
        <section>
          <h2>1. Introduction</h2>
          <p>
            Hazel & Hue ("we," "our," or "us") respects your privacy and is committed to protecting your personal data.
            This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our
            mobile application and website (collectively, the "Service").
          </p>
        </section>

        <section>
          <h2>2. Information We Collect</h2>
          <p>We may collect the following types of information:</p>
          <ul>
            <li><strong>Photos you upload:</strong> Selfie images submitted for color analysis. These are processed by our AI and are not stored permanently unless you choose to save your results.</li>
            <li><strong>Account information:</strong> Email address and display name if you create an account.</li>
            <li><strong>Usage data:</strong> Information about how you interact with our Service, including device type, operating system, app version, and analytics data.</li>
            <li><strong>Referral data:</strong> Information about referral links shared and redeemed.</li>
          </ul>
        </section>

        <section>
          <h2>3. How We Use Your Information</h2>
          <p>We use the information we collect to:</p>
          <ul>
            <li>Provide, maintain, and improve our color analysis Service.</li>
            <li>Process your selfie images to generate personalized color palettes and recommendations.</li>
            <li>Communicate with you about your account, updates, and promotional offers (with your consent).</li>
            <li>Monitor and analyze usage trends to improve user experience.</li>
            <li>Detect and prevent fraud, abuse, or security issues.</li>
          </ul>
        </section>

        <section>
          <h2>4. Photo Data & AI Processing</h2>
          <p>
            Your uploaded selfie is processed by our AI model to determine your seasonal color type. We do not use your
            photos for any purpose other than providing your color analysis results. Photos are processed in real-time and
            are not retained on our servers after your analysis is complete, unless you explicitly save your results to your account.
          </p>
        </section>

        <section>
          <h2>5. Data Sharing</h2>
          <p>We do not sell your personal data. We may share information with:</p>
          <ul>
            <li><strong>Service providers:</strong> Third-party vendors who help us operate our Service (e.g., cloud hosting, analytics).</li>
            <li><strong>Legal requirements:</strong> When required by law, regulation, or legal process.</li>
            <li><strong>Business transfers:</strong> In connection with a merger, acquisition, or sale of assets.</li>
          </ul>
        </section>

        <section>
          <h2>6. Data Security</h2>
          <p>
            We implement appropriate technical and organizational measures to protect your personal data. However, no method
            of transmission over the internet or electronic storage is completely secure, and we cannot guarantee absolute security.
          </p>
        </section>

        <section>
          <h2>7. Your Rights</h2>
          <p>Depending on your location, you may have the right to:</p>
          <ul>
            <li>Access the personal data we hold about you.</li>
            <li>Request correction or deletion of your personal data.</li>
            <li>Object to or restrict processing of your personal data.</li>
            <li>Request portability of your personal data.</li>
            <li>Withdraw consent at any time where processing is based on consent.</li>
          </ul>
          <p>To exercise any of these rights, please contact us at <a href="mailto:support@hazelandhue.com" className="text-hazel underline">support@hazelandhue.com</a>.</p>
        </section>

        <section>
          <h2>8. Children's Privacy</h2>
          <p>
            Our Service is not directed to children under 13. We do not knowingly collect personal information from children
            under 13. If you believe we have inadvertently collected such information, please contact us so we can promptly
            delete it.
          </p>
        </section>

        <section>
          <h2>9. Third-Party Analytics</h2>
          <p>
            We use Google Analytics and similar tools to understand how users interact with our Service. These services may
            collect information about your use of the Service and report trends without identifying individual visitors.
            You can opt out of Google Analytics by installing the Google Analytics Opt-out Browser Add-on.
          </p>
        </section>

        <section>
          <h2>10. Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the
            new Privacy Policy on this page and updating the "Last updated" date. Your continued use of the Service after
            changes are posted constitutes your acceptance of the updated policy.
          </p>
        </section>

        <section>
          <h2>11. Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact us at{' '}
            <a href="mailto:support@hazelandhue.com" className="text-hazel underline">support@hazelandhue.com</a>.
          </p>
        </section>
      </div>
    </div>
  );
}
