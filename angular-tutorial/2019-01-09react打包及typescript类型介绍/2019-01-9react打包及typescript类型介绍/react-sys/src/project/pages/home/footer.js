import React, { Component } from 'react';
import { Layout } from 'antd';
import './footer.scss'
const { Footer } = Layout;

class Bottom extends Component {
    constructor(){
        super();
        this.state = {
            n:0
        }
    }
    tick=()=>{
        this.setState({n:this.state.n +1});
    }
    componentDidMount(){
        this.timer = setInterval(this.tick,1000);
    }
    componentWillUnmount(){
        clearInterval(this.timer)
    }
    render() {
        var name = sessionStorage.getItem('name');
        return (
            <Footer className="bottom animated bounceInLeft">
                {name}您浏览时间为{this.state.n}秒
            </Footer>
        );
      }
}

export default Bottom;
