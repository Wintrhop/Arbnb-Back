require ("dotenv").config();
const express= require("express");
const cors = require("cors");
const morgan = require("morgan");
const {connect} = require("./db");
const homesRoute = require("./api/Homes/Homes.route");
const {deleteModel} = require("mongoose");


const app = express();
const port = process.env.PORT;
connect();

app.use(cors())
app.use(morgan("tiny"))
app.use(express.json())

app.use("/homes",homesRoute)



app.listen(port, ()=>{
    console.log('Server Running Ok')
})