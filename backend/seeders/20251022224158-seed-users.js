export async function up(queryInterface) {
  await queryInterface.bulkInsert("Users", [
    {
      username: "admin_sqi",
      password: "admin123",  // Mudah, plain text password
      role: "sqi",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      username: "developer_user",
      password: "dev123",  // Mudah, plain text password
      role: "developer",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]);
}

export async function down(queryInterface) {
  await queryInterface.bulkDelete("Users", null, {});
}
