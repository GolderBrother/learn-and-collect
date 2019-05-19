import React from 'react';
import {createStore,combineReducers,applyMiddleware} from 'redux';
import {Provider,connect} from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import * as effects from 'redux-saga/effects';
import {createBrowserHistory} from 'history';
import ReactDOM from 'react-dom';
export {
    connect
}
export default function(){
    const _app = {
        _models:[],//这里放着的有的模型
        model,
        _router:null,
        router,
        start
    }
    function model(m){
        _app._models.push(m);
    }
    function router(routerConfig){
        _app._router = routerConfig;
    }
    const history = createBrowserHistory();
    function start(root){
        const App = _app._router({history,app:_app});
        //每一个模型都有namespace,都是状态树中的子属性，都有一个子的reducer
        //combineReducers合并的时候传入一个对象,key是合并后的属性名，值是处理函数  
        //let reducers= app._models.reduce();
/*         {
            namespace:'count',
            state:{number:0},
            reducers:{
                add(state){
                    return {number:state.number+1};
                }
            }
        } */
        let reducers = {};
        for(let m of _app._models){
            //key是namespace的值 value是一个reducer函数 
            reducers[m.namespace] = function(state=m.state,action){
                let actionType = action.type;//count/add
                let [namespace,type] = actionType.split('/');
                //只有当派发的动作的命名空间和当前方法(reducer)的命名空间相同的时候，才需要进行判断处理
                if(namespace == m.namespace){
                     let reducer = m.reducers[type];
                    if(reducer){
                        return reducer(state,action);
                    }
                }
                return state;
            }
        }
        let sagaMiddleware= createSagaMiddleware();
        function* rootSaga(){
            for(const m of _app._models){
                for(const key in (m.effects||{})){
                    //监听 每一次动作发生，当动作发生的时候执行对应的generator任务
                    yield effects.takeEvery(m.namespace+'/'+key,m.effects[key],effects);
                }
            }
        }
        let reducer = combineReducers(reducers);
        let store = createStore(reducer,applyMiddleware(sagaMiddleware));
        sagaMiddleware.run(rootSaga);
        ReactDOM.render(
            <Provider store={store}>
                {App}
            </Provider>
            ,document.querySelector(root));
    }
    return _app;
}