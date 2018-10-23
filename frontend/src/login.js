import React from 'react'
import ReactDOM from 'react-dom'
import Modal from 'react-modal'

const postCredentials = (e) => {
    e.preventDefault()
    // getting the values from submitted by user form
    let credentials = {
        username: document.getElementById('username').value,
        password: document.getElementById('password').value
    }
    // making a POST request with credentials and putting acquired JWT in localStorage 
    //(I know how bad of a practice it is but my app is simple and there is no possibility of XSS so whatevs)
    fetch(document.location.protocol + '//' + document.location.hostname + ':8000' + '/auth/token/obtain', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    }).then(response => response.json()).then(data => {
        localStorage.token = data.access
        if (data.access) {
            window.location.replace('/main')
        } else {
            alert('No user with such credentials')
        }

    })
}


// Component for login card; shitty auth redirect
class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            modalIsOpen: true
        }
    }
    //modal funcs
    openModal() {
        this.setState({ modalIsOpen: true })
    }

    closeModal() {
        this.setState({ modalIsOpen: false });
    }
    render() {
        return (
            <div id='login'>
                {localStorage.token && window.location.replace('/main')}
                <div className='card-box login-box'>
                    <form id='login-form' onSubmit={postCredentials.bind(this)}>
                        <h1 id='login-title'>Your credentials go here</h1> <br />
                        <input id='username' type='text' name='login' defaultValue='employer' /><br />
                        <input id='password' type='password' name='password' defaultValue='iwillemployyou' /><br />
                        <input id='login-button' type='submit' value='Login' />
                    </form>
                    <Modal
                        isOpen={this.state.modalIsOpen}
                        onRequestClose={this.closeModal.bind(this)}
                        contentLabel='Disclaimer'
                        ariaHideApp={false}
                        className='modal card-box'
                    >
                        <div id='disclaimer'>
                            <div id='disclaimer-text'>
                                Hello there. <br />
                                This website is an early version of a web-organizer for tutors. Please do not consider it a ready product as it
                                lacks much of its functionality and is deployed purely for demonstrational matters. But as you are reading this message
                                I'm building and implementing new functions. Such as an ability to sign up. Yep, the version is that early.
                                So, please take a look with credentials I prepared for you. They're already in the form!
                            </div>                            
                            <button className='medium-button' onClick={this.closeModal.bind(this)}>Got you!</button>
                        </div>
                    </Modal>
                </div>
            </div>
        )
    }
}



export default Login;