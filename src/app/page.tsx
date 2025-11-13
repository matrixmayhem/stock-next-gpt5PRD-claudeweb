export default function HomePage() {
  return (
    <main style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <h1>TransparentLogbook</h1>
      <p>
        Investment Advisory & Education Platform - Initial Setup Complete
      </p>

      <section style={{ marginTop: '2rem' }}>
        <h2>Setup Status</h2>
        <ul>
          <li>✅ Next.js 15.5.6 installed</li>
          <li>✅ Payload 3.63.0 configured</li>
          <li>✅ Database schema ready (Postgres)</li>
          <li>✅ Collections created (Users, Articles, Portfolio, etc.)</li>
          <li>✅ SEBI compliance structure in place</li>
          <li>✅ KYC integration framework ready</li>
        </ul>
      </section>

      <section style={{ marginTop: '2rem' }}>
        <h2>Next Steps</h2>
        <ol>
          <li>Configure environment variables (.env)</li>
          <li>Set up Postgres database</li>
          <li>Run database migrations</li>
          <li>Access Payload admin at /admin</li>
          <li>Start building frontend pages</li>
        </ol>
      </section>

      <section style={{ marginTop: '2rem', padding: '1rem', backgroundColor: '#f0f0f0', borderRadius: '8px' }}>
        <h3>⚠️ SEBI Compliance Notice</h3>
        <p style={{ fontSize: '0.9rem', marginTop: '0.5rem' }}>
          This platform is designed for SEBI RIA compliance. Ensure all
          regulatory requirements are met before going live, including:
        </p>
        <ul style={{ marginTop: '0.5rem', fontSize: '0.9rem' }}>
          <li>Valid SEBI RIA registration</li>
          <li>KYC via approved KRA provider</li>
          <li>5-year record retention (WORM storage)</li>
          <li>Proper disclaimers and disclosures</li>
        </ul>
      </section>
    </main>
  )
}
