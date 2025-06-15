// migrations/YYYYMMDDHHMMSS_create_profile_images.js
export async function up(knex) {
  await knex.schema.createTable("profile_images", (table) => {
    table.increments("id").primary();
    table.string("name").notNullable();
    table.string("image").notNullable(); // caminho ou URL da imagem do perfil
    table.text("description").nullable();
    table.integer("xp_cost").defaultTo(0); // XP necessário para desbloquear
    table.timestamps(true, true);
  });
}

export async function down(knex) {
  await knex.schema.dropTable("profile_images");
}
