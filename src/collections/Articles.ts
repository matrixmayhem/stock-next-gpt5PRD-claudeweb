import type { CollectionConfig } from 'payload'
import { isAdmin, canAccessPremium } from '../access'

export const Articles: CollectionConfig = {
  slug: 'articles',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'type', 'isPremium', 'status', 'publishedAt'],
    listSearchableFields: ['title', 'excerpt', 'type'],
  },
  access: {
    read: ({ req: { user }, data }) => {
      // Admins can see all
      if (user?.role === 'admin') return true

      // Published articles
      if (data?.status !== 'published') return false

      // Free articles are public
      if (!data?.isPremium) return true

      // Premium articles require verification + subscription
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
        description: 'Article title',
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
      name: 'type',
      type: 'select',
      required: true,
      options: [
        {
          label: 'Weekly Update',
          value: 'weekly_update',
        },
        {
          label: 'Sector Deep Dive',
          value: 'sector_deep_dive',
        },
        {
          label: 'Derivatives Education',
          value: 'derivatives_education',
        },
        {
          label: 'News & Analysis',
          value: 'news_analysis',
        },
        {
          label: 'Portfolio Update',
          value: 'portfolio_update',
        },
      ],
      admin: {
        description: 'Content type/category',
      },
    },
    {
      name: 'sector',
      type: 'relationship',
      relationTo: 'sectors',
      admin: {
        condition: (data) => data.type === 'sector_deep_dive',
        description: 'Related sector (for Sector Deep Dive articles)',
      },
    },
    {
      name: 'excerpt',
      type: 'textarea',
      required: true,
      maxLength: 300,
      admin: {
        description: 'Short summary shown in previews (300 chars max)',
      },
    },
    {
      name: 'content',
      type: 'richText',
      required: true,
      admin: {
        description: 'Main article content',
      },
    },
    {
      name: 'featuredImage',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Featured image for the article',
      },
    },
    {
      name: 'isPremium',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        description: 'Premium content requires KYC + active subscription',
      },
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
        {
          label: 'Archived',
          value: 'archived',
        },
      ],
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
        },
        description: 'Publication date',
      },
    },
    {
      name: 'author',
      type: 'relationship',
      relationTo: 'users',
      required: true,
      admin: {
        description: 'Article author (advisor)',
      },
    },
    {
      name: 'tags',
      type: 'array',
      fields: [
        {
          name: 'tag',
          type: 'text',
        },
      ],
      admin: {
        description: 'Tags for categorization and search',
      },
    },
    {
      name: 'seo',
      type: 'group',
      fields: [
        {
          name: 'metaTitle',
          type: 'text',
          maxLength: 60,
        },
        {
          name: 'metaDescription',
          type: 'textarea',
          maxLength: 160,
        },
      ],
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
