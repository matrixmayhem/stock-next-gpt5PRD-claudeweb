import Link from 'next/link'
import { getPayloadClient, getSiteSettings } from '@/lib/payload-client'
import ArticleCard from '@/components/ArticleCard'

export default async function HomePage() {
  const payload = await getPayloadClient()
  let siteSettings: any = null
  let articles: any[] = []
  let testimonials: any[] = []

  try {
    siteSettings = await getSiteSettings()
  } catch (error) {
    console.log('Site settings not configured yet')
  }

  try {
    const articlesData = await payload.find({
      collection: 'articles',
      where: {
        status: {
          equals: 'published',
        },
      },
      sort: '-publishedAt',
      limit: 10,
    })
    articles = articlesData.docs
  } catch (error) {
    console.log('Could not fetch articles:', error)
  }

  try {
    const testimonialsData = await payload.find({
      collection: 'testimonials',
      where: {
        isPublished: {
          equals: true,
        },
      },
      sort: 'order',
      limit: 3,
    })
    testimonials = testimonialsData.docs
  } catch (error) {
    console.log('Could not fetch testimonials:', error)
  }

  const hero = siteSettings?.hero || {}

  return (
    <div>
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-headline">
              {hero.headline || 'Learn the Why Behind Every Investment Decision'}
            </h1>
            <p className="hero-subheadline">
              {hero.subheadline ||
                'A transparent, education-first investment advisory for retail investors who want to understand the methodology, not just follow tips.'}
            </p>
            <div className="hero-actions">
              <Link href="/plans" className="btn btn-primary btn-large">
                {hero.ctaText || 'Start 1-Month Free Trial'}
              </Link>
              <Link href="/about" className="btn btn-outline btn-large">
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="main-section">
        <div className="container">
          <div className="content-layout">
            {/* Article Feed */}
            <div className="article-feed">
              <h2>Latest Insights</h2>

              {articles.length === 0 ? (
                <div className="alert alert-info">
                  <p>
                    <strong>No articles yet.</strong> Articles will appear here once published.
                    Access the admin panel at <Link href="/admin">/admin</Link> to create content.
                  </p>
                </div>
              ) : (
                <div className="articles-grid">
                  {articles.map((article: any) => (
                    <ArticleCard key={article.id} article={article} />
                  ))}
                </div>
              )}

              {articles.length > 0 && (
                <div className="view-more">
                  <Link href="/weekly-updates" className="btn btn-secondary">
                    View All Articles
                  </Link>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <aside className="sidebar">
              {/* Portfolio Flash Card */}
              <div className="sidebar-card">
                <h3>📊 Portfolio Flash</h3>
                <p className="sidebar-text">
                  Get monthly updates on our model portfolio performance, key moves, and market insights.
                </p>
                <Link href="/portfolio" className="sidebar-link">
                  View Portfolio Logbook →
                </Link>
              </div>

              {/* News Ticker */}
              <div className="sidebar-card">
                <h3>📰 Quick Takes</h3>
                <p className="sidebar-text">
                  Short market updates and analysis. Stay informed with our rapid-fire insights on market movements.
                </p>
                <div className="news-items">
                  <div className="news-item">
                    <span className="news-badge">Today</span>
                    <p>Market updates coming soon...</p>
                  </div>
                </div>
              </div>

              {/* CTA Card */}
              <div className="sidebar-card cta-card">
                <h3>Start Your Free Trial</h3>
                <p className="sidebar-text">
                  1-month free trial • Full access • Cancel anytime
                </p>
                <Link href="/plans" className="btn btn-primary" style={{ width: '100%', textAlign: 'center' }}>
                  Get Started
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      {testimonials.length > 0 && (
        <section className="testimonials-section">
          <div className="container">
            <h2 className="section-title">What Our Members Say</h2>
            <div className="testimonials-grid">
              {testimonials.map((testimonial: any) => (
                <div key={testimonial.id} className="testimonial-card">
                  {testimonial.rating && (
                    <div className="rating">
                      {'★'.repeat(testimonial.rating)}{'☆'.repeat(5 - testimonial.rating)}
                    </div>
                  )}
                  <p className="testimonial-content">"{testimonial.content}"</p>
                  <div className="testimonial-author">
                    <strong>{testimonial.clientName}</strong>
                    {testimonial.clientDesignation && (
                      <span className="author-designation">{testimonial.clientDesignation}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div className="view-more">
              <Link href="/about/client-reviews" className="btn btn-outline">
                View All Reviews
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Final CTA Section */}
      <section className="final-cta">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Level Up Your Investment Strategy?</h2>
            <p>
              Join aspiring strategists who are learning to think like professional investors.
              Start your free trial today.
            </p>
            <Link href="/plans" className="btn btn-primary btn-large">
              Start 1-Month Free Trial
            </Link>
          </div>
        </div>
      </section>

      <style jsx>{`
        /* Hero Section */
        .hero {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 5rem 0;
        }

        .hero-content {
          max-width: 800px;
          text-align: center;
          margin: 0 auto;
        }

        .hero-headline {
          font-size: 3rem;
          font-weight: 800;
          margin-bottom: 1.5rem;
          line-height: 1.2;
          color: white;
        }

        .hero-subheadline {
          font-size: 1.25rem;
          line-height: 1.6;
          margin-bottom: 2rem;
          opacity: 0.95;
        }

        .hero-actions {
          display: flex;
          gap: 1rem;
          justify-content: center;
        }

        .btn-large {
          padding: 1rem 2rem;
          font-size: 1.125rem;
        }

        /* Main Section */
        .main-section {
          padding: 4rem 0;
        }

        .content-layout {
          display: grid;
          grid-template-columns: 1fr 350px;
          gap: 3rem;
        }

        .article-feed h2 {
          margin-bottom: 2rem;
        }

        .articles-grid {
          display: grid;
          gap: 2rem;
          margin-bottom: 2rem;
        }

        .view-more {
          text-align: center;
          margin-top: 2rem;
        }

        /* Sidebar */
        .sidebar {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .sidebar-card {
          background: white;
          border-radius: 0.75rem;
          padding: 1.5rem;
          box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
        }

        .sidebar-card h3 {
          margin-bottom: 0.75rem;
          font-size: 1.125rem;
        }

        .sidebar-text {
          font-size: 0.9375rem;
          color: #4b5563;
          line-height: 1.6;
          margin-bottom: 1rem;
        }

        .sidebar-link {
          color: #2563eb;
          font-weight: 600;
          text-decoration: none;
          font-size: 0.9375rem;
        }

        .sidebar-link:hover {
          text-decoration: underline;
        }

        .cta-card {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
        }

        .cta-card h3 {
          color: white;
        }

        .cta-card .sidebar-text {
          color: rgba(255, 255, 255, 0.9);
        }

        .news-items {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .news-item {
          padding: 0.75rem;
          background: #f9fafb;
          border-radius: 0.5rem;
          font-size: 0.875rem;
        }

        .news-badge {
          display: inline-block;
          background: #dbeafe;
          color: #1e40af;
          padding: 0.125rem 0.5rem;
          border-radius: 0.25rem;
          font-size: 0.75rem;
          font-weight: 600;
          margin-bottom: 0.5rem;
        }

        .news-item p {
          margin: 0;
          color: #4b5563;
        }

        /* Testimonials Section */
        .testimonials-section {
          background: #f9fafb;
          padding: 4rem 0;
        }

        .section-title {
          text-align: center;
          margin-bottom: 3rem;
        }

        .testimonials-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
          margin-bottom: 2rem;
        }

        .testimonial-card {
          background: white;
          border-radius: 0.75rem;
          padding: 2rem;
          box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
        }

        .rating {
          color: #f59e0b;
          font-size: 1.25rem;
          margin-bottom: 1rem;
        }

        .testimonial-content {
          font-size: 1rem;
          line-height: 1.6;
          color: #4b5563;
          margin-bottom: 1rem;
          font-style: italic;
        }

        .testimonial-author {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .author-designation {
          font-size: 0.875rem;
          color: #6b7280;
        }

        /* Final CTA */
        .final-cta {
          background: #111827;
          color: white;
          padding: 4rem 0;
        }

        .cta-content {
          max-width: 700px;
          margin: 0 auto;
          text-align: center;
        }

        .cta-content h2 {
          color: white;
          margin-bottom: 1rem;
        }

        .cta-content p {
          font-size: 1.125rem;
          line-height: 1.6;
          margin-bottom: 2rem;
          opacity: 0.9;
        }

        /* Responsive */
        @media (max-width: 968px) {
          .content-layout {
            grid-template-columns: 1fr;
          }

          .sidebar {
            order: -1;
          }

          .hero-headline {
            font-size: 2rem;
          }

          .hero-subheadline {
            font-size: 1.125rem;
          }

          .hero-actions {
            flex-direction: column;
          }

          .btn-large {
            width: 100%;
          }
        }

        @media (max-width: 640px) {
          .hero {
            padding: 3rem 0;
          }

          .main-section {
            padding: 2rem 0;
          }

          .testimonials-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  )
}
