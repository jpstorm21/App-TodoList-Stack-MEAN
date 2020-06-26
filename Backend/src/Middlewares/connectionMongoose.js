import mongoose from 'mongoose'


//definicion de ruta a la cual se conectara, en caso de no tener una en produccion le seteamos nuestra ruta local de la BD
const URI = process.env.MONGOOSE_URI
    ? process.env.MONGOOSE_URI
    : 'mongodb://localhost/apptodo';
//inicializacion el objeto connect, donde le damos la ruta y opciones predefnidad en la documentación
mongoose.connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});


//instaciamos una conexion
const connection = mongoose.connection;


//iniciamos la conexion
connection.once('open', () => {
    console.log('Database is connected');
});