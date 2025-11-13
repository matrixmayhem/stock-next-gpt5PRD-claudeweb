import type { Access, FieldAccess } from 'payload'

/**
 * Check if user is admin
 */
export const isAdmin: Access = ({ req: { user } }) => {
  return Boolean(user?.role === 'admin')
}

/**
 * Check if user is logged in
 */
export const isLoggedIn: Access = ({ req: { user } }) => {
  return Boolean(user)
}

/**
 * Check if user has completed KYC verification
 */
export const isKYCVerified: Access = ({ req: { user } }) => {
  return Boolean(user?.kycStatus === 'verified')
}

/**
 * Check if user has an active subscription or trial
 */
export const hasActiveSubscription: Access = ({ req: { user } }) => {
  if (!user) return false
  const status = user.subscriptionStatus
  return status === 'trial' || status === 'active'
}

/**
 * Check if user can access premium content
 * Requirements: KYC verified + active subscription/trial
 */
export const canAccessPremium: Access = ({ req: { user } }) => {
  if (!user) return false
  const isVerified = user.kycStatus === 'verified'
  const hasActiveSub = user.subscriptionStatus === 'trial' || user.subscriptionStatus === 'active'
  return isVerified && hasActiveSub
}

/**
 * Admin or own user
 */
export const isAdminOrSelf: Access = ({ req: { user }, id }) => {
  if (!user) return false
  if (user.role === 'admin') return true
  return user.id === id
}

/**
 * Admin or user can read their own data
 */
export const isAdminOrSelfFieldLevel: FieldAccess = ({ req: { user }, id }) => {
  if (!user) return false
  if (user.role === 'admin') return true
  return user.id === id
}

/**
 * Admin can read/write, verified users can read
 */
export const adminOrKYCVerified: Access = ({ req: { user } }) => {
  if (!user) return false
  if (user.role === 'admin') return true
  return user.kycStatus === 'verified'
}
