export async function up(knex) {
  return knex.schema.createTable('achievements', (table) => {
    table.increments('id').primary();
    table.string('title');
    table.text('description');
    table.boolean('is_monthly');
    table.timestamps(true, true);
  });
}

export async function down(knex) {
  return knex.schema.dropTable('achievements');
}
