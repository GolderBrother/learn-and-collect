import {combineReducers} from 'redux';
import counter from './counter';
import counter2 from './counter2';
import {connectRouter} from 'connected-react-router';
import history from '../../history';
let reducers = combineReducers({
    counter,
    counter2,
    router:connectRouter(history)
});
export default reducers;