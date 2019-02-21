const express = require('express');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');

const app = express();

//view engine setup//
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

//static folder//
app.use(express.static('public'));

//body-parser middleware//
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//link to routes folder//
require('./routes/html-routes')(app);

app.listen(3000, ()=> console.log('Server started....'));