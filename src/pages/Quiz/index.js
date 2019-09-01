import React, { Component } from 'react';
import { connect,  } from 'react-redux';
import { bindActionCreators } from 'redux'
import { withRouter, Redirect } from 'react-router-dom';
import { Button, FormGroup, Radio } from 'react-bootstrap';

import { getQuestion, previousQuestion, nextQuestion, setAnswer } from '../../actions/questions';
import GridBlock from '../../components/GridBlock';

class Quiz extends Component {
  
  static defaultProps = {
    userId: false,
    currentPage: 1,
    questions: []
  }  

  goToResults = () => {    
    var allQuestionsAnswered = true;
    this.props.questions.forEach((question) => {
      if(!question.user_answer) {
        allQuestionsAnswered = false;        
      }
    });
    if(allQuestionsAnswered) {
      this.props.history.push('/results');
    } else {
      alert('Please fill in all the answers before finishing');
    }    
  }

  answerQuestion = (event) => {
    this.props.setAnswer(this.props.currentPage, event.target.value);    
  }

  questionsComponent(question) {
    return <span>
      <div>{question.question}</div>
      <FormGroup onChange={this.answerQuestion}>
        {Object.keys(question.answers).map((answer, index) => {
          let active = question.user_answer == index+1;
          let fontWeight = active ? 600 : 400;
          return <Radio key={index} value={index+1} readOnly checked={active} name="radioGroup"><span style={{fontWeight}}>{question.answers[answer]}</span></Radio>;
        })}
      </FormGroup>
    </span> 
  }

  footerComponent(currentPage) {
    return <span>
      {currentPage > 1 && <Button onClick={this.props.previousQuestion} bsStyle="primary" type="submit">Previous</Button>}
      <span className={'page_indicator'}>{'Page '+currentPage}</span>
      {currentPage < 10 && <Button onClick={this.props.nextQuestion} bsStyle="primary" type="submit">Next</Button> }
      {currentPage == 10 && <Button onClick={this.goToResults} bsStyle="primary" type="submit">Finish</Button>}
    </span>
  }

  render() {
    const {userId, questions, currentPage, getQuestion} = this.props;
    if(!userId) {
        return <Redirect to='/login'/>
    } else {
      let headerContent = <h4 className="title">Quiz</h4>;
      let questionContent;
      let footerContent;
      if(!questions[currentPage-1]) {
        getQuestion(questions); 
      } else {      
        questionContent = this.questionsComponent(questions[currentPage-1]);
        footerContent = this.footerComponent(currentPage);
      }
      return (
        <div className="container-fluid">       
            <div className="row">
              <GridBlock colSize={6} center={true} header={headerContent} content={questionContent} footer={footerContent} />
            </div> 
        </div>
      )
    }
  }
};

const mapStateToProps = (state) => ({
    userId: true,//state.sessionUser.userId    
    currentPage: state.questions.currentPage,
    questions: state.questions.questions
})

const mapDispatchToProps = (dispatch) => ({
  getQuestion: bindActionCreators(getQuestion, dispatch), //questions already answered list
  previousQuestion: bindActionCreators(previousQuestion, dispatch), 
  nextQuestion: bindActionCreators(nextQuestion, dispatch),
  setAnswer: bindActionCreators(setAnswer, dispatch)
})
  
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Quiz));