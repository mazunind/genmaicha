import React from 'react'
import Modal from 'react-modal'
import ReactDOM from 'react-dom'

class Bottom extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            user : {
                username: ''

            },
            avatar: null,
            modalIsOpen: false
        }
        //fetching user data
        fetch(document.location.protocol + '//' + document.location.hostname + ':8000' + '/api/profile', {
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
    openModal(){
        this.setState({modalIsOpen: true})
    }

    closeModal() {
        this.setState({modalIsOpen: false});
    }

    clearDesc(){
        document.getElementById('desc').value=''
    }

    nowDate(){
        let now = new Date()
        now.setHours(0, 0, 0, 0)
        return now.toISOString()
    }
    postLesson(e){
        e.preventDefault()
        let select = document.getElementById('course')
        let data = {
            course_id: select.options[select.selectedIndex].getAttribute('apikey'),
            datetime: document.getElementById('datetime').value,
            desc: document.getElementById('desc').value
        }
        console.log(JSON.stringify(data))
        fetch(document.location.protocol + '//' + document.location.hostname + ':8000' + '/api/lessons/', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.token
            },
            body: JSON.stringify(data)
        }).then(this.closeModal.bind(this)).catch(error => console.log(error))
    }

    render(){
        return (
            <div id='bottom'>
                You are logged in as {this.state.user.username} <br/>
                <button className='medium-button logout-button' onClick={this.logOut}>Log out</button>
                <button className='medium-button add-button' onClick={this.openModal.bind(this)}>Add Lesson</button>
                <Modal
                    isOpen={this.state.modalIsOpen}
                    onRequestClose={this.closeModal.bind(this)}
                    contentLabel='Add a lesson'
                    ariaHideApp={false}
                    className='modal card-box' 
                >
                    <form className='lesson-form' onSubmit={this.postLesson.bind(this)}>
                        <h4 id='add-login-title'>To add a lesson choose a desired course, date and description</h4> 
                        <CourseDropdown/>
                        <input id='desc' type='text' name='desc' defaultValue='Description' onClick={this.clearDesc}/>
                        <input id='datetime' type='datetime-local'  name='datetime'/>
                        <input className='medium-button lesson-form-button' type='submit' value='Add'></input>
                    </form>
                </Modal>
            </div>
        );
    }
}

export default Bottom;

class CourseDropdown extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            options: []
        }
    }
    componentDidMount(){
        //getting options for course dropdowm menu
        fetch(document.location.protocol + '//' + document.location.hostname + ':8000' + '/api/courses/', {
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.token
            }
        }).then(response => response.json()).then(data => this.setState({options: data}))
    }
    render(){
        return(
            <div>
                <select id='course'>
                    {this.state.options.map(option => (
                        <option key={option.id} apikey={option.id}>{option.student.first_name}'s {option.name} course </option>
                    ))}
                </select>
            </div>
        )
    }
}