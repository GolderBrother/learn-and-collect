import {createStore,applyMiddleware} from 'redux';
import reducers from './reducers';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import {routerMiddleware} from 'connected-react-router';
import history from '../history';
//routerMiddleware(history)在生成一个中间件，负责拦截跳转路径的action
//{type:'@@router/LOCATION_CHANGE',payload:{pathname: "/counter2"}  history.push('/counter2');
let store = createStore(reducers,applyMiddleware(routerMiddleware(history),thunk,logger));
export default store;