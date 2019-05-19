import React, { Component } from 'react';
import { Table} from 'antd';
import axios from 'axios';
import {get,post} from '../../utils/request';

class Music extends Component {
    constructor(props) {
        super(props)
        this.state = {
            lists:[],
            info:{
                name:'abc',
                id:1
            }
        };
    }
    componentDidMount(){
        this.getList();
    }
    getList() {
        var self = this;
        // axios ({
        //     method:'get',
        //     url:'http://localhost:3333/music_list'
        // }).then(function(res){
        //     console.log(res);
        //    if(res.data.code=='200'){
        //         self.setState({lists:res.data.result})
        //    }
        // }).catch(function(error){
        //     console.log(error)
        // })
        // get('/music_list').then(function(res){
        //     if(res.data.code=='200'){
        //         self.setState({lists:res.data.result})
        //     }
        // })
        post('/music_list',this.state.info).then(function(res){
            if(res.data.code=='200'){
                self.setState({lists:res.data.result})
            }
        })
    }
    render() {
        const columns = [{
            title: '姓名',
            dataIndex: 'name',
            key: 'name',
          }, {
            title: '年龄',
            dataIndex: 'age',
            key: 'age',
          }, {
            title: '住址',
            dataIndex: 'address',
            key: 'address',
          }];
          
        return (
            <div>
                <Table  columns={columns} dataSource={this.state.lists} />
            </div>
        );
      }
}

export default Music;