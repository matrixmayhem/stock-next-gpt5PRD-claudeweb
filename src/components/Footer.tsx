'use client'

import Link from 'next/link'

interface FooterProps {
  sebiRegistration?: string
  disclaimer?: string
}

export default function Footer({ sebiRegistration, disclaimer }: FooterProps) {
  return (
    <footer className="footer">
      <div className="container">
        {/* SEBI Disclaimer */}
        {disclaimer && (
          <div className="disclaimer">
            <p className="disclaimer-text">
              <strong>SEBI Registration:</strong> {sebiRegistration || 'INA000000000'}
            </p>
            <p className="disclaimer-text">
              Investment in securities market are subject to market risks. Read all the related documents carefully before investing.
              Registration granted by SEBI, membership of BASL and certification from NISM in no way guarantee performance of the
              intermediary or provide any assurance of returns to investors.
            </p>
          </div>
        )}

        {/* Footer Links */}
        <div className="footer-content">
          <div className="footer-section">
            <h3>TransparentLogbook</h3>
            <p>Education-first investment advisory for aspiring strategists.</p>
          </div>

          <div className="footer-section">
            <h4>Platform</h4>
            <ul>
              <li><Link href="/sectors">Sector Deep Dives</Link></li>
              <li><Link href="/weekly-updates">Weekly Updates</Link></li>
              <li><Link href="/portfolio">Portfolio</Link></li>
              <li><Link href="/plans">Pricing</Link></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Company</h4>
            <ul>
              <li><Link href="/about">About Us</Link></li>
              <li><Link href="/about/what-we-do">What We Do</Link></li>
              <li><Link href="/about/who-we-cater-to">Who We Cater To</Link></li>
              <li><Link href="/contact">Contact</Link></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Legal</h4>
            <ul>
              <li><Link href="/legal/privacy">Privacy Policy</Link></li>
              <li><Link href="/legal/terms">Terms of Service</Link></li>
              <li><Link href="/legal/refund">Refund Policy</Link></li>
              <li><Link href="/legal/grievance">Grievance Redressal</Link></li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} TransparentLogbook. All rights reserved.</p>
        </div>
      </div>

      <style jsx>{`
        .footer {
          background: #111827;
          color: #d1d5db;
          padding: 3rem 0 1rem;
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 1rem;
        }

        .disclaimer {
          background: #1f2937;
          padding: 1.5rem;
          border-radius: 0.5rem;
          margin-bottom: 2rem;
          border-left: 4px solid #ef4444;
        }

        .disclaimer-text {
          margin: 0.5rem 0;
          font-size: 0.875rem;
          line-height: 1.5;
        }

        .footer-content {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 2rem;
          margin-bottom: 2rem;
        }

        .footer-section h3 {
          color: white;
          margin-bottom: 0.5rem;
          font-size: 1.25rem;
        }

        .footer-section h4 {
          color: white;
          margin-bottom: 1rem;
          font-size: 1rem;
        }

        .footer-section p {
          font-size: 0.875rem;
          line-height: 1.5;
        }

        .footer-section ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .footer-section li {
          margin-bottom: 0.5rem;
        }

        .footer-section a {
          color: #d1d5db;
          text-decoration: none;
          font-size: 0.875rem;
          transition: color 0.2s;
        }

        .footer-section a:hover {
          color: white;
        }

        .footer-bottom {
          border-top: 1px solid #374151;
          padding-top: 1.5rem;
          text-align: center;
        }

        .footer-bottom p {
          margin: 0;
          font-size: 0.875rem;
        }

        @media (max-width: 768px) {
          .footer-content {
            grid-template-columns: repeat(2, 1fr);
          }

          .disclaimer {
            padding: 1rem;
          }

          .disclaimer-text {
            font-size: 0.8rem;
          }
        }
      `}</style>
    </footer>
  )
}
