import React, { Component } from 'react';
class Student_Home extends Component {
    render() {
        return (
            <div>
                <marquee scrollamount="30"><h1>Welcome {localStorage.getItem('email')}</h1></marquee>
            </div>
        );
    }
}
export default Student_Home;
