import knex from '../db/connection.js';

const tableName = 'store';

const StoreModel = {
  async getAll() {
    return knex(tableName).select('*');
  },

  async getById(id) {
    return knex(tableName).where({ id }).first();
  },

  async getByType(type) {
    return knex(tableName).where({ type }).select('*');
  },

  async create(data) {
    // data: { name, description, type, image, price }
    const [newItem] = await knex(tableName).insert(data).returning('*');
    return newItem;
  },

  async update(id, data) {
    const [updatedItem] = await knex(tableName)
      .where({ id })
      .update(data)
      .returning('*');
    return updatedItem;
  },

  async delete(id) {
    return knex(tableName).where({ id }).del();
  }
};

export default StoreModel;
