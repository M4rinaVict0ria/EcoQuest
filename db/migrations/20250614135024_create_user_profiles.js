export async function up(knex) {
  return knex.schema.createTable("user_profiles", (table) => {
    table.increments("id").primary();
    table.integer("user_id").unsigned().notNullable().references("id").inTable("users").onDelete("CASCADE");
    table.string("profile_picture").nullable(); // url ou nome da imagem
    table.string("banner").nullable(); // url ou nome da imagem
    table.string("frame").nullable(); // nome da moldura
    table.string("profile_color").nullable(); // cor do perfil, ex: '#00FF00'
    table.timestamps(true, true);
  });
}

export async function down(knex) {
  return knex.schema.dropTable('user_profiles');
}
