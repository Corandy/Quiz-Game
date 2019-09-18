import React from 'react';
import { Button } from 'react-bootstrap';

const ButtonBar = ({
        currentPage = 1, //number between min-max  
        min = 0, //number,
        max = false, //number or false 
        previousEvent = false, //event
        nextEvent = false, // event
        finishEvent = false // event
    }) => {
    return <div>
        {currentPage > min && <Button onClick={previousEvent} bsStyle="primary" type="submit">Previous</Button>}
        <span className={'page_indicator'}>{'Page '+currentPage}</span>
        {currentPage < max && <Button onClick={nextEvent} bsStyle="primary" type="submit">Next</Button> }
        {currentPage == max && !!finishEvent && <Button onClick={finishEvent} bsStyle="primary" type="submit">Finish</Button>}
    </div>;    
}

export default ButtonBar;