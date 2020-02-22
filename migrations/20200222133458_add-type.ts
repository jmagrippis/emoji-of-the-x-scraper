import * as Knex from 'knex'

const EMOJIS = 'emojis'

const TYPE = 'type'

export async function up(knex: Knex): Promise<any> {
  return knex.schema.table(EMOJIS, function(table) {
    table
      .enu(TYPE, ['hour', 'day', 'week', 'month', 'year'])
      .notNullable()
      .index()
  })
}

export async function down(knex: Knex): Promise<any> {
  return knex.schema.table(EMOJIS, function(table) {
    table.dropColumn(TYPE)
  })
}
