import React, { Component } from 'react';

//the progressbar shows the player wher
const ProgressBar = ({
        currentPage = 1, //number between min-max  
        list = [], //list with objects
        propertyFilled = false, //string to check which property to check if it's filled,
        max = false, //number of false   
    }) => {    
     
    //extend the list so there will be max amounts of bullets rendered
    if(max && max-list.length > 0) {
        let emptyList = [...Array(max-list.length)].map(() => {
            let emptyObject = {};
            emptyObject[propertyFilled] = false;
            return emptyObject;
        });
        list = [...list, ...emptyList];
    }

    return <div className={'progress_bar'}>
        {list.map((object, index) => {
            //when answer is given to that index it will have a darker color than default
            //when the index is the same as current page it will be the darkest color
            let effect = !!object[propertyFilled] ? ' progress_bar__item--filled' : '';
            effect = (index+1) === currentPage ? ' progress_bar__item--active' : effect;   
            return <div key={index} className={'progress_bar__item'+effect}></div>; 
        })}   
    </div> 
}

export default ProgressBar;