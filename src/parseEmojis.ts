type ParsedEmoji = {
  character: string
  name: string
}

const EMOJI_CAPTURE_REGEX = /<td class=['"]chars['"]>(.+?)<\/td>(.|\n|\r)+?<td class=['"]name['"]>(.+?)<\/td>/gi

export const parseEmojis = (html: string): ParsedEmoji[] =>
  [...html.matchAll(EMOJI_CAPTURE_REGEX)].reduce<ParsedEmoji[]>(
    (acc, [, character, , name]) => {
      if (character !== '🦭') {
        acc.push({ character, name })
      }
      return acc
    },
    []
  )
