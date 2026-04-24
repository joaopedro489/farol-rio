import { Request } from 'express'

export function extractIp(req: Request): string {
  if (!req?.headers) return ''

  const forwarded = req.headers['forwarded']
  if (forwarded) {
    const ipMatch = forwarded.match(/for=([^;]+)/)
    const ip = ipMatch ? ipMatch[1].replace(/\[|\]/g, '').split(':')[0] : null

    if (ip) return ip
  }

  const xForwardedFor = req.headers['x-forwarded-for']
  if (typeof xForwardedFor == 'string')
    return xForwardedFor.split(',')[0].trim()

  return req.socket?.remoteAddress || ''
}
