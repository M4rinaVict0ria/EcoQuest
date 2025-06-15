export function up(knex) {
  return knex.schema.createTable('users', (table) => {
    table.increments('id').primary();
    table.string('name');
    table.string('username').notNullable().unique();
    table.string('email').notNullable().unique();
    table.string('password').notNullable().defaultTo('123456');
    table.string('role').defaultTo('user'); // admin/parcial/user
    table.integer('xp').defaultTo(0);
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').nullable();

    table.index(['email', 'password'], 'login');
    table.index(['username'], 'name');
    table.unique(['email'], 'unique_email');
  });
}

export function down(knex) {
  return knex.schema.dropTableIfExists('users');
}
