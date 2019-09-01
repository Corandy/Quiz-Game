import React, { Component } from 'react';
import { connect,  } from 'react-redux';
import { bindActionCreators } from 'redux'
import { withRouter, Redirect } from 'react-router-dom';
import axios from 'axios';

import GridBlock from '../../components/GridBlock';

class Quiz extends Component {
    state = {}
  
    static defaultProps = {
      userId: false
    }

  headerComponent() {
    let headerContent = <h4 className="title">Quiz</h4>;
    return (
        <GridBlock colSize={12} header={headerContent} />
    );
  }

  ItemTreeComponent() {
    let headerContent = <div><h4 className="title">Component</h4><hr/></div>;
    let contentContent = <span></span>;
    return (
        <GridBlock colSize={12} header={headerContent} content={contentContent} />
    );     
  }

  render() {
    if(!this.props.userId) {
        return <Redirect to='/login'/>
    } else {
        return (
          <div className="container-fluid">       
              <div className="row">
              {this.headerComponent()}
              </div> 
              <div className="row">
              {this.ItemTreeComponent()}
              </div> 
          </div>
        )
    }
  }
};

const mapStateToProps = (state) => ({
    userId: state.sessionUser.userId    
})

const mapDispatchToProps = (dispatch) => ({
    
})
  
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Quiz));