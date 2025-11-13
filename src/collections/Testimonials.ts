import type { CollectionConfig } from 'payload'
import { isAdmin } from '../access'

export const Testimonials: CollectionConfig = {
  slug: 'testimonials',
  admin: {
    useAsTitle: 'clientName',
    defaultColumns: ['clientName', 'rating', 'isPublished', 'createdAt'],
  },
  access: {
    read: ({ data }) => {
      // Published testimonials are public
      return data?.isPublished === true
    },
    create: isAdmin,
    update: isAdmin,
    delete: isAdmin,
  },
  fields: [
    {
      name: 'clientName',
      type: 'text',
      required: true,
      admin: {
        description: 'Client name or initials (e.g., "R.K." or "Rajesh Kumar")',
      },
    },
    {
      name: 'clientDesignation',
      type: 'text',
      admin: {
        description: 'Optional designation (e.g., "Software Engineer, Bangalore")',
      },
    },
    {
      name: 'content',
      type: 'textarea',
      required: true,
      maxLength: 500,
      admin: {
        description: 'Testimonial text (max 500 characters)',
      },
    },
    {
      name: 'rating',
      type: 'number',
      min: 1,
      max: 5,
      admin: {
        description: 'Star rating (1-5)',
      },
    },
    {
      name: 'isPublished',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Show on public website',
      },
    },
    {
      name: 'order',
      type: 'number',
      defaultValue: 0,
      admin: {
        description: 'Display order (lower numbers appear first)',
      },
    },
    {
      name: 'user',
      type: 'relationship',
      relationTo: 'users',
      admin: {
        description: 'Link to user account (optional, for verification)',
      },
    },
  ],
  timestamps: true,
}
