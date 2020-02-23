import { PoolClient } from 'pg'

const ANCHOR_SQL = `SELECT date_trunc('day', TO_TIMESTAMP($1, 'YYYY/MM/DD')) - interval '1 day' as start,
date_trunc('day', TO_TIMESTAMP($1, 'YYYY/MM/DD')) + interval '2 days' - interval '1 second' as end`

const NOW_SQL = `SELECT date_trunc('day', now()) - interval '1 day' as start,
date_trunc('day', now()) + interval '2 days' - interval '1 second' as end`

export const getStartAndEnd = async (anchor: string, client: PoolClient) => {
  const {
    rows: [{ start, end }],
  } = anchor
    ? await client.query(ANCHOR_SQL, [anchor])
    : await client.query(NOW_SQL)

  return { start, end }
}
