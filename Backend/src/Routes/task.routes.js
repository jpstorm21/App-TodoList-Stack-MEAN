import { Router } from 'express'; //solo importamos el router de express
import taskCtrl from '../Controllers/task.controller'
import helpers from "../helpers/helpers";
//Inicializamos el router
const router = Router();

//definir rutas segun el tipo de request ejm router.get() - router.post()
//GET
router.get('/tasks/:id', helpers.isAuthenticated, taskCtrl.getTasks);
router.get('/task/:id', helpers.isAuthenticated, taskCtrl.getTaskById);
//POST
router.post('/register',helpers.isAuthenticated, taskCtrl.register);
//PUT
router.put('/task/:id', helpers.isAuthenticated, taskCtrl.changeSate);

export default router; // exportamos todas las rutas
