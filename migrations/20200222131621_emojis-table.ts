import * as Knex from 'knex'

const EMOJIS = 'emojis'

export async function up(knex: Knex): Promise<any> {
  return knex.schema
    .raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";')
    .raw('CREATE EXTENSION IF NOT EXISTS "fuzzystrmatch";')
    .createTable(EMOJIS, function(table) {
      table
        .uuid('id')
        .notNullable()
        .primary()
        .defaultTo(knex.raw('uuid_generate_v4()'))

      table.string('character', 8).notNullable()

      table.string('name').notNullable()

      table
        .timestamp('created_at')
        .defaultTo(knex.fn.now())
        .index()
    })
}

export async function down(knex: Knex): Promise<any> {
  return knex.schema.dropTable(EMOJIS)
}
