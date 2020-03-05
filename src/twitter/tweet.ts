import { URLSearchParams } from 'url'
import fetch from 'node-fetch'

import { oauth } from './oauth'

const STATUS_UPDATE_URI = 'https://api.twitter.com/1.1/statuses/update.json'
const METHOD = 'POST'

const getAuthorizationHeader = (status: string) => {
  if (
    !process.env.TWITTER_ACCESS_TOKEN ||
    !process.env.TWITTER_ACCESS_TOKEN_SECRET
  ) {
    return ''
  }

  const requestData = {
    url: STATUS_UPDATE_URI,
    method: METHOD,
    data: { status },
  }

  const token = {
    key: process.env.TWITTER_ACCESS_TOKEN,
    secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
  }

  return oauth.toHeader(oauth.authorize(requestData, token))['Authorization']
}

export const tweet = async (status: string) => {
  const Authorization = getAuthorizationHeader(status)

  if (!Authorization) {
    console.log('cannot authorize with Twitter. Would have tweeted:')
    console.log(status)
    return
  }

  const body = new URLSearchParams()
  body.append('status', status)

  fetch(STATUS_UPDATE_URI, {
    method: METHOD,
    headers: {
      Authorization: getAuthorizationHeader(status),
    },
    body,
  })
    .then(res => {
      if (!res.ok) {
        throw new Error(res.statusText)
      }

      console.log('status tweeted successfully')
    })
    .catch((err: Error) => {
      console.error(err)
    })
}
