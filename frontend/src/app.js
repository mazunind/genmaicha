import React from 'react';
import ReactDOM from 'react-dom';
import {
    BrowserRouter as Router,
    Route
} from 'react-router-dom';
import Login from './login.js';
import Bottom from './bottom.js';
import MainStripe from './main.js';

const isLogged = () => {
    if(localStorage.token){
        return <Bottom/>
    }
}

const routes = (
    <Router>
        <div id='wrapper'>
            <div id='routes'>
                <Route path='/' component={Login} exact={true} />
                <Route path='/main' component={MainStripe} exact={true} />
            </div>
            <div>
                {isLogged()}
            </div>
        </div>
    </Router>
);


ReactDOM.render(routes, document.getElementById('app'))