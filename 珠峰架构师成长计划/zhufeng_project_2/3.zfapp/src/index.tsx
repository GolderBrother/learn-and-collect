import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import store from './store';
import {Route,Link,Switch} from 'react-router-dom';
import {ConnectedRouter} from 'connected-react-router';
import history from './history';
import App from './containers/App';

ReactDOM.render((
    <Provider store={store}>
      <ConnectedRouter history={history}>
          <Route component={App}/>
      </ConnectedRouter>
    </Provider>
),document.getElementById('root'));