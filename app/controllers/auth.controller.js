import jsonwebtoken from "jsonwebtoken";
import bcryptjs from "bcryptjs";
import authConfig from "../config/auth.config.js";
import { db } from "../models/index.js";

const User = db.user;
const Role = db.role;

const Op = db.Sequelize.Op;
const sequelize = db.sequelize;

export const signUp = async (req, res) => {
  // Save User to Database
  try {
    await sequelize.transaction(async (t) => {
      const user = await User.create(
        {
          username: req.body.username,
          email: req.body.email,
          password: bcryptjs.hashSync(req.body.password, 8),
        },
        { transaction: t }
      );
      if (req.body.roles) {
        const roles = await Role.findAll(
          {
            where: {
              name: {
                [Op.or]: req.body.roles,
              },
            },
          },
          { transaction: t }
        );
        await user.setRoles(roles, { transaction: t });
      } else {
        await user.setRoles([1], { transaction: t });
      }

      res.send({ message: "User registered successfully!" });
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

export const signIn = async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        username: req.body.username,
      },
    });
    if (!user) {
      return res.status(404).send({ message: "User Not found." });
    }

    var passwordIsValid = bcryptjs.compareSync(
      req.body.password,
      user.password
    );

    if (!passwordIsValid) {
      return res.status(401).send({
        accessToken: null,
        message: "Invalid Password!",
      });
    }
    const token = jsonwebtoken.sign({ id: user.id }, authConfig.secret, {
      algorithm: "HS256",
      allowInsecureKeySizes: true,
      expiresIn: 24 * 3600, // 24 hours
    });

    res.status(200).send({
      id: user.id,
      accessToken: token,
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};
