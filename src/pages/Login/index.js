import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter, Redirect } from 'react-router-dom';
import { Button } from 'react-bootstrap';

import { loginByMailAddress } from '../../actions/sessionUser';
import GridBlock from '../../components/GridBlock';
import FieldGroup from '../../components/FieldGroup';

//login page
class Login extends Component {

  checkMailEvent = (event) => {    
    event.preventDefault();
    //some basic validation
    let value = event.target.elements[0].value;
    if (!value) {
      return alert('Email is required');
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
      return alert('Invalid email address');
    }
  
    //sends data to server to check if user is not already used, when succesful the user will go automaticly to the question page
    this.props.loginByMailAddressDispatch(value).then(res => {
      console.log('success');
    }).catch(error =>{
      alert(error);
    });
  }

  loginComponent() {
    let headerContent = <h4 className="title">Login</h4>; 
    let contentContent = <span>
      <form onSubmit={this.checkMailEvent}>
        <FieldGroup type="email" label="Email address" placeholder="Enter email"/>
        <Button bsStyle="primary" type="submit">Login</Button>
      </form>      
    </span>;
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
  userId: state.get('sessionUser').get('userId') //encrypted email string
})

const mapDispatchToProps = (dispatch) => ({
  loginByMailAddressDispatch: bindActionCreators(loginByMailAddress, dispatch)//input: email
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Login));