import React, { Component } from 'react';
import '../login.css'
import {baseurl} from '../config/baseurl'
const axios=require('axios');
let InvalidMessage=''
class Login extends Component {
    constructor(props){
        super(props);
        this.state={
            user:{}
        }
    }
    handleChange=(e)=>{
        const {value,name}=e.target
        const user=this.state
        user[name]=value
        this.setState({
            user
        },()=>{console.log('state ',this.state.user)})
    }
    login=(e)=>{
        InvalidMessage='';
        e.preventDefault();
        axios.post(baseurl+'/api/users/loginp',this.state.user).then((success)=>{
            debugger;
            if(success.data){
                localStorage.setItem('email',success.data.email);
                localStorage.setItem('usertype',success.data.usertype);
                localStorage.setItem('token',success.headers["x-auth"]);
                if(localStorage.getItem('usertype')==='student'){
                    this.props.history.push('/studentHome');
                }
                else{
                    this.props.history.push('/adminHome');
                }
            }
        }).catch((err)=>{
            debugger;

            InvalidMessage='Invalid Username or Password';
            alert('Invalid Username or Password');
        })
    }
    render() {
        return (
            <section>
                <div id="login" className="container">
                    <div className="card card-container">
                        <img id="profile-img" className="profile-img-card" src="//ssl.gstatic.com/accounts/ui/avatar_2x.png" />
                        <p id="profile-name" className="profile-name-card"></p>
                        <form className="form-signin" onSubmit={this.login}>
                            <span style={{"color":"red"}} id="reauth-email" className="reauth-email">{InvalidMessage}</span>
                            <input required="true" name="email" onChange={this.handleChange} type="email" id="txtemail" className="form-control" placeholder="Email address"  autofocus/>
                            <input required="true" name="password" onChange={this.handleChange} type="password" id="txtpassword" className="form-control" placeholder="Password"/>
                            <button className="btn btn-lg btn-primary btn-block btn-signin" type="submit">Sign in</button>
                        </form>

                    </div>
                </div>
            </section>
        );
    }
}

export default Login;
