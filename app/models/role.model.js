export default (sequelize, Sequelize) => {
  const Role = sequelize.define(
    "roles",
    {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false, 
      },
    },
    {
      indexes: [
        {
          name: "role_name_index",
          fields: ["name"],
        },
      ],
    }
  );

  return Role;
};
