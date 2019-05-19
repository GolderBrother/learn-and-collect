import React,{Fragment} from 'react';
import dva,{connect} from './dva';
import {Router,Route} from './dva/router';
import {Link} from 'react-router-dom';
const app = dva();
const delay = ms =>new Promise(function(resolve){
     setTimeout(function(){
        resolve();
     },ms);
});
app.model({
    namespace:'count',
    state:{number:0},
    reducers:{
        add(state){
            return {number:state.number+1};
        }
    },
    effects:{
        *asyncAdd({call,put},action){
            yield call(delay,1000);
            yield put({type:'count/add'});
        }
    }
});
const Count = connect(
    state=>state.count
)(props=>(
    <div>
        <button onClick={()=>props.history.goBack()}>返回</button>
        <p>{props.number}</p>
        <button onClick={()=>props.dispatch({type:'count/add'})}>+</button>
        <button onClick={()=>props.dispatch({type:'count/asyncAdd'})}>AsyncAdd</button>
    </div>
));
const Home  = ()=>(
    <div>
        <h3>Home</h3>
        <Link to="/count">count</Link>
    </div>
)
app.router(({ history, app }) => (
    <Router history={history}>
        <Fragment>
          <Route exact path="/" component={Home}/>
          <Route  path="/count" component={Count}/>
        </Fragment>
    </Router>
));
app.start('#root');