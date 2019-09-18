import React from 'react';
import { FormGroup, Radio } from 'react-bootstrap';

const QuestionComponent = ({
        question = {
            question: 'empty', //string
            answers: [], //list
            user_answer: false //number or false
        }, 
        onChangeEvent = false //event
    }) => {
    return <span>
        <div>{question.question}</div>
        <FormGroup onChange={onChangeEvent}>
          {Object.keys(question.answers).map((answer, index) => {
            let active = question.user_answer == index+1;
            let fontWeight = active ? 600 : 400;
            return <Radio key={index} value={index+1} readOnly checked={active} name="radioGroup"><span style={{fontWeight}}>{question.answers[answer]}</span></Radio>;
          })}
        </FormGroup>
    </span> 
}

export default QuestionComponent;