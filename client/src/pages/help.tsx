import { useState } from 'react';
import { useLocation } from 'wouter';
import { SEOHead } from '@/components/SEOHead';

export default function Help() {
  const [, setLocation] = useLocation();

  return (
    <>
      <SEOHead 
        title="Help & FAQ - Hazel & Hue AI Color Analysis"
        description="Get help with photo requirements, frequently asked questions, and support for Hazel & Hue's AI color analysis service."
        path="/help"
      />
      
      <style>{`
        body {
          margin: 0;
          padding: 0;
          background: #f8f9fa;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
        }

        .upload-container {
          min-height: 100vh;
          background: #f8f9fa;
          padding: 2rem;
        }

        .floating-nav {
          position: absolute;
          top: 2rem;
          right: 2rem;
          display: flex;
          gap: 2rem;
        }

        .nav-link {
          color: #6c757d;
          text-decoration: none;
          font-weight: 500;
          transition: color 0.2s;
        }

        .nav-link:hover {
          color: #495057;
        }

        .main-title {
          font-size: 4rem;
          font-weight: 700;
          text-align: center;
          margin-bottom: 1rem;
          background: linear-gradient(135deg, #b4a5c7, #d4a574, #c7a5b4);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          line-height: 1.1;
        }

        .subtitle {
          font-size: 1.25rem;
          color: #6c757d;
          text-align: center;
          margin-bottom: 3rem;
          max-width: 600px;
          margin-left: auto;
          margin-right: auto;
        }

        .content-box {
          max-width: 800px;
          margin: 0 auto;
          background: white;
          border-radius: 20px;
          padding: 3rem;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
        }

        .help-section {
          margin-bottom: 2rem;
        }

        .help-title {
          font-size: 1.5rem;
          font-weight: 600;
          color: #1f2937;
          margin-bottom: 1rem;
        }

        .help-text {
          color: #6b7280;
          line-height: 1.6;
          margin-bottom: 1rem;
        }

        .help-list {
          list-style: none;
          padding: 0;
        }

        .help-list li {
          color: #6b7280;
          margin-bottom: 0.5rem;
          padding-left: 1rem;
          position: relative;
        }

        .help-list li::before {
          content: "•";
          color: #8b5cf6;
          position: absolute;
          left: 0;
        }

        .faq-item {
          margin-bottom: 1.5rem;
          padding-bottom: 1.5rem;
          border-bottom: 1px solid #e5e7eb;
        }

        .faq-question {
          font-weight: 600;
          color: #1f2937;
          margin-bottom: 0.5rem;
        }

        .faq-answer {
          color: #6b7280;
          line-height: 1.6;
        }
      `}</style>

      <div className="upload-container">
        {/* Floating Navigation */}
        <div className="floating-nav">
          <button 
            onClick={() => setLocation('/homepage')}
            className="nav-link"
            style={{ background: 'none', border: 'none', cursor: 'pointer' }}
          >
            Home
          </button>
          <button 
            onClick={() => setLocation('/about')}
            className="nav-link"
            style={{ background: 'none', border: 'none', cursor: 'pointer' }}
          >
            About
          </button>
          <button 
            onClick={() => setLocation('/terms')}
            className="nav-link"
            style={{ background: 'none', border: 'none', cursor: 'pointer' }}
          >
            Terms
          </button>
        </div>

        {/* Main Content */}
        <div style={{ maxWidth: '1200px', margin: '0 auto', paddingTop: '4rem' }}>
          <h1 className="main-title">
            Help & Support
          </h1>
          
          <p className="subtitle">
            Photo tips and frequently asked questions
          </p>

          <div className="content-box">
            <div className="help-section">
              <h2 className="help-title">Photo Requirements</h2>
              <p className="help-text">
                For the most accurate color analysis results, please follow these guidelines:
              </p>
              <ul className="help-list">
                <li>Take photos in bright, natural daylight near a window</li>
                <li>Avoid flash, artificial lighting, or harsh shadows</li>
                <li>Face should fill most of the frame</li>
                <li>Remove sunglasses, hats, or anything covering your eyes and hair</li>
                <li>Minimal or no makeup for accurate skin tone analysis</li>
                <li>Upload JPEG, PNG, or HEIC files (max 10MB each)</li>
              </ul>
            </div>

            <div className="help-section">
              <h2 className="help-title">Frequently Asked Questions</h2>
              
              <div className="faq-item">
                <div className="faq-question">How accurate is the AI analysis?</div>
                <div className="faq-answer">
                  Our AI is trained on thousands of professional color analyses and achieves high accuracy when provided with quality photos that meet our guidelines.
                </div>
              </div>

              <div className="faq-item">
                <div className="faq-question">How long does it take to get results?</div>
                <div className="faq-answer">
                  Results are typically delivered to your email within 30 seconds to 2 minutes after payment completion.
                </div>
              </div>

              <div className="faq-item">
                <div className="faq-question">What file formats are supported?</div>
                <div className="faq-answer">
                  We accept JPEG, PNG, and HEIC (iPhone) image formats. Maximum file size is 10MB per photo.
                </div>
              </div>

              <div className="faq-item">
                <div className="faq-question">Can I upload photos of multiple people?</div>
                <div className="faq-answer">
                  No, each analysis is for one person only. Photos should contain only the person being analyzed.
                </div>
              </div>

              <div className="faq-item">
                <div className="faq-question">What if I don't receive my results?</div>
                <div className="faq-answer">
                  Check your spam folder first. If you still don't receive results within 10 minutes, contact our support team at support@hazelandhue.com.
                </div>
              </div>

              <div className="faq-item">
                <div className="faq-question">Are refunds available?</div>
                <div className="faq-answer">
                  No, all sales are final due to the instant digital nature of our service. Please review our terms of service for details.
                </div>
              </div>
            </div>

            <div className="help-section">
              <h2 className="help-title">Need More Help?</h2>
              <p className="help-text">
                Contact our support team for additional assistance: <strong>support@hazelandhue.com</strong>
              </p>
              <p className="help-text" style={{ fontSize: '0.875rem' }}>
                Response time: Usually within 24 hours
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}