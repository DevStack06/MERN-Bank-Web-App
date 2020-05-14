import React from 'react';
import { shallow } from 'enzyme';
import FlatButton from 'material-ui/FlatButton'
import Logout from './Logout';

describe('<Logout /> component', () => {
    it('shows logout when visible is set to true', () => {
        const wrapper = shallow(
            <Logout visible={true} />
        )

        expect(wrapper.find(FlatButton).length).toBe(1)
    })

    it('hides logout when visible is not set', () => {
        const wrapper = shallow(
            <Logout />
        )

        expect(wrapper.find(FlatButton).length).toBe(0)
    })
    
    it('has correct label', () => {
        const wrapper = shallow(
            <Logout visible={true} />
        )

        expect(wrapper.find(FlatButton).props().label).toBe('Logout')
    })

    it('handles click event', () => {
        let onButtonClick = jest.fn()

        const wrapper = shallow(
            <Logout visible={true} onClick={onButtonClick} />
        )

        const button = wrapper.find(FlatButton)

        expect(onButtonClick.mock.calls.length).toBe(0)
        button.simulate('click')
        expect(onButtonClick.mock.calls.length).toBe(1)
    })
})