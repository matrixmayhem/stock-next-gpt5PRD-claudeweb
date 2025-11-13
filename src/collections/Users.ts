import type { CollectionConfig } from 'payload'
import { isAdmin, isAdminOrSelf } from '../access'

export const Users: CollectionConfig = {
  slug: 'users',
  auth: {
    tokenExpiration: 7200, // 2 hours
    verify: {
      generateEmailHTML: ({ token }) => {
        return `
          <p>Please verify your email by clicking the link below:</p>
          <a href="${process.env.NEXT_PUBLIC_SERVER_URL}/verify-email?token=${token}">Verify Email</a>
        `
      },
    },
    forgotPassword: {
      generateEmailHTML: ({ token }) => {
        return `
          <p>Reset your password by clicking the link below:</p>
          <a href="${process.env.NEXT_PUBLIC_SERVER_URL}/reset-password?token=${token}">Reset Password</a>
        `
      },
    },
  },
  admin: {
    useAsTitle: 'email',
    defaultColumns: ['email', 'fullName', 'kycStatus', 'subscriptionStatus', 'role'],
  },
  access: {
    read: isAdminOrSelf,
    create: () => true, // Anyone can register
    update: isAdminOrSelf,
    delete: isAdmin,
  },
  fields: [
    {
      name: 'role',
      type: 'select',
      required: true,
      defaultValue: 'user',
      access: {
        create: isAdmin,
        update: isAdmin,
      },
      options: [
        {
          label: 'Admin',
          value: 'admin',
        },
        {
          label: 'User',
          value: 'user',
        },
      ],
    },
    {
      name: 'fullName',
      type: 'text',
      required: true,
      admin: {
        placeholder: 'Full Name as per PAN',
      },
    },
    {
      name: 'pan',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        description: 'Permanent Account Number (PAN) - required for KYC',
      },
      validate: (val: string) => {
        const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/
        if (!panRegex.test(val)) {
          return 'Invalid PAN format. Expected format: ABCDE1234F'
        }
        return true
      },
    },
    {
      name: 'phone',
      type: 'text',
      admin: {
        placeholder: '+91XXXXXXXXXX',
      },
    },
    // KYC Status
    {
      name: 'kycStatus',
      type: 'select',
      required: true,
      defaultValue: 'pending',
      access: {
        create: () => false,
        update: isAdmin,
      },
      options: [
        {
          label: 'Pending',
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
      ],
      admin: {
        description: 'KYC verification status via KRA/CKYC provider',
      },
    },
    {
      name: 'kycVerifiedAt',
      type: 'date',
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
        },
        description: 'Timestamp when KYC was verified',
      },
      access: {
        create: () => false,
        update: isAdmin,
      },
    },
    {
      name: 'kycProvider',
      type: 'text',
      admin: {
        description: 'KYC provider used (e.g., Signzy, HyperVerge, IDfy)',
      },
      access: {
        create: () => false,
        update: isAdmin,
      },
    },
    {
      name: 'kycReferenceId',
      type: 'text',
      admin: {
        description: 'External KYC provider reference ID',
      },
      access: {
        create: () => false,
        update: isAdmin,
      },
    },
    // Subscription Status
    {
      name: 'subscriptionStatus',
      type: 'select',
      required: true,
      defaultValue: 'none',
      access: {
        create: () => false,
        update: isAdmin,
      },
      options: [
        {
          label: 'None',
          value: 'none',
        },
        {
          label: 'Trial',
          value: 'trial',
        },
        {
          label: 'Active',
          value: 'active',
        },
        {
          label: 'Cancelled',
          value: 'cancelled',
        },
        {
          label: 'Expired',
          value: 'expired',
        },
      ],
    },
    {
      name: 'stripeCustomerId',
      type: 'text',
      admin: {
        description: 'Stripe customer ID',
      },
      access: {
        create: () => false,
        update: isAdmin,
      },
    },
    {
      name: 'stripeSubscriptionId',
      type: 'text',
      admin: {
        description: 'Stripe subscription ID',
      },
      access: {
        create: () => false,
        update: isAdmin,
      },
    },
    {
      name: 'trialStartedAt',
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
      name: 'trialEndsAt',
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
      name: 'subscriptionStartedAt',
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
      name: 'subscriptionCancelledAt',
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
    // Compliance & Audit
    {
      name: 'sebiConsent',
      type: 'checkbox',
      required: true,
      defaultValue: false,
      admin: {
        description: 'User has consented to SEBI RIA terms and disclaimers',
      },
    },
    {
      name: 'privacyConsent',
      type: 'checkbox',
      required: true,
      defaultValue: false,
      admin: {
        description: 'User has consented to privacy policy',
      },
    },
    {
      name: 'lastLoginAt',
      type: 'date',
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
        },
        description: 'Last login timestamp for audit',
      },
      access: {
        create: () => false,
        update: isAdmin,
      },
    },
  ],
  timestamps: true,
}
