export async function up(knex) {
  return knex.schema.createTable('achievements', (table) => {
    table.increments('id').primary();
    table.string('name');
    table.text('description');
    table.timestamps(true, true);
  });
}

export async function down(knex) {
  return knex.schema.dropTable('achievements');
}
