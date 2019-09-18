import React, { Component } from 'react';
import { connect,  } from 'react-redux';
import { bindActionCreators } from 'redux'
import { withRouter, Redirect } from 'react-router-dom';

import { getQuestion, previousQuestion, nextQuestion, setAnswer } from '../../actions/questions';
import { sendResults } from '../../actions/results';
import ButtonBar from '../../components/ButtonBar';
import GridBlock from '../../components/GridBlock';
import ProgressBar from '../../components/ProgressBar';
import QuestionComponent from '../../components/QuestionComponent';

class Quiz extends Component {
  
  static defaultProps = {
    userId: false,
    currentPage: 1,
    questions: []
  }  

  //if all is filled go to result otherwise warning
  goToResultsEvent = () => {   
    const {userId, questions} = this.props;
    var allQuestionsAnswered = true;
    questions.forEach((question) => {
      if(!question.user_answer) {
        allQuestionsAnswered = false;        
      }
    });
    if(allQuestionsAnswered) {      
      this.props.sendResultsDispatch(userId, questions).then(res => {
        alert('success');
        this.props.history.push('/results');
      }).catch(error =>{
        alert(error);
      });      
    } else {
      alert('Please fill in all the answers before finishing');
    }    
  }
  
  answerQuestionEvent = (event) => {
    this.props.setAnswerDispatch(this.props.currentPage, event.target.value);    
  }

  questionComponent() {
    const { questions, currentPage, getQuestionDispatch} = this.props;
    //if question is not already loaded for this page, call get question dispatch
    if(!questions[currentPage-1]) {
      getQuestionDispatch(questions); 
      return false;
    } else {    
      return <QuestionComponent question={questions[currentPage-1]} onChangeEvent={this.answerQuestionEvent}/>;
    }
  }

  footerComponent(currentPage) {
    const {questions, previousQuestionDispatch, nextQuestionDispatch} = this.props;
    return <React.Fragment>
      <ProgressBar currentPage={currentPage} list={questions} propertyFilled={'user_answer'} max={10}/>
      <div className={"flex-break"}></div> 
      <ButtonBar currentPage={currentPage} min={1} max={10} previousEvent={previousQuestionDispatch} nextEvent={nextQuestionDispatch} finishEvent={this.goToResultsEvent}/>
    </React.Fragment>;
  }

  render() {
    const {userId, currentPage} = this.props;
    if(!userId) {
        return <Redirect to='/login'/>
    } else {
      let headerContent = <h4 className="title">Quiz</h4>;
      let questionContent = this.questionComponent(currentPage)
      let footerContent = this.footerComponent(currentPage);
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
    userId: state.sessionUser.userId,    
    currentPage: state.questions.currentPage,
    questions: state.questions.questions
})

const mapDispatchToProps = (dispatch) => ({
  getQuestionDispatch: bindActionCreators(getQuestion, dispatch), //questions already answered list
  previousQuestionDispatch: bindActionCreators(previousQuestion, dispatch), 
  nextQuestionDispatch: bindActionCreators(nextQuestion, dispatch),
  setAnswerDispatch: bindActionCreators(setAnswer, dispatch),
  sendResultsDispatch: bindActionCreators(sendResults, dispatch) //userId, results
})
  
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Quiz));