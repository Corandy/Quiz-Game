import React from 'react';
import { connect } from 'react-redux';
import { Route, withRouter } from 'react-router-dom';

import Header from './Header';
import Footer from './Footer';

import Home from './Home';

const Main = ({history}) => {
  history.listen(() => {});
  let baseURL = '';//process.env.ROOT_URL !== '' ? '/' + process.env.ROOT_URL : process.env.ROOT_URL;
  return (
      <div className="wrapper">
        <div className="main-panel">
          <Header />
          <Route exact path={baseURL+"/:pageNo*/account::id"} component={Location} /> 
          <Route exact path={baseURL+"/"} component={Home} />
          <Footer />
        </div>
      </div>
  )
};

const mapStateToProp = state => ({
  
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  
});

export default withRouter(connect(mapStateToProp, mapDispatchToProps)(Main));