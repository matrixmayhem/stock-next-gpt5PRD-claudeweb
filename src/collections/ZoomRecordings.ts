import type { CollectionConfig } from 'payload'
import { isAdmin, canAccessPremium } from '../access'

export const ZoomRecordings: CollectionConfig = {
  slug: 'zoom-recordings',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'meetingId', 'recordingDate', 'status'],
    group: 'Compliance',
  },
  access: {
    read: ({ req: { user }, data }) => {
      // Admins can see all
      if (user?.role === 'admin') return true

      // Published recordings visible to premium users
      if (data?.status !== 'published') return false

      // Require KYC + active subscription
      if (!user) return false
      const isVerified = user.kycStatus === 'verified'
      const hasActiveSub = user.subscriptionStatus === 'trial' || user.subscriptionStatus === 'active'
      return isVerified && hasActiveSub
    },
    create: isAdmin,
    update: isAdmin,
    delete: () => false, // Never delete - WORM compliance
  },
  upload: {
    staticDir: 'zoom-recordings',
    mimeTypes: ['video/*', 'text/plain', 'application/json'],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      admin: {
        description: 'Webinar title',
      },
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
    },
    {
      name: 'meetingId',
      type: 'text',
      required: true,
      admin: {
        description: 'Zoom meeting ID',
      },
    },
    {
      name: 'recordingDate',
      type: 'date',
      required: true,
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
    },
    {
      name: 'duration',
      type: 'number',
      admin: {
        description: 'Duration in minutes',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      admin: {
        description: 'Webinar description',
      },
    },
    {
      name: 'host',
      type: 'relationship',
      relationTo: 'users',
      required: true,
    },
    {
      name: 'participants',
      type: 'array',
      fields: [
        {
          name: 'user',
          type: 'relationship',
          relationTo: 'users',
        },
        {
          name: 'joinTime',
          type: 'date',
        },
        {
          name: 'leaveTime',
          type: 'date',
        },
      ],
      admin: {
        description: 'List of participants (for compliance)',
      },
    },
    {
      name: 'videoUrl',
      type: 'text',
      admin: {
        description: 'S3 URL for video recording',
      },
    },
    {
      name: 'transcriptUrl',
      type: 'text',
      admin: {
        description: 'S3 URL for transcript',
      },
    },
    {
      name: 'chatLogUrl',
      type: 'text',
      admin: {
        description: 'S3 URL for chat log',
      },
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'processing',
      options: [
        {
          label: 'Processing',
          value: 'processing',
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
        description: 'SHA-256 checksum for integrity',
      },
      access: {
        create: () => false,
        update: isAdmin,
      },
    },
  ],
  timestamps: true,
}
