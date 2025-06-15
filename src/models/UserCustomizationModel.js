import knex from '../db/connection.js';

const tableName = 'user_customizations';

const UserCustomizationsModel = {
  async getAll() {
    return knex(tableName).select('*');
  },

  async getById(id) {
    return knex(tableName).where({ id }).first();
  },

  async getByUserId(user_id) {
    return knex(tableName).where({ user_id }).first();
  },

  async create(data) {
    // data: { user_id, banner_id, border_id, profile_image_id }
    const [newCustomization] = await knex(tableName).insert(data).returning('*');
    return newCustomization;
  },

  async update(user_id, data) {
    // Atualiza customização do usuário
    const [updatedCustomization] = await knex(tableName)
      .where({ user_id })
      .update(data)
      .returning('*');
    return updatedCustomization;
  },

  async delete(id) {
    return knex(tableName).where({ id }).del();
  }
};

export default UserCustomizationsModel;
