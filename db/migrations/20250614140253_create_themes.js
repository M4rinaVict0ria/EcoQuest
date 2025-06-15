// migrations/YYYYMMDDHHMMSS_create_themes.js
export async function up(knex) {
  await knex.schema.createTable("themes", (table) => {
    table.increments("id").primary();
    table.string("name").notNullable();
    table.string("primary_color").notNullable(); // cor principal, ex: '#00FF00'
    table.string("secondary_color").nullable(); // cor secundária
    table.text("description").nullable();
    table.timestamps(true, true);
  });
}

export async function down(knex) {
  await knex.schema.dropTable("themes");
}
