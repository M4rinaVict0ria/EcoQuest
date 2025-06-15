// migrations/YYYYMMDDHHMMSS_create_insignias.js
export async function up(knex) {
  await knex.schema.createTable("insignias", (table) => {
    table.increments("id").primary();
    table.string("name").notNullable();
    table.text("description").nullable();
    table.string("image").nullable(); // URL ou caminho da imagem da insígnia
    table.timestamps(true, true);
  });
}

export async function down(knex) {
  await knex.schema.dropTable("insignias");
}
