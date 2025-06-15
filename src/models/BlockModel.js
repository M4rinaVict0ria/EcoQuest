import knex from '../db/connection.js';

const tableName = 'blocks';

const BlocksModel = {
  async getAll() {
    return knex(tableName).select('*');
  },

  async getById(id) {
    return knex(tableName).where({ id }).first();
  },

  async getByBlockerId(blocker_id) {
    return knex(tableName).where({ blocker_id }).select('*');
  },

  async getByBlockedId(blocked_id) {
    return knex(tableName).where({ blocked_id }).select('*');
  },

  async create(data) {
    // data: { blocker_id, blocked_id }
    const [newBlock] = await knex(tableName).insert(data).returning('*');
    return newBlock;
  },

  async delete(id) {
    return knex(tableName).where({ id }).del();
  }
};

export default BlocksModel;
