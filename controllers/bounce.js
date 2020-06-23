// Main npm Dependencies
const fs = require("fs") ;
const path = require("path") ;

// Setting Path for JSON file to hold Previous Results
const savePath = path.join(__dirname,"..","data","previousResults.json") ;

// Controller for GET /past-results
exports.getPastResults = (req,res,next) => {
    fs.readFile(savePath,(err,fileContent) => {
        results = [] ;
        // no error means data is present in json file 
        // therefore reading all the data present
        if(!err){
            results = JSON.parse(fileContent) ;
        }

        // API response
        res.status(200).json({
            message : "previous Results Fetched",
            data : results
        })
    })
}

// Controller for POST /calculate
exports.fetchData = (req,res,next) => {
    // fetching JSON data from body
    const initialHeight = req.body.initHeight ;
    const coeff_rest = req.body.coeff_rest ; 
    const cordsArray = [] ;
    cordsArray.push([0,initialHeight.toFixed(2)]);
    
    // Newton's Laws of motion's derived Formulas applied
    // assuming velocity < 1.00 means that ball cannot bounce any further 

    //declaring all speed rel. Variables 
    const accel = 10 ;
    let totalBounces = 0 ;
    let velocity = Math.sqrt(2*accel*initialHeight) ;
    let time = velocity/accel ;
    let currentHeight ;

    // Coefficient of Rest. should be smaller than 1
    if( coeff_rest >= 1 ){
        return res.status(200).json({
            message : "co-efficient of restitution cannot be >= 1"
        })
    }
    if( initialHeight > 0 ){
        cordsArray.push([time.toFixed(2),0]);
        totalBounces += 1 ;
    }

    // Updating velocity to first Bounce if any
    velocity = coeff_rest*velocity ;

    while( velocity >= 1.00  ){
        // Upward Motion of Ball
        currentHeight = ( velocity*velocity )/(2*accel) ;
        time += (velocity/accel) ;
        cordsArray.push([time.toFixed(2),currentHeight.toFixed(2)]) ;

        // Downward motion of Ball
        time += (velocity/accel) ;
        cordsArray.push([time.toFixed(2),0]) ;
        
        // One complete motion implies a single bounce , Therefore adding one tok total
        totalBounces += 1 ;
        
        // Updating velocity to new upward velocity
        velocity = coeff_rest*velocity ;
    }

    // returning data cal. in JSON form
    res.status(201).json({
        message : "Post Operations Completed Successfully",
        data : {
            totalBounces : totalBounces,
            coordinates : cordsArray
        }
    })
    // Saving data to previousResult.json File
    fs.readFile(savePath,(err,fileContent) => {
        results = [] ;
        // no error means data is present in json file 
        // therefore reading all the data present
        if(!err){
            results = JSON.parse(fileContent) ;
        }
        // adding currently cal. data to result array
        results.push({
            initialHeight : initialHeight,
            coeff_restitution : coeff_rest ,
            totalBounces : totalBounces,
            coordinates : cordsArray
        })

        // writing latest results to the .json File
        fs.writeFile(savePath,JSON.stringify(results) , err => {
            console.log(err) ;
        }) ;
    })
}