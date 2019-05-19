import {createStore,applyMiddleware} from 'redux';
import reducer from './reducer';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import rootSaga from '../saga';
let sagaMiddleware = createSagaMiddleware();
//sagaMiddleware是用来拦截对saga中间件的请求的 effect
let store = createStore(reducer,applyMiddleware(sagaMiddleware,thunk));
sagaMiddleware.run(rootSaga);
export default store;