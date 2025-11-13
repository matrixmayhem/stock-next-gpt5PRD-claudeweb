import type { GlobalConfig } from 'payload'
import { isAdmin } from '../access'

export const LegalPages: GlobalConfig = {
  slug: 'legal-pages',
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
          label: 'Privacy Policy',
          fields: [
            {
              name: 'privacy',
              type: 'group',
              fields: [
                {
                  name: 'title',
                  type: 'text',
                  defaultValue: 'Privacy Policy',
                },
                {
                  name: 'lastUpdated',
                  type: 'date',
                  required: true,
                  admin: {
                    description: 'Last updated date',
                  },
                },
                {
                  name: 'content',
                  type: 'richText',
                  required: true,
                  admin: {
                    description: 'Privacy policy content',
                  },
                },
              ],
            },
          ],
        },
        {
          label: 'Terms of Service',
          fields: [
            {
              name: 'terms',
              type: 'group',
              fields: [
                {
                  name: 'title',
                  type: 'text',
                  defaultValue: 'Terms of Service',
                },
                {
                  name: 'lastUpdated',
                  type: 'date',
                  required: true,
                  admin: {
                    description: 'Last updated date',
                  },
                },
                {
                  name: 'content',
                  type: 'richText',
                  required: true,
                  admin: {
                    description: 'Terms of service content - include SEBI-specific clauses',
                  },
                },
              ],
            },
          ],
        },
        {
          label: 'Investment Advisory Agreement',
          fields: [
            {
              name: 'advisoryAgreement',
              type: 'group',
              fields: [
                {
                  name: 'title',
                  type: 'text',
                  defaultValue: 'Investment Advisory Agreement',
                },
                {
                  name: 'lastUpdated',
                  type: 'date',
                  required: true,
                },
                {
                  name: 'content',
                  type: 'richText',
                  required: true,
                  admin: {
                    description: 'SEBI-compliant advisory agreement',
                  },
                },
              ],
            },
          ],
        },
        {
          label: 'Refund & Cancellation',
          fields: [
            {
              name: 'refund',
              type: 'group',
              fields: [
                {
                  name: 'title',
                  type: 'text',
                  defaultValue: 'Refund & Cancellation Policy',
                },
                {
                  name: 'lastUpdated',
                  type: 'date',
                  required: true,
                },
                {
                  name: 'content',
                  type: 'richText',
                  required: true,
                },
              ],
            },
          ],
        },
        {
          label: 'Grievance Redressal',
          fields: [
            {
              name: 'grievance',
              type: 'group',
              fields: [
                {
                  name: 'title',
                  type: 'text',
                  defaultValue: 'Grievance Redressal',
                },
                {
                  name: 'lastUpdated',
                  type: 'date',
                  required: true,
                },
                {
                  name: 'content',
                  type: 'richText',
                  required: true,
                  admin: {
                    description: 'SEBI-mandated grievance redressal mechanism',
                  },
                },
                {
                  name: 'officer',
                  type: 'group',
                  fields: [
                    {
                      name: 'name',
                      type: 'text',
                      required: true,
                    },
                    {
                      name: 'email',
                      type: 'email',
                      required: true,
                    },
                    {
                      name: 'phone',
                      type: 'text',
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}
