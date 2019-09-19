import React from 'react';
import { FormGroup, Radio } from 'react-bootstrap';

////question component of the questions page
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
        {/*formgroup will track changes in the form and activates the onChangeEvent*/}
        <FormGroup onChange={onChangeEvent}>
          {Object.keys(question.answers).map((answer, index) => {
            //when chosen it will have a filled round and bold text            
            let chosen = question.user_answer == index+1;
            let fontWeight = chosen ? 600 : 400;
            return <Radio key={index} value={index+1} readOnly checked={chosen} name="radioGroup"><span style={{fontWeight}}>{question.answers[answer]}</span></Radio>;
          })}
        </FormGroup>
    </span> 
}

export default QuestionComponent;