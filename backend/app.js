require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan')
const conectarBD = require('./bd');


const app = express();
conectarBD();

const port = process.env.PORT || 4000;


// comprensión de JSON
app.use(express.json());

//Middlewares
app.use(cors({
    origin:"*",
    methods:["GET","POST","PUT","DELETE","PATCH"]
}))
app.use(morgan('dev'));
app.use(express.urlencoded({extended:false}));
app.use(require('./routes/tasks.router'));

app.listen(port, ()=>{console.log(`Servidor corriendo en http://localhost:${port}`)});