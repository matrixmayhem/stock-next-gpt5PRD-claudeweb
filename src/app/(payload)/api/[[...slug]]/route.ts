/* THIS FILE WAS GENERATED AUTOMATICALLY BY PAYLOAD. */
import type { NextRequest } from 'next/server'

import config from '@payload-config'
import { REST_DELETE, REST_GET, REST_PATCH, REST_POST } from '@payloadcms/next/routes'

export const GET = (req: NextRequest) =>
  REST_GET({
    config,
    req,
  })

export const POST = (req: NextRequest) =>
  REST_POST({
    config,
    req,
  })

export const DELETE = (req: NextRequest) =>
  REST_DELETE({
    config,
    req,
  })

export const PATCH = (req: NextRequest) =>
  REST_PATCH({
    config,
    req,
  })
