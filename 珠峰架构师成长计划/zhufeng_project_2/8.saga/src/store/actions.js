import * as types from './action-types';
export default {
    add(){
        return {type:types.ADD};
    },
    asyncAdd(){
        return {type:types.ASYNC_ADD};
    },
    minus(){
        return {type:types.MINUS};
    },
    asyncMinus(){
        return {type:types.ASYNC_MINUS};
    }
}