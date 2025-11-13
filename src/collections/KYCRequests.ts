import type { CollectionConfig } from 'payload'
import { isAdmin, isAdminOrSelf } from '../access'

export const KYCRequests: CollectionConfig = {
  slug: 'kyc-requests',
  admin: {
    useAsTitle: 'user',
    defaultColumns: ['user', 'status', 'provider', 'createdAt'],
    group: 'Compliance',
  },
  access: {
    read: ({ req: { user }, id, data }) => {
      if (!user) return false
      if (user.role === 'admin') return true
      // Users can only see their own KYC requests
      return data?.user === user.id
    },
    create: ({ req: { user } }) => {
      // Users can create their own KYC requests
      return Boolean(user)
    },
    update: isAdmin, // Only admins can update (via webhook)
    delete: () => false, // Never delete - compliance requirement
  },
  fields: [
    {
      name: 'user',
      type: 'relationship',
      relationTo: 'users',
      required: true,
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'initiated',
      options: [
        {
          label: 'Initiated',
          value: 'initiated',
        },
        {
          label: 'Pending Verification',
          value: 'pending',
        },
        {
          label: 'Verified',
          value: 'verified',
        },
        {
          label: 'Failed',
          value: 'failed',
        },
        {
          label: 'Rejected',
          value: 'rejected',
        },
      ],
      access: {
        create: () => false,
        update: isAdmin,
      },
    },
    {
      name: 'provider',
      type: 'select',
      required: true,
      options: [
        {
          label: 'Signzy',
          value: 'signzy',
        },
        {
          label: 'HyperVerge',
          value: 'hyperverge',
        },
        {
          label: 'IDfy',
          value: 'idfy',
        },
        {
          label: 'Manual',
          value: 'manual',
        },
      ],
      admin: {
        description: 'KYC provider used',
      },
    },
    {
      name: 'providerReferenceId',
      type: 'text',
      admin: {
        description: 'External provider reference ID',
      },
      access: {
        create: () => false,
        update: isAdmin,
      },
    },
    // PAN details
    {
      name: 'pan',
      type: 'text',
      required: true,
      admin: {
        description: 'PAN submitted for verification',
      },
    },
    {
      name: 'fullName',
      type: 'text',
      required: true,
      admin: {
        description: 'Full name as per PAN',
      },
    },
    {
      name: 'dateOfBirth',
      type: 'date',
      admin: {
        description: 'Date of birth',
      },
    },
    {
      name: 'address',
      type: 'group',
      fields: [
        {
          name: 'line1',
          type: 'text',
        },
        {
          name: 'line2',
          type: 'text',
        },
        {
          name: 'city',
          type: 'text',
        },
        {
          name: 'state',
          type: 'text',
        },
        {
          name: 'pincode',
          type: 'text',
        },
      ],
    },
    // Provider response
    {
      name: 'providerResponse',
      type: 'json',
      admin: {
        description: 'Raw response from KYC provider (for audit)',
      },
      access: {
        create: () => false,
        update: isAdmin,
      },
    },
    {
      name: 'verifiedAt',
      type: 'date',
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
      access: {
        create: () => false,
        update: isAdmin,
      },
    },
    {
      name: 'failureReason',
      type: 'textarea',
      admin: {
        description: 'Reason for failure/rejection',
      },
      access: {
        create: () => false,
        update: isAdmin,
      },
    },
    {
      name: 'retryCount',
      type: 'number',
      defaultValue: 0,
      admin: {
        description: 'Number of retry attempts',
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
        description: 'When KYC request was archived to S3 WORM',
      },
      access: {
        create: () => false,
        update: isAdmin,
      },
    },
  ],
  timestamps: true,
  hooks: {
    afterChange: [
      async ({ doc, operation }) => {
        // TODO: Archive to S3 WORM
        if (operation === 'create' || operation === 'update') {
          console.log('TODO: Archive KYC request to S3 WORM:', doc.id)
        }
      },
    ],
  },
}
