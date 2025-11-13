
import Link from 'next/link'
import { getPayloadClient } from '@/lib/payload-client'
import ArticleCard from '@/components/ArticleCard'

export default async function SectorsPage() {
  const payload = await getPayloadClient()
  let sectors: any[] = []
  let latestDeepDives: any[] = []

  try {
    const sectorsData = await payload.find({
      collection: 'sectors',
      sort: 'order',
      limit: 100,
    })
    sectors = sectorsData.docs

    // Fetch articles for each sector
    for (const sector of sectors) {
      const articles = await payload.find({
        collection: 'articles',
        where: {
          and: [
            {
              status: {
                equals: 'published',
              },
            },
            {
              type: {
                equals: 'sector_deep_dive',
              },
            },
            {
              sector: {
                equals: sector.id,
              },
            },
          ],
        },
        sort: '-publishedAt',
        limit: 10,
      })
      sector.articles = articles.docs
    }

    // Get latest 3 deep dives across all sectors
    const latestData = await payload.find({
      collection: 'articles',
      where: {
        and: [
          {
            status: {
              equals: 'published',
            },
          },
          {
            type: {
              equals: 'sector_deep_dive',
            },
          },
        ],
      },
      sort: '-publishedAt',
      limit: 3,
    })
    latestDeepDives = latestData.docs
  } catch (error) {
    console.log('Could not fetch sectors or articles:', error)
  }

  return (
    <div className="page">
      <div className="container">
        {/* Hero Section */}
        <div className="page-hero">
          <h1>Sector Deep Dives</h1>
          <p className="page-description">
            In-depth analysis of investment sectors in the Indian market. Understand the fundamentals,
            key players, trends, and investment opportunities in each sector.
          </p>
        </div>

        {/* Latest Deep Dives */}
        {latestDeepDives.length > 0 && (
          <section className="latest-section">
            <h2>Latest Deep Dives</h2>
            <div className="articles-grid">
              {latestDeepDives.map((article: any) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          </section>
        )}

        {/* Sectors Accordion */}
        <section className="sectors-section">
          <h2>Browse by Sector</h2>

          {sectors.length === 0 ? (
            <div className="alert alert-info">
              <p>
                <strong>No sectors yet.</strong> Sectors will appear here once created.
                Access the admin panel at <Link href="/admin">/admin</Link> to create sectors.
              </p>
            </div>
          ) : (
            <div className="sectors-list">
              {sectors.map((sector: any) => (
                <details key={sector.id} className="sector-accordion">
                  <summary className="sector-header">
                    <div className="sector-info">
                      <h3 className="sector-name">{sector.name}</h3>
                      {sector.description && (
                        <p className="sector-description">{sector.description}</p>
                      )}
                      <span className="article-count">
                        {sector.articles?.length || 0} {sector.articles?.length === 1 ? 'article' : 'articles'}
                      </span>
                    </div>
                    <svg
                      className="chevron"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                  </summary>

                  <div className="sector-content">
                    {sector.articles?.length > 0 ? (
                      <div className="sector-articles">
                        {sector.articles.map((article: any) => (
                          <ArticleCard key={article.id} article={article} />
                        ))}
                      </div>
                    ) : (
                      <div className="alert alert-info">
                        <p>No articles yet for this sector.</p>
                      </div>
                    )}
                  </div>
                </details>
              ))}
            </div>
          )}
        </section>
      </div>

      
    </div>
  )
}
