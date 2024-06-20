import { hc } from 'hono/client'

import { AppType } from '@/app/api/[[...route]]/route'

export const client = hc<AppType>(process.env.NETX_PUBLIC_APP_URL!)
