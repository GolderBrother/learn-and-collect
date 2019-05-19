import {Counter2} from '../../types';
import {Action} from '../actions/counter2';
import * as types from '../action-types';
let initState:Counter2 = {number:0};
export default function(state:Counter2=initState,action:Action){
  switch(action.type){
      case types.INCREMENT2:
        return {number:state.number+1};
      case types.DECREMENT2:
        return {number:state.number-1};  
      default:
        return state;  
  }
}