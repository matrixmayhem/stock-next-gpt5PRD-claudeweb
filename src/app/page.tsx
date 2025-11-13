import Link from 'next/link'
import { getPayloadClient, getSiteSettings } from '@/lib/payload-client'
import ArticleCard from '@/components/ArticleCard'
import styles from './page.module.css'

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
      <section className={styles.hero}>
        <div className="container">
          <div className={styles.heroContent}>
            <h1 className={styles.heroHeadline}>
              {hero.headline || 'Learn the Why Behind Every Investment Decision'}
            </h1>
            <p className={styles.heroSubheadline}>
              {hero.subheadline ||
                'A transparent, education-first investment advisory for retail investors who want to understand the methodology, not just follow tips.'}
            </p>
            <div className={styles.heroActions}>
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
      <section className={styles.mainSection}>
        <div className="container">
          <div className={styles.contentLayout}>
            {/* Article Feed */}
            <div className={styles.articleFeed}>
              <h2>Latest Insights</h2>

              {articles.length === 0 ? (
                <div className="alert alert-info">
                  <p>
                    <strong>No articles yet.</strong> Articles will appear here once published.
                    Access the admin panel at <Link href="/admin">/admin</Link> to create content.
                  </p>
                </div>
              ) : (
                <div className={styles.articlesGrid}>
                  {articles.map((article: any) => (
                    <ArticleCard key={article.id} article={article} />
                  ))}
                </div>
              )}

              {articles.length > 0 && (
                <div className={styles.viewMore}>
                  <Link href="/weekly-updates" className="btn btn-secondary">
                    View All Articles
                  </Link>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <aside className={styles.sidebar}>
              {/* Portfolio Flash Card */}
              <div className={styles.sidebarCard}>
                <h3>📊 Portfolio Flash</h3>
                <p className={styles.sidebarText}>
                  Get monthly updates on our model portfolio performance, key moves, and market insights.
                </p>
                <Link href="/portfolio" className={styles.sidebarLink}>
                  View Portfolio Logbook →
                </Link>
              </div>

              {/* News Ticker */}
              <div className={styles.sidebarCard}>
                <h3>📰 Quick Takes</h3>
                <p className={styles.sidebarText}>
                  Short market updates and analysis. Stay informed with our rapid-fire insights on market movements.
                </p>
                <div className={styles.newsItems}>
                  <div className={styles.newsItem}>
                    <span className={styles.newsBadge}>Today</span>
                    <p>Market updates coming soon...</p>
                  </div>
                </div>
              </div>

              {/* CTA Card */}
              <div className={`${styles.sidebarCard} ${styles.ctaCard}`}>
                <h3>Start Your Free Trial</h3>
                <p className={styles.sidebarText}>
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
        <section className={styles.testimonialsSection}>
          <div className="container">
            <h2 className={styles.sectionTitle}>What Our Members Say</h2>
            <div className={styles.testimonialsGrid}>
              {testimonials.map((testimonial: any) => (
                <div key={testimonial.id} className={styles.testimonialCard}>
                  {testimonial.rating && (
                    <div className={styles.rating}>
                      {'★'.repeat(testimonial.rating)}{'☆'.repeat(5 - testimonial.rating)}
                    </div>
                  )}
                  <p className={styles.testimonialContent}>"{testimonial.content}"</p>
                  <div className={styles.testimonialAuthor}>
                    <strong>{testimonial.clientName}</strong>
                    {testimonial.clientDesignation && (
                      <span className={styles.authorDesignation}>{testimonial.clientDesignation}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div className={styles.viewMore}>
              <Link href="/about/client-reviews" className="btn btn-outline">
                View All Reviews
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Final CTA Section */}
      <section className={styles.finalCta}>
        <div className="container">
          <div className={styles.ctaContent}>
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
    </div>
  )
}
