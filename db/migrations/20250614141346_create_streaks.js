// migrations/YYYYMMDDHHMMSS_create_streaks.js
export async function up(knex) {
  await knex.schema.createTable("streaks", (table) => {
    table.increments("id").primary();
    table.integer("user_id").unsigned().notNullable()
      .references("id").inTable("users").onDelete("CASCADE");
    table.integer("current_streak").unsigned().defaultTo(0);
    table.date("last_date").nullable();
    table.timestamps(true, true);

    table.unique("user_id"); // uma linha por usuário
  });
}

export async function down(knex) {
  await knex.schema.dropTable("streaks");
}
