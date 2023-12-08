export default (sequelize, Sequelize) => {
  const Order = sequelize.define(
    "orders",
    {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
    },
    {
      paranoid: true,
      indexes: [
        {
          name: "order_id_index",
          fields: ["id"],
        },
        {
          name: "order_id_user_index",
          fields: ["id","userId"],
        },
      ],
    }
  );

  return Order;
};
