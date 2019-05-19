import {take,put} from 'redux-saga/effects';
const CHOOSE_COLOR = 'CHOOSE_COLOR';
const CHANGE_UI = 'CHANGE_UI';
const changeUI = (color) => ({
  type: CHANGE_UI,
  payload: {
    color,
  },
});

export default function* changeColorSaga() {
  const action = yield take(CHOOSE_COLOR);
  yield put(changeUI(action.payload.color));
}
