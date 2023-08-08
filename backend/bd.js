const mongoose = require('mongoose');

const dbConnect = async ()=>{
    try{
        mongoose.connect(process.env.MONGODB_URI)
        console.log('Conectado a la base de datos');
    }catch{
        console.log('Error al conectar la base de datos', error.message);
    }
};

module.exports = dbConnect;