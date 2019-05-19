
import {put,take,takeEvery,call} from './redux-saga/effects';
import * as types from './store/action-types';
const delay = ms => new Promise(function(resolve,reject){
   setTimeout(function(){
      resolve(new Date());
   },ms);
});
export function* add(){
   //当我yield一个promise的时候，程序 不会继续立刻执行，而是会在此等待promise 变成完成态
  //let date = yield delay(1000);//产出一个promise 
  let date = yield call(delay,1000);
  console.log(date);
  //put相当于dispatch(action)
  yield put({type:types.ADD});
}
//这是SAGA的唯一入口
export default function* rootSaga(){
  //拦截或者说监听ASYNC_ADD动作,然后执行对应的workerSaga
  //takeEvery的执行结果是一个迭代器
  yield takeEvery(types.ASYNC_ADD,add);
  ///takeEvery并不行阻塞当前generator
} 


/* function* add(){
   yield put({type:types.ADD});
}
export default function* rootSaga(){
   for(let i=0;i<3;i++){
       //take监听一次动作类型  events once
       let action = yield take(types.ASYNC_ADD);
       //生成器函数执行的结果是一个迭代器
       yield add();  
   }
   console.log('已经到达最大数量3');
} */