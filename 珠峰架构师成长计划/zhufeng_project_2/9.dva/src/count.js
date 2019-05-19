import React from 'react';
import dva,{connect} from 'dva';
//dva其实是一个函数
//let app = express();
const app = dva();
//状态 reducers effect subscription
//每一个模型都有自己的命名空间,1为了防止重名
//combineReducers 作为key 
//dispatch({type:'add'});
app.model({
   namespace:'count',
   state:{number:0},
   reducers:{
       //相当于action type 参数是老状态 返回值是新状态
       add(state){return {number:state.number+1} },
       minus(state){return {number:state.number-1}}
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
    <button onClick={()=>props.dispatch({type:'count/add'})}>+</button>
    <button onClick={()=>props.dispatch({type:'count/minus'})}>+</button>
</div>
));

app.router(()=><App/>);
app.start('#root');
//ReactDOM.render(<App></App>,document.querySelector('#root'));