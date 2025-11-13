# TransparentLogbook - Setup Guide

This guide will help you get the TransparentLogbook platform up and running locally.

## Prerequisites Checklist

Before you begin, ensure you have:

- [ ] Node.js 20.9 or higher installed
- [ ] PostgreSQL 13 or higher installed and running
- [ ] AWS account with S3 access
- [ ] Stripe account (test mode is fine for development)
- [ ] KYC provider account (optional for initial development)

## Step-by-Step Setup

### 1. Clone and Install

```bash
# Navigate to the project directory
cd transparent-logbook

# Install dependencies
npm install
```

### 2. Database Setup

**Create PostgreSQL Database:**

```bash
# Login to PostgreSQL
psql -U postgres

# Create database
CREATE DATABASE transparent_logbook;

# Create user (optional, if not using default postgres user)
CREATE USER logbook_admin WITH PASSWORD 'your_secure_password';
GRANT ALL PRIVILEGES ON DATABASE transparent_logbook TO logbook_admin;

# Exit psql
\q
```

**Get your connection string:**
```
postgresql://postgres:password@localhost:5432/transparent_logbook
```

### 3. AWS S3 Setup

#### Create Regular Storage Bucket

1. Go to AWS S3 Console
2. Click "Create bucket"
3. Name: `transparent-logbook-storage-dev` (or your choice)
4. Region: `ap-south-1` (Mumbai) or your preferred region
5. Leave other settings as default
6. Click "Create bucket"

#### Create WORM Compliance Bucket

1. Click "Create bucket" again
2. Name: `transparent-logbook-worm-dev`
3. Region: Same as above
4. **Important**: Enable "Object Lock" (required for WORM compliance)
5. Click "Create bucket"
6. After creation, go to bucket → Properties → Object Lock
7. Set default retention:
   - Mode: **Compliance**
   - Retention period: **1825 days** (5 years)

#### Create IAM User for S3 Access

1. Go to IAM Console → Users → Create user
2. Name: `transparent-logbook-s3`
3. Attach policy: `AmazonS3FullAccess` (or create custom policy for specific buckets)
4. Create access key → Download credentials
5. Save `Access Key ID` and `Secret Access Key`

### 4. Environment Variables

```bash
# Copy example file
cp .env.example .env

# Edit .env file
nano .env  # or use your preferred editor
```

**Minimum required configuration for local development:**

```env
# Application
NEXT_PUBLIC_SERVER_URL=http://localhost:3000
NODE_ENV=development

# Payload Secret (generate a random string)
PAYLOAD_SECRET=your-very-long-random-secret-key-change-this

# Database
DATABASE_URI=postgresql://postgres:password@localhost:5432/transparent_logbook

# S3 Storage
S3_REGION=ap-south-1
S3_BUCKET=transparent-logbook-storage-dev
S3_ACCESS_KEY_ID=YOUR_AWS_ACCESS_KEY
S3_SECRET_ACCESS_KEY=YOUR_AWS_SECRET_KEY

# S3 WORM Bucket
S3_WORM_BUCKET=transparent-logbook-worm-dev
S3_WORM_RETENTION_DAYS=1825

# Stripe (use test keys)
STRIPE_SECRET_KEY=sk_test_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# SEBI (for development, use placeholder)
SEBI_REGISTRATION_NUMBER=INA000000000
SEBI_REGISTERED_ENTITY=Development Test Entity

# KYC Provider (optional for initial setup)
KYC_PROVIDER=signzy
KYC_API_KEY=test_key
KYC_API_SECRET=test_secret
```

### 5. Generate Payload Secret

Generate a secure random secret:

```bash
# On macOS/Linux
openssl rand -base64 32

# Or using Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

Copy the output and use it as your `PAYLOAD_SECRET`.

### 6. Start Development Server

```bash
npm run dev
```

The server will start on http://localhost:3000

**First run will:**
- Connect to PostgreSQL
- Create all necessary tables
- Set up Payload CMS

### 7. Create Admin User

1. Navigate to http://localhost:3000/admin
2. You'll see the "Create First User" screen
3. Enter:
   - Email: your-email@example.com
   - Password: secure password (min 8 characters)
   - Full Name: Your Name
   - PAN: ABCDE1234F (test format)
   - Check both consent boxes
4. Click "Create"

You'll be logged into the Payload admin dashboard.

### 8. Initial Configuration

#### Configure Site Settings

1. Go to Globals → Site Settings
2. Fill in:
   - **General tab**: Site name, tagline, logo (optional)
   - **Homepage tab**: Hero headline and subheadline
   - **Trial & Subscription tab**: Pricing (e.g., ₹999/month)
   - **SEBI Compliance tab**: Registration number, disclaimer text
   - **Contact tab**: Email and address
3. Click "Save"

#### Configure Legal Pages

1. Go to Globals → Legal Pages
2. For each tab (Privacy Policy, Terms, etc.):
   - Set "Last Updated" to today
   - Add content (or placeholder text for now)
3. Click "Save"

#### Create Sectors

1. Go to Collections → Sectors → Create New
2. Add common sectors:
   - Information Technology
   - Banking & Financial Services
   - Pharmaceuticals
   - Fast Moving Consumer Goods
   - Energy
   - Automobiles
   etc.

For each sector:
- Name: e.g., "Information Technology"
- Slug: e.g., "information-technology"
- Description: Brief description
- Order: 1, 2, 3, etc.

### 9. Test the Setup

#### Create a Test Article

1. Go to Collections → Articles → Create New
2. Fill in:
   - Title: "Welcome to TransparentLogbook"
   - Slug: "welcome"
   - Type: "Weekly Update"
   - Excerpt: "Getting started with our platform"
   - Content: Add some test content
   - Author: Select your admin user
   - Status: "Published"
   - Is Premium: Uncheck (make it free for testing)
   - Published At: Select current date/time
3. Click "Create"

#### View Your Test Article

1. Navigate to http://localhost:3000
2. You should see the basic homepage
3. The article won't appear yet (frontend not built), but the API works:
   - Visit: http://localhost:3000/api/articles
   - You'll see JSON with your article

### 10. Verify S3 Integration

Test file upload:

1. In Payload admin, go to Collections → Media
2. Click "Create New"
3. Upload any image
4. Add alt text
5. Click "Create"
6. Check your S3 bucket - the file should appear there

## Troubleshooting

### Database Connection Failed

**Error:** `could not connect to server`

**Solution:**
- Check PostgreSQL is running: `pg_isready`
- Verify connection string in `.env`
- Check database exists: `psql -l`

### S3 Upload Failed

**Error:** `Access Denied` or `Bucket not found`

**Solution:**
- Verify S3 credentials in `.env`
- Check bucket names are correct
- Ensure IAM user has S3 permissions
- Verify bucket region matches `S3_REGION`

### Payload Secret Error

**Error:** `A secret key is required`

**Solution:**
- Ensure `PAYLOAD_SECRET` is set in `.env`
- Make sure it's a long random string (minimum 32 characters recommended)

### Port Already in Use

**Error:** `Port 3000 is already in use`

**Solution:**
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Or change port
PORT=3001 npm run dev
```

## Next Steps

Now that your development environment is set up:

1. **Build Frontend Pages**
   - Start with the homepage layout
   - Create article listing and detail pages
   - Build the portfolio logbook interface

2. **Implement Authentication Flow**
   - Registration page
   - Login page
   - Account dashboard

3. **Add Payment Integration**
   - Set up Stripe checkout
   - Handle webhooks
   - Test trial and subscription flow

4. **Integrate KYC Provider**
   - Choose provider (Signzy/HyperVerge/IDfy)
   - Implement KYC initiation flow
   - Handle webhook callbacks

5. **Test WORM Storage**
   - Create test comments
   - Verify they're archived to S3
   - Check Object Lock is working

## Development Tips

1. **Hot Reload**: Both Next.js and Payload support hot reload. Changes to frontend code will reload automatically.

2. **Database Changes**: If you modify collection schemas:
   ```bash
   # Payload will auto-migrate on next dev server start
   npm run dev
   ```

3. **Type Generation**: After modifying collections:
   ```bash
   npm run generate:types
   ```
   This creates TypeScript types for your collections.

4. **API Testing**: Use tools like Postman or curl to test Payload API endpoints.

5. **Admin Customization**: Payload admin UI is customizable. See `admin` options in collection configs.

## Getting Help

- **Payload Docs**: https://payloadcms.com/docs
- **Next.js Docs**: https://nextjs.org/docs
- **Project Issues**: [Your GitHub Issues URL]

## Security Reminder

⚠️ **Before deploying to production:**

1. Change all default secrets and passwords
2. Use production-grade database
3. Enable HTTPS
4. Set up proper IAM roles (least privilege)
5. Enable CloudWatch logging for S3
6. Review all SEBI compliance requirements
7. Have legal counsel review all disclosures

---

Happy building! 🚀
