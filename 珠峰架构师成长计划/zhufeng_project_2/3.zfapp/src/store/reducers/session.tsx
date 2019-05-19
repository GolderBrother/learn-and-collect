import {Session} from '../../types';
import * as types from '../action-types';
let initState = {
    error:'',
    success:'',
    user:''
}
export default function(state:Session=initState,action:any){
   switch(action.type){
       case types.SAVE_SESSION:
         return {...action.payload};
       default:
         return state;  
   }
}