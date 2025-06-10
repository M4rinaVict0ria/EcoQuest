export async function up(knex) {
  return knex.schema.createTable('quests', (table) => {
    table.increments('id').primary();
    table.string('title');
    table.text('description');
    table.boolean('completed').defaultTo(false);
    table.timestamp('completed_at').nullable();
    table.integer('user_id').unsigned().references('id').inTable('users');
    table.timestamps(true, true);
  });
}

export async function down(knex) {
  return knex.schema.dropTable('quests');
}
