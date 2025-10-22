"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Tasks", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: false,
      },

      // 🔹 Support Type (opsional, bisa dari daftar)
      supportTypeId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "SupportTypes",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },

      // 🔹 Jika user mengetik custom support type
      customSupportType: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      // 🔹 Relasi ke aplikasi
      applicationId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Applications",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },

      // 🔹 PIC SQI yang bertanggung jawab
      sqiPicId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "SQIPics",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },

      // 🔹 Timestamps
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn("NOW"),
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn("NOW"),
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Tasks");
  },
};
