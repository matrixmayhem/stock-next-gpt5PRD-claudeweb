
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

      
    </div>
  )
}
