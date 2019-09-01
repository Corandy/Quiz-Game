import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter, Redirect } from 'react-router-dom';

import { loginByMailAddress } from '../../actions/sessionUser';
import GridBlock from '../../components/GridBlock';

class Login extends Component {

  checkMail = () => {    
    this.props.loginByMailAddress('martijnhoogers2@gmail.com').then(res => {
      alert('success');
    }).catch(error =>{
      alert(error);
    });
  }

  loginComponent() {
    let headerContent = <h4 className="title">Login</h4>; 
    let contentContent = <span><button onClick={this.checkMail}>checkMail</button></span>;
    return (
        <GridBlock colSize={6} center={true} header={headerContent} content={contentContent} />
    );     
  }

  render() {
    if(this.props.userId) {
      return <Redirect to='/'/>
    } else {
      return (
        <div className="container-fluid">       
          <div className="row">
            {this.loginComponent()}
          </div> 
        </div>
      )
    }
  };
}

const mapStateToProps = (state) => ({
  userId: state.sessionUser.userId    
})

const mapDispatchToProps = (dispatch) => ({
  loginByMailAddress: bindActionCreators(loginByMailAddress, dispatch)//email encrypted userId
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Login));