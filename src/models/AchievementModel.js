// src/models/Achievement.js
import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Achievement = sequelize.define('Achievement', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  title: DataTypes.STRING,
  description: DataTypes.TEXT,
  is_monthly: DataTypes.BOOLEAN // para diferenciar conquistas mensais
});

export default Achievement;
