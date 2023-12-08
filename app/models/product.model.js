export default (sequelize, Sequelize) => {
  const Product = sequelize.define(
    "products",
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
      price: {
        type: Sequelize.REAL,
        allowNull: false, 
      },
      stock: {
        type: Sequelize.INTEGER,
        allowNull: false, 
      },
    },
    {
      paranoid: true,
      indexes: [
        {
          name: "product_id_index",
          fields: ["id"],
        },
      ],
    }
  );

  return Product;
};
