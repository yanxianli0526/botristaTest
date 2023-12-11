import { db } from "../models/index.js";
import { Op } from "sequelize";
import { isValidUUID } from "./utils.js";
const Product = db.product;

export const checkProductsStockIsEnough = async (req, res, next) => {
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
    // 怕有誤會解釋一下這邊為什麼不直接用for迴圈一個一個FindOne拿訂貨數和庫存進行比較
    // 主要是因為不想分次FindOne 造成多次和db發請求的狀況發生
    const product = await Product.findAll({
      where: {
        id: {
          [Op.in]: productsId,
        },
      },
    });

    let productsStockIsEnough = false;
    product.forEach((d) => {
      if (productData[d.id].stock > d.stock) {
        productsStockIsEnough = true;
      }
    });
    if (productsStockIsEnough) {
      res.status(400).send({ message: "product stock is enough" });
    } else {
      next();
    }
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

export const checkProductIsInOrder = async (req, res, next) => {
  try {
    if (!isValidUUID(req.params.id)) {
      res.status(400).send({ message: "id is not valid" });
    }
    const product = await Product.findOne({
      where: {
        id: req.params.id,
      },
    });

    const orders = await product.getOrders();
    if (orders.length > 0) {
      res.status(400).send({ message: "product is in order" });
    } else {
      next();
    }
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

export const fetchProducts = async (req, res) => {
  try {
    const minPrice = req.query.minPrice;
    const maxPrice = req.query.maxPrice;
    const minStock = req.query.minStock;
    const maxStock = req.query.maxStock;
    const whereClause = {};

    if (minPrice && maxPrice) {
      whereClause.price = {
        [Op.between]: [minPrice, maxPrice],
      };
    } else if (minPrice) {
      whereClause.price = {
        [Op.gte]: minPrice,
      };
    } else if (maxPrice) {
      whereClause.price = {
        ...(whereClause.price || {}),
        [Op.lte]: maxPrice,
      };
    }

    if (minStock && maxStock) {
      whereClause.stock = {
        [Op.between]: [minStock, maxStock],
      };
    } else if (minStock) {
      whereClause.stock = {
        [Op.gte]: minStock,
      };
    } else if (maxStock) {
      whereClause.stock = {
        ...(whereClause.stock || {}),
        [Op.lte]: maxStock,
      };
    }

    const products = await Product.findAll({
      where: whereClause,
    });
    res.status(200).send({ products });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

export const createProduct = async (req, res) => {
  try {
    await Product.create({
      name: req.body.name,
      price: req.body.price,
      stock: req.body.stock,
    });
    res.sendStatus(201);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

export const updateProduct = async (req, res) => {
  try {
    if (!isValidUUID(req.params.id)) {
      res.status(400).send({ message: "id is not valid" });
    }
    await Product.update(
      { name: req.body.name, price: req.body.price, stock: req.body.stock },
      { where: { id: req.params.id } }
    );
    res.status(200).send({ message: "Product update successfully!" });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const result = await Product.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (result === 1) {
      res.status(200).send({ message: "Product delete successfully!" });
    } else {
      // 其實這一段原則上應該不會發生 上面checkProductIsInOrder檢查的時候 就查過了
      // 但如果真的發生了 就要記錄一下了解原因
      console.log("req.params.id", req.params.id);
      res.status(400).send({ message: "Product can't find!" });
    }
  } catch (error) {
    res.status(500).send({ message: err.message });
  }
};
