import knex from '../db/connection.js';

const tableName = 'insignias';

const InsigniasModel = {
  async getAll() {
    return knex(tableName).select('*');
  },

  async getById(id) {
    return knex(tableName).where({ id }).first();
  },

  async create(data) {
    // data: { name, description, image }
    const [newInsignia] = await knex(tableName).insert(data).returning('*');
    return newInsignia;
  },

  async update(id, data) {
    const [updatedInsignia] = await knex(tableName)
      .where({ id })
      .update(data)
      .returning('*');
    return updatedInsignia;
  },

  async delete(id) {
    return knex(tableName).where({ id }).del();
  }
};

export default InsigniasModel;
