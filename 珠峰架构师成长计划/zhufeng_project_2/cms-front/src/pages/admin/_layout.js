import React,{Component,Fragment} from 'react';
import {Layout} from 'antd';
import AdminHeader from '@/components/AdminHeader';
import MenuList from '@/components/MenuList';
const {Header,Footer,Sider,Content} = Layout;

export default class Admin extends Component{
    render(){
        return (
            <Layout>
                <AdminHeader/>
                <Layout>
                    <Sider>
                        <MenuList/>
                    </Sider>
                    <Content>
                        {this.props.children}
                    </Content>
                </Layout>
                <Footer>
                    珠峰架构课  @2018
                </Footer>
            </Layout>
        )
    }
}