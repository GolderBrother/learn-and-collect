import React from 'react';
import {Route,Redirect} from 'react-router-dom';
/**
 * Route里渲染组件有三种配置方式 component render children
 * <Route path="/a" render={props=><div>props</div>}>
 * <Route path="/a" children={props=><div>props</div>}>
 */
export default (props)=>{
  console.log(props);
  let {render,...rest} = props;
  //渲染有两个条件，1是是否登录，另一个是路径是否匹配
  return <Route render={ props=>localStorage.getItem('login')?render(props):<Redirect to="/login"/>}/>
}