import Link from 'next/link'
import { formatDate } from '@/lib/payload-client'

interface ArticleCardProps {
  article: {
    id: string
    slug: string
    title: string
    excerpt: string
    type: string
    isPremium: boolean
    publishedAt: string
    author?: {
      fullName: string
    }
    sector?: {
      name: string
    }
  }
}

export default function ArticleCard({ article }: ArticleCardProps) {
  const typeLabels: Record<string, string> = {
    weekly_update: 'Weekly Update',
    sector_deep_dive: 'Sector Deep Dive',
    derivatives_education: 'Derivatives Education',
    news_analysis: 'News & Analysis',
    portfolio_update: 'Portfolio Update',
  }

  return (
    <Link href={`/articles/${article.slug}`}>
      <article className="article-card">
        <div className="article-header">
          <span className="article-type">{typeLabels[article.type] || article.type}</span>
          {article.isPremium && (
            <span className="premium-badge">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/>
              </svg>
              Premium
            </span>
          )}
        </div>

        <h3 className="article-title">{article.title}</h3>

        {article.sector && (
          <div className="article-sector">
            <span className="sector-badge">{article.sector.name}</span>
          </div>
        )}

        <p className="article-excerpt">{article.excerpt}</p>

        <div className="article-footer">
          <span className="article-date">{formatDate(article.publishedAt)}</span>
          {article.author && (
            <span className="article-author">By {article.author.fullName}</span>
          )}
        </div>
      </article>

      <style jsx>{`
        .article-card {
          background: white;
          border-radius: 0.75rem;
          padding: 1.5rem;
          box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
          transition: all 0.2s;
          cursor: pointer;
          height: 100%;
          display: flex;
          flex-direction: column;
        }

        .article-card:hover {
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
          transform: translateY(-2px);
        }

        .article-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 0.75rem;
        }

        .article-type {
          font-size: 0.875rem;
          font-weight: 600;
          color: #2563eb;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .premium-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.375rem;
          background: #fef3c7;
          color: #92400e;
          padding: 0.25rem 0.5rem;
          border-radius: 0.375rem;
          font-size: 0.75rem;
          font-weight: 600;
        }

        .article-title {
          font-size: 1.25rem;
          font-weight: 700;
          line-height: 1.4;
          margin-bottom: 0.75rem;
          color: #111827;
        }

        .article-sector {
          margin-bottom: 0.75rem;
        }

        .sector-badge {
          display: inline-block;
          background: #dbeafe;
          color: #1e40af;
          padding: 0.25rem 0.625rem;
          border-radius: 0.375rem;
          font-size: 0.75rem;
          font-weight: 600;
        }

        .article-excerpt {
          color: #4b5563;
          font-size: 0.9375rem;
          line-height: 1.6;
          margin-bottom: 1rem;
          flex-grow: 1;
        }

        .article-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: 0.75rem;
          border-top: 1px solid #e5e7eb;
          font-size: 0.875rem;
          color: #6b7280;
        }

        .article-date {
          font-weight: 500;
        }

        .article-author {
          font-style: italic;
        }
      `}</style>
    </Link>
  )
}
