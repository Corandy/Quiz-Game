const uuidv3 = require('uuid/v3');
const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname,'../data');

checkIfUserAlreadyExistsBasedOnUserId = function(userId) {
    //get results data
    const resultArray = JSON.parse(fs.readFileSync(dataPath+'/results.json', 'utf8'));

    //check if user already exist
    resultArray.forEach(function(results) {
        if(results.userId === userId) {
            return true;
        }
    });
    return false;
}

exports.verifyUserBasedOnEmail = function(req, res, next) {
    //make uuid from mail
    const uuid = uuidv3(req.body.email, uuidv3.URL);

    //check if user already exists
    const userFound = checkIfUserAlreadyExistsBasedOnUserId(uuid);
    if(userFound) {
        return res.send('Already Used');
    } else {
        //return userId to client
        return res.send(uuid);
    }
}

exports.showAllResults = function(req, res, next) {
    //get results data
    const resultArray = JSON.parse(fs.readFileSync(dataPath+'/results.json', 'utf8'));

    //send to client
    return res.send(JSON.stringify(resultArray));
}


exports.showResultsOfSpecificUser = function(req, res, next) {
    const userId = req.params.userId;
    console.log(userId);

    //get results data
    const resultArray = JSON.parse(fs.readFileSync(dataPath+'/results.json', 'utf8'));

    //find specific results
    resultArray.forEach(function(results) {
        if(results.userId === userId) {
            return res.send(JSON.stringify(results));
        }
    });

    //if not found send error code to client
    return res.send('Not found');
}


exports.saveResultOfUser = function(req, res, next) {
    const userId = req.body.userId;    
    //check if record already exists
    const userFound = checkIfUserAlreadyExistsBasedOnUserId(userId);
    if(userFound) {
        return res.send('Already Used');
    } else {
        const newResults = req.body.results;
        //get old results data and push new data to it
        var resultArray = JSON.parse(fs.readFileSync(dataPath+'/results.json', 'utf8'));
        resultArray.push(newResults);
        //save the local file on server
        fs.writeFile(dataPath+'/results.json', resultArray, function(err) {
            if(err) {
                return console.log(err);
            }        
            return res.send('Results saved');
        });         
    }
}