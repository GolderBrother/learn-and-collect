import * as types from '../action-types';
export interface increment {
    type:typeof types.INCREMENT2
}
export interface decrement {
    type:typeof types.DECREMENT2
}
//type是用来给类型起别名的
export type Action = increment|decrement;
export default {
    increment():increment{
        return {type:types.INCREMENT2};
    },
    incrementDelay():any{
        return function(dispatch:any,getState:any){
            setTimeout(function(){
                dispatch({type:types.INCREMENT2});
            },1000);
        }
    },
    decrement():decrement{
        return {type:types.DECREMENT2};
    }
}
