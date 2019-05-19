import * as React from 'react';
import NavHeader from '../../components/NavHeader';
import {connect} from 'react-redux';
import './index.less';
import {Link} from 'react-router-dom';
import {Store} from '../../types';
import actions from '../../store/actions/session';
declare function require(url:string):string;
let profile = require('../../images/profile.png');
interface IProps {
    history:any,
    login:any
}
//match history location 只要一个组件是从Route中渲染出来的，那么就会有这三个属性
class Login extends React.Component<IProps>{
    state = {
        username:'',
        password:''
    }
    handleLogin = ()=>{
      let user = this.state;
      this.props.login(user);
    }
    render(){
        return (
            <div className="login">
                <NavHeader title="登录" history={this.props.history}/>
                <div className="login-logo">
                   <img src={profile}/>
                </div>
                <input onChange={event=>this.setState({username:event.target.value})} value={this.state.username} type="text" name="username" placeholder="手机号"/>
                <input onChange={event=>this.setState({password:event.target.value})} value={this.state.password} type="text" name="password" placeholder="密码"/>
                <Link to="/reg">前往注册</Link>
                <button onClick={this.handleLogin}>登&nbsp;录</button>
            </div>
        )
    }
}
export default connect(
    (state:Store)=>state.session,
    actions
)(Login);