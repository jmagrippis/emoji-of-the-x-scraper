import crypto from 'crypto'
import OAuth from 'oauth-1.0a'

const hash = (data: crypto.BinaryLike, key: crypto.BinaryLike) =>
  crypto
    .createHmac('sha1', key)
    .update(data)
    .digest('base64')

if (!process.env.TWITTER_API_KEY || process.env.TWITTER_API_SECRET) {
  console.log('twitter environment variables not set')
}

export const oauth = new OAuth({
  consumer: {
    key: process.env.TWITTER_API_KEY,
    secret: process.env.TWITTER_API_SECRET,
  },
  signature_method: 'HMAC-SHA1',
  hash_function: hash,
})
