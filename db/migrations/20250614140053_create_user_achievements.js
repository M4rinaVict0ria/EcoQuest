export async function up(knex) {
  await knex.schema.createTable("user_achievements", (table) => {
    table.increments("id").primary();
    table.integer("user_id").unsigned().notNullable()
      .references("id").inTable("users").onDelete("CASCADE");
    table.integer("achievement_id").unsigned().notNullable()
      .references("id").inTable("achievements").onDelete("CASCADE");
    table.date("unlocked_at").notNullable().defaultTo(knex.fn.now());
    table.integer("month").nullable(); // Exemplo: 202306 (YYYYMM)
    table.timestamps(true, true);

    // Índice único considerando o mês para conquistas mensais
    table.unique(["user_id", "achievement_id", "month"], "unique_user_achievement_month");
  });
}

export async function down(knex) {
  await knex.schema.dropTable("user_achievements");
}
