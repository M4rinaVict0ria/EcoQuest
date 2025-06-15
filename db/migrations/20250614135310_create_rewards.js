// migrations/YYYYMMDDHHMMSS_create_rewards.js
export async function up(knex) {
  await knex.schema.createTable("rewards", (table) => {
    table.increments("id").primary();
    table.string("name").notNullable();
    table.text("description").nullable();
    table.enum("type", ["banner", "frame", "profile_picture"]).notNullable();
    table.string("image").nullable(); // url ou nome da imagem
    table.integer("xp_cost").notNullable().defaultTo(0); // custo em XP para desbloquear
    table.timestamps(true, true);
  });
}

export async function down(knex) {
  await knex.schema.dropTable("rewards");
}
