import { Router } from 'express'; //solo importamos el router de express
import authCtrl from '../Controllers/auth.controller'

//Inicializamos el router
const router = Router();

//definir rutas segun el tipo de request ejm router.get() - router.post()

//GET

//POST
router.post('/login',authCtrl.login);
router.post('/checkLogin',authCtrl.checkLogin);

export default router; // exportamos todas las rutas
