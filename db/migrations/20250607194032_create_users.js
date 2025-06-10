export async function up(knex) {
  return knex.schema.createTable('users', function (table) {
    table.increments('id').primary();
    table.string('name');
  });
}

export async function down(knex) {
  return knex.schema.dropTable('users');
}
