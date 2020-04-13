import { Emoji, EmojiType } from '../generated/graphql'
import { tweet } from './tweet'

const getHashtag = ({
  character,
  type,
}: Pick<Emoji, 'character' | 'type'>): string => {
  switch (type) {
    case EmojiType.Month:
      return `#emoji_otm_${character}`
    case EmojiType.Week:
      return `#emoji_otw_${character}`
    case EmojiType.Day:
      return `#emoji_otd_${character}`
    default:
      return `#emoji_${character}`
  }
}

export const tweetEmoji = (
  emoji: Pick<Emoji, 'character' | 'name' | 'type'>
) => {
  const status = `The emoji of the ${emoji.type} is ${emoji.character}! Let "${
    emoji.name
  }" guide you and share your own content with ${getHashtag(emoji)}`

  return tweet(status)
}
