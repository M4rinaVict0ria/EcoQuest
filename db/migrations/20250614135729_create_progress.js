// migrations/YYYYMMDDHHMMSS_create_progress.js
export async function up(knex) {
  await knex.schema.createTable("progress", (table) => {
    table.increments("id").primary();
    table.integer("user_id").unsigned().notNullable()
      .references("id").inTable("users").onDelete("CASCADE");
    table.integer("practice_id").unsigned().notNullable()
      .references("id").inTable("practices").onDelete("CASCADE");
    table.date("completed_at").notNullable(); // quando a prática foi concluída
    table.timestamps(true, true);

    table.unique(["user_id", "practice_id", "completed_at"]); // evita duplicatas no mesmo dia
  });
}

export async function down(knex) {
  await knex.schema.dropTable("progress");
}
