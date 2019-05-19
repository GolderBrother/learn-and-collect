import React, { Component } from 'react';
import {BrowserRouter as Router, Route,  Redirect }  from 'react-router-dom';
import Login from './pages/login/Login';
import Index from './pages/home/index'

class Routes extends Component {
  render() {
    return (
        <Router>
            <div>
                <Route path="/login" component={Login}></Route>
                <Route path="/index" component={Index}></Route>
                <Route exact path="/" component={Login}></Route>
                {/* <Redirect from="*" to="/login" ></Redirect> */}

            </div>
        </Router>
    );
  }
}

export default Routes;
