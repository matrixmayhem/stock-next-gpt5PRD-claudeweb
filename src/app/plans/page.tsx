'use client'

import Link from 'next/link'
import { getSiteSettings } from '@/lib/payload-client'

export default async function PlansPage() {
  let siteSettings: any = null

  try {
    siteSettings = await getSiteSettings()
  } catch (error) {
    console.log('Site settings not configured yet')
  }

  const trial = siteSettings?.trial || {}
  const pricing = siteSettings?.pricing || {}

  return (
    <div className="page">
      <div className="container">
        {/* Hero */}
        <div className="page-hero">
          <h1>Start Your Free Trial</h1>
          <p className="hero-description">
            Get full access to all premium content, portfolio insights, and member discussions.
            No credit card required for the trial period.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="pricing-section">
          <div className="pricing-card featured">
            <div className="popular-badge">Most Popular</div>
            <h2>1-Month Free Trial</h2>
            <div className="price">
              <span className="price-amount">₹0</span>
              <span className="price-period">for first month</span>
            </div>
            <p className="plan-description">
              Try TransparentLogbook risk-free. Full access to everything for 30 days.
            </p>

            <ul className="features-list">
              <li>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                All premium articles and deep dives
              </li>
              <li>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                Complete portfolio logbook access
              </li>
              <li>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                Participate in member discussions
              </li>
              <li>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                Weekly market updates
              </li>
              <li>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                Derivatives education content
              </li>
              <li>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                Cancel anytime
              </li>
            </ul>

            <Link href="/register" className="btn btn-primary btn-large">
              Start Free Trial
            </Link>

            <p className="plan-note">
              After trial: ₹{pricing.monthlyPrice || 999}/month or ₹{pricing.annualPrice || 9999}/year
            </p>
          </div>

          <div className="pricing-info">
            <h3>After Your Free Trial</h3>
            <div className="pricing-options">
              <div className="pricing-option">
                <div className="option-header">
                  <h4>Monthly</h4>
                  <div className="option-price">
                    <span className="amount">₹{pricing.monthlyPrice || 999}</span>
                    <span className="period">/month</span>
                  </div>
                </div>
                <p>Billed monthly. Cancel anytime.</p>
              </div>

              <div className="pricing-option featured">
                <div className="save-badge">Save 17%</div>
                <div className="option-header">
                  <h4>Annual</h4>
                  <div className="option-price">
                    <span className="amount">₹{pricing.annualPrice || 9999}</span>
                    <span className="period">/year</span>
                  </div>
                </div>
                <p>
                  Equivalent to ₹{Math.round((pricing.annualPrice || 9999) / 12)}/month. Best value.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div className="faq-section">
          <h2>Frequently Asked Questions</h2>

          <details className="faq-item">
            <summary>What happens after the free trial?</summary>
            <p>
              After your 30-day free trial, you'll be prompted to choose a subscription plan.
              You can select monthly or annual billing. If you don't wish to continue, simply
              don't activate a paid subscription.
            </p>
          </details>

          <details className="faq-item">
            <summary>Is KYC required for the trial?</summary>
            <p>
              Yes, as per SEBI RIA regulations, we require KYC verification before providing
              investment advisory services, including during the trial period. This is a quick
              online process using your PAN card.
            </p>
          </details>

          <details className="faq-item">
            <summary>Can I cancel my subscription?</summary>
            <p>
              Yes, you can cancel your subscription at any time from your account dashboard.
              You'll continue to have access until the end of your current billing period.
            </p>
          </details>

          <details className="faq-item">
            <summary>What payment methods do you accept?</summary>
            <p>
              We accept all major credit cards, debit cards, UPI, and net banking through our
              secure payment processor Stripe.
            </p>
          </details>

          <details className="faq-item">
            <summary>Do you offer refunds?</summary>
            <p>
              Please refer to our <Link href="/legal/refund">Refund Policy</Link> for detailed
              information on refunds and cancellations.
            </p>
          </details>
        </div>

        {/* CTA */}
        <div className="final-cta">
          <h2>Ready to Get Started?</h2>
          <p>Join aspiring strategists learning to think like professional investors.</p>
          <Link href="/register" className="btn btn-primary btn-large">
            Start Your Free Trial
          </Link>
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

        .pricing-section {
          max-width: 900px;
          margin: 0 auto 4rem;
          display: grid;
          gap: 3rem;
        }

        .pricing-card {
          background: white;
          border-radius: 1rem;
          padding: 3rem;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
          text-align: center;
          position: relative;
        }

        .pricing-card.featured {
          border: 3px solid #2563eb;
        }

        .popular-badge {
          position: absolute;
          top: -1rem;
          left: 50%;
          transform: translateX(-50%);
          background: #2563eb;
          color: white;
          padding: 0.5rem 1.5rem;
          border-radius: 2rem;
          font-weight: 700;
          font-size: 0.875rem;
        }

        .pricing-card h2 {
          margin-bottom: 1rem;
        }

        .price {
          margin-bottom: 1.5rem;
        }

        .price-amount {
          font-size: 3.5rem;
          font-weight: 800;
          color: #111827;
          display: block;
        }

        .price-period {
          font-size: 1.125rem;
          color: #6b7280;
        }

        .plan-description {
          color: #4b5563;
          font-size: 1.125rem;
          margin-bottom: 2rem;
        }

        .features-list {
          list-style: none;
          padding: 0;
          margin: 2rem 0;
          text-align: left;
        }

        .features-list li {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.75rem 0;
          color: #374151;
        }

        .features-list svg {
          color: #10b981;
          flex-shrink: 0;
        }

        .btn-large {
          padding: 1rem 2rem;
          font-size: 1.125rem;
          width: 100%;
        }

        .plan-note {
          margin-top: 1rem;
          color: #6b7280;
          font-size: 0.9375rem;
        }

        .pricing-info h3 {
          text-align: center;
          margin-bottom: 2rem;
        }

        .pricing-options {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 2rem;
        }

        .pricing-option {
          background: white;
          padding: 2rem;
          border-radius: 0.75rem;
          box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
          position: relative;
        }

        .pricing-option.featured {
          border: 2px solid #2563eb;
        }

        .save-badge {
          position: absolute;
          top: -0.75rem;
          right: 1rem;
          background: #10b981;
          color: white;
          padding: 0.375rem 0.75rem;
          border-radius: 0.375rem;
          font-size: 0.75rem;
          font-weight: 700;
        }

        .option-header {
          margin-bottom: 1rem;
          padding-bottom: 1rem;
          border-bottom: 1px solid #e5e7eb;
        }

        .option-price {
          margin-top: 0.5rem;
        }

        .option-price .amount {
          font-size: 2rem;
          font-weight: 700;
        }

        .option-price .period {
          color: #6b7280;
          font-size: 0.9375rem;
        }

        .pricing-option p {
          color: #6b7280;
          font-size: 0.9375rem;
          margin: 0;
        }

        .faq-section {
          max-width: 800px;
          margin: 0 auto 4rem;
        }

        .faq-section h2 {
          text-align: center;
          margin-bottom: 2rem;
        }

        .faq-item {
          background: white;
          border-radius: 0.5rem;
          margin-bottom: 1rem;
          box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
        }

        .faq-item summary {
          padding: 1.5rem;
          cursor: pointer;
          font-weight: 600;
          list-style: none;
        }

        .faq-item summary::-webkit-details-marker {
          display: none;
        }

        .faq-item p {
          padding: 0 1.5rem 1.5rem;
          color: #4b5563;
          line-height: 1.6;
          margin: 0;
        }

        .final-cta {
          text-align: center;
          background: white;
          padding: 4rem 2rem;
          border-radius: 1rem;
          max-width: 700px;
          margin: 0 auto;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        }

        .final-cta h2 {
          margin-bottom: 1rem;
        }

        .final-cta p {
          font-size: 1.125rem;
          color: #4b5563;
          margin-bottom: 2rem;
        }

        @media (max-width: 768px) {
          .pricing-options {
            grid-template-columns: 1fr;
          }

          .price-amount {
            font-size: 2.5rem;
          }
        }
      `}</style>
    </div>
  )
}
