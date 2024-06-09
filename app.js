const express = require("express");
const cors = require("cors");

const userRouter = require("./Api/Routers/userRouter");

// Middleware
const app = express();
app.use(express.json({ limit: "100kb" }));

app.use(cors());
app.options("*", cors());

// ROUTER
app.use("/", userRouter);

module.exports = app;
