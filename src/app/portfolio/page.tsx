'use client'

import Link from 'next/link'
import { getPayloadClient, formatDate, canAccessPremium } from '@/lib/payload-client'
import { cookies } from 'next/headers'

export default async function PortfolioPage() {
  const payload = await getPayloadClient()

  // Get user from session
  let user: any = null
  try {
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

  let entries: any[] = []

  if (hasAccess) {
    try {
      const entriesData = await payload.find({
        collection: 'portfolio-entries',
        where: {
          status: {
            equals: 'published',
          },
        },
        sort: '-entryDate',
        limit: 50,
      })
      entries = entriesData.docs

      // Group entries by month
      const groupedEntries: Record<string, any[]> = {}
      entries.forEach((entry) => {
        const date = new Date(entry.entryDate)
        const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`
        if (!groupedEntries[monthKey]) {
          groupedEntries[monthKey] = []
        }
        groupedEntries[monthKey].push(entry)
      })
      entries = Object.entries(groupedEntries).map(([month, items]) => ({ month, items }))
    } catch (error) {
      console.log('Could not fetch portfolio entries:', error)
    }
  }

  const actionTypeLabels: Record<string, string> = {
    new_position: 'New Position',
    increase: 'Increased Allocation',
    decrease: 'Decreased Allocation',
    exit: 'Exit Position',
    hedge: 'Hedge / Derivative',
    rebalance: 'Rebalance',
  }

  if (!hasAccess) {
    return (
      <div className="page">
        <div className="container">
          {/* Preview Hero */}
          <div className="preview-hero">
            <h1>Portfolio Logbook</h1>
            <p className="hero-description">
              Our transparent model portfolio with every decision documented. See the complete rationale,
              holdings breakdown, and performance metrics for every portfolio adjustment.
            </p>

            {/* Sample Entry Preview */}
            <div className="preview-card">
              <div className="preview-badge">Preview</div>
              <h3>Sample Entry: Portfolio Rebalance - Tech Sector</h3>
              <div className="entry-meta">
                <span className="entry-date">October 15, 2024</span>
                <span className="action-badge">Rebalance</span>
              </div>
              <p className="preview-text">
                Given the recent correction in technology stocks and improved valuations, we've rebalanced
                our portfolio to increase exposure to quality IT companies. This decision is based on...
              </p>
              <div className="preview-blur">
                <p>Full portfolio snapshot and detailed rationale available to premium members.</p>
              </div>
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
                <h2>Unlock Full Portfolio Access</h2>
                <p>
                  Get complete transparency into our investment decisions. See detailed rationale,
                  full portfolio holdings, performance metrics, and participate in member discussions.
                </p>
                <div className="paywall-features">
                  <div className="feature">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    <span>Complete portfolio history</span>
                  </div>
                  <div className="feature">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    <span>Detailed rationale for every move</span>
                  </div>
                  <div className="feature">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    <span>Performance vs benchmark</span>
                  </div>
                  <div className="feature">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    <span>Member discussions</span>
                  </div>
                </div>
                <div className="paywall-actions">
                  <Link href="/plans" className="btn btn-primary btn-large">
                    Start Free Trial
                  </Link>
                  {!user && (
                    <Link href="/login" className="btn btn-outline btn-large">
                      Login
                    </Link>
                  )}
                </div>
                <p className="paywall-note">
                  1-month free trial • Full access • Cancel anytime
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

          .preview-hero {
            text-align: center;
            max-width: 900px;
            margin: 0 auto;
          }

          .preview-hero h1 {
            margin-bottom: 1rem;
          }

          .hero-description {
            font-size: 1.125rem;
            line-height: 1.6;
            color: #4b5563;
            margin-bottom: 3rem;
          }

          .preview-card {
            background: white;
            border-radius: 0.75rem;
            padding: 2rem;
            box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
            text-align: left;
            margin-bottom: 3rem;
            position: relative;
          }

          .preview-badge {
            position: absolute;
            top: 1rem;
            right: 1rem;
            background: #fef3c7;
            color: #92400e;
            padding: 0.375rem 0.75rem;
            border-radius: 0.375rem;
            font-size: 0.875rem;
            font-weight: 600;
          }

          .preview-card h3 {
            margin-bottom: 1rem;
          }

          .entry-meta {
            display: flex;
            gap: 1rem;
            margin-bottom: 1.5rem;
            font-size: 0.875rem;
          }

          .entry-date {
            color: #6b7280;
            font-weight: 600;
          }

          .action-badge {
            background: #dbeafe;
            color: #1e40af;
            padding: 0.25rem 0.75rem;
            border-radius: 0.375rem;
            font-weight: 600;
          }

          .preview-text {
            color: #4b5563;
            line-height: 1.6;
            margin-bottom: 1.5rem;
          }

          .preview-blur {
            background: linear-gradient(to bottom, transparent, #f9fafb);
            padding: 2rem;
            text-align: center;
            color: #6b7280;
            font-style: italic;
          }

          .paywall {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 3rem;
            border-radius: 0.75rem;
          }

          .paywall-content {
            text-align: center;
            max-width: 600px;
            margin: 0 auto;
          }

          .lock-icon {
            margin-bottom: 1.5rem;
            color: rgba(255, 255, 255, 0.9);
          }

          .paywall h2 {
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

          .paywall-features {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 1rem;
            margin-bottom: 2rem;
            text-align: left;
          }

          .feature {
            display: flex;
            align-items: center;
            gap: 0.75rem;
          }

          .paywall-actions {
            display: flex;
            gap: 1rem;
            justify-content: center;
            margin-bottom: 1rem;
          }

          .btn-large {
            padding: 1rem 2rem;
            font-size: 1.125rem;
          }

          .paywall-note {
            font-size: 0.9375rem;
            opacity: 0.8;
            margin: 0;
          }

          @media (max-width: 768px) {
            .preview-card {
              padding: 1.5rem;
            }

            .paywall {
              padding: 2rem;
            }

            .paywall h2 {
              font-size: 1.5rem;
            }

            .paywall-features {
              grid-template-columns: 1fr;
            }

            .paywall-actions {
              flex-direction: column;
            }
          }
        `}</style>
      </div>
    )
  }

  return (
    <div className="page">
      <div className="container">
        {/* Portfolio Header */}
        <div className="portfolio-header">
          <h1>Portfolio Logbook</h1>
          <p className="header-description">
            Complete transparency into our investment decisions. Every adjustment documented with
            full rationale and portfolio snapshot.
          </p>

          {/* Performance Summary Placeholder */}
          <div className="performance-summary">
            <div className="metric">
              <span className="metric-label">Portfolio CAGR</span>
              <span className="metric-value">--</span>
            </div>
            <div className="metric">
              <span className="metric-label">vs NIFTY 50</span>
              <span className="metric-value">--</span>
            </div>
            <div className="metric">
              <span className="metric-label">Max Drawdown</span>
              <span className="metric-value">--</span>
            </div>
          </div>
        </div>

        {/* Portfolio Entries */}
        <div className="entries-section">
          {entries.length === 0 ? (
            <div className="alert alert-info">
              <p>
                <strong>No portfolio entries yet.</strong> Portfolio updates will appear here once published.
              </p>
            </div>
          ) : (
            entries.map(({ month, items }: any) => {
              const monthDate = new Date(month + '-01')
              const monthLabel = monthDate.toLocaleDateString('en-IN', { year: 'numeric', month: 'long' })

              return (
                <details key={month} className="month-accordion" open>
                  <summary className="month-header">
                    <h2>{monthLabel}</h2>
                    <span className="entry-count">{items.length} {items.length === 1 ? 'entry' : 'entries'}</span>
                  </summary>

                  <div className="month-content">
                    {items.map((entry: any) => (
                      <div key={entry.id} className="portfolio-entry">
                        <div className="entry-header">
                          <div>
                            <h3>{entry.title}</h3>
                            <div className="entry-meta">
                              <span className="entry-date">{formatDate(entry.entryDate)}</span>
                              <span className="action-badge">{actionTypeLabels[entry.actionType]}</span>
                            </div>
                          </div>
                        </div>

                        <div className="entry-body">
                          <div className="rationale-section">
                            <h4>Rationale</h4>
                            <div className="rationale-content">
                              {/* Render rich text rationale */}
                              <p>Portfolio rationale content will be rendered here...</p>
                            </div>
                          </div>

                          {entry.holdings && entry.holdings.length > 0 && (
                            <div className="holdings-section">
                              <h4>Portfolio Snapshot</h4>
                              <div className="holdings-table">
                                <table>
                                  <thead>
                                    <tr>
                                      <th>Ticker</th>
                                      <th>Company</th>
                                      <th className="text-right">Allocation</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {entry.holdings.map((holding: any, index: number) => (
                                      <tr key={index}>
                                        <td className="ticker">{holding.ticker}</td>
                                        <td>{holding.companyName}</td>
                                        <td className="text-right allocation">{holding.allocationPercent}%</td>
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          )}
                        </div>

                        <div className="entry-footer">
                          <button className="btn-text">💬 View Comments ({0})</button>
                        </div>
                      </div>
                    ))}
                  </div>
                </details>
              )
            })
          )}
        </div>
      </div>

      <style jsx>{`
        .page {
          padding: 3rem 0;
          background: #f9fafb;
        }

        .portfolio-header {
          text-align: center;
          max-width: 900px;
          margin: 0 auto 4rem;
        }

        .portfolio-header h1 {
          margin-bottom: 1rem;
        }

        .header-description {
          font-size: 1.125rem;
          line-height: 1.6;
          color: #4b5563;
          margin-bottom: 2rem;
        }

        .performance-summary {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2rem;
          background: white;
          padding: 2rem;
          border-radius: 0.75rem;
          box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
        }

        .metric {
          text-align: center;
        }

        .metric-label {
          display: block;
          font-size: 0.875rem;
          color: #6b7280;
          margin-bottom: 0.5rem;
        }

        .metric-value {
          display: block;
          font-size: 2rem;
          font-weight: 700;
          color: #111827;
        }

        .entries-section {
          max-width: 900px;
          margin: 0 auto;
        }

        .month-accordion {
          background: white;
          border-radius: 0.75rem;
          box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
          margin-bottom: 2rem;
        }

        .month-header {
          padding: 1.5rem;
          cursor: pointer;
          list-style: none;
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 2px solid #e5e7eb;
        }

        .month-header::-webkit-details-marker {
          display: none;
        }

        .month-header h2 {
          margin: 0;
        }

        .entry-count {
          font-size: 0.875rem;
          color: #6b7280;
          font-weight: 600;
        }

        .month-content {
          padding: 1.5rem;
        }

        .portfolio-entry {
          padding: 1.5rem;
          background: #f9fafb;
          border-radius: 0.75rem;
          margin-bottom: 1.5rem;
        }

        .portfolio-entry:last-child {
          margin-bottom: 0;
        }

        .entry-header h3 {
          margin-bottom: 0.75rem;
        }

        .entry-meta {
          display: flex;
          gap: 1rem;
          margin-bottom: 1.5rem;
          font-size: 0.875rem;
        }

        .entry-date {
          color: #6b7280;
          font-weight: 600;
        }

        .action-badge {
          background: #dbeafe;
          color: #1e40af;
          padding: 0.25rem 0.75rem;
          border-radius: 0.375rem;
          font-weight: 600;
        }

        .entry-body {
          margin-bottom: 1.5rem;
        }

        .rationale-section,
        .holdings-section {
          margin-bottom: 2rem;
        }

        .rationale-section h4,
        .holdings-section h4 {
          margin-bottom: 1rem;
          font-size: 1.125rem;
        }

        .rationale-content {
          color: #4b5563;
          line-height: 1.6;
          font-size: 1rem;
        }

        .holdings-table {
          overflow-x: auto;
        }

        table {
          width: 100%;
          border-collapse: collapse;
          background: white;
          border-radius: 0.5rem;
          overflow: hidden;
        }

        thead {
          background: #f3f4f6;
        }

        th,
        td {
          padding: 0.75rem 1rem;
          text-align: left;
          border-bottom: 1px solid #e5e7eb;
        }

        th {
          font-weight: 600;
          font-size: 0.875rem;
          color: #6b7280;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .ticker {
          font-weight: 700;
          color: #2563eb;
        }

        .allocation {
          font-weight: 600;
        }

        .text-right {
          text-align: right;
        }

        tbody tr:last-child td {
          border-bottom: none;
        }

        .entry-footer {
          padding-top: 1rem;
          border-top: 1px solid #e5e7eb;
        }

        .btn-text {
          background: none;
          border: none;
          color: #2563eb;
          font-weight: 600;
          cursor: pointer;
          padding: 0.5rem 0;
          font-size: 0.9375rem;
        }

        .btn-text:hover {
          text-decoration: underline;
        }

        @media (max-width: 768px) {
          .performance-summary {
            grid-template-columns: 1fr;
            gap: 1rem;
          }

          .metric-value {
            font-size: 1.5rem;
          }

          table {
            font-size: 0.875rem;
          }

          th,
          td {
            padding: 0.5rem;
          }
        }
      `}</style>
    </div>
  )
}
