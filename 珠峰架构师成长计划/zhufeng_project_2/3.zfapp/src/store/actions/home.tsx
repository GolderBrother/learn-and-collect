import * as types from '../action-types';
import { push } from 'connected-react-router';
import {getSliders,getLessons} from '../../api/home';
export interface changeCategory {
    type:string,//改变当前的分类
    payload:any //新的分类的名称
}
//type是用来给类型起别名的
export type Action = changeCategory;
export default {
    changeCategory(category:string):changeCategory{
        return {type:types.CHANGE_CATEGORY,payload:category};
    },
    getSliders(){
        return function(dispatch:any,getState:any){
            getSliders().then(sliders=>{
                dispatch({
                    type:types.SET_HOME_SLIDERS,
                    payload:sliders
                });
            });
        }
    },
    getLessons(){
        return function(dispatch:any,getState:any){
           let {category,lessons:{hasMore,loading,offset,limit}} = getState().home;
           if(hasMore && !loading){//如果有下一页数据并且不当不是处于加载中的话才会发请求
             dispatch({type:types.GET_HOME_LESSONS_LOADING,payload:true});//loading=true
             getLessons(category,offset,limit).then(result =>{
                 let {code,data,error} = result;
                 if(code ==0){
                    dispatch({type:types.SET_HOME_LESSONS,payload:data});
                 }else{
                    dispatch({type:types.GET_HOME_LESSONS_LOADING,payload:false});//loading=true
                    alert(error);
                 } 
             });
           }
        }
    },
    //重新查询
    refreshLessons(){
        return function(dispatch:any,getState:any){
           let {category,lessons:{hasMore,loading,offset,limit}} = getState().home;
           if(!loading){//如果有下一页数据并且不当不是处于加载中的话才会发请求
             dispatch({type:types.REFRESH_HOME_LESSONS_LOADING,payload:true});//loading=true
             getLessons(category,0,limit).then(result =>{
                 let {code,data,error} = result;
                 if(code ==0){
                    dispatch({type:types.REFRESH_HOME_LESSONS,payload:data});
                 }else{
                    dispatch({type:types.REFRESH_HOME_LESSONS_LOADING,payload:false});//loading=true
                    alert(error);
                 } 
             });
           }
        }
    }
}
