import jwt from "jsonwebtoken";
import authConfig from "../config/auth.config.js";
import { db } from "../models/index.js";

const User = db.user;
// Authorization
const verifyToken = (req, res, next) => {
  let token = req.headers["authorization"];
  if (!token) {
    return res.status(403).send({
      message: "No token provided!",
    });
  }
  jwt.verify(token, authConfig.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorized!",
      });
    }
    req.userId = decoded.id;
    next();
  });
};

const isCustomer = (req, res, next) => {
  User.findByPk(req.userId).then((user) => {
    user.getRoles().then((roles) => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "customer" ) {
          next();
          return;
        }
      }

      res.status(403).send({
        message: "Require customer or Admin Role!",
      });
    });
  });
};

const isManager = (req, res, next) => {
  User.findByPk(req.userId).then((user) => {
    user.getRoles().then((roles) => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "manager" ) {
          next();
          return;
        }
      }

      res.status(403).send({
        message: "Require Manager or Admin Role!",
      });
    });
  });
};

// 開起來放著 有一天會用到的
const isAdmin = (req, res, next) => {
  User.findByPk(req.userId).then((user) => {
    user.getRoles().then((roles) => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "admin") {
          next();
          return;
        }
      }

      res.status(403).send({
        message: "Require Admin Role!",
      });
      return;
    });
  });
};

const authJwt = {
  verifyToken,
  isAdmin,
  isManager,
  isCustomer,
};

export default authJwt;
