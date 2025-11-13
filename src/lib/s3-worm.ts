import { S3Client, PutObjectCommand, HeadObjectCommand } from '@aws-sdk/client-s3'
import crypto from 'crypto'

/**
 * S3 WORM (Write Once Read Many) Storage Utility
 * For SEBI compliance: 5-year retention of all client interactions
 */

const s3Client = new S3Client({
  region: process.env.S3_REGION || 'ap-south-1',
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || '',
  },
})

const WORM_BUCKET = process.env.S3_WORM_BUCKET || ''
const RETENTION_DAYS = parseInt(process.env.S3_WORM_RETENTION_DAYS || '1825') // 5 years

export interface WORMArchiveResult {
  key: string
  checksum: string
  archivedAt: Date
  retentionUntil: Date
}

/**
 * Archive data to S3 with WORM compliance
 * @param data - The data to archive (will be JSON stringified)
 * @param category - Category folder (e.g., 'comments', 'kyc-requests', 'zoom-recordings')
 * @param identifier - Unique identifier for this record
 */
export async function archiveToWORM(
  data: any,
  category: string,
  identifier: string
): Promise<WORMArchiveResult> {
  const now = new Date()
  const retentionUntil = new Date(now)
  retentionUntil.setDate(retentionUntil.getDate() + RETENTION_DAYS)

  // Generate key with timestamp for uniqueness
  const timestamp = now.toISOString().replace(/[:.]/g, '-')
  const key = `${category}/${timestamp}_${identifier}.json`

  // Serialize and calculate checksum
  const content = JSON.stringify(data, null, 2)
  const checksum = crypto.createHash('sha256').update(content).digest('hex')

  // Upload to S3 with Object Lock metadata
  await s3Client.send(
    new PutObjectCommand({
      Bucket: WORM_BUCKET,
      Key: key,
      Body: content,
      ContentType: 'application/json',
      Metadata: {
        'x-checksum-sha256': checksum,
        'x-category': category,
        'x-identifier': identifier,
        'x-retention-until': retentionUntil.toISOString(),
      },
      // Object Lock settings (requires bucket to have Object Lock enabled)
      ObjectLockMode: 'COMPLIANCE',
      ObjectLockRetainUntilDate: retentionUntil,
    })
  )

  return {
    key,
    checksum,
    archivedAt: now,
    retentionUntil,
  }
}

/**
 * Verify integrity of archived data
 * @param key - S3 object key
 * @param expectedChecksum - Expected SHA-256 checksum
 */
export async function verifyWORMIntegrity(
  key: string,
  expectedChecksum: string
): Promise<boolean> {
  try {
    const response = await s3Client.send(
      new HeadObjectCommand({
        Bucket: WORM_BUCKET,
        Key: key,
      })
    )

    const storedChecksum = response.Metadata?.[' x-checksum-sha256']
    return storedChecksum === expectedChecksum
  } catch (error) {
    console.error('WORM integrity verification failed:', error)
    return false
  }
}

/**
 * Helper to archive a comment
 */
export async function archiveComment(comment: any) {
  return archiveToWORM(comment, 'comments', comment.id)
}

/**
 * Helper to archive a KYC request
 */
export async function archiveKYCRequest(kycRequest: any) {
  return archiveToWORM(kycRequest, 'kyc-requests', kycRequest.id)
}

/**
 * Helper to archive a portfolio entry
 */
export async function archivePortfolioEntry(entry: any) {
  return archiveToWORM(entry, 'portfolio-entries', entry.id)
}

/**
 * Helper to archive an article
 */
export async function archiveArticle(article: any) {
  return archiveToWORM(article, 'articles', article.id)
}
