import { handleActions } from 'redux-actions';

export const aaa = handleActions({
    'ADD'(state, action) {
      return state+ parseInt(action.payload.text)
    },
    'DEL'(state, action) {
      return state- parseInt(action.payload.text)
    }
  }, 10) 

  var lists = [{
    id:1,
    text:'手机',
    check:false
  },
  {
    id:2,
    text:'包包',
    check:false
  },
  {
    id:3,
    text:'衣服',
    check:true
  }];
  export const todoList = handleActions({
    'ADD_TODO'(state, action) {
      return [
        ...state, 
        {
          id:action.payload.id,
          text:action.payload.text,
          check:action.payload.check
        }
      ]
    },
    'DEL_TODO'(state, action) {
      //alert(JSON.stringify(action.payload));
      return state.filter((v,i)=>v.id !== action.payload.id);
    },
    'TOGGLE_TODO'(state, action) {
      //console.log(action.payload.id);
      return state.map(item =>{
        if(item.id !== action.payload.id) {
          return item
        }
        return Object.assign(item,{check:!item.check})
      })
    }
  }, lists)
 
  var filterInit ={
    filter:'SHOW_ALL'
  }
  export const setVisibility = handleActions({
    'VISIBILITY_TODO'(state, action) {
      console.log(action.payload)
      return {...state,...action.payload};
    }
  }, filterInit) 