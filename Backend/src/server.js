import express from 'express';
import cors from "cors";
import morgan from 'morgan';
import MethodOverride from 'method-override';
import BodyParser from 'body-parser';
import userAPI from './Routes/user.routes';
import authRoutes from './Routes/auth.routes';
import taskRoutes from './Routes/task.routes';
import './Middlewares/connectionMongoose';

//Inicialización de la APP con express
const app = express();


//Setear puerto a utilizar dentro de la APP (procces.env.PORT obtiene el puerto por defecto si estuviera en un servidor, en caso contrario se le asigna el 4000)
app.set("port", process.env.PORT || 4000);


//definicion de middwleares
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(MethodOverride());
app.use(BodyParser.urlencoded({ extended: false }));

//routes API
app.use('/api/user', userAPI);
app.use('/api/auth', authRoutes);
app.use('/api/task', taskRoutes);


//iniciar APP, para ejecucion en el puerto establecido anteriormente
app.listen(app.get("port"), () => {
    console.log(`Server on port ${app.get("port")}`);
});