const {model, Schema} = require('mongoose');

const TasksSchema = new Schema({
    titulo:{
        type:String,
        required: true
    },
    descripcion:{
        type:String,
        required:true
    },
    estado:{
        type:String
    },
    isActive:{
        type:Boolean,
        default:true
    }
},{
    timestamps:true,
    versionKey:false
})

module.exports = model('Tasks', TasksSchema);