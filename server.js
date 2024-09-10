// ========== IMPORTS =========== //
// const dotenv = require('dotenv')
// dotenv.config()
require('dotenv').config()
const express = require("express");
const mongoose = require('mongoose')
const methodOverride = require("method-override"); // new
const morgan = require("morgan"); //new
const app = express();

// ========== MONGOOSE =========== //

mongoose.connect(process.env.MONGODB_URI)
mongoose.connection.on('connected', () => {
    console.log(`Connected to MongoDB ${mongoose.connection.name}`)
})

const Fruit = require('./models/fruit.js')

// ========== MIDDLEWARE =========== //

app.use(express.urlencoded({ extended: false }));
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method")); // new
app.use(morgan("dev")); //new

// ========== ROUTES =========== //

app.get('/', (req, res) => {
    res.render('index.ejs')
})

app.get('/fruits/new', (req, res) => {
    res.render('fruits/new.ejs')
})

app.get("/fruits/:fruitId", async (req, res) => {
    const foundFruit = await Fruit.findById(req.params.fruitId);
    res.render("fruits/show.ejs", { fruit: foundFruit });
  });
  

// POST /fruits --> method/action from our form in new.ejs
app.post('/fruits', async(req, res) => {
    // console.log(req.body)
    if(req.body.isReadyToEat === 'on'){
        req.body.isReadyToEat = true
    } else {
        req.body.isReadyToEat = false
    }
    // console.log(req.body)
    await Fruit.create(req.body)
    res.redirect('/fruits/new')
})

app.delete("/fruits/:fruitId", async (req, res) => {
    await Fruit.findByIdAndDelete(req.params.fruitId);
    res.redirect("/fruits")
});

app.listen(3000, () => {
  console.log("Listening on port 3000");
});