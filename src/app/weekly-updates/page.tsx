
import { getPayloadClient } from '@/lib/payload-client'
import ArticleCard from '@/components/ArticleCard'

export default async function WeeklyUpdatesPage() {
  const payload = await getPayloadClient()
  let articles: any[] = []

  try {
    const articlesData = await payload.find({
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
              equals: 'weekly_update',
            },
          },
        ],
      },
      sort: '-publishedAt',
      limit: 50,
    })
    articles = articlesData.docs
  } catch (error) {
    console.log('Could not fetch weekly updates:', error)
  }

  return (
    <div className="page">
      <div className="container">
        {/* Hero Section */}
        <div className="page-hero">
          <h1>Weekly Updates</h1>
          <p className="page-description">
            Stay informed with our weekly market analysis, portfolio updates, and investment insights.
            Every week, we break down what matters most in the Indian markets.
          </p>
        </div>

        {/* Articles */}
        <section className="articles-section">
          {articles.length === 0 ? (
            <div className="alert alert-info">
              <p>
                <strong>No weekly updates yet.</strong> Check back soon for our latest market insights.
              </p>
            </div>
          ) : (
            <div className="articles-grid">
              {articles.map((article: any) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          )}
        </section>
      </div>

      
    </div>
  )
}
