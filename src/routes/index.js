import React, { Component } from 'react';
import {NavLink,Switch,BrowserRouter,Route,Redirect} from 'react-router-dom'
import Login from '../component/login'
import Register from '../component/register'
import About from '../component/about'
import Home from "../component/home";

import Student_Home from "../component/student/student_home";
import Event_List_Student from "../component/student/event_list_student";
import View_Profile from "../component/student/view_profile";

import Admin_Home from "../component/admin/admin_home";
import Event_List from "../component/admin/event_list";
import Event_Form from "../component/admin/event_form";
import Static_Modal from "../component/admin/static_modal";
import Student_List from '../component/admin/student_list'

import Logout from "../component/logout";

import {Button} from 'react-bootstrap';

class Routes extends Component {
    constructor(props){
        super(props);
        this.state={
            isActive:false,
        }
    }
    setStateFalse(){
        //console.log('called', val);
        this.setState({
            isActive:false
        })
    }
    toggle=()=>{
        this.setState({
            isActive:!this.state.isActive
        })
    }
    render() {
        /*const Public=({...props})=>{
            return !localStorage.getItem('token')?<div><Route {...props}/></div>
                :<Redirect to="/studentList"/>
        }*/

        const Private=({...props})=>{
            return localStorage.getItem('token')?<div><Route {...props}/></div>
                :<Redirect to="/login"/>
        }
        return (
            <div>
                <div style={{"float":"right"}}>
                    <center>
                    <Button bsStyle="warning"><NavLink to="/about">About Us</NavLink></Button>
                        {
                            (localStorage.getItem('usertype') === 'admin') ?
                                <div style={{"float":"left"}}>
                                    <Button bsStyle="warning"><NavLink to="/eventList">Event Management</NavLink></Button>
                                    <Button bsStyle="warning"><NavLink to="/studentList">Student Management</NavLink></Button>
                                </div>: ''
                        }
                        {
                            (localStorage.getItem('usertype') === 'student') ?
                                <div style={{"float":"right"}}>
                                    <Button bsStyle="warning"><NavLink to="/eventListStudent">View Events</NavLink></Button>
                                    <Button bsStyle="warning"><NavLink to="/viewProfile">View Profile</NavLink></Button>
                                </div>:''
                        }
                        {
                            (!localStorage.getItem('usertype')) ?
                                <Button style={{"float":"right"}} bsStyle="warning" onClick={this.toggle}>Sign Up</Button>
                                :''
                        }
                        {
                            (localStorage.getItem('token'))?
                                <Button style={{"float":"right"}} bsStyle="warning"><NavLink to="/logout">Sign Out</NavLink></Button>
                                :
                                <Button style={{"float":"right"}} bsStyle="warning"><NavLink to="/login">Sign In</NavLink></Button>
                        }


                    </center>
                </div>

                <br/><br/><br/>
                <Switch>
                    <Route exact path="/" component={Home}/>
                    <Route exact path="/about" component={About}/>
                    <Route exact path="/login" component={Login}/>
                    {/*<Route exact path="/register" component={Register}/>*/}

                    <Private exact path="/adminHome" component={Admin_Home}/>
                    <Private exact path="/studentList" component={Student_List}/>
                    <Private exact path="/eventList" component={Event_List}/>
                    <Private exact path="/eventForm" component={Event_Form}/>
                    <Private exact path="/staticModal" component={Static_Modal}/>

                    <Private exact path="/studentHome" component={Student_Home}/>
                    <Private exact path="/eventListStudent" component={Event_List_Student}/>
                    <Private exact path="/viewProfile" component={View_Profile}/>


                    <Private exact path="/logout" component={Logout}/>

                </Switch>
                <Register show={this.state.isActive} setStateFalse={this.setStateFalse.bind(this)}/>
            </div>
        );
    }
}

export default Routes;
