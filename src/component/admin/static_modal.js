import React, { Component } from 'react';
import {baseurl} from '../../config/baseurl'
import {Modal,Button} from 'react-bootstrap'
const axios=require('axios');
class Static_Modal extends Component {
    constructor(props){
        super(props);
        this.state={
            isActive:true,
            event:[]
        }

    }
    navigate=()=>{
        this.setState({
            isActive:!this.state.isActive
        });
        this.props.history.push('/eventList')
    }


    render() {
        return (
            <div>
                <Modal show={this.state.isActive} onHide={this.navigate}>
                    <Modal.Header>
                        <Modal.Title>Event Detail</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <h4>Overflowing text to show scroll behavior</h4>
                        <p>
                            Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
                            dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta
                            ac consectetur ac, vestibulum at eros.
                        </p>
                        <p>
                            Praesent commodo cursus magna, vel scelerisque nisl consectetur
                            et. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor
                            auctor.
                        </p>
                        <p>
                            Aenean lacinia bibendum nulla sed consectetur. Praesent commodo
                            cursus magna, vel scelerisque nisl consectetur et. Donec sed odio
                            dui. Donec ullamcorper nulla non metus auctor fringilla.
                        </p>
                        <p>
                            Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
                            dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta
                            ac consectetur ac, vestibulum at eros.
                        </p>
                        <p>
                            Praesent commodo cursus magna, vel scelerisque nisl consectetur
                            et. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor
                            auctor.
                        </p>
                        <p>
                            Aenean lacinia bibendum nulla sed consectetur. Praesent commodo
                            cursus magna, vel scelerisque nisl consectetur et. Donec sed odio
                            dui. Donec ullamcorper nulla non metus auctor fringilla.
                        </p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.navigate}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}
export default Static_Modal;
