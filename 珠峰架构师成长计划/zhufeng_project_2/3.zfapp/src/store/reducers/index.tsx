import {combineReducers} from 'redux';
import home from './home';
import session from './session';
import {connectRouter} from 'connected-react-router';
import history from '../../history';
let reducers = combineReducers({
    home,
    session,
    router:connectRouter(history)
});
export default reducers;