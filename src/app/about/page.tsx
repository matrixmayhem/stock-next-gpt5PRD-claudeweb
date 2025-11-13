'use client'

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

      
    </div>
  )
}
