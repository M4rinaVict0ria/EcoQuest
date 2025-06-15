// migrations/YYYYMMDDHHMMSS_create_notifications.js
export async function up(knex) {
  await knex.schema.createTable("notifications", (table) => {
    table.increments("id").primary();
    table.integer("user_id").unsigned().notNullable()
      .references("id").inTable("users").onDelete("CASCADE");
    table.string("title").notNullable();
    table.text("message").notNullable();
    table.boolean("read").defaultTo(false);
    table.timestamp("sent_at").defaultTo(knex.fn.now());
    table.timestamps(true, true);
  });
}

export async function down(knex) {
  await knex.schema.dropTable("notifications");
}
