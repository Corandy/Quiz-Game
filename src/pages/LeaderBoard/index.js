import React, { Component } from 'react';
import { connect,  } from 'react-redux';
import { bindActionCreators } from 'redux'
import { withRouter, Redirect } from 'react-router-dom';
import { Button } from 'react-bootstrap';

import { getAllResults } from '../../actions/results';
import GridBlock from '../../components/GridBlock';
import LeaderBoardComponent from '../../components/LeaderBoardComponent';
import Immutable from 'immutable';

//leaderboard page
class Leaderboard extends Component {
  
  static defaultProps = {
    userId: false,
    userMail: false,
    allResults: Immutable.List()
  }  

  goToResultsEvent = () => {    
    this.props.history.push('/results');
  }

  leaderBoardComponent() {  
    const { allResults, getAllResultsDispatch, userId, userMail } = this.props;  
    //call results when there are no results in redux
    if(!allResults.size) {
      getAllResultsDispatch(); 
      return false;
    } else { //send data to leaderboard component
      return <LeaderBoardComponent list={allResults.toJS()} userId={userId} userMail={userMail}/>
    }    
  }

  footerComponent() {
    return <span>
      <Button onClick={this.goToResultsEvent} bsStyle="primary" type="submit" style={{marginRight: '8px'}}>Back to Results</Button>
    </span>
  }

  render() {
    const {userId} = this.props;
    if(!userId) {
        return <Redirect to='/login'/>
    } else {
      let headerContent = <h4 className="title">Leaderboard</h4>;
      let resultsContent = this.leaderBoardComponent();
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
    userMail: state.get('sessionUser').get('userMail'),
    allResults: state.get('results').get('results')
})

const mapDispatchToProps = (dispatch) => ({
  getAllResultsDispatch: bindActionCreators(getAllResults, dispatch)
})
  
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Leaderboard));