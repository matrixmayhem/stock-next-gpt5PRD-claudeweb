
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

      
    </div>
  )
}
