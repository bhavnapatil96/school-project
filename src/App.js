import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {NavLink,Switch,BrowserRouter,Route,Redirect} from 'react-router-dom'
import Routes from './routes/index'
import {Button} from 'react-bootstrap';

class App extends Component {
  render() {
    return (
        <BrowserRouter>
            <div>
                <div className="App-header">
                    <center>
                        <h3>School Management System</h3>
                    </center>
                </div>
                <div className="App-content">
                    <Routes/>
                </div>
                <div className="App-footer">
                    <center>
                        Copyrights @2018 All Rights Reserved
                    </center>
                </div>
            </div>
        </BrowserRouter>
    );
  }
}

export default App;
