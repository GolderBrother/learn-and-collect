
import {take,put} from 'redux-saga/effects';
const CHOOSE_COLOR = 'CHOOSE_COLOR';
const CHANGE_UI = 'CHANGE_UI';
const changeUI = (color) => ({
  type: CHANGE_UI,
  payload: {
    color,
  },
});

function* changeColorSaga() {
    const action = yield take(CHOOSE_COLOR);
    yield put(changeUI(action.payload.color));
  }
  
describe('test saga',function(){
    it('test saga',function(){
        const gen = changeColorSaga();
        assert.deepEqual(
          gen.next().value,
          take(CHOOSE_COLOR),
          'it should wait for a user to choose a color'
        );
    });
});