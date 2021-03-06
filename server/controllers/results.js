const uuidv3 = require('uuid/v3');
const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname,'../data');

//with export are called by result api commands, otherwise intern functions

//checks if userId already exist in results.json
checkIfUserAlreadyExistsBasedOnUserId = function(userId) {
    //get results data
    const resultsArray = JSON.parse(fs.readFileSync(dataPath+'/results.json', 'utf8'));

    //check if user already exist
    for (var i = 0; i < resultsArray.length; ++i) {
        if(resultsArray[i].userId === userId) {
            return true;
        }
    }
    return false;
}

//retrieves the id's and answers of questions from questions.json through the results from results.json
getQuestionDataFromResultData = function(results, questions) {
    for(var j = 0; j < questions.length; j++) {
        if(results.id === questions[j].id) {
            results.questionText = questions[j].question;
            results.answerText = questions[j].answers[results.answer];
            results.correctAnswerText = questions[j].answers[results.correctAnswer];
            break;
        }
    }
    return results;
}

//validates answer and returns an array with boolean if correct and a result object
validateAnswer = function(answer, questions) {
    let newAnswer = {};
    for(var j = 0; j < questions.length; j++) {
        if(answer.id === questions[j].id) {
            newAnswer.id = answer.id;
            newAnswer.answer = answer.answer;
            newAnswer.correctAnswer = questions[j].correct_answer;
            break;
        }
    }
    let correct = newAnswer.correctAnswer && newAnswer.correctAnswer == newAnswer.answer;
    return [correct, newAnswer]
}

//verify user based on email address (it will encrypt to string and checks in result.json)
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

//shows basic result of all users
exports.showAllResults = function(req, res, next) {
    //get results data
    const resultsArray = JSON.parse(fs.readFileSync(dataPath+'/results.json', 'utf8'));

    //sort based on score
    const sortedArray = [...resultsArray].sort((a, b) => {
        if (a.score < b.score) return 1;
        if (a.score > b.score) return -1;
        return 0;
    });

    //send to client
    return res.send(JSON.stringify(sortedArray));
}

//shows detailed result of a specific user
exports.showResultsOfSpecificUser = function(req, res, next) {
    const userId = req.params.userId;

    //get results data
    const resultsArray = JSON.parse(fs.readFileSync(dataPath+'/results.json', 'utf8'));

    //sort based on score
    const sortedArray = [...resultsArray].sort((a, b) => {
        if (a.score < b.score) return 1;
        if (a.score > b.score) return -1;
        return 0;
    });

    //find specific results
    let userResults = false;
    for (var i = 0; i < sortedArray.length; i++) {
        if(sortedArray[i].userId === userId) {
            userResults = sortedArray[i];
            userResults.ranking = (i+1);
            break;            
        }
    }

    if(userResults) {
        //get question data
        const questionArray = JSON.parse(fs.readFileSync(dataPath+'/questions.json', 'utf8'));

        //add questions text to the results
        for (var i = 0; i < userResults.results.length; i++) {
            userResults.results[i] = getQuestionDataFromResultData(userResults.results[i], questionArray);            
        }
        return res.send(JSON.stringify(userResults));
    }
    //if not found send error code to client
    return res.send('Not found');
}

//save results of user
//input userId, answers
exports.saveResultOfUser = function(req, res, next) {
    const userId = req.body.userId;    
    //check if record already exists
    const userFound = checkIfUserAlreadyExistsBasedOnUserId(userId);
    if(userFound) {
        return res.send('Already Used');
    } else {
        const answers = req.body.answers;
        let score = 0;
        let results = {};

        results.userId = userId;
        results.results = [];
 
        //get question data to compare
        const questionArray = JSON.parse(fs.readFileSync(dataPath+'/questions.json', 'utf8'));
        for (var i = 0; i < answers.length; i++) {
            let validate = validateAnswer(answers[i], questionArray); 
            score = validate[0] ? score+1 : score;
            results.results.push(validate[1]);           
        } 

        results.score = score;

        //get old results data and push new data to it
        var resultsArray = JSON.parse(fs.readFileSync(dataPath+'/results.json', 'utf8'));
        resultsArray.push(results);

        //save the local file on server
        fs.writeFile(dataPath+'/results.json', JSON.stringify(resultsArray), function(err) {
            if(err) {
                return console.log(err);
            }        
            return res.send('Results saved');
        });         
    }
}