import React,{Component} from 'react';
import {Layout,Form,Icon,Cascader,Input,Button,Checkbox,Select,Row,Col,AutoComplete,message} from 'antd';
import styled from 'styled-components';
import {connect} from 'dva';
import {addresses} from './constants';
const {Footer,Content} = Layout;
const AutoCompleteOption = AutoComplete.Option;
let logo = require('@/assets/zfpxlogo.png');
const FormItem = Form.Item;
const CAPTCHA_URL = 'http://47.105.172.221:7001/captcha';
@connect(
    state=>state.login
)
export default class Login extends React.Component{
    switchLoginStatus = ()=>{
        this.props.dispatch({type:'login/switchLoginStatus'});
    }
    handleSubmit = (event)=>{
        event.preventDefault();
        //验证表单字段的合法性
        this.userForm.props.form.validateFields((err,values)=>{
          if(err){
              return message.error('表单输入不合法');
          }else{
              this.props.dispatch({
                  type:this.props.isLogin?'login/login':'login/signup',
                  payload:values});//{username,password}
          }
        });
    }
    render(){
        return (
           <Layout>
               <Content>
                    <LoginForm
                       isLogin={this.props.isLogin}
                       switchLoginStatus={this.switchLoginStatus}
                       handleSubmit={this.handleSubmit}
                       wrappedComponentRef={inst=>this.userForm = inst}
                    />
               </Content>
               <Footer style={{textAlign:'center'}}>
                  Copyright  2018 珠峰架构课
               </Footer>
           </Layout>
        )
    }
}


class LoginForm extends Component{
    state = {
        autoCompleteResult:[],confirmDirty:false
    }
    handleWebsiteChange = (value)=>{
      let autoCompleteResult=[];
      if(value){//baidu
        autoCompleteResult = ['.com','.cn','org'].map(domain=>`${value}${domain}`);
      }
      this.setState({autoCompleteResult});
    }
    validateToNextPassword = (rule,value,callback)=>{
        const form = this.props.form;
        if(value && this.state.confirmDirty){
            //强行校验
            form.validateFields(['confirm'],{force:true});
        }
        callback();
    }
    //value确认密码输入框的值
    compareToFirstPassword = (rule,value,callback)=>{
        const form = this.props.form;
        if(value && value != form.getFieldValue('password')){
            callback('二次输入的密码不匹配');
        }else{
            callback();
        }
    }
    handleConfirmBlur = (event)=>{
        let value = event.target.value;
        this.setState({confirmDirty:this.state.confirmDirty||value});
    }
    render(){
        const formItemlayout={
            labelCol:{
                span:4
            },
            wrapperCol:{
                span:20
            }
        }
        
        let websiteOptions = this.state.autoCompleteResult.map(item=>(
            <AutoCompleteOption key={item}>{item}</AutoCompleteOption>
        ));
        //this.props.form.getFieldDecorator 
        let {form:{getFieldDecorator},switchLoginStatus,isLogin,handleSubmit}  = this.props;

        return (
            <FormWrapper>
                <Form onSubmit={handleSubmit} style={{width:'500px'}}>
                    <h3>欢迎光临</h3>
                    <FormItem label="用户名" {...formItemlayout}>
                        {
                        getFieldDecorator('username',{
                            rules:[{required:true,message:'请输入用户名'},{min:1,message:'用户名最少输入6位'},{max:8,message:'用户名最大输入8位'}]
                        })(<Input prefix={<Icon type="user" style={{color:'rbga(0,0,0,.25)'}}/>} placeholder="请输入用户名"/>)
                        }
                    </FormItem>
                    <FormItem label="密码" {...formItemlayout}>
                        {
                        getFieldDecorator('password',{
                            rules:[{required:true,message:'请输入密码'},{validator:this.validateToNextPassword}]
                        })(<Input prefix={<Icon type="lock" style={{color:'rbga(0,0,0,.25)'}}/>} placeholder="请输入密码"/>)
                        }
                    </FormItem>
                    {
                        !isLogin&&<FormItem label="确认密码" {...formItemlayout}>
                        {
                        getFieldDecorator('confirm',{
                            rules:[{required:true,message:'请输入确认密码'},{validator:this.compareToFirstPassword}]
                        })(<Input onBlur={this.handleConfirmBlur} prefix={<Icon type="lock" style={{color:'rbga(0,0,0,.25)'}}/>} placeholder="确认密码"/>)
                        }
                        </FormItem>
                    }
                    {
                        !isLogin&&<FormItem label="邮箱" {...formItemlayout}>
                        {
                        getFieldDecorator('email',{
                            rules:[{required:true,message:'请输入邮箱'},{type:'email',message:'请输入合法的邮箱地址'}]
                        })(<Input prefix={<Icon type="mail" style={{color:'rbga(0,0,0,.25)'}}/>} placeholder="邮箱"/>)
                        }
                    </FormItem>
                    }
                     {
                        !isLogin&& <FormItem label="地址" {...formItemlayout}>
                        {
                        getFieldDecorator('address',{
                            rules:[{required:true,message:'请输入地址'}]
                        })(<Cascader options = {addresses} />)
                        }
                    </FormItem>
                    }
                     {
                        !isLogin&& <FormItem label="手机号" {...formItemlayout}>
                        {
                         getFieldDecorator('phone',{
                            rules:[{required:true,message:'请输入手机号'}]
                         })(<Input prefix={<Icon type="phone" style={{color:'rbga(0,0,0,.25)'}}/>} placeholder="请输入手机号"/>)
                        }
                    </FormItem>
                    }
                     {
                        !isLogin&&<FormItem label="个人网站" {...formItemlayout}>
                        {
                         getFieldDecorator('website',{
                            rules:[{required:true,message:'请输入网址'}]
                         })(<AutoComplete
                             prefix={<Icon type="phone" style={{color:'rbga(0,0,0,.25)'}}/>}
                             dataSource={websiteOptions}
                             onChange={this.handleWebsiteChange}
                             placeholder='请输入网址'
                         ><Input />} />
                         </AutoComplete>)
                        }
                    </FormItem>
                    }
                    {
                        !isLogin&& <FormItem label="验证码" {...formItemlayout} extra="请证明你不是机器人">
                        <Row>
                            <Col span={12}>
                                {
                                getFieldDecorator('captcha',{
                                    rules:[{required:true,message:'请输入验证码'}]
                                })(<Input placeholder="请输入验证码"/>)
                                }
                            </Col>
                            <Col span={12}>
                              <img src={CAPTCHA_URL}/>
                            </Col>
                        </Row>
                    </FormItem>
                    }
                   
                    {
                        isLogin?<FormItem>
                        <Button type="primary" htmlType="submit" style={{width:'100%'}}>登录</Button>
                        没有账号?<a href="#" onClick={switchLoginStatus} >立即注册</a>
                    </FormItem>:<FormItem>
                        <Button type="primary" htmlType="submit" style={{width:'100%'}}>注册</Button>
                        已有账号?<a href="#" onClick={switchLoginStatus} >立即登录</a>
                    </FormItem>
                    }
                </Form>
            </FormWrapper>
        )
    }
}
LoginForm = Form.create()(LoginForm);
const FormWrapper = styled.div`
  display:flex;
  justify-content:center;
  align-items:center;
  height:calc(100vh - 70px);
  h3{
      text-align:center;
  }
  form{
      border:1px solid #999;
      border-radius:5px;
      padding:20px;
  }
`