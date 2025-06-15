// migrations/YYYYMMDDHHMMSS_create_practices.js
export async function up(knex) {
  await knex.schema.createTable("practices", (table) => {
    table.increments("id").primary();
    table.string("title").notNullable();
    table.text("description").notNullable();
    table.integer("xp").notNullable().defaultTo(10); // XP ganho ao concluir a prática
    table.timestamps(true, true);
  });
}

export async function down(knex) {
  await knex.schema.dropTable("practices");
}
