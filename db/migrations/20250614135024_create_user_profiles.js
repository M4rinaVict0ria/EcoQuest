export async function up(knex) {
  return knex.schema.createTable("user_profiles", (table) => {
    table.increments("id").primary();
    table.integer("user_id").unsigned().notNullable().references("id").inTable("users").onDelete("CASCADE");
    table.string("profile_picture").nullable(); // url ou nome da imagem
    table.string("banner").nullable(); // url ou nome da imagem
    table.string("frame").nullable(); // nome da moldura
    table.string("profile_color").nullable(); // cor do perfil, ex: '#00FF00'
    table.timestamps(true, true);
    table.integer('eco_points').defaultTo(0);
    table.integer('flora_coins').defaultTo(0);
    table.boolean('is_private').defaultTo(false);
    table.integer('current_streak').defaultTo(0);

  });
}

export async function down(knex) {
  return knex.schema.dropTable('user_profiles');
}
