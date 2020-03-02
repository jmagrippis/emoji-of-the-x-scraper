import * as Knex from 'knex'

const TABLE = 'emojis_list'

export async function up(knex: Knex): Promise<any> {
  return knex.schema.createTable(TABLE, function(table) {
    table.increments('id').primary()

    table.string('character', 16).notNullable()

    table.string('name').notNullable()

    table
      .timestamp('created_at')
      .defaultTo(knex.fn.now())
      .index()
  })
}

export async function down(knex: Knex): Promise<any> {
  return knex.schema.dropTable(TABLE)
}
