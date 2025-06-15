export async function up(knex) {
  const hasColumn = await knex.schema.hasColumn('quests', 'type');
  if (!hasColumn) {
    return knex.schema.alterTable('quests', (table) => {
      table.string('type').defaultTo('daily');
    });
  }
}

export async function down(knex) {
  const hasColumn = await knex.schema.hasColumn('quests', 'type');
  if (hasColumn) {
    return knex.schema.alterTable('quests', (table) => {
      table.dropColumn('type');
    });
  }
}
