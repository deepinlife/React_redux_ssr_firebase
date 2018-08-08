
import React from 'react';
import App from '../App.js';
import Login from '../Login.js';
import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Redirect } from 'react-router-dom';

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
   



});
