import type { CollectionConfig } from 'payload'
import { isAdmin, canAccessPremium } from '../access'

export const PortfolioEntries: CollectionConfig = {
  slug: 'portfolio-entries',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'entryDate', 'actionType', 'status'],
    listSearchableFields: ['title', 'rationale'],
  },
  access: {
    read: ({ req: { user }, data }) => {
      // Admins can see all
      if (user?.role === 'admin') return true

      // Published entries only
      if (data?.status !== 'published') return false

      // Require KYC + active subscription
      if (!user) return false
      const isVerified = user.kycStatus === 'verified'
      const hasActiveSub = user.subscriptionStatus === 'trial' || user.subscriptionStatus === 'active'
      return isVerified && hasActiveSub
    },
    create: isAdmin,
    update: isAdmin,
    delete: isAdmin,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      admin: {
        description: 'Entry title (e.g., "Increased IT allocation via Infosys")',
      },
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        description: 'URL-friendly slug',
      },
    },
    {
      name: 'entryDate',
      type: 'date',
      required: true,
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
        },
        description: 'Date of portfolio action',
      },
    },
    {
      name: 'actionType',
      type: 'select',
      required: true,
      options: [
        {
          label: 'New Position',
          value: 'new_position',
        },
        {
          label: 'Increase Allocation',
          value: 'increase',
        },
        {
          label: 'Decrease Allocation',
          value: 'decrease',
        },
        {
          label: 'Exit Position',
          value: 'exit',
        },
        {
          label: 'Hedge / Derivative',
          value: 'hedge',
        },
        {
          label: 'Rebalance',
          value: 'rebalance',
        },
      ],
      admin: {
        description: 'Type of portfolio action',
      },
    },
    {
      name: 'rationale',
      type: 'richText',
      required: true,
      admin: {
        description: 'Educational explanation of the "why" behind this action',
      },
    },
    {
      name: 'marketContext',
      type: 'richText',
      admin: {
        description: 'Market conditions and macro context at time of action',
      },
    },
    // Full portfolio snapshot
    {
      name: 'holdings',
      type: 'array',
      required: true,
      fields: [
        {
          name: 'ticker',
          type: 'text',
          required: true,
          admin: {
            description: 'Stock ticker symbol (e.g., INFY, RELIANCE)',
          },
        },
        {
          name: 'companyName',
          type: 'text',
          required: true,
        },
        {
          name: 'allocationPercent',
          type: 'number',
          required: true,
          min: 0,
          max: 100,
          admin: {
            description: 'Allocation as % of portfolio',
          },
        },
        {
          name: 'sector',
          type: 'relationship',
          relationTo: 'sectors',
        },
        {
          name: 'entryPrice',
          type: 'number',
          admin: {
            description: 'Average entry price (optional)',
          },
        },
        {
          name: 'notes',
          type: 'textarea',
          admin: {
            description: 'Additional notes about this holding',
          },
        },
      ],
      admin: {
        description: 'Complete portfolio snapshot at time of this entry',
      },
    },
    // Performance metrics
    {
      name: 'portfolioValue',
      type: 'number',
      admin: {
        description: 'Total portfolio value (model portfolio, not client-specific)',
      },
    },
    {
      name: 'benchmarkComparison',
      type: 'group',
      fields: [
        {
          name: 'benchmarkName',
          type: 'text',
          defaultValue: 'NIFTY 50',
        },
        {
          name: 'portfolioReturn',
          type: 'number',
          admin: {
            description: 'Portfolio return % since inception',
          },
        },
        {
          name: 'benchmarkReturn',
          type: 'number',
          admin: {
            description: 'Benchmark return % since inception',
          },
        },
      ],
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'draft',
      options: [
        {
          label: 'Draft',
          value: 'draft',
        },
        {
          label: 'Published',
          value: 'published',
        },
      ],
    },
    {
      name: 'publishedBy',
      type: 'relationship',
      relationTo: 'users',
      admin: {
        description: 'Advisor who published this entry',
      },
    },
    // Compliance: Archive to S3 WORM
    {
      name: 's3ArchiveKey',
      type: 'text',
      admin: {
        readOnly: true,
        description: 'S3 object key for WORM archive',
      },
      access: {
        create: () => false,
        update: isAdmin,
      },
    },
    {
      name: 'archivedAt',
      type: 'date',
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
        },
        readOnly: true,
        description: 'When content was archived to S3 WORM',
      },
      access: {
        create: () => false,
        update: isAdmin,
      },
    },
  ],
  timestamps: true,
  versions: {
    drafts: true,
  },
}
