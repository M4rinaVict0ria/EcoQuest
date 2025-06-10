import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Quest = sequelize.define('Quest', {
  title: DataTypes.STRING,
  description: DataTypes.STRING,
  xp_bonus: DataTypes.INTEGER,
  status: DataTypes.STRING,
  is_monthly: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
});

export default Quest;
