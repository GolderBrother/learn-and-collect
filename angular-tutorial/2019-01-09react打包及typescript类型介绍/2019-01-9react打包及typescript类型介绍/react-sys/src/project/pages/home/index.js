import React, { Component } from 'react';
import { Layout, Menu, Icon, Switch } from 'antd';
import { Link}  from 'react-router-dom';
import Top from './header';
import Main from './content';
import Bottom from './footer';
import {menuList} from '../../utils/menu'
import './index.scss';
const {  Sider} = Layout;
const SubMenu = Menu.SubMenu;

class Home extends Component {
    constructor(){
        super();
        this.state = {
            collapsed: false,
            theme: 'dark',   //个性化样式  深色
            current: '1',
          };
    }
    componentDidMount(){    //挂载完成后
      this.defaultLoad();
      console.log(menuList);
    }
    defaultLoad(){   //判断是否登录
      if(sessionStorage.name){
        this.props.history.push('/index');
      }else {
        this.props.history.push('/login');
      }
    }
    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    }
    changeTheme = (value) => {
      this.setState({
        theme: value ? 'dark' : 'light',
      });
    }
  
    handleClick = (e) => {
      console.log('click ', e);
      this.setState({
        current: e.key,
      });
    }
    render() {
        return (
          <Layout className="containAll">
            <Sider
              trigger={null}
              collapsible
              collapsed={this.state.collapsed}
            >
                <div className="logo" >
                {this.state.theme === 'light' ? <a><Icon type="github" className="github" /></a> :
                <a><Icon type="github" className="github white" /></a> }
              { this.state.theme === 'light' ? <span className="author">ruanmou</span> : <span className="author white">ruanmou</span> }
              
                </div>
                <Menu
                  theme={this.state.theme}
                  onClick={this.handleClick}
                  defaultOpenKeys={['sub1']}
                  selectedKeys={[this.state.current]}
                  className="menu"
                  mode="inline"
                >
                {
                  menuList.map((item,index) => {
                    if(item.children && item.children.length>0){
                      return (
                        <SubMenu key={item.url} title={<span><Icon type={item.icon} /><span>{item.name}</span></span>}>
                          {
                            item.children.map((v,j) => {
                              return <Menu.Item key={v.url}><Link to={"/index/"+v.url}>{v.name}</Link></Menu.Item>
                            })
                          }
                        </SubMenu>
                      )
                    }
                    return (
                      <Menu.Item key={item.url}>
                        <Link to={"/"+item.url}>
                          <Icon type={item.icon} />
                          <span>{item.name}</span>
                        </Link>
                      </Menu.Item>
                    )
                  })
                }
                <Switch
                  checked={this.state.theme === 'dark'}
                  onChange={this.changeTheme}
                  checkedChildren="Dark"
                  unCheckedChildren="Light"
                />
                </Menu>
                
            </Sider>

            <Layout>
              <Top toggle={this.toggle} collapsed={this.state.collapsed}
                  history = {this.props.history}></Top> 
              <Main></Main>
              <Bottom></Bottom>
              {/* <Header style={{ background: '#fff', padding: 0 }}>
                <Icon
                  className="trigger"
                  type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                  onClick={this.toggle}
                />
              </Header> */}
              {/* <Content style={{
                margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280,
              }}>
                <div>12435y4325</div>
              </Content> */}
              {/* <Footer style={{ textAlign: 'center' }}>
                Ant Design ©2018 Created by Ant UED
            </Footer> */}
            </Layout>
          </Layout>
        );
      }
}

export default Home;
