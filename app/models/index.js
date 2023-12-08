import express from "express";
import Sequelize from "sequelize";
import config from "../config/db.config.js";

// customer models
import UserModel from "../models/user.model.js";
import RoleModel from "../models/role.model.js";
import ProductModel from "../models/product.model.js";
import OrderModel from "../models/order.model.js";

const sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
  host: config.HOST,
  dialect: config.dialect,
  pool: {
    max: config.pool.max,
    min: config.pool.min,
    acquire: config.pool.acquire,
    idle: config.pool.idle,
  },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = UserModel(sequelize, Sequelize);
db.role = RoleModel(sequelize, Sequelize);
db.product = ProductModel(sequelize, Sequelize);
db.order = OrderModel(sequelize, Sequelize);

db.order.belongsTo(db.user, { foreignKey: "userId" });

db.order.belongsToMany(db.product, {
  through: "order_products",
});
db.product.belongsToMany(db.order, {
  through: "order_products",
});

db.role.belongsToMany(db.user, {
  through: "user_roles",
});
db.user.belongsToMany(db.role, {
  through: "user_roles",
});

db.ROLES = ["customer", "manager", "admin"];

export { db };
