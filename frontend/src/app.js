import React from 'react';
import ReactDOM from 'react-dom';
import {
    BrowserRouter as Router,
    Route
} from 'react-router-dom';
import Login from './login.js';
import Bottom from './bottom.js';
import MainStripe from './main.js';



class Routes extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            flag: 0
        }
    }
    causeRender(){
        this.setState({flag: Math.random()})
    }
    

    render() {
        return (
            <Router>
                <div id='wrapper'>
                    <div id='routes'>
                        <Route path='/' component={Login} exact={true} />
                        <Route path='/main' component = {MainStripe} exact={true} />
                    </div>
                    <div>
                        <Bottom />
                        <button onClick={this.causeRender.bind(this)}>test</button>
                    </div>
                </div>
            </Router>
        )
    }
}





ReactDOM.render(<Routes/>, document.getElementById('app'))