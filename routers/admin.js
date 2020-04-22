const express = require("express");

const {accessToRoute,isAdmin} = require("../middlewares/authorization/auth");

const {checkUserOnDb} = require("../middlewares/database/dataOps");

const {deleteUser,blockUser} = require("../controllers/admin");

const app = express.Router();

app.use([accessToRoute,isAdmin]);
app.get("/block/:id",checkUserOnDb,blockUser);
app.delete("/deleteUser/:id",checkUserOnDb,deleteUser);


module.exports = app;