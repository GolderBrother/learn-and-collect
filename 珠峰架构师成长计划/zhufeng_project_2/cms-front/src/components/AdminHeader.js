import React,{Component,Fragment} from 'react';
import {Layout} from 'antd';
import {connect} from 'dva';
const {Header,Footer,Sider,Content} = Layout;
let zfpxlogo = require('@/assets/zfpxlogo.png');
class AdminHeader extends Component{
  componentWillMount(){
    this.props.dispatch({
      type:'login/loadUserFromLocal'
    });
  }
  render(){
    return (
      <Header>
        <img className="logo" src={zfpxlogo}/>
        <span className="welcome">
          欢迎登录 {this.props.user&&this.props.user.username} 
        </span>
      </Header>
    )
  }
}

export default connect(
  state=>state.login
)(AdminHeader);