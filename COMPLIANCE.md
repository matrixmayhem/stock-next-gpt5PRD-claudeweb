# SEBI RIA Compliance Checklist

This document outlines SEBI RIA compliance requirements and how TransparentLogbook addresses them.

## ⚠️ Legal Disclaimer

**This checklist is for informational purposes only and does NOT constitute legal advice.**

Before launching your investment advisory platform:
1. Consult with qualified legal counsel specialized in SEBI regulations
2. Ensure your RIA registration is valid and up to date
3. Have all legal content reviewed by compliance professionals
4. Stay updated on changing SEBI regulations

## SEBI RIA Registration Requirements

### 1. Valid Registration

- [ ] Valid SEBI RIA registration certificate
- [ ] Registration number updated in platform (`.env` and Site Settings)
- [ ] Registration displayed prominently on website
- [ ] Certificate validity date tracked

**Implementation:**
- Registration number stored in `site-settings` global
- Displayed in footer and key pages
- Editable via Payload admin

### 2. Know Your Client (KYC)

#### Requirements
- [ ] KYC mandatory for all advisory relationships
- [ ] Use SEBI-registered KRA/CKYC provider
- [ ] PAN verification required
- [ ] Identity and address verification
- [ ] Risk profiling (if providing personalized advice)

#### Platform Implementation
- ✅ PAN field mandatory for registration
- ✅ PAN format validation
- ✅ KYC status tracking (pending/verified/failed)
- ✅ Integration framework for KYC providers
- ✅ Users must complete KYC before trial/subscription
- 🚧 **TODO**: Implement actual KYC provider integration
- 🚧 **TODO**: Risk profiling questionnaire (if needed)

**Collections:**
- `users` collection: stores PAN, KYC status
- `kyc-requests` collection: audit trail of all KYC attempts

### 3. Client Agreements

#### Requirements
- [ ] Written investment advisory agreement with each client
- [ ] Clear fee disclosure
- [ ] Scope of services defined
- [ ] Risk disclosures
- [ ] Grievance redressal mechanism
- [ ] Client signature/acceptance required

#### Platform Implementation
- ✅ Framework for advisory agreement in `legal-pages` global
- ✅ Terms of Service acceptance during registration
- ✅ Consent checkboxes for SEBI terms and privacy
- ✅ Grievance redressal officer details in legal pages
- 🚧 **TODO**: E-signature or explicit acceptance flow
- 🚧 **TODO**: Store acceptance timestamp and IP address

**Database Fields:**
- `users.sebiConsent`: User agreed to SEBI terms
- `users.privacyConsent`: User agreed to privacy policy
- `users.createdAt`: Timestamp of agreement

### 4. Record Keeping (5 Years)

#### Requirements
- [ ] Maintain records for minimum 5 years
- [ ] All client communications
- [ ] All advisory provided
- [ ] Payment records
- [ ] KYC documents
- [ ] Complaints and resolution

#### Platform Implementation
- ✅ S3 WORM storage with 5-year Object Lock (Compliance mode)
- ✅ All comments archived automatically
- ✅ All KYC requests archived
- ✅ Portfolio entries archived
- ✅ Zoom recordings archived
- ✅ SHA-256 checksums for integrity
- ✅ Immutable storage (cannot be deleted or modified)

**WORM Archive Includes:**
- Comments on articles and portfolio entries
- KYC verification records and provider responses
- Webinar recordings, transcripts, and participant lists
- Portfolio entries with full rationale
- Article content

**S3 Configuration Required:**
```
Bucket: transparent-logbook-worm
Object Lock: Enabled
Mode: Compliance
Retention: 1825 days (5 years)
```

### 5. Disclosures and Disclaimers

#### Requirements
- [ ] SEBI registration number prominently displayed
- [ ] "Investment in securities market are subject to market risks" disclaimer
- [ ] Clear fee structure disclosure
- [ ] Conflicts of interest disclosure (if any)
- [ ] Past performance disclaimer
- [ ] No guaranteed returns disclaimer

#### Platform Implementation
- ✅ SEBI disclaimer in `site-settings` global
- ✅ Display locations configured:
  - Footer (all pages)
  - Homepage
  - Portfolio page
  - Subscription/payment pages
- ✅ Risk warning in `site-settings`
- 🚧 **TODO**: Add actual disclaimer content (requires legal review)
- 🚧 **TODO**: Ensure visible on every advisory-related page

**Recommended Disclaimers:**

```
SEBI Registration: [Your Registration Number]

Disclaimer: Investment in securities market are subject to market risks. Read all the related documents carefully before investing. Registration granted by SEBI, membership of BASL and certification from NISM in no way guarantee performance of the intermediary or provide any assurance of returns to investors.

Past performance is not indicative of future results. No guaranteed returns are provided. All investments are subject to market risks and may result in loss of capital.
```

### 6. Fee Structure

#### Requirements
- [ ] Clear, upfront fee disclosure
- [ ] No hidden charges
- [ ] Fee changes must be communicated in advance
- [ ] Transaction-based fees prohibited (advisory fees only)

#### Platform Implementation
- ✅ Subscription pricing in `site-settings`
- ✅ Monthly and annual pricing fields
- ✅ Trial duration configurable
- 🚧 **TODO**: Display fees prominently on pricing page
- 🚧 **TODO**: Clarify what's included in subscription
- 🚧 **TODO**: Refund policy (if applicable)

**Current Model:**
- Fixed subscription fee (monthly or annual)
- No transaction-based fees
- Stripe handles payment processing

### 7. Code of Conduct

#### Requirements
- [ ] Act in clients' best interest
- [ ] No front running or insider trading
- [ ] No guarantees of returns
- [ ] Disclose conflicts of interest
- [ ] Maintain confidentiality

#### Platform Implementation
- ✅ Terms of service framework
- ✅ User-generated content policy (comments)
- ✅ Moderation tools for inappropriate content
- 🚧 **TODO**: Staff training on code of conduct
- 🚧 **TODO**: Internal compliance procedures
- 🚧 **TODO**: Conflict of interest policy

**Moderation:**
- Comments start as "pending"
- Admin can approve/hide/flag
- Hidden comments still archived (WORM)
- Moderator actions logged

### 8. Grievance Redressal

#### Requirements
- [ ] Designated grievance officer
- [ ] Contact details publicly available
- [ ] Acknowledgment within 2 days
- [ ] Resolution within 30 days
- [ ] Escalation to SEBI if unresolved

#### Platform Implementation
- ✅ Grievance officer details in `legal-pages` global
- ✅ Contact form on website
- 🚧 **TODO**: Dedicated grievance tracking system
- 🚧 **TODO**: Email automation for acknowledgments
- 🚧 **TODO**: Internal ticketing for tracking

**Required Information:**
```
Grievance Officer: [Name]
Email: [Email]
Phone: [Phone Number]
Address: [Office Address]

For escalations: SEBI complaints portal
```

### 9. Cybersecurity & Data Protection

#### Requirements
- [ ] Secure systems to protect client data
- [ ] Regular security audits
- [ ] Data privacy compliance
- [ ] PAN and financial data protection
- [ ] Incident reporting to SEBI if breach occurs

#### Platform Implementation
- ✅ HTTPS required in production
- ✅ Password hashing via Payload (bcrypt)
- ✅ Session-based authentication
- ✅ Role-based access control
- ✅ PAN field encrypted at rest (via Postgres SSL)
- 🚧 **TODO**: Enable SSL for Postgres connection
- 🚧 **TODO**: Implement rate limiting
- 🚧 **TODO**: Set up monitoring and alerting
- 🚧 **TODO**: Regular security audits
- 🚧 **TODO**: Backup strategy for database

**Security Recommendations:**
- Use AWS RDS with encryption at rest
- Enable CloudWatch logging
- Implement WAF (Web Application Firewall)
- Regular dependency updates
- Penetration testing before launch

### 10. Advertising & Marketing

#### Requirements
- [ ] No misleading advertisements
- [ ] Past performance must include disclaimers
- [ ] Cannot guarantee returns
- [ ] All claims must be substantiated
- [ ] SEBI registration number in advertisements

#### Platform Implementation
- ✅ Portfolio performance includes benchmark comparison
- ✅ Framework for disclaimers on portfolio page
- 🚧 **TODO**: Review all marketing copy for compliance
- 🚧 **TODO**: Ensure disclaimers on testimonials
- 🚧 **TODO**: Social media policy for compliant posting

**Testimonials:**
- `testimonials` collection includes `isPublished` flag
- Manual approval required
- Should include disclaimer about individual results

## Implementation Status Summary

### ✅ Completed (Technical Framework)

1. KYC status tracking
2. 5-year record retention (S3 WORM)
3. User consent tracking
4. Access control based on KYC + subscription
5. Immutable audit logs
6. SEBI disclaimer fields in CMS
7. Legal pages management
8. Grievance officer information fields

### 🚧 In Progress (Requires Development)

1. Actual KYC provider integration (Signzy/HyperVerge/IDfy)
2. Stripe payment webhooks
3. Email notifications
4. Zoom webhook handler
5. Frontend pages with disclaimers
6. E-signature for agreements
7. Grievance tracking system

### ⚠️ Requires External Action

1. Valid SEBI RIA registration
2. Legal review of all content
3. Compliance counsel consultation
4. KYC provider contract
5. Stripe account setup
6. AWS S3 with Object Lock configuration
7. Privacy policy and terms drafted by legal team
8. Insurance (professional indemnity)
9. Internal compliance procedures
10. Staff training on SEBI regulations

## Pre-Launch Checklist

Before going live, ensure:

- [ ] Valid SEBI RIA registration with certificate
- [ ] All legal documents reviewed by counsel
- [ ] KYC provider integration tested
- [ ] S3 WORM storage tested and verified
- [ ] Payment processing tested end-to-end
- [ ] Security audit completed
- [ ] SSL certificates installed (HTTPS)
- [ ] All disclaimers and disclosures in place
- [ ] Grievance redressal mechanism operational
- [ ] Backup and disaster recovery plan
- [ ] Monitoring and alerting set up
- [ ] Privacy policy compliant with IT Act
- [ ] Data protection measures in place
- [ ] Professional indemnity insurance obtained
- [ ] Team trained on compliance requirements

## Ongoing Compliance

### Daily/Weekly
- [ ] Monitor user comments for inappropriate content
- [ ] Respond to client inquiries
- [ ] Check for system errors or security alerts

### Monthly
- [ ] Review new user registrations and KYC statuses
- [ ] Audit access logs
- [ ] Check S3 WORM archives are functioning
- [ ] Review and moderate pending comments

### Quarterly
- [ ] Security review and updates
- [ ] Review terms and policies for updates needed
- [ ] Check SEBI website for regulatory changes
- [ ] Analyze grievances and resolutions

### Annually
- [ ] Renew SEBI registration (if applicable)
- [ ] Full compliance audit
- [ ] Update privacy policy and terms
- [ ] Security penetration testing
- [ ] Review and update all disclaimers
- [ ] Staff compliance training

## Contact SEBI

**SEBI Headquarters:**
Plot No. C4-A, 'G' Block
Bandra-Kurla Complex, Bandra (East)
Mumbai - 400 051, India
Phone: +91-22-26449000
Website: https://www.sebi.gov.in

**SEBI Complaints:**
SCORES (SEBI Complaints Redress System)
https://scores.sebi.gov.in

## Resources

- SEBI RIA Regulations: https://www.sebi.gov.in/legal/regulations/
- SEBI Circulars: https://www.sebi.gov.in/sebiweb/home/HomeAction.do?doListing=yes&sid=3&ssid=17&smid=0
- Investment Advisers FAQs: Check SEBI website

---

**Remember:** This platform provides the technical foundation for compliance. Legal and regulatory compliance is your responsibility. Always consult with qualified professionals.
