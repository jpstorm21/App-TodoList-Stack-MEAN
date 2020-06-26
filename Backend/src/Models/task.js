import { Schema, model } from 'mongoose'; // importamos schema para crear la tabla y el model, para exportarlo como modelo

const taskSchema = new Schema( // creacion de la schema con sus atributos
    {
        name:String,
        description: String,
        state:Boolean,
        user:String,
    }
)

export default model('taskModel', taskSchema); // exportar como modeli ('con el nombre que se exporta', y la varible que exporta)