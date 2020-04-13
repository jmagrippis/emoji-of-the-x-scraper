import { tweetEmoji } from './tweetEmoji'
import { tweet } from './tweet'
import { EmojiType } from '../generated/graphql'

jest.mock('./tweet', () => ({
  tweet: jest.fn(),
}))
describe('tweetEmoji', () => {
  it('can handle tweeting emojis of the day', () => {
    const emoji = {
      character: '🦴',
      name: 'bone',
      type: EmojiType.Day,
    }
    tweetEmoji(emoji)

    expect(tweet).toBeCalledWith(expect.stringContaining('day'))
    expect(tweet).toBeCalledWith(expect.stringContaining('🦴'))
    expect(tweet).toBeCalledWith(expect.stringContaining('bone'))
    expect(tweet).toBeCalledWith(expect.stringContaining('#emoji_otd_🦴'))
  })

  it('can handle tweeting emojis of the week', () => {
    const emoji = {
      character: '👹',
      name: 'ogre',
      type: EmojiType.Week,
    }
    tweetEmoji(emoji)

    expect(tweet).toBeCalledWith(expect.stringContaining('week'))
    expect(tweet).toBeCalledWith(expect.stringContaining('👹'))
    expect(tweet).toBeCalledWith(expect.stringContaining('ogre'))
    expect(tweet).toBeCalledWith(expect.stringContaining('#emoji_otw_👹'))
  })

  it('can handle tweeting emojis of the month', () => {
    const emoji = {
      character: '👳‍♀️',
      name: 'person wearing turban',
      type: EmojiType.Month,
    }
    tweetEmoji(emoji)

    expect(tweet).toBeCalledWith(expect.stringContaining('month'))
    expect(tweet).toBeCalledWith(expect.stringContaining('👳‍♀️'))
    expect(tweet).toBeCalledWith(
      expect.stringContaining('person wearing turban')
    )
    expect(tweet).toBeCalledWith(expect.stringContaining('#emoji_otm_👳‍♀️'))
  })
})
