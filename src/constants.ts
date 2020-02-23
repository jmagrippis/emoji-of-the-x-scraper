export enum EmojiType {
  hour = 'hour',
  day = 'day',
  week = 'week',
  month = 'month',
  year = 'year',
}

export type Emoji = {
  character: string
  name: string
  type: EmojiType
  created_at: string
}
