// db/migrations/xxxx_add_type_to_quests.js

export async function up(knex) {
  return knex.schema.alterTable('quests', (table) => {
    table.string('type').defaultTo('daily');
  });
}

export async function down(knex) {
  return knex.schema.alterTable('quests', (table) => {
    table.dropColumn('type');
  });
}
