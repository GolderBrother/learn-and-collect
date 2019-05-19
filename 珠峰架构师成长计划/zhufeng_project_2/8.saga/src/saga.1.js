
import {put,take,takeEvery,call,all} from './redux-saga/effects';
import * as types from './store/action-types';
function* logger(){
  console.log('又加1了');
}
function* loggerWatcher(){
   yield takeEvery(types.ASYNC_ADD,logger);
}
function * add(){
   yield put({type:types.ADD});
}
function* addWatcher(){
  // yield takeEvery(types.ASYNC_ADD,add);
  yield take(types.ASYNC_ADD);
  yield put({type:types.ADD});
}

//all 全部的意思 Promise.all
export default function* rootSaga(){
    yield all([loggerWatcher(),addWatcher()]);
    console.log('the end');
} 
