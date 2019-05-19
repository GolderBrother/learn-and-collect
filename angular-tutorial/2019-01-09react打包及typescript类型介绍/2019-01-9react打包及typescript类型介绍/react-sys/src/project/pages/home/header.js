import React, { Component } from 'react';
import { Layout, Menu, Icon } from 'antd';
import './header.scss';
const { Header } = Layout;
const SubMenu = Menu.SubMenu;

class Top extends Component {
    constructor(){
        super();
        this.state = {
            userName : sessionStorage.getItem('name') || ''
          };
    }
    
    goBack(){
        this.props.history.push('/login');
    }
    render() {
        return (
            <Header style={{ background: '#fff'}}>
                <Icon
                    className="trigger"
                    type={this.props.collapsed ? 'menu-unfold' : 'menu-fold'}
                    onClick={this.props.toggle}
                />
                <Menu mode="horizontal" className="logOut">
                    <SubMenu title={<span className="submenu-title-wrapper">{this.state.userName}</span>}>
                        <Menu.Item key="alipay">
                            <a onClick={() => this.goBack()}>退出</a>
                        </Menu.Item>
                    </SubMenu>
                </Menu>
            </Header>
        );
      }
}

export default Top;
