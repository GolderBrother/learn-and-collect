import React,{Component} from 'react';
import dva,{connect} from 'dva';
//dva其实是一个函数
//let app = express();
const app = dva();
//状态 reducers effect subscription
//每一个模型都有自己的命名空间,1为了防止重名
//combineReducers 作为key 
//dispatch({type:'add'});
app.model({
    namespace:'todos',
    state:{
        list:[],
        filter:'all' //all completed uncompleted
    },
    reducers:{
       add(state,{payload}){
         let newTodo = {title:payload,completed:false};
         newTodo.id = state.list.length>0?state.list[state.list.length-1].id+1:1;
         let list = [...state.list,newTodo];
         localStorage.setItem('todos',JSON.stringify(list));
         return {...state,list};
       },
       toggle(state,{payload}){
        let list =  state.list.map(function(item){
            if(item.id == payload){
                item.completed = !item.completed;
            }
            return item;
        });
        localStorage.setItem('todos',JSON.stringify(list));
        return {...state,list} 
       },
       load(state,{payload}){
        return {...state,list:payload};
       }
    },
    //订阅
    subscriptions:{
        setup({history,dispatch}){
            let todosStr = localStorage.getItem('todos');
            let list = todosStr?JSON.parse(todosStr):[];
            //dispatch: todos/load should not be prefixed with namespace todos
            //在model时派发action，不需要加命名空间的前缀, 可以省略
            dispatch({type:'load',payload:list});
        }
    }
 });
//connect 来自于 react-redux
//state是总状态树  {count:{number:0},todos:{list:[]}}
//state.count 变成当前组件的属性对象{number:0}
class Todos extends Component{
    add = ()=>{
        let title = this.content.value;
        this.props.dispatch({type:'todos/add',payload:title});
        this.content.value = '';
    }
    toggle = (event)=>{
        let id = event.target.value;
        this.props.dispatch({type:'todos/toggle',payload:id});
    }
    render(){
        return (
            <div>
                <input ref={input=>this.content=input}/>
                <button onClick={this.add}>添加</button>
                <ul>
                  {
                     this.props.list.map(item=>(
                         <li key={item.id}>
                         <input type="checkbox" value={item.id} checked={item.completed} onChange={this.toggle}/>
                         {item.title}
                         </li>
                     ))           
                  }
                </ul>

            </div>
        )
    }
}
const App = connect(state=>state.todos)(Todos);

app.router(()=><App/>);
app.start('#root');
//ReactDOM.render(()=><App/>,document.querySelector('#root'));