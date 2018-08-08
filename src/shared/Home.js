import React from 'react';
import './App.css';
import { Panel, Button } from 'react-bootstrap';
import { Redirect } from 'react-router';
import firebaseApp from './Firebase/Firebase';
import { goalRef } from './Firebase/Firebase';
import Cookies from 'js-cookie';

let userId;
class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            logout: false,
            email: '',
            error: ""
        }
    }
    componentWillMount() {
        firebaseApp.auth().onAuthStateChanged(user => {
            if (user) {
                const userId = user.uid;
                goalRef.child(userId).on('value', snap => {
                    this.setState({
                        email: snap.val().username
                    })
                })
            }
            else {
                this.setState({ error: 'Please Sign in first' })
            }
        })
    }
    signOut() {
        firebaseApp.auth().signOut();
        Cookies.remove('session');
        this.setState({ logout: true });
    }
    render() {
        if (this.state.logout) {

            return (<Redirect to='/' />)
        }

        return (
            <Panel className="home">
                <Panel.Heading>User Profile</Panel.Heading>
                <Panel.Body>
                    <div className="color"> {this.state.error}</div>
                    <div className='form'>
                        Welcome:
                        <h4>
                            {this.state.email}
                        </h4>
                        <Button id="signout" bsStyle='danger' onClick={this.signOut.bind(this)}>Sign Out</Button>
                    </div>
                </Panel.Body>
            </Panel>
        );
    }
}

export default Home;