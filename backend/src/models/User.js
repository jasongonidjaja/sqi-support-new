import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const User = sequelize.define("User", {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isIn: [["sqi", "developer"]], // Role hanya bisa 'sqi' atau 'developer'
    },
  },
});

// Hapus hashing password sebelum menyimpannya
// User.beforeCreate(async (user) => {
//   const hashedPassword = await bcrypt.hash(user.password, 10);
//   user.password = hashedPassword;
// });

export default User;
