import React, { Component } from 'react';
class Admin_Home extends Component {
    render() {
        return (
            <div>
                <marquee scrollamount="30"><h1>Welcome {localStorage.getItem('email')}</h1></marquee>

            </div>
        );
    }
}
export default Admin_Home;
