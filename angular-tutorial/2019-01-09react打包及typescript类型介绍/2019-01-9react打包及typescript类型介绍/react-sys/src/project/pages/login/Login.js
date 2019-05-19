import React, { Component } from 'react';
import { Form, Icon, Input, Button, notification} from 'antd';
import 'antd/dist/antd.css'

//class App extends React.Component {}

class LoginPage extends Component {
  // 提交方法
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {   //校验处理
      if (!err) {
        if(values.userName == '123' && values.password == '123'){
          //页面跳转
          this.props.history.push('/index');
          sessionStorage.setItem('name',values.userName);//值存入localStorage
        }else {
          this.openNotificationWithIcon('error');
        }
      }
    });
  }

  openNotificationWithIcon = (type) => {   //消息提示框
    notification[type]({
      message: '用户名和密码',
      description: '123',
      duration:3,
      icon:<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="loginpagewrap">
        <div className="box">
            <p>Welcome to the React</p>
            <div className="loginWrap">
            <Form onSubmit={this.handleSubmit} className="login-form">
              <Form.Item>
                {getFieldDecorator('userName', {
                  rules: [{ required: true, message: '请输入用户名' }],
                })(
                  <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
                )}
              </Form.Item>
              <Form.Item>
                {getFieldDecorator('password', {
                  rules: [{ required: true, message: '请输入密码' }],
                })(
                  <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
                )}
              </Form.Item>
              
              <Button type="primary" htmlType="submit" className="login-form-button">
                Login
              </Button>
                
            </Form>
            </div>
          </div>
      </div>
    );
  }
}

const Login = Form.create()(LoginPage);

export default Login;
