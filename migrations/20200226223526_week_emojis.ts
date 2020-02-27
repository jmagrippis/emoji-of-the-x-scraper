import * as Knex from 'knex'

const TABLE = 'week_emojis'

export async function up(knex: Knex): Promise<any> {
  await knex.schema.createTable(TABLE, function(table) {
    table.increments('id').primary()

    table.string('character', 16).notNullable()

    table.string('name').notNullable()

    table
      .timestamp('created_at')
      .defaultTo(knex.fn.now())
      .index()
  })

  const rows = await knex
    .select('character')
    .select('name')
    .select('created_at')
    .from('emojis')
    .where('emojis.type', '=', 'week')

  return knex.batchInsert(TABLE, rows)
}

export async function down(knex: Knex): Promise<any> {
  return knex.schema.dropTable(TABLE)
}
