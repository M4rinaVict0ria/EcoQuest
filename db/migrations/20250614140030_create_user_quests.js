// migrations/YYYYMMDDHHMMSS_create_user_quests.js
export async function up(knex) {
  await knex.schema.createTable("user_quests", (table) => {
    table.increments("id").primary();
    table.integer("user_id").unsigned().notNullable()
      .references("id").inTable("users").onDelete("CASCADE");
    table.integer("quest_id").unsigned().notNullable()
      .references("id").inTable("quests").onDelete("CASCADE");
    table.boolean("completed").defaultTo(false); // indica se foi concluída
    table.date("completed_at").nullable(); // data de conclusão (se aplicável)
    table.timestamps(true, true);

    table.unique(["user_id", "quest_id"]); // um usuário só pode ter uma entrada por missão
  });
}

export async function down(knex) {
  await knex.schema.dropTable("user_quests");
}
