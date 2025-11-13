import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getPayloadClient, formatDate, canAccessPremium } from '@/lib/payload-client'
import { cookies } from 'next/headers'

interface ArticlePageProps {
  params: Promise<{
    slug: string
  }>
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params
  const payload = await getPayloadClient()

  // Get user from session (simplified - in production, use proper auth)
  let user: any = null
  try {
    // This is a placeholder - actual implementation would validate session token
    const cookieStore = await cookies()
    const sessionToken = cookieStore.get('payload-token')
    if (sessionToken) {
      // In real implementation, validate token and get user
      // user = await payload.auth({ headers: { authorization: `Bearer ${sessionToken.value}` } })
    }
  } catch (error) {
    console.log('Could not get user:', error)
  }

  const hasAccess = user ? canAccessPremium(user) : false

  let article: any = null

  try {
    const articlesData = await payload.find({
      collection: 'articles',
      where: {
        slug: {
          equals: slug,
        },
      },
      limit: 1,
    })

    if (articlesData.docs.length === 0) {
      notFound()
    }

    article = articlesData.docs[0]
  } catch (error) {
    console.log('Could not fetch article:', error)
    notFound()
  }

  // Check if article is published
  if (article.status !== 'published') {
    notFound()
  }

  // Determine if user can view full article
  const canViewFull = !article.isPremium || hasAccess

  const typeLabels: Record<string, string> = {
    weekly_update: 'Weekly Update',
    sector_deep_dive: 'Sector Deep Dive',
    derivatives_education: 'Derivatives Education',
    news_analysis: 'News & Analysis',
    portfolio_update: 'Portfolio Update',
  }

  return (
    <div className="article-page">
      <div className="container">
        <article className="article">
          {/* Article Header */}
          <header className="article-header">
            <div className="article-meta">
              <span className="article-type">{typeLabels[article.type] || article.type}</span>
              {article.sector && (
                <span className="sector-badge">{article.sector.name}</span>
              )}
            </div>

            <h1 className="article-title">{article.title}</h1>

            <div className="article-info">
              <span className="article-date">{formatDate(article.publishedAt)}</span>
              {article.author && (
                <span className="article-author">By {article.author.fullName}</span>
              )}
            </div>

            {article.isPremium && (
              <div className="premium-indicator">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/>
                </svg>
                <span>Premium Content</span>
              </div>
            )}
          </header>

          {/* Article Content */}
          <div className="article-body">
            {canViewFull ? (
              <div className="article-content">
                {/* In production, render rich text content properly */}
                <p>{article.excerpt}</p>
                {/* Render article.content here with proper rich text renderer */}
                <div className="content-placeholder">
                  <p><em>Full article content will be rendered here using Payload's rich text renderer.</em></p>
                </div>
              </div>
            ) : (
              <>
                {/* Preview for premium content */}
                <div className="article-preview">
                  <p>{article.excerpt}</p>
                </div>

                {/* Paywall */}
                <div className="paywall">
                  <div className="paywall-content">
                    <div className="lock-icon">
                      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                        <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                      </svg>
                    </div>
                    <h3>Premium Content</h3>
                    <p>
                      This article is available to premium members only. Start your free trial to unlock
                      full access to all premium content, portfolio insights, and member discussions.
                    </p>
                    <div className="paywall-actions">
                      <Link href="/plans" className="btn btn-primary">
                        Start Free Trial
                      </Link>
                      {!user && (
                        <Link href="/login" className="btn btn-outline">
                          Login
                        </Link>
                      )}
                    </div>
                    <p className="paywall-note">
                      1-month free trial • Full access • Cancel anytime
                    </p>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Article Footer */}
          {canViewFull && (
            <footer className="article-footer">
              <div className="social-share">
                <h4>Share this article</h4>
                <div className="share-buttons">
                  <button className="share-btn">Twitter</button>
                  <button className="share-btn">LinkedIn</button>
                  <button className="share-btn">WhatsApp</button>
                </div>
              </div>
            </footer>
          )}
        </article>

        {/* CTA Section */}
        {canViewFull && !user && (
          <div className="cta-section">
            <div className="cta-card">
              <h3>Enjoyed this article?</h3>
              <p>
                Start your free trial to get access to all premium content, portfolio insights,
                and member discussions.
              </p>
              <Link href="/plans" className="btn btn-primary">
                Start Free Trial
              </Link>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        .article-page {
          padding: 3rem 0;
          background: #f9fafb;
        }

        .article {
          background: white;
          border-radius: 0.75rem;
          padding: 3rem;
          box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
          max-width: 800px;
          margin: 0 auto;
        }

        .article-header {
          margin-bottom: 3rem;
          padding-bottom: 2rem;
          border-bottom: 2px solid #e5e7eb;
        }

        .article-meta {
          display: flex;
          gap: 1rem;
          margin-bottom: 1.5rem;
        }

        .article-type {
          font-size: 0.875rem;
          font-weight: 600;
          color: #2563eb;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .sector-badge {
          background: #dbeafe;
          color: #1e40af;
          padding: 0.25rem 0.75rem;
          border-radius: 0.375rem;
          font-size: 0.875rem;
          font-weight: 600;
        }

        .article-title {
          font-size: 2.5rem;
          font-weight: 800;
          line-height: 1.2;
          margin-bottom: 1.5rem;
        }

        .article-info {
          display: flex;
          gap: 1.5rem;
          color: #6b7280;
          font-size: 0.9375rem;
        }

        .article-date {
          font-weight: 600;
        }

        .article-author {
          font-style: italic;
        }

        .premium-indicator {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: #fef3c7;
          color: #92400e;
          padding: 0.5rem 1rem;
          border-radius: 0.5rem;
          font-weight: 600;
          margin-top: 1rem;
        }

        .article-body {
          font-size: 1.125rem;
          line-height: 1.8;
          color: #374151;
        }

        .article-content p {
          margin-bottom: 1.5rem;
        }

        .content-placeholder {
          padding: 2rem;
          background: #f9fafb;
          border-radius: 0.5rem;
          margin: 2rem 0;
          text-align: center;
        }

        .article-preview {
          margin-bottom: 3rem;
        }

        .paywall {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 3rem;
          border-radius: 0.75rem;
          margin: 2rem 0;
        }

        .paywall-content {
          text-align: center;
          max-width: 500px;
          margin: 0 auto;
        }

        .lock-icon {
          margin-bottom: 1.5rem;
          color: rgba(255, 255, 255, 0.9);
        }

        .lock-icon svg {
          width: 48px;
          height: 48px;
        }

        .paywall h3 {
          color: white;
          font-size: 2rem;
          margin-bottom: 1rem;
        }

        .paywall p {
          font-size: 1.125rem;
          line-height: 1.6;
          margin-bottom: 2rem;
          opacity: 0.95;
        }

        .paywall-actions {
          display: flex;
          gap: 1rem;
          justify-content: center;
          margin-bottom: 1rem;
        }

        .paywall-note {
          font-size: 0.9375rem;
          opacity: 0.8;
          margin: 0;
        }

        .article-footer {
          margin-top: 3rem;
          padding-top: 2rem;
          border-top: 2px solid #e5e7eb;
        }

        .social-share h4 {
          margin-bottom: 1rem;
        }

        .share-buttons {
          display: flex;
          gap: 1rem;
        }

        .share-btn {
          padding: 0.5rem 1rem;
          background: #f3f4f6;
          border: none;
          border-radius: 0.5rem;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.2s;
        }

        .share-btn:hover {
          background: #e5e7eb;
        }

        .cta-section {
          margin-top: 3rem;
        }

        .cta-card {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 3rem;
          border-radius: 0.75rem;
          text-align: center;
          max-width: 600px;
          margin: 0 auto;
        }

        .cta-card h3 {
          color: white;
          font-size: 2rem;
          margin-bottom: 1rem;
        }

        .cta-card p {
          font-size: 1.125rem;
          margin-bottom: 2rem;
          opacity: 0.95;
        }

        @media (max-width: 768px) {
          .article {
            padding: 2rem 1.5rem;
          }

          .article-title {
            font-size: 1.75rem;
          }

          .paywall {
            padding: 2rem 1.5rem;
          }

          .paywall-actions {
            flex-direction: column;
          }

          .cta-card {
            padding: 2rem;
          }
        }
      `}</style>
    </div>
  )
}
