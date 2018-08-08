import React, { Component } from 'react';
import Signup from './Signup';
import Login from './Login';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { Route, Switch, Redirect } from 'react-router-dom';
import Home from './Home';
import './App.css';

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            signup: false,
            login: false
        };
    }
    signUp() {
        this.setState({
            signup: true,
            login: false
        });
    }
    login() {
        this.setState({
            signup: false,
            login: true
        });
    }
    render() {
        return (
            <Switch>
                <div>
                    <Route path='/login' component={Login} />
                    <Route path='/signup' component={Signup} />
                    <Route path='/home' component={Home} />
                    <Navbar fixedTop>
                        <Navbar.Header>
                            <Navbar.Brand>
                                <a href="/">
                                    Our Awesome App
                                </a>
                            </Navbar.Brand>
                            <Navbar.Toggle />
                        </Navbar.Header>
                        <Navbar.Collapse>
                            <Nav pullRight>
                                <NavItem onClick={this.login.bind(this)}
                                    eventKey={1}>
                                    Login
                                </NavItem>
                                <NavItem onClick={this.signUp.bind(this)}
                                    eventKey={2} >
                                    Sign up
                               </NavItem>
                            </Nav>
                        </Navbar.Collapse>
                    </Navbar>
                    {this.state.signup ? <Redirect to='/signup' /> : null}
                    {this.state.login ? <Redirect to='/login' /> : null}
                </div>
            </Switch>
        );
    }
}