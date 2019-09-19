import React, { Component } from 'react';
import { connect,  } from 'react-redux';
import { bindActionCreators } from 'redux'
import { withRouter, Redirect } from 'react-router-dom';
import { Button } from 'react-bootstrap';

import { getUserResults } from '../../actions/results';
import { removeUserId } from '../../actions/sessionUser';
import GridBlock from '../../components/GridBlock';
import ResultsComponent from '../../components/ResultsComponent';
import Immutable from 'immutable';

class Results extends Component {
  
  static defaultProps = {
    userId: false,
    userResults: Immutable.List()
  }  

  goToQuestionsEvent = () => {    
    this.props.history.push('/');
  }

  goToLeaderBoardEvent = () => {
    this.props.history.push('/leaderboard');
  }

  resultsComponent() {    
    const { userId, userResults, getUserResultsDispatch} = this.props;
    //if question is not already loaded for this page, call get question dispatch
    if(!userResults.get('userId')) {
      getUserResultsDispatch(userId); 
      return false;
    } else {    
      return <ResultsComponent results={userResults.toJS()}/>;
    }
  }

  footerComponent() {
    return <span>
      <Button onClick={this.goToLeaderBoardEvent} bsStyle="primary" type="submit" style={{marginRight: '8px'}}>Check the Leaderboard</Button>
      <Button onClick={this.props.removeUserIdDispatch} bsStyle="primary" type="submit">Restart</Button> 
    </span>
  }

  render() {
    const {userId} = this.props;
    if(!userId) {
        return <Redirect to='/login'/>
    } else {
      let headerContent = <h4 className="title">Your Results</h4>;
      let resultsContent = this.resultsComponent();
      let footerContent = this.footerComponent();
      return (
        <div className="container-fluid">       
            <div className="row">
              <GridBlock colSize={6} center={true} header={headerContent} content={resultsContent} footer={footerContent} />
            </div> 
        </div>
      )
    }
  }
};

const mapStateToProps = (state) => ({
  userId: state.get('sessionUser').get('userId'),
  userResults: state.get('results').get('userResults')
})

const mapDispatchToProps = (dispatch) => ({
  getUserResultsDispatch: bindActionCreators(getUserResults, dispatch), //userId
  removeUserIdDispatch: bindActionCreators(removeUserId, dispatch)
})
  
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Results));