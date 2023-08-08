const Tasks = require('../models/Tasks')
const ctrlTasks = {};

ctrlTasks.getTasks = async (_req,res) =>{
    const tasks = await Tasks.find({isDone: false, isActive: true})
    return res.json(tasks)
}

ctrlTasks.postTasks = async (req,res) => {
    const { titulo, descripcion } = req.body;

    const nuevaTarea = new Tasks({
        titulo,
        descripcion
    });
    try{
        const tarea = await nuevaTarea.save();
        return res.json('La tarea fue guardada con éxito')
    } catch (err) {
        console.log(err)
    }
};

ctrlTasks.completeTasks =  async (req,res) =>{
    const id = req.params.id;
    const { titulo, descripcion, ...otroDatos } = req.body;
    
    try {

        const taskCompleta = await Tasks.findByIdAndUpdate(id, { titulo, descripcion,isDone:true})
        if (taskCompleta === null){
            return res.status(400).json({
                msg:'Error al completar la tarea - id incorrecto.'
            })
        }
        res.json("Tarea marcada como completada.")

    } catch (error) {

        console.log(error.message);
        return res.status(500).json({
            msg:"Error al marcar la tarea como completada"
        })

    }
}

ctrlTasks.updateTasks = async (req,res) =>{
    const id = req.params.id;

    const { titulo, descripcion, ...otroDatos } = req.body;

    const tareaModificar = {titulo,descripcion};
    
    if (!id || !descripcion || !titulo) {
        return res.status(400).json({
            msg: 'No viene id en la petición',
        });
    };


    try {
        const tareaActualizada = await Tasks.findByIdAndUpdate(id, { titulo, descripcion })

        if(tareaActualizada == null){
            return res.status(400).json({
                msg:"Error al actualizar la tarea - id incorrecto"
            })
        }

        return res.json({
            msg: 'Tarea actualizada correctamente',
        });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            msg: 'Error al actualizar la tarea'
        })
    }
    
}
ctrlTasks.deleteTasks = async (req,res) => {
    const id = req.params.id;

    try {
        await Tasks.findByIdAndUpdate(id, { isActive: false })
        return res.json('Tarea eliminada correctamente');
    } catch (err) {
        console.log(err.message)
        return res.status(500).json({
            msg: 'Error al eliminar la tarea'
        });
    }
};

module.exports = ctrlTasks