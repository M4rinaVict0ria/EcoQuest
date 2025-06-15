import knex from '../db/connection.js'; // caminho relativo para a conexão do knex

const tableName = 'practices';

const PracticesModel = {
  async getAll() {
    return knex(tableName).select('*');
  },

  async getById(id) {
    return knex(tableName).where({ id }).first();
  },

  async create(data) {
    // data deve conter title, description, xp (opcional)
    const [newPractice] = await knex(tableName).insert(data).returning('*');
    return newPractice;
  },

  async update(id, data) {
    const [updatedPractice] = await knex(tableName)
      .where({ id })
      .update(data)
      .returning('*');
    return updatedPractice;
  },

  async delete(id) {
    return knex(tableName).where({ id }).del();
  }
};

export default PracticesModel;
