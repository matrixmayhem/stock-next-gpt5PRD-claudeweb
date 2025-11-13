# TransparentLogbook

A SEBI-compliant investment advisory and education platform for Indian retail investors.

## Overview

TransparentLogbook is a subscription-based platform that combines:

- **Educational Content**: Sector deep dives, derivatives education, weekly market updates
- **Transparent Portfolio Logbook**: Real-time model portfolio with detailed rationale
- **SEBI RIA Compliance**: KYC verification, 5-year record retention, proper disclosures

## Tech Stack

- **Framework**: Next.js 15.5.6 (App Router)
- **CMS/Backend**: Payload 3.63.0
- **Database**: PostgreSQL (via Payload)
- **Storage**: AWS S3 (with Object Lock for WORM compliance)
- **Payments**: Stripe
- **Node**: 20.9+

## Project Structure

```
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── (payload)/          # Payload admin & API routes
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── collections/            # Payload collections
│   │   ├── Users.ts            # User management & auth
│   │   ├── Articles.ts         # Content (weekly updates, sector dives, etc.)
│   │   ├── Sectors.ts          # Investment sectors
│   │   ├── PortfolioEntries.ts # Portfolio logbook entries
│   │   ├── Comments.ts         # User discussions
│   │   ├── Testimonials.ts     # Client testimonials
│   │   ├── KYCRequests.ts      # KYC verification tracking
│   │   ├── Media.ts            # File uploads
│   │   └── ZoomRecordings.ts   # Webinar recordings (compliance)
│   ├── globals/                # Payload globals
│   │   ├── SiteSettings.ts     # Site-wide settings
│   │   └── LegalPages.ts       # T&C, Privacy Policy, etc.
│   ├── access/                 # Access control functions
│   │   └── index.ts
│   ├── lib/                    # Utilities
│   │   └── s3-worm.ts          # S3 WORM storage for compliance
│   └── components/             # React components (to be built)
├── payload.config.ts           # Payload configuration
├── next.config.ts              # Next.js configuration
└── tsconfig.json               # TypeScript configuration
```

## Getting Started

### Prerequisites

1. **Node.js 20.9+**
2. **PostgreSQL database**
3. **AWS S3 bucket** (with Object Lock enabled for WORM compliance)
4. **Stripe account** (for payments)
5. **KYC provider account** (Signzy, HyperVerge, or IDfy)

### Installation

1. Clone the repository

```bash
git clone <repository-url>
cd transparent-logbook
```

2. Install dependencies

```bash
npm install
```

3. Set up environment variables

```bash
cp .env.example .env
```

Edit `.env` with your actual credentials:
- Database connection string
- S3 credentials and bucket names
- Stripe API keys
- KYC provider credentials
- SEBI registration details

### Database Setup

1. Create a PostgreSQL database:

```sql
CREATE DATABASE transparent_logbook;
```

2. Payload will automatically create tables on first run

### S3 WORM Compliance Setup

For SEBI compliance, you need an S3 bucket with Object Lock enabled:

1. Create an S3 bucket in AWS Console
2. Enable **Object Lock** during creation
3. Set default retention mode to **COMPLIANCE** with 5-year retention
4. Update `.env` with bucket details

### Running the Development Server

```bash
npm run dev
```

- **Frontend**: http://localhost:3000
- **Payload Admin**: http://localhost:3000/admin

### First-time Setup

1. Navigate to http://localhost:3000/admin
2. Create your first admin user
3. Configure **Site Settings** global:
   - SEBI registration number
   - Company details
   - Trial and pricing settings
4. Create initial **Sectors**
5. Configure **Legal Pages** (Privacy Policy, Terms, etc.)

## Key Features

### 1. User Management & KYC

- Email/password authentication via Payload
- PAN-based KYC verification
- Integration framework for KYC providers (Signzy/HyperVerge/IDfy)
- User roles: admin, user
- KYC status: pending, verified, failed

### 2. Subscription Management

- 1-month free trial (requires KYC verification)
- Stripe integration for payments
- Subscription statuses: none, trial, active, cancelled, expired
- Access control based on KYC + subscription status

### 3. Content Management

**Article Types:**
- Weekly Updates
- Sector Deep Dives
- Derivatives Education
- News & Analysis
- Portfolio Updates

**Access Levels:**
- Free articles: public
- Premium articles: KYC-verified + active subscription/trial

### 4. Portfolio Logbook

- Transparent model portfolio tracking
- Each entry includes:
  - Action type (new position, increase, decrease, exit, hedge, rebalance)
  - Detailed rationale (educational)
  - Full holdings snapshot
  - Performance metrics vs benchmark
- Comments/discussions under each entry
- All entries archived to S3 WORM storage

### 5. SEBI Compliance Features

#### KYC Verification
- Mandatory for trial and paid subscriptions
- PAN validation
- Integration with KRA/CKYC providers
- Audit trail of all KYC requests

#### Record Retention (5 years)
- All premium user interactions archived to S3 WORM storage:
  - Comments on articles and portfolio entries
  - KYC verification records
  - Webinar recordings and transcripts
  - Portfolio entries and updates
- SHA-256 checksums for integrity verification
- Compliance mode Object Lock prevents deletion

#### Disclosures
- SEBI registration number displayed prominently
- Investment risk warnings
- Disclaimers on key pages
- Terms of service with SEBI-specific clauses

### 6. Comments & Discussions

- Users can comment on articles and portfolio entries
- Requirements: KYC-verified + active subscription/trial
- Moderation workflow: pending → approved/hidden/flagged
- All comments archived to WORM storage
- No deletion - hidden comments remain in archive

### 7. Webinar Integration (Zoom)

- Framework for Zoom webhook integration
- Automatic archiving of:
  - Video recordings
  - Chat transcripts
  - Participant lists
- All stored in S3 WORM for compliance

## Access Control Matrix

| Content/Feature | Anonymous | Registered | KYC Pending | KYC Verified (No Sub) | Trial/Active Sub |
|----------------|-----------|------------|-------------|-----------------------|------------------|
| Free Articles | ✅ | ✅ | ✅ | ✅ | ✅ |
| Premium Articles | ❌ | ❌ | ❌ | ❌ | ✅ |
| Portfolio Logbook | Preview | Preview | Preview | Preview | ✅ |
| Comments (Read) | ❌ | ❌ | ❌ | ❌ | ✅ |
| Comments (Post) | ❌ | ❌ | ❌ | ❌ | ✅ |
| Webinar Recordings | ❌ | ❌ | ❌ | ❌ | ✅ |

## Development Roadmap

### Phase 1: Foundation (Current)
- ✅ Project setup with Next.js 15 + Payload 3
- ✅ Core collections and data models
- ✅ Access control framework
- ✅ S3 WORM integration
- 🚧 Frontend components and pages

### Phase 2: Core Features
- [ ] Homepage with article feed
- [ ] Article detail pages with premium paywall
- [ ] Portfolio logbook interface
- [ ] User registration and authentication flow
- [ ] Account management dashboard

### Phase 3: Integrations
- [ ] KYC provider integration (Signzy/HyperVerge/IDfy)
- [ ] Stripe payment integration
- [ ] Email notifications
- [ ] Zoom webhook handler

### Phase 4: Content & UX
- [ ] Sector deep dive pages
- [ ] Weekly updates archive
- [ ] Search and filtering
- [ ] Responsive design
- [ ] SEO optimization

### Phase 5: Compliance & Launch
- [ ] Legal pages content
- [ ] SEBI disclaimers and disclosures
- [ ] Compliance audit trail UI
- [ ] Testing and QA
- [ ] Production deployment

## API Routes (Payload Auto-generated)

- `POST /api/users/login` - User login
- `POST /api/users/logout` - User logout
- `GET /api/users/me` - Get current user
- `POST /api/users` - Create user (registration)
- `GET /api/articles` - List articles
- `GET /api/articles/:id` - Get article by ID
- `GET /api/portfolio-entries` - List portfolio entries
- `GET /api/comments` - List comments
- `POST /api/comments` - Create comment
- `GET /api/kyc-requests` - List KYC requests
- `POST /api/kyc-requests` - Create KYC request
- `GET /api/globals/site-settings` - Get site settings
- `GET /api/globals/legal-pages` - Get legal pages

All routes respect the access control rules defined in collections.

## Environment Variables Reference

See `.env.example` for a complete list. Key variables:

- `DATABASE_URI` - PostgreSQL connection string
- `PAYLOAD_SECRET` - Secret key for Payload (change in production!)
- `S3_WORM_BUCKET` - S3 bucket with Object Lock for compliance
- `STRIPE_SECRET_KEY` - Stripe API secret
- `KYC_PROVIDER` - KYC provider (signzy/hyperverge/idfy)
- `SEBI_REGISTRATION_NUMBER` - Your SEBI RIA registration number

## Security Considerations

1. **Never commit `.env`** to version control
2. **Use strong `PAYLOAD_SECRET`** in production
3. **Enable HTTPS** in production
4. **Regularly rotate API keys**
5. **Monitor S3 bucket access logs**
6. **Implement rate limiting** for API routes
7. **Keep dependencies updated**

## Compliance Notes

### SEBI RIA Requirements

This platform is designed to help meet SEBI RIA compliance requirements:

1. ✅ **KYC Verification**: Mandatory for all advisory relationships
2. ✅ **Record Retention**: 5-year retention via S3 WORM storage
3. ✅ **Disclosures**: Framework for required disclosures and disclaimers
4. ⚠️ **Legal Review Required**: Have all legal content reviewed by SEBI compliance counsel
5. ⚠️ **Registration**: Ensure valid SEBI RIA registration before launching

### Important Disclaimers

This codebase provides a **technical framework** for compliance but:

- Does NOT constitute legal advice
- Must be reviewed by qualified legal/compliance professionals
- Requires customization based on your specific RIA registration
- May need updates based on changing SEBI regulations

**Consult with SEBI compliance experts before going live.**

## Support & Contributing

For issues or questions, please open a GitHub issue.

## License

[Your License Here]

## Acknowledgments

Built with:
- [Next.js](https://nextjs.org/)
- [Payload CMS](https://payloadcms.com/)
- [React](https://react.dev/)
- [PostgreSQL](https://www.postgresql.org/)
- [AWS S3](https://aws.amazon.com/s3/)
- [Stripe](https://stripe.com/)
