import Link from 'next/link'

export default function AboutPage() {
  return (
    <div className="page">
      <div className="container">
        {/* Hero */}
        <div className="page-hero">
          <h1>About TransparentLogbook</h1>
          <p className="hero-description">
            We're on a mission to democratize professional investment thinking for retail investors in India.
          </p>
        </div>

        {/* Mission Statement */}
        <section className="content-section">
          <div className="content-card">
            <h2>Our Mission</h2>
            <p>
              Most investment advice in India focuses on "what to buy" without explaining the "why" and "how."
              We believe retail investors deserve better—they deserve to understand the complete investment
              process, from research to execution to risk management.
            </p>
            <p>
              TransparentLogbook is built on three core principles:
            </p>
            <ul className="principles-list">
              <li>
                <strong>Education First:</strong> Every recommendation comes with detailed rationale,
                teaching you to think like a professional investor.
              </li>
              <li>
                <strong>Complete Transparency:</strong> Our entire portfolio is visible with every
                adjustment documented and explained in real-time.
              </li>
              <li>
                <strong>SEBI Compliance:</strong> Full regulatory compliance ensures your protection
                and our accountability.
              </li>
            </ul>
          </div>
        </section>

        {/* Quick Links */}
        <section className="links-section">
          <h2>Learn More</h2>
          <div className="links-grid">
            <Link href="/about/what-we-do" className="link-card">
              <h3>What We Do</h3>
              <p>
                Learn about our investment philosophy, research framework, and risk management approach.
              </p>
              <span className="link-arrow">→</span>
            </Link>

            <Link href="/about/who-we-cater-to" className="link-card">
              <h3>Who We Cater To</h3>
              <p>
                Discover if TransparentLogbook is right for you. We focus on aspiring strategists
                and engaged novices.
              </p>
              <span className="link-arrow">→</span>
            </Link>

            <Link href="/about/client-reviews" className="link-card">
              <h3>Client Reviews</h3>
              <p>
                Read what our members have to say about their experience with TransparentLogbook.
              </p>
              <span className="link-arrow">→</span>
            </Link>
          </div>
        </section>

        {/* SEBI Registration */}
        <section className="compliance-section">
          <div className="compliance-card">
            <h3>SEBI Registered Investment Advisor</h3>
            <p>
              TransparentLogbook is operated by a SEBI-registered Investment Advisor (RIA), ensuring
              that all advisory services meet regulatory standards for transparency, ethics, and client protection.
            </p>
            <p className="registration-info">
              <strong>SEBI Registration:</strong> [Registration Number]
            </p>
            <p className="disclaimer">
              <em>
                Investment in securities market are subject to market risks. Read all the related
                documents carefully before investing.
              </em>
            </p>
          </div>
        </section>

        {/* CTA */}
        <div className="cta-section">
          <h2>Ready to Get Started?</h2>
          <p>Start your free trial and experience the difference of education-first advisory.</p>
          <Link href="/plans" className="btn btn-primary btn-large">
            Start Free Trial
          </Link>
        </div>
      </div>

      <style jsx>{`
        .page {
          padding: 3rem 0;
        }

        .page-hero {
          text-align: center;
          max-width: 800px;
          margin: 0 auto 4rem;
        }

        .hero-description {
          font-size: 1.25rem;
          line-height: 1.6;
          color: #4b5563;
        }

        .content-section {
          max-width: 800px;
          margin: 0 auto 4rem;
        }

        .content-card {
          background: white;
          padding: 3rem;
          border-radius: 0.75rem;
          box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
        }

        .content-card h2 {
          margin-bottom: 1.5rem;
        }

        .content-card p {
          color: #4b5563;
          line-height: 1.8;
          font-size: 1.0625rem;
          margin-bottom: 1.5rem;
        }

        .principles-list {
          list-style: none;
          padding: 0;
          margin: 2rem 0;
        }

        .principles-list li {
          padding: 1rem;
          background: #f9fafb;
          border-radius: 0.5rem;
          margin-bottom: 1rem;
          line-height: 1.6;
        }

        .principles-list strong {
          color: #2563eb;
          display: block;
          margin-bottom: 0.5rem;
        }

        .links-section {
          max-width: 900px;
          margin: 0 auto 4rem;
        }

        .links-section h2 {
          text-align: center;
          margin-bottom: 2rem;
        }

        .links-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 2rem;
        }

        .link-card {
          background: white;
          padding: 2rem;
          border-radius: 0.75rem;
          box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
          transition: all 0.2s;
          text-decoration: none;
          position: relative;
        }

        .link-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        }

        .link-card h3 {
          color: #111827;
          margin-bottom: 0.75rem;
        }

        .link-card p {
          color: #6b7280;
          font-size: 0.9375rem;
          line-height: 1.6;
          margin-bottom: 1rem;
        }

        .link-arrow {
          color: #2563eb;
          font-size: 1.5rem;
          font-weight: 700;
        }

        .compliance-section {
          max-width: 800px;
          margin: 0 auto 4rem;
        }

        .compliance-card {
          background: #f9fafb;
          border-left: 4px solid #2563eb;
          padding: 2rem;
          border-radius: 0.5rem;
        }

        .compliance-card h3 {
          margin-bottom: 1rem;
          color: #111827;
        }

        .compliance-card p {
          color: #4b5563;
          line-height: 1.6;
          margin-bottom: 1rem;
        }

        .registration-info {
          font-size: 1.0625rem;
          padding: 1rem;
          background: white;
          border-radius: 0.5rem;
          margin: 1.5rem 0;
        }

        .disclaimer {
          font-size: 0.875rem;
          color: #6b7280;
          margin: 0;
        }

        .cta-section {
          text-align: center;
          max-width: 700px;
          margin: 0 auto;
          padding: 3rem;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border-radius: 1rem;
          color: white;
        }

        .cta-section h2 {
          color: white;
          margin-bottom: 1rem;
        }

        .cta-section p {
          font-size: 1.125rem;
          margin-bottom: 2rem;
          opacity: 0.95;
        }

        .btn-large {
          padding: 1rem 2rem;
          font-size: 1.125rem;
        }

        @media (max-width: 768px) {
          .content-card {
            padding: 2rem;
          }

          .links-grid {
            grid-template-columns: 1fr;
          }

          .cta-section {
            padding: 2rem;
          }
        }
      `}</style>
    </div>
  )
}
