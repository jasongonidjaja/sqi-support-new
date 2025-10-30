import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const SQIPic = sequelize.define("SQIPic", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
//   email: {
//     type: DataTypes.STRING,
//     allowNull: true,
//   },
}, {
  tableName: "sqi_pics",
});

export default SQIPic;
