// migrations/YYYYMMDDHHMMSS_create_user_rewards.js
export async function up(knex) {
  await knex.schema.createTable("user_rewards", (table) => {
    table.increments("id").primary();
    table.integer("user_id").unsigned().notNullable()
      .references("id").inTable("users").onDelete("CASCADE");
    table.integer("reward_id").unsigned().notNullable()
      .references("id").inTable("rewards").onDelete("CASCADE");
    table.boolean("equipped").defaultTo(false); // indica se está equipada
    table.timestamps(true, true);

    table.unique(["user_id", "reward_id"]); // evita repetição da mesma recompensa
  });
}

export async function down(knex) {
  await knex.schema.dropTable("user_rewards");
}
