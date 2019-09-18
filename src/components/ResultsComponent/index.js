import React from 'react';
import {ordinal_suffix_of} from '../TextTransformer';

const ResultsComponent = ({
        results = {
            ranking: false, //number or false
            results: [], //list
            score: false //number or false
        }
    }) => {
    return <span>
        <div className={'result_score'}>Score: {results.score*10}</div>
        <div className={'result_ranking'}>Ranking: {ordinal_suffix_of(results.ranking)}</div>
        {results.results.map((result, index) => {
            let correct = result.answer == result.correctAnswer;
            let answerStyle = correct ? 'correct' : 'wrong'; 
            return <div key={index} className={"result_container"}>
                <div className="result_container__question">{result.questionText}</div>
                <div className={"result_container__answer result_container__answer--"+answerStyle}>provided answer: {result.answerText}</div>
                {!correct && <div className="result_container__answer">correct answer: {result.correctAnswerText}</div>}
            </div>            
        })}
    </span> 
}

export default ResultsComponent;