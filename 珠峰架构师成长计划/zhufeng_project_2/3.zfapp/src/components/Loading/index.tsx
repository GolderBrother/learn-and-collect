import * as React from 'react';
import { connect } from 'react-redux';
import './index.less';
declare function require(url:string):string;
let loading = require('../../images/loading.gif');

export default ()=> (
  <div className="loading">
      <img src={loading}/>
  </div>
)