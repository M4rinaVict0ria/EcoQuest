// migrations/YYYYMMDDHHMMSS_create_user_achievements.js
export async function up(knex) {
  await knex.schema.createTable("user_achievements", (table) => {
    table.increments("id").primary();
    table.integer("user_id").unsigned().notNullable()
      .references("id").inTable("users").onDelete("CASCADE");
    table.integer("achievement_id").unsigned().notNullable()
      .references("id").inTable("achievements").onDelete("CASCADE");
    table.date("unlocked_at").notNullable().defaultTo(knex.fn.now());
    table.timestamps(true, true);

    table.unique(["user_id", "achievement_id"]); // evita duplicatas
  });
}

export async function down(knex) {
  await knex.schema.dropTable("user_achievements");
}
