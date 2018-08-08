import React from 'react';
import './App.css';
import { Panel } from 'react-bootstrap';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import firebaseApp from './Firebase/Firebase';
import Cookies from 'js-cookie';
import { UPDATE, SEND } from './ReduxSetup/store/Constants/Constants';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            error: ""
        }
    }
    handleemail(e) {
        this.setState({ email: e.target.value });
    }
    handlepassword(e) {
        this.setState({ password: e.target.value });
    }
    send() {
        if (this.state.email && this.state.password) {
            firebaseApp.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then(response => {
                Cookies.remove('session');
                Cookies.set('session', response.user.uid);
                this.props.changeStateToReducer(this.state.email, this.state.password);
                this.props.Authfunction(true);
            })
                .catch(error => {
                    Cookies.remove('session');
                    this.setState({ error: error.message })
                })
        }
        else {
            this.setState({ error: "All field all mandatory" })
        }
    }
    render() {

        if (this.props.send) {
            this.props.Authfunction(false);
            return (<Redirect to="/home" />)
        }
        return (
            <Panel className='login'>
                <Panel.Heading>Sign In</Panel.Heading>
                <Panel.Body>
                    <div className='form'>
                        <div id="login">
                            <input type="email" id="email" value={this.state.email} placeholder="Email" onChange={this.handleemail.bind(this)} />
                            <input type="password" id="password" value={this.state.password} placeholder="Password" onChange={this.handlepassword.bind(this)} />
                            <div className="color">{this.state.error}</div>
                            <button id="send" onClick={this.send.bind(this)}>Sign In</button>

                        </div>
                    </div>
                </Panel.Body>
            </Panel>
        );
    }
}
function mapStateToProps(state) {
    return ({
        username: state.rootRecuer.username,
        Email: state.rootRecuer.Email,
        Password: state.rootRecuer.Pass,
        send: state.rootRecuer.send
    })
}
function mapDispatchToProps(dispatch) {
    return ({
        changeStateToReducer: (em, ps) => {
            dispatch({
                type: UPDATE, paylaod: { Email: em, Pass: ps }
            })
        },
        Authfunction: (bool) => {
            dispatch({ type: SEND, paylaod: bool })
        }
    })
}
export default connect(mapStateToProps, mapDispatchToProps)(Login); 