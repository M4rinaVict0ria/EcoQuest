// migrations/YYYYMMDDHHMMSS_create_user_streaks.js
export async function up(knex) {
  await knex.schema.createTable("user_streaks", (table) => {
    table.increments("id").primary();
    table.integer("user_id").unsigned().notNullable()
      .references("id").inTable("users").onDelete("CASCADE");
    table.integer("current_streak").unsigned().defaultTo(0);
    table.date("last_active_date").nullable();
    table.timestamps(true, true);

    table.unique("user_id"); // um registro por usuário
  });
}

export async function down(knex) {
  await knex.schema.dropTable("user_streaks");
}
