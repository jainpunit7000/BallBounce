// Main npm Dependencies
const express = require("express") ;

// Init. Express Router
const router = express.Router() ;

// fetching Bounce Controllers
const bounceController = require("../controllers/bounce") ;

// GET API
// Fetching all of the Past Results
router.get("/past-results",bounceController.getPastResults) ;

// POST API
// Calculating the bounce values 
router.post("/calculate",bounceController.fetchData) ;

module.exports = router ;