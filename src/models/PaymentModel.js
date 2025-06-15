import knex from '../db/connection.js';

const tableName = 'payments';

const PaymentsModel = {
  async getAll() {
    return knex(tableName).select('*');
  },

  async getById(id) {
    return knex(tableName).where({ id }).first();
  },

  async getByReceipt(receipt) {
    return knex(tableName).where({ receipt }).first();
  },

  async create(data) {
    // data: { date, receipt, amount, note }
    const [newPayment] = await knex(tableName).insert(data).returning('*');
    return newPayment;
  },

  async update(id, data) {
    const [updatedPayment] = await knex(tableName)
      .where({ id })
      .update(data)
      .returning('*');
    return updatedPayment;
  },

  async delete(id) {
    return knex(tableName).where({ id }).del();
  }
};

export default PaymentsModel;
