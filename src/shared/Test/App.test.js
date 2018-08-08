
import React from 'react';
import App from '../App.js';
import Login from '../Login.js';
import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Redirect } from 'react-router-dom';
import { wrap } from 'module';

configure({ adapter: new Adapter() });
describe("<App />", () => {
    it("Should render Only 1 component", () => {
        const wrapper = shallow(<App />);
        wrapper.setState({ signup: true });
        expect(wrapper.find(Redirect)).toHaveLength(1);
    });
    it("Should render Only 1 component", () => {
        const wrapper = shallow(<App />);
        wrapper.setState({ login: true });
        expect(wrapper.find(Redirect)).toHaveLength(1);
    });
    it("Should not render any component", () => {
        const wrapper = shallow(<App />);
        wrapper.setState({ signup: false, login: false });
        expect(wrapper.find(Redirect)).toHaveLength(0);
    });
    it('passes login information', () => {
        const email = 'pk@gmail.com';
        const password = 'password';
        const wrapper = mount(<Login />);
        const button = wrapper.find('button');
        button.simulate('click');
        wrapper.update();
        expect(wrapper.state().send).toEqual(false);
        console.log(wrapper.state());
    });



});