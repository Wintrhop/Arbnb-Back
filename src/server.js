require ("dotenv").config()
const express= require("express");
const cors = require("cors")
const morgan = require("morgan")
const {connect} = require("./db");


const app = express();
const port = process.env.PORT;

app.use(cors())
app.use(morgan("tiny"))
app.use(express.json())

connect();

app.listen(port, ()=>{
    console.log('Servidor Ok')
})