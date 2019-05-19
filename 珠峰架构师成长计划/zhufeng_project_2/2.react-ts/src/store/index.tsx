import {createStore,applyMiddleware} from 'redux';
import reducers from './reducers';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import {routerMiddleware} from 'connected-react-router';
import history from '../history';
let store = createStore(reducers,applyMiddleware(routerMiddleware(history),thunk,logger));
export default store;