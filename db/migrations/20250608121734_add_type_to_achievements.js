// migrations/YYYYMMDD_add_type_to_achievements.js

export async function up(knex) {
  return knex.schema.alterTable('achievements', (table) => {
    table.string('type').defaultTo('general'); // pode ser 'monthly', 'general', etc.
  });
}

export async function down(knex) {
  return knex.schema.alterTable('achievements', (table) => {
    table.dropColumn('type');
  });
}
