import React from 'react';
import { connect } from 'react-redux';
import { Navbar, Nav, NavItem } from 'react-bootstrap';

const Header = ({ userName }) => {

  return (
      <Navbar fluid={true}>
        <Navbar.Collapse>
          <Nav pullRight={true}>
            <NavItem>{userName}</NavItem>
            <NavItem>Log out</NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
}

const mapStateToProps = (state) => {
  return {    
  }
}

const mapDispatchToProp = dispatch => ({
  
});

export default connect(mapStateToProps, mapDispatchToProp)(Header);