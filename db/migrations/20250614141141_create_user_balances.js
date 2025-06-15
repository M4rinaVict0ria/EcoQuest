// migrations/YYYYMMDDHHMMSS_create_user_balances.js
export async function up(knex) {
  await knex.schema.createTable("user_balances", (table) => {
    table.increments("id").primary();
    table.integer("user_id").unsigned().notNullable()
      .references("id").inTable("users").onDelete("CASCADE");
    table.integer("currency_id").unsigned().notNullable()
      .references("id").inTable("currencies").onDelete("CASCADE");
    table.decimal("balance", 14, 4).notNullable().defaultTo(0); // saldo da moeda para o usuário
    table.timestamps(true, true);

    table.unique(["user_id", "currency_id"]); // cada usuário só pode ter um saldo por moeda
  });
}

export async function down(knex) {
  await knex.schema.dropTable("user_balances");
}
