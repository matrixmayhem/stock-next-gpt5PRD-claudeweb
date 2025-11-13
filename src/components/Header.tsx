import Link from 'next/link'

export default function Header() {
  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <Link href="/" className="logo">
            <h1>TransparentLogbook</h1>
          </Link>

          <nav className="nav">
            <Link href="/sectors">Sector Deep Dives</Link>
            <Link href="/weekly-updates">Weekly Updates</Link>
            <Link href="/portfolio">Portfolio</Link>
            <Link href="/about">About</Link>
            <Link href="/contact">Contact</Link>
          </nav>

          <div className="header-actions">
            <Link href="/login" className="btn-text">
              Login
            </Link>
            <Link href="/plans" className="btn-primary">
              Start Free Trial
            </Link>
          </div>
        </div>
      </div>

      <style jsx>{`
        .header {
          background: #ffffff;
          border-bottom: 1px solid #e5e7eb;
          position: sticky;
          top: 0;
          z-index: 100;
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 1rem;
        }

        .header-content {
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 70px;
        }

        .logo {
          text-decoration: none;
          color: #111827;
        }

        .logo h1 {
          font-size: 1.5rem;
          font-weight: 700;
          margin: 0;
        }

        .nav {
          display: flex;
          gap: 2rem;
          align-items: center;
        }

        .nav a {
          text-decoration: none;
          color: #4b5563;
          font-weight: 500;
          transition: color 0.2s;
        }

        .nav a:hover {
          color: #111827;
        }

        .header-actions {
          display: flex;
          gap: 1rem;
          align-items: center;
        }

        .btn-text {
          text-decoration: none;
          color: #4b5563;
          font-weight: 500;
          padding: 0.5rem 1rem;
          transition: color 0.2s;
        }

        .btn-text:hover {
          color: #111827;
        }

        .btn-primary {
          text-decoration: none;
          background: #2563eb;
          color: white;
          padding: 0.625rem 1.25rem;
          border-radius: 0.5rem;
          font-weight: 600;
          transition: background 0.2s;
        }

        .btn-primary:hover {
          background: #1d4ed8;
        }

        @media (max-width: 768px) {
          .nav {
            display: none;
          }

          .logo h1 {
            font-size: 1.25rem;
          }

          .header-actions {
            gap: 0.5rem;
          }

          .btn-text {
            padding: 0.5rem;
          }

          .btn-primary {
            padding: 0.5rem 1rem;
            font-size: 0.875rem;
          }
        }
      `}</style>
    </header>
  )
}
