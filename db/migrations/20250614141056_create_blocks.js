// migrations/YYYYMMDDHHMMSS_create_blocks.js
export async function up(knex) {
  await knex.schema.createTable("blocks", (table) => {
    table.increments("id").primary();
    table.integer("blocker_id").unsigned().notNullable()
      .references("id").inTable("users").onDelete("CASCADE");
    table.integer("blocked_id").unsigned().notNullable()
      .references("id").inTable("users").onDelete("CASCADE");
    table.timestamps(true, true);

    table.unique(["blocker_id", "blocked_id"]); // evita bloqueios duplicados
  });
}

export async function down(knex) {
  await knex.schema.dropTable("blocks");
}
