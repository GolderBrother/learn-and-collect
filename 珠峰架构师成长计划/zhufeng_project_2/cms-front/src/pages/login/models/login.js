import * as services from '../services/login';
import {decode} from 'jsonwebtoken';
import {routerRedux} from 'dva/router';//router导出react-router react-router-redux
export default {
    namespace: 'login',
  
    state: {
        isLogin:true,//判断当前是登录还是注册
        user:null
    },
  
    subscriptions: {
      setup({ dispatch, history }) {
      },
    },
  
    effects: {
      *fetch({ payload }, { call, put }) {
        yield put({ type: 'save' });
      },
      *signup({payload},{call,put}){
        yield call(services.signup,payload);
        yield put({type:'switchLoginStatus'});
      },
      *login({payload},{call,put}){
       let token  = yield call(services.login,payload);   //data
       const user = decode(token); //得到服务 器返回的用户信息
       yield put({type:'save',payload:{user}});//放置到仓库里
       localStorage.setItem('token',token);//在local保存token,
       yield put(routerRedux.push('/admin/user'));//然后跳到后台管理中心页
      },
      //要放在effects里还是放在reducer里关键并不是看同步异步，而是看是不是纯 函数
      *loadUserFromLocal({payload},{call,put}){
        let token = localStorage.getItem('token');
        if(token){
          const user = decode(token); //得到服务 器返回的用户信息
          yield put({type:'save',payload:{user}});//放置到仓库里
          yield put(routerRedux.push('/admin/user'));//然后跳到后台管理中心页
        }else{
          yield put(routerRedux.push('/login'));//然后跳到后台管理中心页
        }
       
      }
    },
  
    reducers: {
      switchLoginStatus(state, action){
        return {...state,isLogin:!state.isLogin};
      },
      save(state, action) {
        return { ...state, ...action.payload };
      },
    },
  
  };
  