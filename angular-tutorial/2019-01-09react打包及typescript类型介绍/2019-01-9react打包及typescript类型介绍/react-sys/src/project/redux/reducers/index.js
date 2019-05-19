import { combineReducers } from 'redux'
import * as todoList from './todoList'  //as别名

//combineReducers 大型的项目我们是需要将reducer拆分的，
//最后通过redux提供的combineReducers方法组合到一起
const rootReducer = combineReducers({
  ...todoList,
})

export default rootReducer