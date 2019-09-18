import React from 'react';
import { Route, } from 'react-router-dom';

import Header from './Header';
import Footer from './Footer';

import Login from './Login';
import Quiz from './Quiz';
import Results from './Results';
import LeaderBoard from './LeaderBoard';

const Main = () => {
  return (
      <div className="wrapper">
        <div className="main-panel">
          <Header />
          <div className="content" style={{marginTop: '5%'}}>
              <Route exact path={"/login"} component={Login} />
              <Route exact path={"/"} component={Quiz} />
              <Route exact path={"/results"} component={Results} />  
              <Route exact path={"/leaderboard"} component={LeaderBoard} />              
          </div>
          <Footer />
        </div>
      </div>
  )
};

export default Main;