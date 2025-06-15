import db from '../db/connection.js';

const TABLE = 'user_profiles';

const UserProfileModel = {
  async findByUserId(user_id) {
    return await db(TABLE).where({ user_id }).first();
  },

  async create(data) {
    const [newProfile] = await db(TABLE).insert(data).returning('*');
    return newProfile;
  },

  async updateByUserId(user_id, data) {
    const [updated] = await db(TABLE)
      .where({ user_id })
      .update({ ...data, updated_at: db.fn.now() })
      .returning('*');
    return updated;
  },

  async deleteByUserId(user_id) {
    return await db(TABLE).where({ user_id }).del();
  }
};

export default UserProfileModel;
