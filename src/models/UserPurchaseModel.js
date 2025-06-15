import knex from '../db/connection.js';

const tableName = 'user_purchases';

const UserPurchasesModel = {
  async getAll() {
    return knex(tableName).select('*');
  },

  async getById(id) {
    return knex(tableName).where({ id }).first();
  },

  async getByUserId(user_id) {
    return knex(tableName).where({ user_id }).select('*');
  },

  async getByStoreItemId(store_item_id) {
    return knex(tableName).where({ store_item_id }).select('*');
  },

  async create(data) {
    // data: { user_id, store_item_id, price_paid, purchased_at (opcional) }
    const [newPurchase] = await knex(tableName).insert(data).returning('*');
    return newPurchase;
  },

  async update(id, data) {
    const [updatedPurchase] = await knex(tableName)
      .where({ id })
      .update(data)
      .returning('*');
    return updatedPurchase;
  },

  async delete(id) {
    return knex(tableName).where({ id }).del();
  }
};

export default UserPurchasesModel;
