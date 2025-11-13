import type { CollectionConfig } from 'payload'
import { isAdmin, isLoggedIn } from '../access'

export const Sectors: CollectionConfig = {
  slug: 'sectors',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'slug', 'updatedAt'],
  },
  access: {
    read: () => true, // Public
    create: isAdmin,
    update: isAdmin,
    delete: isAdmin,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        description: 'Sector name (e.g., Information Technology, Banking, Pharmaceuticals)',
      },
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        description: 'URL-friendly slug (e.g., information-technology)',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      admin: {
        description: 'Brief description of the sector',
      },
    },
    {
      name: 'icon',
      type: 'text',
      admin: {
        description: 'Icon name or URL for sector representation',
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
  ],
  timestamps: true,
}
