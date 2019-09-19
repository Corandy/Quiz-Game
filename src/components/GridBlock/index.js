import React, { Component } from 'react';

//gridblock helps the developer to get platform responsive design (based on bootstrap)
class GridBlock extends Component {
    static defaultProps = {
        colSize: 12, //number 1-12    determines how much width the block may have
        center: false, //boolean,
        header: false, //react-element 
        content: false, //react-element
        footer: false //react-element        
    }

    render() {
        let centerClassName = this.props.center ? 'center' : '';
        return ( 
            <div className={"col-md-"+this.props.colSize+' '+centerClassName}>
                <div className="card">
                    <div className="header">
                    {this.props.header}
                    </div>
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