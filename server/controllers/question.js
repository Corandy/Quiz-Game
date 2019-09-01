const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname,'../data');

const takeRandomQuestion = function(resultArray, ignoreList) {    
    var item = resultArray[Math.floor(Math.random()*resultArray.length)];
    if(ignoreList.includes(item.id)) {
        return takeRandomQuestion(resultArray, ignoreList);
    } 
    return item;
}

exports.getNewQuestion = function(req, res, next) {
    const ignoreList = req.body.alreadyQuestioned ? JSON.parse(req.body.alreadyQuestioned) : [];

    //get result data
    const resultArray = JSON.parse(fs.readFileSync(dataPath+'/questions.json', 'utf8'));
    //only check if there are unanwsered questions left
    if(resultArray.length > ignoreList.length+1) {
        //get question that hasn't already answered
        const question = takeRandomQuestion(resultArray, ignoreList);
        //avoid user to see correct answer
        delete question.correct_answer;
        return res.send(JSON.stringify(question));
    } else {
        return res.send('no questions left');
    }
}

