import { EmojiType } from '../generated/graphql'

export const typeToAnchor = {
  [EmojiType.Day]: "TO_CHAR(created_at, 'YYYY/MM/DD')",
  [EmojiType.Week]: "TO_CHAR(created_at, 'YYYY/WW')",
  [EmojiType.Month]: "TO_CHAR(created_at, 'YYYY/MM')",
}
