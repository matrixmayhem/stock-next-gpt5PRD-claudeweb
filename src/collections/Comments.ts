import type { CollectionConfig } from 'payload'
import { isAdmin, canAccessPremium } from '../access'

export const Comments: CollectionConfig = {
  slug: 'comments',
  admin: {
    useAsTitle: 'content',
    defaultColumns: ['author', 'contentType', 'status', 'createdAt'],
    listSearchableFields: ['content'],
  },
  access: {
    read: ({ req: { user }, data }) => {
      // Admins can see all
      if (user?.role === 'admin') return true

      // Approved comments visible to premium users
      if (data?.status !== 'approved') return false

      // Require KYC + active subscription
      if (!user) return false
      const isVerified = user.kycStatus === 'verified'
      const hasActiveSub = user.subscriptionStatus === 'trial' || user.subscriptionStatus === 'active'
      return isVerified && hasActiveSub
    },
    create: ({ req: { user } }) => {
      // Only KYC-verified users with trial/active subscription can post
      if (!user) return false
      const isVerified = user.kycStatus === 'verified'
      const hasActiveSub = user.subscriptionStatus === 'trial' || user.subscriptionStatus === 'active'
      return isVerified && hasActiveSub
    },
    update: isAdmin, // Only admins can edit/moderate
    delete: () => false, // Never delete - WORM compliance
  },
  fields: [
    {
      name: 'author',
      type: 'relationship',
      relationTo: 'users',
      required: true,
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'content',
      type: 'textarea',
      required: true,
      maxLength: 2000,
      admin: {
        description: 'Comment text (max 2000 characters)',
      },
    },
    // Polymorphic relationship: comment can be on article or portfolio-entry
    {
      name: 'contentType',
      type: 'select',
      required: true,
      options: [
        {
          label: 'Article',
          value: 'article',
        },
        {
          label: 'Portfolio Entry',
          value: 'portfolio-entry',
        },
      ],
    },
    {
      name: 'article',
      type: 'relationship',
      relationTo: 'articles',
      admin: {
        condition: (data) => data.contentType === 'article',
      },
    },
    {
      name: 'portfolioEntry',
      type: 'relationship',
      relationTo: 'portfolio-entries',
      admin: {
        condition: (data) => data.contentType === 'portfolio-entry',
      },
    },
    // Parent comment for threading (optional, for future)
    {
      name: 'parentComment',
      type: 'relationship',
      relationTo: 'comments',
      admin: {
        description: 'Parent comment for nested replies',
      },
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'pending',
      access: {
        create: () => false, // Auto-set on creation
        update: isAdmin,
      },
      options: [
        {
          label: 'Pending Moderation',
          value: 'pending',
        },
        {
          label: 'Approved',
          value: 'approved',
        },
        {
          label: 'Hidden',
          value: 'hidden',
        },
        {
          label: 'Flagged',
          value: 'flagged',
        },
      ],
    },
    {
      name: 'moderationNotes',
      type: 'textarea',
      admin: {
        description: 'Internal notes for moderators',
      },
      access: {
        read: isAdmin,
        create: isAdmin,
        update: isAdmin,
      },
    },
    {
      name: 'hiddenAt',
      type: 'date',
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
        },
        description: 'When comment was hidden (for audit)',
      },
      access: {
        create: () => false,
        update: isAdmin,
      },
    },
    {
      name: 'hiddenBy',
      type: 'relationship',
      relationTo: 'users',
      admin: {
        description: 'Admin who hid the comment',
      },
      access: {
        create: () => false,
        update: isAdmin,
      },
    },
    // Compliance: Archive to S3 WORM
    {
      name: 's3ArchiveKey',
      type: 'text',
      admin: {
        readOnly: true,
        description: 'S3 object key for WORM archive (permanent record)',
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
        description: 'When comment was archived to S3 WORM',
      },
      access: {
        create: () => false,
        update: isAdmin,
      },
    },
    {
      name: 'checksum',
      type: 'text',
      admin: {
        readOnly: true,
        description: 'SHA-256 checksum for integrity verification',
      },
      access: {
        create: () => false,
        update: isAdmin,
      },
    },
  ],
  timestamps: true,
  hooks: {
    beforeChange: [
      async ({ data, req, operation }) => {
        // Auto-set author to current user on creation
        if (operation === 'create' && req.user) {
          data.author = req.user.id
          data.status = 'pending' // All new comments start as pending
        }
        return data
      },
    ],
    afterChange: [
      async ({ doc, operation }) => {
        // TODO: After create, archive to S3 WORM
        if (operation === 'create') {
          // This will be implemented in hooks
          console.log('TODO: Archive comment to S3 WORM:', doc.id)
        }
      },
    ],
  },
}
