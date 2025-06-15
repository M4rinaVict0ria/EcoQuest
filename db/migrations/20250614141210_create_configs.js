// migrations/YYYYMMDDHHMMSS_create_configs.js
export async function up(knex) {
  await knex.schema.createTable("configs", (table) => {
    table.increments("id").primary();
    table.string("key").notNullable().unique(); // chave da configuração
    table.text("value").notNullable(); // valor da configuração, pode ser JSON serializado
    table.text("description").nullable(); // descrição da config
    table.timestamps(true, true);
  });
}

export async function down(knex) {
  await knex.schema.dropTable("configs");
}
