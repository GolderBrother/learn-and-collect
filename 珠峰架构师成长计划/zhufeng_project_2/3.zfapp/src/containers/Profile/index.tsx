import * as React from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import {Store} from '../../types';
import actions from '../../store/actions/session';
import './index.less';
declare function require(url:string):string;
let profile = require('../../images/profile.png');
interface Props{
   user:any,
   logout:any,
   validate:any
}
class Profile extends React.Component<Props>{

  render(){
      return (
        <div className="profile">
          <div className="profile-bg">
            <img src={profile}/>
            <div className="profile-btn">
            {
              this.props.user?<span onClick={this.props.logout}>{this.props.user.username}</span>: <Link to="/login">登录</Link>
            }     
            </div>
          </div>
        </div>
      )
  }
}
export default connect(
  (state:Store)=>state.session,
  actions
)(Profile);