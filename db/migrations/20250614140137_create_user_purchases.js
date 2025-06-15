// migrations/YYYYMMDDHHMMSS_create_user_purchases.js
export async function up(knex) {
  await knex.schema.createTable("user_purchases", (table) => {
    table.increments("id").primary();
    table.integer("user_id").unsigned().notNullable()
      .references("id").inTable("users").onDelete("CASCADE");
    table.integer("store_item_id").unsigned().notNullable()
      .references("id").inTable("store").onDelete("CASCADE");
    table.timestamp("purchased_at").defaultTo(knex.fn.now());
    table.integer("price_paid").notNullable(); // preço pago na compra (pode variar)
    table.timestamps(true, true);

    table.unique(["user_id", "store_item_id"]); // evita compras repetidas do mesmo item
  });
}

export async function down(knex) {
  await knex.schema.dropTable("user_purchases");
}
