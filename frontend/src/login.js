import React from 'react'
import ReactDOM from 'react-dom'

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
    }).then(response =>  response.json()).then(data =>{
        localStorage.token = data.access
        window.location.replace('/main')
        
    } )
    
    console.log(localStorage.token)
}


// SFC for login card
const Login = () => (
    <div id='login'>
        <div className='card-box login-box'>
            <form id='login-form' onSubmit={postCredentials.bind(this)}>
                <h1 id='login-title'>Your credentials go here</h1> <br/>
                <input id='username' type='text' name='login'/><br/>
                <input id='password' type='password' name='password'/><br/>
                <input id='login-button'  type='submit' value='Login'/>
            </form>
        </div>
        
    </div>
  );



export default Login;