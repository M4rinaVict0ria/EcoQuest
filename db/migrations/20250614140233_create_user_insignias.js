// migrations/YYYYMMDDHHMMSS_create_user_insignias.js
export async function up(knex) {
  await knex.schema.createTable("user_insignias", (table) => {
    table.increments("id").primary();
    table.integer("user_id").unsigned().notNullable()
      .references("id").inTable("users").onDelete("CASCADE");
    table.integer("insignia_id").unsigned().notNullable()
      .references("id").inTable("insignias").onDelete("CASCADE");
    table.date("unlocked_at").notNullable().defaultTo(knex.fn.now());
    table.timestamps(true, true);

    table.unique(["user_id", "insignia_id"]); // evita duplicações
  });
}

export async function down(knex) {
  await knex.schema.dropTable("user_insignias");
}
