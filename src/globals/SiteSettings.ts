import type { GlobalConfig } from 'payload'
import { isAdmin } from '../access'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  admin: {
    group: 'Settings',
  },
  access: {
    read: () => true,
    update: isAdmin,
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'General',
          fields: [
            {
              name: 'siteName',
              type: 'text',
              required: true,
              defaultValue: 'TransparentLogbook',
            },
            {
              name: 'tagline',
              type: 'text',
              defaultValue: 'Transparent Investment Advisory for Aspiring Strategists',
            },
            {
              name: 'logo',
              type: 'upload',
              relationTo: 'media',
            },
            {
              name: 'favicon',
              type: 'upload',
              relationTo: 'media',
            },
          ],
        },
        {
          label: 'Homepage',
          fields: [
            {
              name: 'hero',
              type: 'group',
              fields: [
                {
                  name: 'headline',
                  type: 'text',
                  required: true,
                  defaultValue: 'Learn the Why Behind Every Investment Decision',
                },
                {
                  name: 'subheadline',
                  type: 'textarea',
                  defaultValue: 'A transparent, education-first investment advisory for retail investors who want to understand the methodology, not just follow tips.',
                },
                {
                  name: 'ctaText',
                  type: 'text',
                  defaultValue: 'Start 1-Month Free Trial',
                },
                {
                  name: 'heroImage',
                  type: 'upload',
                  relationTo: 'media',
                },
              ],
            },
            {
              name: 'featuredContent',
              type: 'group',
              fields: [
                {
                  name: 'showPortfolioFlash',
                  type: 'checkbox',
                  defaultValue: true,
                  admin: {
                    description: 'Show monthly portfolio performance flash in sidebar',
                  },
                },
                {
                  name: 'showNewsTicker',
                  type: 'checkbox',
                  defaultValue: true,
                  admin: {
                    description: 'Show news & analysis ticker in sidebar',
                  },
                },
              ],
            },
          ],
        },
        {
          label: 'Trial & Subscription',
          fields: [
            {
              name: 'trial',
              type: 'group',
              fields: [
                {
                  name: 'duration',
                  type: 'number',
                  required: true,
                  defaultValue: 30,
                  admin: {
                    description: 'Trial duration in days',
                  },
                },
                {
                  name: 'description',
                  type: 'richText',
                  defaultValue: [
                    {
                      children: [
                        {
                          text: 'Try TransparentLogbook risk-free for 1 month. Full access to all content, portfolio insights, and member discussions.',
                        },
                      ],
                    },
                  ],
                },
                {
                  name: 'requiresKYC',
                  type: 'checkbox',
                  defaultValue: true,
                  admin: {
                    description: 'Require KYC verification to start trial',
                  },
                },
              ],
            },
            {
              name: 'pricing',
              type: 'group',
              fields: [
                {
                  name: 'monthlyPrice',
                  type: 'number',
                  required: true,
                  defaultValue: 999,
                  admin: {
                    description: 'Monthly subscription price (INR)',
                  },
                },
                {
                  name: 'annualPrice',
                  type: 'number',
                  required: true,
                  defaultValue: 9999,
                  admin: {
                    description: 'Annual subscription price (INR)',
                  },
                },
              ],
            },
          ],
        },
        {
          label: 'SEBI Compliance',
          fields: [
            {
              name: 'sebi',
              type: 'group',
              fields: [
                {
                  name: 'registrationNumber',
                  type: 'text',
                  required: true,
                  admin: {
                    description: 'SEBI RIA registration number',
                  },
                },
                {
                  name: 'registeredEntity',
                  type: 'text',
                  required: true,
                  admin: {
                    description: 'Registered entity name',
                  },
                },
                {
                  name: 'disclaimer',
                  type: 'richText',
                  required: true,
                  admin: {
                    description: 'SEBI disclaimer (displayed in footer and key pages)',
                  },
                },
                {
                  name: 'riskWarning',
                  type: 'richText',
                  required: true,
                  admin: {
                    description: 'Investment risk warning',
                  },
                },
              ],
            },
          ],
        },
        {
          label: 'Contact',
          fields: [
            {
              name: 'contact',
              type: 'group',
              fields: [
                {
                  name: 'email',
                  type: 'email',
                  required: true,
                },
                {
                  name: 'phone',
                  type: 'text',
                },
                {
                  name: 'address',
                  type: 'textarea',
                  admin: {
                    description: 'Business address',
                  },
                },
                {
                  name: 'supportEmail',
                  type: 'email',
                  admin: {
                    description: 'Support email address',
                  },
                },
              ],
            },
          ],
        },
        {
          label: 'Social Media',
          fields: [
            {
              name: 'social',
              type: 'group',
              fields: [
                {
                  name: 'twitter',
                  type: 'text',
                },
                {
                  name: 'linkedin',
                  type: 'text',
                },
                {
                  name: 'youtube',
                  type: 'text',
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}
