import { Schema, model } from 'mongoose'; // importamos schema para crear la tabla y el model, para exportarlo como modelo

const userSchema = new Schema( // creacion de la schema con sus atributos
    {
        name:String,
        username: String,
        password:String,
        salt:String,
    }
)

export default model('userModel', userSchema); // exportar como modeli ('con el nombre que se exporta', y la varible que exporta)