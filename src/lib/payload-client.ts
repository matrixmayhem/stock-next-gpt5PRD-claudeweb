import { getPayload } from 'payload'
import config from '@payload-config'

let cachedPayload: any = null

/**
 * Get Payload instance (singleton pattern for Next.js)
 */
export async function getPayloadClient() {
  if (cachedPayload) {
    return cachedPayload
  }

  cachedPayload = await getPayload({ config })
  return cachedPayload
}

/**
 * Fetch site settings
 */
export async function getSiteSettings() {
  const payload = await getPayloadClient()
  const settings = await payload.findGlobal({
    slug: 'site-settings',
  })
  return settings
}

/**
 * Fetch legal pages
 */
export async function getLegalPages() {
  const payload = await getPayloadClient()
  const legal = await payload.findGlobal({
    slug: 'legal-pages',
  })
  return legal
}

/**
 * Fetch current user from request
 */
export async function getCurrentUser(req?: any) {
  if (!req) return null

  const payload = await getPayloadClient()
  const { user } = await payload.auth({ headers: req.headers })
  return user
}

/**
 * Check if user can access premium content
 */
export function canAccessPremium(user: any): boolean {
  if (!user) return false
  const isVerified = user.kycStatus === 'verified'
  const hasActiveSub = user.subscriptionStatus === 'trial' || user.subscriptionStatus === 'active'
  return isVerified && hasActiveSub
}

/**
 * Format date for display
 */
export function formatDate(date: string | Date): string {
  return new Date(date).toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

/**
 * Truncate text with ellipsis
 */
export function truncate(text: string, length: number): string {
  if (text.length <= length) return text
  return text.substring(0, length) + '...'
}
