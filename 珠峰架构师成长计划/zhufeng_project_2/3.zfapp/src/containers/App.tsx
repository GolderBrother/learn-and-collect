import {Route,Link,Switch} from 'react-router-dom';
import * as React from 'react';
import Tab from '../components/Tab';
import Home from '../containers/Home';
import Mime from '../containers/Mime';
import Profile from '../containers/Profile';
import Detail from '../containers/Detail';
import Login from '../containers/Login';
import Reg from '../containers/Reg';
import '../common/index.less';
interface IProps{
    children:any
}
export default class App extends React.Component<IProps>{
  render(){
     return (
        <React.Fragment>
            <Route exact path="/" component={Home}/>
            <Route path="/mime" component={Mime}/>
            <Route path="/profile" component={Profile}/>
            <Route path="/login" component={Login}/>
            <Route path="/reg" component={Reg}/>
            <Route path="/detail/:id" component={Detail}/>
            <Tab></Tab>
        </React.Fragment>      
     )
  }
}