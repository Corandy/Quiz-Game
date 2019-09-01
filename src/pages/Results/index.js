import React, { Component } from 'react';
import { connect,  } from 'react-redux';
import { bindActionCreators } from 'redux'
import { withRouter, Redirect } from 'react-router-dom';
import { Button } from 'react-bootstrap';

import { getUserSpecificResults, getAllResults } from '../../actions/results';
import { removeUserId } from '../../actions/sessionUser';
import GridBlock from '../../components/GridBlock';

class Results extends Component {
  
  static defaultProps = {
    userId: false,
    allResults: [],
    userResults: {}
  }  

  goToQuestions= () => {
    this.props.history.push('/');
  }

  resultsComponent() {    
    return <span></span> 
  }

  footerComponent() {
    return <span>
      <Button onClick={this.props.goToQuestions} bsStyle="primary" type="submit">Go back to Questions</Button>
      <Button onClick={this.props.removeUserId} bsStyle="primary" type="submit">Restart</Button> 
    </span>
  }

  render() {
    const {userId, allResults, userResults} = this.props;
    if(!userId) {
        return <Redirect to='/login'/>
    } else {
      let headerContent = <h4 className="title">Your Results</h4>;
      let resultsContent = this.resultsComponent(results);
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
    userId: state.sessionUser.userId,
    allResults: state.results.results,
    userResults: state.results.userSessionsResults
})

const mapDispatchToProps = (dispatch) => ({
  getUserSpecificResults: bindActionCreators(getUserSpecificResults, dispatch), //userId
  getAllResults: bindActionCreators(getAllResults, dispatch), 
  removeUserId: bindActionCreators(removeUserId, dispatch)
})
  
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Results));