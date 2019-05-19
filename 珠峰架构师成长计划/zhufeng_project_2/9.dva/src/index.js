import React from 'react';
import dva,{connect} from 'dva';
import { resolve } from 'upath';
//dva其实是一个函数
//let app = express();
const app = dva();
//状态 reducers effect subscription
//每一个模型都有自己的命名空间,1为了防止重名
//combineReducers 作为key 
//dispatch({type:'add'});
const delay = ms=>new Promise(function(resolve){
    setTimeout(function(){
        resolve();
    },ms);
});
const get = (url)=>{
  return fetch(url).then(res=>res.json());
}
app.model({
   namespace:'count',
   state:{number:0},
   reducers:{
       //相当于action type 参数是老状态 返回值是新状态
       add(state,{payload}){return {number:state.number+payload} },
       minus(state,{payload}){return {number:state.number-payload}}
   },
   effects:{
       //effect里面放的是generator
       // 第一个参数是action动作对象  effects副作用 redux-saga/effects
       *addAmount(action,{put,call}){
          //yield call(delay,1000);
          //put就相当于store.disaptch向仓库派发动作
          let result = yield call(get,'http://localhost:8080/amount');
          yield put({type:'add',payload:result.data});
       }
   }
});
app.model({
    namespace:'todos',
    state:{list:[]},
    reducers:{
        //相当于action type 参数是老状态 返回值是新状态
        add(count){return count + 1 },
        minus(count){return count -1}
    }
 });
//connect 来自于 react-redux
//state是总状态树  {count:{number:0},todos:{list:[]}}
//state.count 变成当前组件的属性对象{number:0}
const App = connect(state=>state.count)((props)=>(
    <div>
    <h2>{props.number}</h2>
    <button onClick={()=>props.dispatch({type:'count/addAmount'})}>+</button>
    -<button onClick={()=>props.dispatch({type:'count/minusAmount'})}>-</button>
</div>
));

app.router(()=><App/>);
app.start('#root');
//ReactDOM.render(<App></App>,document.querySelector('#root'));