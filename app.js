// Main npm dependencies
const express = require("express") ;
const bodyParser = require("body-parser") ;

// Initial Configs
const app = express() ;
app.use(bodyParser.json()) ;

// Fetching the Bounce Routes
const bounceRoutes = require("./routes/bounce") ;

//Setting headers for API CORS access
app.use( (req,res,next) => {
    res.setHeader("Access-Control-Allow-Origin","*");
    res.setHeader("Access-Control-Allow-Methods","OPTIONS,GET,POST,PUT");
    res.setHeader("Access-Control-Allow-Headers","Content-Type , Authorization");
    next() ;
} )

// Registering bounces router in express App
app.use(bounceRoutes) ;

// listening to new Requests
app.listen(8080) ;