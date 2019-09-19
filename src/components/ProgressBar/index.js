import React, { Component } from 'react';

const ProgressBar = ({
        currentPage = 1, //number between min-max  
        list = [], //list with objects
        propertyFilled = false, //string to check which property to check if it's filled,
        max = false, //number of false   
    }) => {    
     
    //extend display items when max is not reached    
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
            let effect = !!object[propertyFilled] ? ' progress_bar__item--filled' : '';
            effect = (index+1) === currentPage ? ' progress_bar__item--active' : effect;   
            return <div key={index} className={'progress_bar__item'+effect}></div>; 
        })}   
    </div> 
}

export default ProgressBar;