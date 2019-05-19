import {Home} from '../../types';
import {Action} from '../actions/home';
import * as types from '../action-types';
let initState:Home = {
  category:'all',
  sliders:[],
  lessons:{
    list:[],
    hasMore:true,
    loading:false,
    offset:0,
    limit:5
  }
};
export default function(state:Home=initState,action:Action){
  switch(action.type){
      case types.CHANGE_CATEGORY:
        return {...state,category:action.payload};
      case types.SET_HOME_SLIDERS:
        return {...state,sliders:action.payload};  
      case types.GET_HOME_LESSONS_LOADING://只修改loading状态
        return {...state,lessons:{...state.lessons,loading:action.payload}};  
      case types.SET_HOME_LESSONS:
        return {...state,lessons:{
          ...state.lessons,
          list:[...state.lessons.list,...action.payload.list],
          hasMore:action.payload.hasMore,
          loading:false,
          offset:state.lessons.offset+action.payload.list.length
        }};  
      case types.REFRESH_HOME_LESSONS_LOADING:
        return {...state,lessons:{
          ...state.lessons,
          list:[],
          offset:0,
          hasMore:true,
          loading:action.payload
        }};  
      case types.REFRESH_HOME_LESSONS:
        return {...state,lessons:{
          ...state.lessons,
          list:action.payload.list,
          hasMore:action.payload.hasMore,
          loading:false,
          offset:action.payload.list.length
        }};  
      default:
        return state;  
  }
}