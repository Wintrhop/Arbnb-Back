require ("dotenv").config()
const express= require("express");
const {connect} = require("./db");


const app = express();
const port = 8080;
connect();

app.listen(port, ()=>{
    console.log('Servidor Ok')
})