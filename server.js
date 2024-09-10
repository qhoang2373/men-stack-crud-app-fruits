// Here is where we import modules

const dotenv = require("dotenv"); // require package
dotenv.config(); // Loads the environment variables from .env file

// We begin by loading Express
const express = require("express");
const mongoose = require("mongoose"); // require package

const app = express();

mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on("connected", () => {
    console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
  });

const Fruit = require("./models/fruit.js");

// GET /
app.get("/", async (req, res) => {
    res.render("index.ejs");
  });

// GET /fruits/new
app.get("/fruits/new", (req, res) => {
    res.render("fruits/new.ejs");
  });
  
  app.listen(3000, () => {
    console.log("Listening on port 3000");
  });
  