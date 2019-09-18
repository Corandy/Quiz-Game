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
            let color = !!object[propertyFilled] ? '#0f0' : '#888';
            color = (index+1) === currentPage ? '#00f' : color;   
            return <div key={index} className={'progress_bar__item'} style={{background:color}}></div>; 
        })}   
    </div> 
}

export default ProgressBar;