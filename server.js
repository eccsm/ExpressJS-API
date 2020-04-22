const express = require ("express");

const dotenv = require("dotenv");

const router = require("./routers");

const connection = require("./helpers/database/connection");

const errHandler = require("./middlewares/errors/customErrorHandler");

const path = require("path");

dotenv.config({

    path : "./config/env/config.env"
    
    });

connection();

const app = new express();

app.use(express.json());

app.use(express.static(path.join(__dirname,"public")));

const PORT = process.env.PORT;

app.listen(PORT,()=>{

console.log("PORT: "+PORT+" listening...");

})

app.use("/api",router);

app.use(errHandler);

