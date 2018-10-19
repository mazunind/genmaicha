import React from 'react'

class Bottom extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            user : {
                username: ''
            },
            avatar: null
        }
        fetch(document.location.origin.slice(0,-5) + ':8000' + '/api/profile', {
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.token
            }
        }).then(response => response.json()).then(data => this.setState(data)).catch(error => console.log(error))

    }
    logOut(){
        localStorage.clear()
        window.location.replace('/')
    }
    render(){
        return (
            <div id='bottom'>
                You are logged in as {this.state.user.username} <br/>
                <button className='medium-button logout-button' onClick={this.logOut}>Log out</button>
                <button className='medium-button add-button'>Add Lesson</button>
            </div>
        );
    }
}

export default Bottom;