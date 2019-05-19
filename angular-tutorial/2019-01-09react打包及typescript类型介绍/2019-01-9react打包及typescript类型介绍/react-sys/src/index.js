import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import Routes from './project/routes';
import * as serviceWorker from './serviceWorker';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import rootReducer from './project/redux/reducers';

var store = createStore(rootReducer);  //创建store
    ReactDOM.render(
      <Provider store = {store}>
        <Routes />
      </Provider>,
    document.getElementById('root'));


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
 