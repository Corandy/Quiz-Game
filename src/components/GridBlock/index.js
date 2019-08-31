import React, { Component } from 'react';

class GridBlock extends Component {
    static defaultProps = {
        colSize: 12, //number 1-12    determines how much width the block may have
        header: false, //react-element 
        content: false, //react-element
        footer: false //react-element
    }

    render() {
        return ( 
            <div className={"col-md-"+this.props.colSize}>
                <div className="card">
                {!!this.props.header &&
                    <div className="header">
                    {this.props.header}
                    </div>
                }
                {!!this.props.content &&
                    <div className="content">
                        {this.props.content}
                    </div>
                }
                {!!this.props.footer &&
                    <div className="footer">
                        {this.props.footer}
                    </div>
                }
                </div>     
            </div>  
        )
    }
}

export default GridBlock;