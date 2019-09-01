const uuidv3 = require('uuid/v3');
const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname,'../data');

exports.verifyUserBasedOnEmail = function(req, res, next) {
    //make uuid from mail
    const uuid = uuidv3(req.body.email, uuidv3.URL);

    //get result data
    const resultArray = JSON.parse(fs.readFileSync(dataPath+'/results.json', 'utf8'));

    //check if user already exist
    resultArray.forEach(function(results) {
        if(results.userId === uuid) {
            return res.send('Already Used');
        }
    });
    //return uuid to client
    return res.send(uuid);
}