import userModel from '../Models/user'; // importamos el modelo de usuarios
import crypto from "crypto";

const userCtrl = {}; // creamos un objeto vacio

userCtrl.getUsers = async (req, res) => { // al objeto le creamos un atributo llamado getusers, el cual contiene una funcion para retornar todos los usuarios
    let users = await userModel.find();
    res.status(200).json(users);
}

userCtrl.register = async (req, res) => {
    const {
        name,
        password,
        username,
    } = req.body;
    console.log(req.body)
    console.log(name, username, password)
    crypto.randomBytes(16, (err, salt) => {
        const newSalt = salt.toString('base64')
        crypto.pbkdf2(password, newSalt, 1000, 64, 'sha1', async (err, key) => {
            const encryptPassword = key.toString('base64')
            const user = await userModel.findOne({
                username: username
            });
            if (user) {
                res.status(500).json({
                    msg: 'Usuario ya existe',
                    error : err
                });
            } else {
                // Saving a New User
                const newUser = new userModel({
                    name,
                    username,
                    password: encryptPassword,
                    salt:newSalt,
                });
                await newUser.save();
                res.status(200).json({
                    msg: 'Usuario registrado'
                });
            }
        })
    })
};

export default userCtrl; // exportamos el objeto con todas las funciones que se le hayan definido anteriormente