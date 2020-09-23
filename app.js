var express = require('express');
var bodyParser = require('body-parser');

var properties = require('./config/properties');
var db = require('./config/database');
//hero routes
var EmployeesRoutes = require('./routes/index.js');
var app = express();

//configure bodyparser
var bodyParserJSON = bodyParser.json();

//initialise express router
var router = express.Router();

// call the database connectivity function
db();

// configure app.use()
app.use(bodyParserJSON);

// Error handling
app.use(function(req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
     res.setHeader("Access-Control-Allow-Credentials", "true");
     res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
     res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Origin,Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers,Authorization");
   next();
 });

// use express router
app.use('/api',router);
//call heros routing
EmployeesRoutes(router);

// intialise server
app.listen(properties.PORT, (req, res) => {
    console.log(`Server is running on ${properties.PORT} port.`);
})

module.exports = app;