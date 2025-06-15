// migrations/YYYYMMDDHHMMSS_create_currencies.js
export async function up(knex) {
  await knex.schema.createTable("currencies", (table) => {
    table.increments("id").primary();
    table.string("name").notNullable().unique(); // nome da moeda, ex: "XP"
    table.string("symbol").nullable(); // símbolo, ex: "₳"
    table.text("description").nullable();
    table.timestamps(true, true);
  });
}

export async function down(knex) {
  await knex.schema.dropTable("currencies");
}
