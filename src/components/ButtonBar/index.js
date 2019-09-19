import React from 'react';
import { Button } from 'react-bootstrap';

//buttonbar has previous, next, finish button based on which page the user is
const ButtonBar = ({
        currentPage = 1, //number between min-max  
        min = 0, //number,
        max = false, //number or false 
        previousEvent = undefined, //event
        nextEvent = undefined, // event
        finishEvent = undefined // event
    }) => {
    return <div>
        {currentPage > min && <Button onClick={previousEvent} bsStyle="primary" type="submit" className="button_bar__previous">Previous</Button>}
        <span className={'page_indicator'}>{'Page '+currentPage}</span>
        {currentPage < max && <Button onClick={nextEvent} bsStyle="primary" type="submit" className="button_bar__next">Next</Button> }
        {currentPage == max && !!finishEvent && <Button onClick={finishEvent} bsStyle="primary" type="submit" className="button_bar__finish">Finish</Button>}
    </div>;    
}

export default ButtonBar;