const express = require ("express");

const questions = require("./questions");

const auth = require("./auth");

const users = require("./users");

const admin = require("./admin");

const app = new express();

app.use("/auth",auth);
app.use("/questions",questions);
app.use("/users",users);
app.use("/admin",admin)


module.exports = app;
