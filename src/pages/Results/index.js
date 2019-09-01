import React, { Component } from 'react';

import GridBlock from '../../components/GridBlock';

class Results extends Component {

  headerComponent() {
    let headerContent = <h4 className="title">Results</h4>;
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

  checkMail() { 
  }
 
  render() {
    return (
      <div className="container-fluid">       
        <div className="row">
          {this.headerComponent()}
        </div> 
        <div className="row">
          {this.ItemTreeComponent()}
        </div> 
      </div>
  )}
};

export default Results;