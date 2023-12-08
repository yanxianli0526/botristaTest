export default (sequelize, Sequelize) => {
  const User = sequelize.define(
    "users",
    {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      username: {
        type: Sequelize.STRING,
        allowNull: false, 
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false, 
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false, 
      },
    },
    {
      indexes: [
        {
          name: "user_id_index",
          fields: ["id"],
        },
        {
          name: "user_username_index",
          fields: ["username"],
        },
        {
          name: "user_email_index",
          fields: ["email"],
        },
      ],
    }
  );

  return User;
};
