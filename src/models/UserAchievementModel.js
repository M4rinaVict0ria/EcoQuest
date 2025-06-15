// src/models/UserAchievement.js
import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import User from './User.js';
import Achievement from './Achievement.js';

const UserAchievement = sequelize.define('UserAchievement', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  userId: { type: DataTypes.INTEGER, references: { model: User, key: 'id' }},
  achievementId: { type: DataTypes.INTEGER, references: { model: Achievement, key: 'id' }},
  dateAwarded: DataTypes.DATE
});

User.hasMany(UserAchievement, { foreignKey: 'userId' });
Achievement.hasMany(UserAchievement, { foreignKey: 'achievementId' });
UserAchievement.belongsTo(User, { foreignKey: 'userId' });
UserAchievement.belongsTo(Achievement, { foreignKey: 'achievementId' });

export default UserAchievement;
