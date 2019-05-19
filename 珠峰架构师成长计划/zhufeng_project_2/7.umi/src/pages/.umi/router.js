import React from 'react';
import { Router as DefaultRouter, Route, Switch } from 'react-router-dom';
import dynamic from 'umi/dynamic';
import renderRoutes from 'umi/_renderRoutes';


let Router = DefaultRouter;

let routes = [
  {
    "path": "/",
    "component": require('../../layouts/index.js').default,
    "routes": [
      {
        "path": "/profile",
        "exact": true,
        "component": require('../profile.js').default,
        "title": "profile page",
        "Routes": [require('../../../PrivateRoute.js').default]
      },
      {
        "path": "/login",
        "exact": true,
        "component": require('../login.js').default
      },
      {
        "path": "/",
        "exact": true,
        "component": require('../index.js').default
      },
      {
        "path": "/user",
        "exact": false,
        "component": require('../user/_layout.js').default,
        "routes": [
          {
            "path": "/user/add",
            "exact": true,
            "component": require('../user/add.js').default
          },
          {
            "path": "/user/detail/:id",
            "exact": true,
            "component": require('../user/detail/$id.js').default
          },
          {
            "path": "/user/list",
            "exact": true,
            "component": require('../user/list.js').default
          },
          {
            "component": () => React.createElement(require('C:/Users/张仁阳/AppData/Roaming/npm/node_modules/umi/node_modules/_umi-build-dev@1.2.7@umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: false })
          }
        ]
      },
      {
        "component": () => React.createElement(require('C:/Users/张仁阳/AppData/Roaming/npm/node_modules/umi/node_modules/_umi-build-dev@1.2.7@umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: false })
      }
    ]
  },
  {
    "component": () => React.createElement(require('C:/Users/张仁阳/AppData/Roaming/npm/node_modules/umi/node_modules/_umi-build-dev@1.2.7@umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: false })
  }
];
window.g_plugins.applyForEach('patchRoutes', { initialValue: routes });

export default function() {
  return (
<Router history={window.g_history}>
      { renderRoutes(routes, {}) }
    </Router>
  );
}
