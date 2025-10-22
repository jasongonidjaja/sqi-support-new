// src/models/SQIPic.js
import { DataTypes } from "sequelize";
import sequelize from "../config/database.js"; // sesuaikan dengan lokasi file koneksi db kamu

const SQIPic = sequelize.define("SQIPic", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

export default SQIPic;
