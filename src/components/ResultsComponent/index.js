import React from 'react';

const ResultsComponent = ({
        results = {
            ranking: false, //number or false
            results: [], //list
            score: false //number or false
        }
    }) => {
    return <span>
        <div className={'result_score'}>Score: {results.score*10}</div>
        <div className={'result_ranking'}>Ranking: {ordinal_suffix_of(results.score)}</div>
        {results.results.map((result, index) => {
            let correct = result.answer === result.correctAnswer;
            let answerStyle = correct ? 'correct' : 'wrong'; 
            return <div key={index} className={"result_container"}>
                <div className="result_container__question">{result.questionText}</div>
                <div className={"result_container__answer result_container__answer--"+answerStyle}>provided answer: {result.answerText}</div>
                {!correct && <div className="result_container__answer">correct answer: {result.correctAnswerText}</div>}
            </div>            
        })}
    </span> 
}

const ordinal_suffix_of = (i) => {
    var j = i % 10,
        k = i % 100;
    if (j == 1 && k != 11) {
        return i + "st";
    }
    if (j == 2 && k != 12) {
        return i + "nd";
    }
    if (j == 3 && k != 13) {
        return i + "rd";
    }
    return i + "th";
}

export default ResultsComponent;