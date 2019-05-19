import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Link, Redirect ,Prompt}  from 'react-router-dom';
//BrowserRouter  是一个容器（对象） 用来放Route  Link
//Route 显示视图  三大props  location history  match
//Link  跳转
//exact 严格匹配
class Index extends Component {
    componentDidMount(){
        console.log(this.props)
    };
    render(){
        return <div>欢迎进入首页 {this.props.match.params.id}</div>
    }
}
class Other extends Component {
    render(){
        return <div>欢迎进入其它页 {this.props.match.params.name}</div>
    }
}
class Info extends Component {
    render(){
        return <div>欢迎进入详情页</div>
    }
}
class Home extends Component {
    constructor(){
        super();
        this.state = {
            n:123
        }
    }
  render() {
    return (
        <Router>
            <div>
                <ul>
                    <li><Link to="/index/55">首页
                    <Prompt when={false} message="你确定要离开此页面？"></Prompt>
                    </Link></li>
                    <li><Link to={"/other/"+this.state.n}>其它页</Link></li>
                    <li><Link to="/info">详情页</Link></li>
                </ul>
                <Route path="/index/:id" component={Index}></Route>
                <Route path="/other/:name" component={Other}></Route>
                <Route path="/info" component={Info}></Route>
                {/* <Route exact path="/" component={Abc}></Route> */}
                <Redirect from="/" to="/info" ></Redirect>

            </div>
        </Router>
    );
  }
}


export default Home;
