const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname,'../data');

//recursive function to search for not already asked question for user
const takeRandomQuestion = function(resultArray, ignoreList) {    
    var item = resultArray[Math.floor(Math.random()*resultArray.length)];
    //check if question is already asked, if so try other question
    if(ignoreList.includes(item.id)) {
        return takeRandomQuestion(resultArray, ignoreList);
    } 
    return item;
}

//gets new question for user (that hasn't already been asked)
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

