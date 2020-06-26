import userModel from "../Models/user";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import config from "../config.json";

const authCtrl = {};

const signToken = (_id) => {
  return jwt.sign(
    {
      _id,
    },
    config["secret-token"],
    {
      expiresIn: 60 * 60 * 24, // 24 hrs
    }
  );
};

authCtrl.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await userModel.findOne({
      username,
    });
    if (!user) {
      res.status(500).json({
        msg: "usuario y/o constraseña incorrecta",
      });
    }
    crypto.pbkdf2(password, user.salt, 1000, 64, "sha1", async (err, key) => {
      const encryptPassword = key.toString("base64");
      if (user.password === encryptPassword) {
        const token = signToken(user._id);
        return res.status(200).json({
          token: token,
          user: {
            id: user._id,
            name: user.username,
          },
          msg: "Exito al ingresar",
        });
      }
      res.status(500).json({
        msg: "usuario y/o constraseña incorrecta",
        error: err,
      });
    });
  } catch (e) {
    console.log(e)
    res.status(500).json({
      msg: "Ocurrio un error en el servidor",
      error: e,
    });
  }
};

authCtrl.checkLogin = (req, res) => {
  const token = req.body.token;
  jwt.verify(token, config["secret-token"], async (err, decoded) => {
    if (err) {
      return res.status(401).json({
        token: null,
        user: null,
        msg: "Token expirado",
        state: false
      });
    }
    const { _id } = decoded;
    const user = await userModel.findOne({
      _id,
    });
    if (user) {
      req.user = user;
      return res.status(200).json({
        token: token,
        user: {
          id: user._id,
          name: user.username,
        },
        msg: "Autenticado",
        state: true
      });
    }
  });
};

export default authCtrl;
