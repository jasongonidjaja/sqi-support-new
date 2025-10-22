import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const SupportType = sequelize.define("SupportType", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export default SupportType;
