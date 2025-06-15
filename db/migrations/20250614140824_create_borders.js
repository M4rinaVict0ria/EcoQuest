// migrations/YYYYMMDDHHMMSS_create_borders.js
export async function up(knex) {
  await knex.schema.createTable("borders", (table) => {
    table.increments("id").primary();
    table.string("name").notNullable();
    table.string("image").notNullable(); // caminho ou URL da imagem da moldura
    table.text("description").nullable();
    table.integer("xp_cost").defaultTo(0); // XP necessário para desbloquear
    table.timestamps(true, true);
  });
}

export async function down(knex) {
  await knex.schema.dropTable("borders");
}
