// src/models/Task.js
import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import Application from "./Application.js";
import SQIPic from "./SQIPic.js";
import SupportType from "./SupportType.js";

const Task = sequelize.define("Task", {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  customSupportType: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  supportTypeId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: "SupportTypes",
      key: "id",
    },
  },
});

Task.belongsTo(Application, { foreignKey: "applicationId", as: "application" });
Task.belongsTo(SQIPic, { foreignKey: "sqiPicId", as: "sqiPic" });
Task.belongsTo(SupportType, { foreignKey: "supportTypeId", as: "supportType" });

export default Task;
