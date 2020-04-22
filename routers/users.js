const express = require("express");

const app = express.Router();

const User = require("../models/user");

const userQuery = require("../middlewares/query/userQuery");

const {getUser,getUsers} = require("../controllers/users");

const {checkUserOnDb} = require("../middlewares/database/dataOps");


app.get("/:id",checkUserOnDb,getUser);
app.get("/",userQuery(User),getUsers);


module.exports = app;