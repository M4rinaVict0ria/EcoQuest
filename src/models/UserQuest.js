// src/models/UserQuest.js
import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import User from './User.js';
import Quest from './Quest.js';

const UserQuest = sequelize.define('UserQuest', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  userId: { type: DataTypes.INTEGER, references: { model: User, key: 'id' }},
  questId: { type: DataTypes.INTEGER, references: { model: Quest, key: 'id' }},
  completed: DataTypes.BOOLEAN,
  completionDate: DataTypes.DATE
});

// Define relações
User.hasMany(UserQuest, { foreignKey: 'userId' });
Quest.hasMany(UserQuest, { foreignKey: 'questId' });
UserQuest.belongsTo(User, { foreignKey: 'userId' });
UserQuest.belongsTo(Quest, { foreignKey: 'questId' });

export default UserQuest;
