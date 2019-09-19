import React from 'react';
import {ordinal_suffix_of} from '../TextTransformer';

//result component of the result page
const ResultsComponent = ({
        results = {
            ranking: false, //number or false
            results: [], //list
            score: false //number or false
        }
    }) => {
    return <span>
        <div className={'result_score'}>Score: {results.score*10}</div>
        {/*transform the number to ranking string*/}
        <div className={'result_ranking'}>Ranking: {ordinal_suffix_of(results.ranking)}</div>
        {results.results.map((result, index) => {
            //if answer is correct it will have a green color otherwise a red color and an extra line with the correct answer
            let correct = result.answer == result.correctAnswer;
            let answerStyle = correct ? 'correct' : 'wrong'; 
            return <div key={index} className={"result_container"}>
                <div className="result_container__question">{result.questionText}</div>
                <div>provided answer: <span className={"result_container__answer result_container__answer--"+answerStyle}>{result.answerText}</span></div>
                {!correct && <div>correct answer: <span className="result_container__answer">{result.correctAnswerText}</span></div>}
            </div>            
        })}
    </span> 
}

export default ResultsComponent;