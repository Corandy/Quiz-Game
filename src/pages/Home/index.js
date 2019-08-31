import React, { Component } from 'react';
import GridBlock from '../../components/GridBlock';

class Start extends Component {

  headerComponent() {
    let headerContent = <h4 className="title">Start</h4>;
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
    return (
    <div className="content">
      <div className="container-fluid">       
        <div className="row">
          {this.headerComponent()}
        </div> 
        <div className="row">
          {this.ItemTreeComponent()}
        </div> 
      </div>
    </div>
  )}
};

export default Start;