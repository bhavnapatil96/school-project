import React, { Component } from 'react';
import {Table,FormGroup,ControlLabel,FormControl} from 'react-bootstrap';
import {baseurl} from '../../config/baseurl'
const axios=require('axios');

class Student_List extends Component {
    constructor(props){
        super(props);
        this.state= {
            student: [],
            totalRecords:3,
            curr:1,
        }

    }
    componentWillMount(){
        debugger;
        axios.get(baseurl+'/api/student/list').then((success)=>{
            debugger;
            if(success){
                this.setState({
                    student:success.data
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
    render() {
        let pages=[];
        let len=this.state.student.length;
        let page=Math.ceil(len/this.state.totalRecords)
        for(let i=1;i<=page;i++){
            pages.push(i);
        }
        let lastRec=this.state.curr*this.state.totalRecords;
        let firstRec=lastRec-this.state.totalRecords;
        let totalRec=this.state.student.slice(firstRec,lastRec);
        return (
            <div style={{"padding":"80px"}}>
                <div className="col-lg-2">
                    <select onChange={this.handleEntry} className="form-control">
                        <option value="3">3</option>
                        <option value="5">5</option>
                        <option value="10">10</option>
                    </select>
                </div>
                <br/>
                <br/>
                <Table striped bordered  hover>
                    <thead>
                    <tr>
                        <th>Fullname</th>
                        <th>Email</th>
                        <th>Gender</th>
                        <th>Photo</th>
                    </tr>
                    </thead>
                    <tbody>
                        {
                            totalRec.map((student,i)=>{
                                return(
                                <tr>
                                    <td>{student.fullname}</td>
                                    <td>{student.email}</td>
                                    <td>{student.gender}</td>
                                    <td><img src={baseurl+'/upload/'+student.photo}/></td>

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
            </div>
        );
    }
}

export default Student_List;
