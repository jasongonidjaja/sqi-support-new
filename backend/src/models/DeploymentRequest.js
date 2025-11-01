// src/models/DeploymentRequest.js
import { Sequelize, DataTypes } from "sequelize";
import sequelize from "../config/database.js"; // Pastikan sudah ada koneksi ke DB

const DeploymentRequest = sequelize.define("DeploymentRequest", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  releaseId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  implementDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  applicationId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: "applications", // ✅ huruf kecil, sesuai nama tabel
      key: "id",
    },
  },
  riskImpact: {
    type: DataTypes.ENUM("Low", "Medium", "High"),
    allowNull: false,
  },
  attachment: {
    type: DataTypes.STRING,
    allowNull: true, // Optional
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: Sequelize.fn("NOW"),
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: Sequelize.fn("NOW"),
  },
}, {
  tableName: "deployment_requests",
});

export default DeploymentRequest;
