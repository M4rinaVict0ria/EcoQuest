export async function up(knex) {
  return knex.schema.createTable('quests', (table) => {
    table.increments('id').primary();
    table.string('title').notNullable();
    table.text('description');
    table.string('type').notNullable().defaultTo('daily'); // ex: daily, weekly, monthly
    table.integer('xp_bonus').defaultTo(0);
    table.timestamps(true, true);
  });
}

export async function down(knex) {
  return knex.schema.dropTable('quests');
}
