import knex from '../db/connection.js';

const tableName = 'progress';

const ProgressModel = {
  async getAll() {
    return knex(tableName).select('*');
  },

  async getById(id) {
    return knex(tableName).where({ id }).first();
  },

  async getByUserId(user_id) {
    return knex(tableName).where({ user_id }).select('*');
  },

  async getByPracticeId(practice_id) {
    return knex(tableName).where({ practice_id }).select('*');
  },

  async create(data) {
    // data: { user_id, practice_id, completed_at }
    const [newProgress] = await knex(tableName).insert(data).returning('*');
    return newProgress;
  },

  async update(id, data) {
    const [updatedProgress] = await knex(tableName)
      .where({ id })
      .update(data)
      .returning('*');
    return updatedProgress;
  },

  async delete(id) {
    return knex(tableName).where({ id }).del();
  }
};

export default ProgressModel;
