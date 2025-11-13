export default function ContactPage() {
  return (
    <div className="page">
      <div className="container">
        {/* Hero */}
        <div className="page-hero">
          <h1>Contact Us</h1>
          <p className="hero-description">
            Have questions? We're here to help. Reach out to us and we'll get back to you as soon as possible.
          </p>
        </div>

        <div className="contact-layout">
          {/* Contact Form */}
          <div className="form-section">
            <h2>Send Us a Message</h2>
            <form className="contact-form">
              <div className="form-group">
                <label htmlFor="name">Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  placeholder="Your full name"
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  placeholder="your@email.com"
                />
              </div>

              <div className="form-group">
                <label htmlFor="subject">Subject *</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  required
                  placeholder="What is this about?"
                />
              </div>

              <div className="form-group">
                <label htmlFor="message">Message *</label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  required
                  placeholder="Tell us more..."
                ></textarea>
              </div>

              <button type="submit" className="btn btn-primary btn-large">
                Send Message
              </button>

              <p className="form-note">
                * Required fields. We'll respond within 1-2 business days.
              </p>
            </form>
          </div>

          {/* Contact Info */}
          <div className="info-section">
            <div className="info-card">
              <h3>Business Address</h3>
              <p>
                [Your Business Address]<br />
                [City, State, PIN Code]<br />
                India
              </p>
            </div>

            <div className="info-card">
              <h3>Email</h3>
              <p>
                <strong>General Inquiries:</strong><br />
                info@transparentlogbook.com
              </p>
              <p>
                <strong>Support:</strong><br />
                support@transparentlogbook.com
              </p>
            </div>

            <div className="info-card">
              <h3>Office Hours</h3>
              <p>
                Monday - Friday<br />
                9:00 AM - 6:00 PM IST
              </p>
            </div>

            <div className="info-card grievance">
              <h3>Grievance Redressal</h3>
              <p>
                For complaints and grievances, please contact:
              </p>
              <p>
                <strong>Grievance Officer:</strong><br />
                [Officer Name]<br />
                grievance@transparentlogbook.com<br />
                [Phone Number]
              </p>
              <p className="note">
                As per SEBI regulations, complaints will be acknowledged within 2 days
                and resolved within 30 days.
              </p>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="faq-section">
          <h2>Quick Answers</h2>
          <div className="faq-grid">
            <div className="faq-card">
              <h4>How do I start my free trial?</h4>
              <p>
                Visit our <a href="/plans">Plans page</a> and click "Start Free Trial".
                You'll need to complete KYC verification before accessing premium content.
              </p>
            </div>

            <div className="faq-card">
              <h4>Do you provide personalized advice?</h4>
              <p>
                We provide a model portfolio and educational content. All members see the same
                investment ideas and rationale. We do not provide individualized advice.
              </p>
            </div>

            <div className="faq-card">
              <h4>How is KYC done?</h4>
              <p>
                KYC is completed online through our SEBI-approved KRA provider. You'll need
                your PAN card and a few minutes to complete the process.
              </p>
            </div>

            <div className="faq-card">
              <h4>What if I have a complaint?</h4>
              <p>
                Please contact our Grievance Officer using the details above. All complaints
                are taken seriously and will be resolved as per SEBI guidelines.
              </p>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .page {
          padding: 3rem 0;
          background: #f9fafb;
        }

        .page-hero {
          text-align: center;
          max-width: 700px;
          margin: 0 auto 4rem;
        }

        .hero-description {
          font-size: 1.125rem;
          line-height: 1.6;
          color: #4b5563;
        }

        .contact-layout {
          max-width: 1100px;
          margin: 0 auto 4rem;
          display: grid;
          grid-template-columns: 1.5fr 1fr;
          gap: 3rem;
        }

        .form-section h2 {
          margin-bottom: 2rem;
        }

        .contact-form {
          background: white;
          padding: 2rem;
          border-radius: 0.75rem;
          box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
        }

        .form-group {
          margin-bottom: 1.5rem;
        }

        label {
          display: block;
          font-weight: 600;
          margin-bottom: 0.5rem;
          color: #374151;
        }

        input,
        textarea {
          width: 100%;
          padding: 0.75rem 1rem;
          border: 2px solid #e5e7eb;
          border-radius: 0.5rem;
          font-size: 1rem;
          font-family: inherit;
          transition: border-color 0.2s;
        }

        input:focus,
        textarea:focus {
          outline: none;
          border-color: #2563eb;
        }

        textarea {
          resize: vertical;
        }

        .btn-large {
          width: 100%;
          padding: 1rem;
          font-size: 1.125rem;
        }

        .form-note {
          margin-top: 1rem;
          font-size: 0.875rem;
          color: #6b7280;
          text-align: center;
        }

        .info-section {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .info-card {
          background: white;
          padding: 1.5rem;
          border-radius: 0.75rem;
          box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
        }

        .info-card h3 {
          margin-bottom: 1rem;
          color: #111827;
        }

        .info-card p {
          color: #4b5563;
          line-height: 1.6;
          margin-bottom: 0.75rem;
        }

        .info-card p:last-child {
          margin-bottom: 0;
        }

        .info-card.grievance {
          border-left: 4px solid #ef4444;
        }

        .info-card .note {
          font-size: 0.875rem;
          color: #6b7280;
          font-style: italic;
          margin-top: 1rem;
        }

        .faq-section {
          max-width: 1100px;
          margin: 0 auto;
        }

        .faq-section h2 {
          text-align: center;
          margin-bottom: 2rem;
        }

        .faq-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 2rem;
        }

        .faq-card {
          background: white;
          padding: 2rem;
          border-radius: 0.75rem;
          box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
        }

        .faq-card h4 {
          color: #111827;
          margin-bottom: 0.75rem;
        }

        .faq-card p {
          color: #4b5563;
          font-size: 0.9375rem;
          line-height: 1.6;
          margin: 0;
        }

        .faq-card a {
          color: #2563eb;
          text-decoration: underline;
        }

        @media (max-width: 968px) {
          .contact-layout {
            grid-template-columns: 1fr;
          }

          .info-section {
            order: -1;
          }
        }

        @media (max-width: 640px) {
          .faq-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  )
}
