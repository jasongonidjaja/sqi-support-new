"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("tasks", {
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
          model: "support_types",
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
          model: "applications",
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
          model: "sqi_pics",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },

      // 🔹 User yang membuat task
      createdByUserId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Users",
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

    }, {
      // ⬇️ Tambahkan ini di SINI, setelah definisi kolom
      engine: "InnoDB", // ✅ supaya tabel support foreign key
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Tasks");
  },
};