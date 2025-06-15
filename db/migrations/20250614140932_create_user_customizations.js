// migrations/YYYYMMDDHHMMSS_create_user_customizations.js
export async function up(knex) {
  await knex.schema.createTable("user_customizations", (table) => {
    table.increments("id").primary();
    table.integer("user_id").unsigned().notNullable()
      .references("id").inTable("users").onDelete("CASCADE");
    
    // Referências para os itens de customização
    table.integer("banner_id").unsigned().nullable()
      .references("id").inTable("banners").onDelete("SET NULL");
    table.integer("border_id").unsigned().nullable()
      .references("id").inTable("borders").onDelete("SET NULL");
    table.integer("profile_image_id").unsigned().nullable()
      .references("id").inTable("profile_images").onDelete("SET NULL");
    
    table.timestamps(true, true);

    // Um usuário deve ter só uma linha de customizações ativas
    table.unique("user_id");
  });
}

export async function down(knex) {
  await knex.schema.dropTable("user_customizations");
}
