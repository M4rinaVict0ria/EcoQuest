// migrations/YYYYMMDDHHMMSS_create_followers.js
export async function up(knex) {
  return knex.schema.createTable("followers", (table) => {
    table.increments("id").primary();
    table.integer("following_user_id").unsigned().notNullable()
      .references("id").inTable("users").onDelete("CASCADE");
    table.integer("followed_user_id").unsigned().notNullable()
      .references("id").inTable("users").onDelete("CASCADE");
    table.timestamps(true, true);
    
    table.unique(["following_user_id", "followed_user_id"]); // evita duplicidade
  });
}

export async function down(knex) {
  return knex.schema.dropTable("followers");
}
