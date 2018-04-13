import React, { Component } from 'react';
import './profile.css'

const axios=require('axios');
class View_Profile extends Component {
    constructor(props){
        super(props);
        this.state={
            profile:[]
        }

    }
    componentWillMount(){
        debugger;
        const data={
            email:localStorage.getItem('email')
        }
        const api={
            method:"post",
            url:"http://localhost:5000/api/users/findByEmail",
            data:data,
            headers:{
                'x-auth': localStorage.getItem('token')
            }
        };
        axios(api).then((success)=>{
            debugger;
            if(success.data){
                this.setState({
                    profile:success.data
                })
            }
        }).catch((err)=>{
            alert(err);
        })
    }
    render() {
        return (
            <div>
                <div id="ProfilePage">
                    <div id="LeftCol">
                        <div id="Photo"></div>
                        <div id="ProfileOptions">
                            <img src="avatar.png"/>
                        </div>
                    </div>

                    <div id="Info">
                        <p>
                            <strong>Name:</strong>
                            <span>{this.state.profile.fullname}</span>
                        </p>
                        <p>
                            <strong>Email:</strong>
                            <span>{this.state.profile.email}</span>
                        </p>
                        <p>
                            <strong>Gender:</strong>
                            <span>{this.state.profile.gender}</span>
                        </p>
                        <p>
                            <strong>User Type:</strong>
                            <span>{this.state.profile.usertype}</span>
                        </p>
                    </div>
                    <div style={{"clear":"both"}}></div>
                </div>
            </div>
        );
    }
}

export default View_Profile;
