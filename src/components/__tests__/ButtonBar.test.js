import React from 'react';
import { shallow } from 'enzyme';  
import ButtonBar from '../ButtonBar';

describe('ButtonBar', () => {

    it('renders without crashing', () => {
        shallow(<ButtonBar />);
    });

    it('renders correctly without max value', () => {
        const component = shallow(<ButtonBar currentPage={1} min={1}/>);
        expect(component).toMatchSnapshot();
    });

    it('renders correctly without Previous Button', () => {
        const component = shallow(<ButtonBar currentPage={1} min={1} max={10}/>);
        expect(component.find('.button_bar__previous').exists()).toEqual(false);
    });

    it('renders correctly without Next Button but with Finish Button', () => {
        const component = shallow(<ButtonBar currentPage={10} min={1} max={10} finishEvent={true}/>);
        expect(component.find('.button_bar__next').exists()).toEqual(false);
        expect(component.find('.button_bar__finish').exists()).toEqual(true);
    });

    const clickFn = jest.fn();
    it('Next Button is clickable', () => {
        const component = shallow(<ButtonBar currentPage={2} min={1} max={10} nextEvent={clickFn}/>);
        component
            .find('.button_bar__next')
            .simulate('click');
            expect(clickFn).toHaveBeenCalled();
    });

});