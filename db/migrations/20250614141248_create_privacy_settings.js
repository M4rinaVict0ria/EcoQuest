// migrations/YYYYMMDDHHMMSS_create_privacy_settings.js
export async function up(knex) {
  await knex.schema.createTable("privacy_settings", (table) => {
    table.increments("id").primary();
    table.integer("user_id").unsigned().notNullable()
      .references("id").inTable("users").onDelete("CASCADE");

    table.boolean("show_email").notNullable().defaultTo(false);
    table.boolean("show_xp").notNullable().defaultTo(true);
    table.boolean("show_achievements").notNullable().defaultTo(true);
    table.boolean("show_profile_picture").notNullable().defaultTo(true);
    table.boolean("show_friends_list").notNullable().defaultTo(true);

    table.timestamps(true, true);

    table.unique("user_id"); // uma linha por usuário
  });
}

export async function down(knex) {
  await knex.schema.dropTable("privacy_settings");
}
