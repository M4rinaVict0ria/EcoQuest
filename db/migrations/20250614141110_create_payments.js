// migrations/YYYYMMDDHHMMSS_create_payments.js
export async function up(knex) {
  await knex.schema.createTable("payments", (table) => {
    table.increments("id").primary();
    table.date("date").notNullable();
    table.string("receipt").notNullable().unique();
    table.decimal("amount", 10, 2).notNullable(); // valor pago
    table.text("note").nullable(); // observações
    table.timestamps(true, true);
  });
}

export async function down(knex) {
  await knex.schema.dropTable("payments");
}
