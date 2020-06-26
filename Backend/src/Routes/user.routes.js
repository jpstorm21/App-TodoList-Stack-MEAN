import { Router } from 'express'; //solo importamos el router de express
import userCtrl from '../Controllers/user.controller'
import helpers from "../helpers/helpers";

//Inicializamos el router
const router = Router();

//definir rutas segun el tipo de request ejm router.get() - router.post()
//GET
router.get('/users', helpers.isAuthenticated, userCtrl.getUsers);
//POST
router.post('/register', userCtrl.register);

export default router; // exportamos todas las rutas
