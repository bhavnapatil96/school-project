import React, {Component} from 'react';
import {baseurl} from '../../config/baseurl'
import {NavLink, Switch, BrowserRouter, Route, Redirect} from 'react-router-dom'
import {Modal, Button} from 'react-bootstrap'

const axios = require('axios');

class Event_Form extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isActive: true,
            event: [],
            //editEvent: [],
            editId: ''
        }
    }

    handleChange = (e) => {
        const {value, name} = e.target
        const event = this.state
        event[name] = value
        this.setState({
            event
        }, () => {
            console.log('state ', this.state.event)
        })
    }

    componentWillReceiveProps(nextProps) {
        debugger;
        console.log("props---->", nextProps.Edit);
        //debugger
        this.setState({
            event: nextProps.Edit,
            editId: nextProps.Edit && nextProps.Edit._id,

        }, () => {
            console.log('edit ', this.state.event)
        })
    }

    navigate = (newData) => {
        debugger;
        this.props.setStateFalse(newData);

    }
    save = (e) => {
        e.preventDefault();
        const {event} = this.state;


        if (this.state.editId) {
            let formdata = new FormData();
            console.log('id', this.state.editId)
            formdata.append('id', this.state.editId);
            formdata.append('name', event.name);
            formdata.append('date', event.date);
            formdata.append('organizer', event.organizer);

            const api = {
                method: "post",
                url: "http://localhost:5000/api/events/update",
                data: formdata,
                headers: {
                    'x-auth': localStorage.getItem('token')
                }
            };
            axios(api).then((success) => {
                debugger;
                if (success.data) {
                    // // this.props.history.push('/eventList')
                    // return <Redirect to="/eventList"/>
                    this.navigate(success.data);
                }
            }).catch((err) => {
                alert(err);
            })
        }
        else {

            let formdata = new FormData();
            formdata.append('name', event.name);
            formdata.append('date', event.date);
            formdata.append('organizer', event.organizer);
            const api = {
                method: "post",
                url: "http://localhost:5000/api/events/add",
                data: formdata,
                headers: {
                    'x-auth': localStorage.getItem('token')
                }
            };
            axios(api).then((success) => {
                debugger;
                if (success.data) {
                    this.navigate(success.data);
                }
            }).catch((err) => {
                alert(err);
            })
        }
    };

    render() {

        let {event}=this.state;
        return (
            <div>
                <Modal show={this.props.isShow} onHide={this.navigate}>
                    <Modal.Header>
                        <Modal.Title>Event Registration</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form onSubmit={this.save} action="" method="post" encType="multipart/form-data">
                            <div className="form-group row">
                                <label className="col-sm-2 col-form-label" for="txtname">Event Name</label>
                                <div className="col-sm-10">
                                    <input className="form-control" type="text"
                                           value={event && event.name}
                                           placeholder="Event Name" onChange={this.handleChange} name="name"
                                           required="true"/>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-sm-2 col-form-label" for="txtname">Date</label>
                                <div className="col-sm-10">

                                    {
                                        event && event._id? <input className="form-control" type="date"
                                                          value={event && event.date.split("T")[0]}
                                                          onChange={this.handleChange} name="date" required="true"/>:
                                            <input className="form-control" type="date"
                                                   value={event && event.date}
                                                   onChange={this.handleChange} name="date" required="true"/>
                                    }

                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-sm-2 col-form-label" for="txtname">Organizer</label>
                                <div className="col-sm-10">
                                    <input className="form-control" type="text"
                                           value={event && event.organizer}
                                           placeholder="Organizer" onChange={this.handleChange} name="organizer"
                                           required="true"/>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-sm-2 col-form-label" for="txtname"></label>
                                <div className="col-sm-10">
                                    <input type="submit" className="btn btn-success" value="Save"/>
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

export default Event_Form;
