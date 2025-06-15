// migrations/YYYYMMDDHHMMSS_create_store.js
export async function up(knex) {
  await knex.schema.createTable("store", (table) => {
    table.increments("id").primary();
    table.string("name").notNullable(); // nome do item
    table.text("description").nullable(); // descrição opcional
    table.enum("type", ["banner", "frame", "profile_picture"]).notNullable();
    table.string("image").nullable(); // caminho ou URL da imagem
    table.integer("price").notNullable().defaultTo(0); // custo em XP
    table.timestamps(true, true);
  });
}

export async function down(knex) {
  await knex.schema.dropTable("store");
}
