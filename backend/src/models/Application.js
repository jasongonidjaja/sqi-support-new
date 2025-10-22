import { DataTypes } from "sequelize";
import sequelize from "../config/database.js"; // sesuaikan dengan path file koneksi database kamu

const Application = sequelize.define("Application", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  owner: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

export default Application;
