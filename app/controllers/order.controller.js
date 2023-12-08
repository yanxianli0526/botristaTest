import { db } from "../models/index.js";
import { isValidUUID } from "./utils.js";
const User = db.user;
const Product = db.product;
const Order = db.order;

const Op = db.Sequelize.Op;
const sequelize = db.sequelize;

export const findOrderByID = async (req, res) => {
  try {
    const orderID = req.params.id;
    if (!isValidUUID(orderID)) {
      res.status(400).send({ message: "id is not valid" });
    }
    const user = await User.findOne({
      where: {
        id: req.userId,
      },
    });

    const roles = await user.getRoles();
    const rolesType = [...new Set(roles.map((d) => d.dataValues.name))];
    if (rolesType.includes("manager")) {
      const order = await Order.findOne({
        where: {
          id: orderID,
        },
      });
      const userId = order.getDataValue("userId");

      const productsInOrder = await order.getProducts();
      const resData = productsInOrder.map((product) => {
        return {
          name: product.name,
          price: product.price,
          stock: product.stock,
        };
      });

      res.status(200).send({ id: order.id, userId: userId, resData });
    } else {
      // 這邊不做太特別的處理 反正找不到就讓他回傳錯誤就好 不想給太明確的錯誤原因
      const order = await Order.findOne({
        where: {
          id: orderID,
          user: req.userId,
        },
      });

      const productsInOrder = await order.getProducts();
      const resData = productsInOrder.map((product) => {
        return {
          name: product.name,
          price: product.price,
          stock: product.stock,
        };
      });

      res.status(200).send({ id: order.id, resData });
    }
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

export const createOrder = async (req, res) => {
  try {
    const productsId = [];
    const productData = {};
    req.body.forEach((d) => {
      if (!d.id || d.id === "") {
        res.status(400).send({ message: "id is not valid" });
      } else {
        productsId.push(d.id);
        const data = { stock: d.stock };
        productData[d.id] = data;
      }
    });
    await sequelize.transaction(async (t) => {
      const user = await User.findOne(
        {
          where: {
            id: req.userId,
          },
        },
        { transaction: t }
      );
      const order = await Order.create({}, { transaction: t });
      await order.setUser(user, { transaction: t });
      const products = await Product.findAll(
        {
          where: {
            id: {
              [Op.in]: productsId,
            },
          },
        },
        { transaction: t }
      );
      // 更新庫存量
      products.forEach(
        async (d) => {
          await Product.update(
            {
              stock: d.stock - productData[d.id].stock,
            },
            { where: { id: d.id } }
          );
        },
        { transaction: t }
      );
      await order.setProducts(products, { transaction: t });

      res.sendStatus(201);
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};
