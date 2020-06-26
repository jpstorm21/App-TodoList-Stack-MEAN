import jwt from "jsonwebtoken";
import userModel from '../Models/user';
import config from "../config.json";

const helpers = {};

helpers.isAuthenticated = (req, res, next) => {
    const token = req.headers.authorization
    if (!token) {
        return res.status(403).json({
            msg: 'acceso denegado'
        })
    }
    jwt.verify(token, config["secret-token"], async (err, decoded) => {
        if (err) {
            return res.status(401).json({
                token: null,
                user: null,
                msg: "Token expirado",
            });
        }
        const {
            _id
        } = decoded;
        const user = await userModel.findOne({
            _id
        })
        if (user) {
            req.user = user;
            next();
        }
    })
};

export default helpers;