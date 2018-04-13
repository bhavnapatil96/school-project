import React, { Component } from 'react';
import {baseurl} from '../config/baseurl'
import {NavLink,Switch,BrowserRouter,Route,Redirect} from 'react-router-dom'

import {Modal,Button} from 'react-bootstrap'
const axios=require('axios');

class Register extends Component {
    constructor(props){
        super(props);
        this.state={
            isActive:true,
            student:[]
        }
    }
    componentWillReceiveProps(nextProps){
        this.setState({
            isActive : nextProps.show
        });
    }
    navigate=()=>{
        this.props.setStateFalse();
    }
    handleChange=(e)=>{
        const {value,name}=e.target
        const student=this.state
        student[name]=value
        this.setState({
            student
        },()=>{console.log('state ',this.state.student)})
    }
    handleFile=(e)=>{
        const {value,name}=e.target
        const student=this.state
        student['photo']=e.target.files[0]
        this.setState({
            student
        },()=>{console.log('state ',this.state.student)})
    }
    save=(e)=>{
        e.preventDefault();
        const {student}=this.state;
        let formdata=new FormData();
        formdata.append('fullname',student.fullname);
        formdata.append('email',student.email);
        formdata.append('password',student.password);
        formdata.append('gender',student.gender);
        formdata.append('photo',student.photo);
        formdata.append('usertype','student');

        axios.post('http://localhost:5000/api/users/add',formdata).then((success)=>{
            debugger;
            if(!success.data.userexist){
                this.props.history.push('/login')
            }
            if(success.data.userexist){
                alert('Email Already Register')
            }
        }).catch((err)=>{
            alert(err);
        })
    }
    render() {
        return (
            <div>
               <Modal show={this.props.show} onHide={this.navigate}>
                   <Modal.Header>
                       <Modal.Title>Student Registration</Modal.Title>
                   </Modal.Header>
                   <Modal.Body>
                       <form onSubmit={this.save} action="" method="post" encType="multipart/form-data">
                           <div className="form-group row" >
                               <label className="col-sm-2 col-form-label" for="txtname">Fullname</label>
                               <div className="col-sm-10">
                                   <input className="form-control" type="text" placeholder="Fullname" onChange={this.handleChange} name="fullname" required="true" />
                               </div>
                           </div>
                           <div className="form-group row" >
                               <label className="col-sm-2 col-form-label" for="txtname">Email</label>
                               <div className="col-sm-10">
                                   <input className="form-control" type="email" placeholder="Email" onChange={this.handleChange} name="email" required="true"/>
                               </div>
                           </div>
                           <div className="form-group row" >
                               <label className="col-sm-2 col-form-label" for="txtname">Password</label>
                               <div className="col-sm-10">
                                   <input className="form-control" type="password" placeholder="Password" onChange={this.handleChange} name="password" required="true" minlength="6"
                                          pattern="[a-z]*@[0-9]*"/>
                               </div>
                           </div>
                           <div className="form-group row" >
                               <label className="col-sm-2 col-form-label" for="txtname">Gender</label>
                               <div className="col-sm-10">
                                   <input  className="" type="radio"  name="gender" value="F"  onChange={this.handleChange}/>
                                   <label className="form-check-label" for="txtradioF">Female</label>
                                   <input  className="" type="radio"  name="gender" value="M" onChange={this.handleChange}/>
                                   <label className="form-check-label" for="txtradioM">Male</label>
                               </div>
                           </div>
                           <div className="form-group row" >
                               <label className="col-sm-2 col-form-label" for="txtname">Photo</label>
                               <div className="col-sm-10">
                                   <input className="form-control" type="file"  onChange={this.handleFile} name="photo" required="true"/>
                               </div>
                            </div>
                           <div className="form-group row" >
                               <label className="col-sm-2 col-form-label" for="txtname"></label>
                               <div className="col-sm-10">
                                   <input type="submit" className="btn btn-success" value="Sign Up"/>
                               </div>
                           </div>

                       </form>
                   </Modal.Body>
                   <Modal.Footer>
                       <Button onClick={this.navigate}>Close</Button>
                   </Modal.Footer>
               </Modal>
            </div>
        );
    }
}

export default Register;
