type ParsedEmoji = {
  character: string
  name: string
}

const EMOJI_CAPTURE_REGEX = /<td class=['"]chars['"]>(.+?)<\/td>(.|\n|\r)+?<td class=['"]name['"]>(.+?)<\/td>/gi

export const parseEmojis = (html: string): ParsedEmoji[] =>
  [...html.matchAll(EMOJI_CAPTURE_REGEX)].map(([, character, , name]) => ({
    character,
    name,
  }))
