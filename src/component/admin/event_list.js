import React, { Component } from 'react';
import {Table,FormGroup,ControlLabel,FormControl,Button} from 'react-bootstrap';
import {baseurl} from '../../config/baseurl'
import Event_Form from "../../component/admin/event_form";
import {NavLink,Switch,BrowserRouter,Route,Redirect} from 'react-router-dom'
const _=require('lodash')
const axios=require('axios');


class Event_List extends Component {
    constructor(props){
        super(props);
        this.state= {
            eventList: [],
            totalRecords:3,
            curr:1,
            isActive:false
        }

    }
    setStateFalse(newData){
        console.log('called', newData);
        this.setState({
            isActive:false
        })
        debugger;
        let Index=this.state.eventList.findIndex((d)=>d._id===newData._id)
        console.log(Index, Index);
        if(Index===-1){
            this.state.eventList.push(newData)
        }
        else{

        }
        this.setState({
            editEvent:''
        })
    }
    componentWillMount(){
        debugger;
        const api={
            method:"get",
            url:"http://localhost:5000/api/events/list",
            headers:{
                'x-auth': localStorage.getItem('token')
            }
        };
        axios(api).then((success)=>{
            debugger;
            if(success.data){
                this.setState({
                    eventList:success.data
                })
            }
        }).catch((err)=>{
            alert(err);
        })
    }
    mypage=(no)=>{
        this.setState({curr:no})
    }
    handleEntry=(e)=>{
        this.setState({totalRecords:e.target.value,curr:1})
    }
    openStaticModal=(e)=>{

        this.props.history.push('/staticModal')
    }
    deleteEvent(id){
        debugger;
        let data={
            id:id
        }
        const api={
            method:"delete",
            url:"http://localhost:5000/api/events/delete",
            data:data,
            headers:{
                'x-auth': localStorage.getItem('token')
            }
        };
        axios(api).then((success)=>{
            if(success.data){
                let dt=this.state.eventList.filter((dt)=>dt._id!==success.data._id);
                this.setState({eventList:dt})
            }
        }).catch((err)=>{
            alert(err);
        })
    }
    toggle=()=>{
        this.setState({
            isActive:true,
        })
    }
    render() {
        debugger
        let pages=[];
        let len=this.state.eventList.length;
        let page=Math.ceil(len/this.state.totalRecords)
        for(let i=1;i<=page;i++){
            pages.push(i);
        }
        let lastRec=this.state.curr*this.state.totalRecords;
        let firstRec=lastRec-this.state.totalRecords;
        let totalRec=this.state.eventList.slice(firstRec,lastRec);
        return (
            <div style={{"padding":"80px"}}>

                    <div className="col-lg-2">
                        <select onChange={this.handleEntry} className="form-control">
                            <option value="3">3</option>
                            <option value="5">5</option>
                            <option value="10">10</option>
                        </select>
                    </div>
                    <div>
                        <Button bsStyle="success" onClick={this.toggle}>Add Event</Button>
                        <Button bsStyle="primary" onClick={this.openStaticModal}>Read More</Button>


                    </div>
                    <br/>
                    <Table striped bordered  hover>
                        <thead>
                        <tr>
                            <th>Event Name</th>
                            <th>Event Date</th>
                            <th>Organizer</th>
                            <th>Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            totalRec.map((event,i)=>{
                                let dt=new Date(event.date);
                                return(
                                    <tr>
                                        <td>{event.name}</td>
                                        <td>{dt.toLocaleDateString()}</td>
                                        <td>{event.organizer}</td>
                                        <td>
                                            <Button bsStyle="danger" onClick={(e)=>{this.deleteEvent(event._id)}}>Delete</Button>
                                            <Button onClick={()=>{
                                                this.setState({
                                                    editEvent:event
                                                },this.toggle())
                                                }}>Edit</Button>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                        </tbody>
                        <tr>
                            <td colSpan="4">
                                <button  onClick={()=>this.mypage(1)}><i className="fa fa-angle-double-left"></i></button>
                                {
                                    (this.state.curr===1)?
                                        <button  disabled={'true'}><i className="fa fa-angle-left"></i></button>
                                        :
                                        <button  onClick={()=>this.mypage(this.state.curr-1)}><i className="fa fa-angle-left"></i></button>
                                }
                                <button>{this.state.curr}</button>
                                {
                                    (this.state.curr===page)?
                                        <button disabled={'true'}><i className="fa fa-angle-right"></i></button>
                                        :
                                        <button onClick={()=>this.mypage(this.state.curr+1)}><i className="fa fa-angle-right"></i></button>
                                }
                                <button  onClick={()=>this.mypage(page)}><i className="fa fa-angle-double-right"></i></button>
                            </td>
                        </tr>
                    </Table>
                    <Event_Form isShow={this.state.isActive} setStateFalse={this.setStateFalse.bind(this)} Edit={this.state.editEvent}/>
            </div>
        );
    }
}
export default Event_List;
