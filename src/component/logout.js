import React, { Component } from 'react';
import {BrowserRouter,Switch,NavLink,Route,Redirect} from 'react-router-dom'

class Logout extends Component {
    constructor(props){
        super(props)
    }
    componentWillMount(){
        localStorage.removeItem('token')
        localStorage.removeItem('email')
        localStorage.removeItem('usertype')


        this.props.history.push('/')
    }
    render() {
        return (
            <div>

            </div>
        );
    }
}

export default Logout;
