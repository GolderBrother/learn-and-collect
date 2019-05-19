import React, { Component } from 'react';
import { Table} from 'antd';
import axios from 'axios';

class Music extends Component {
    constructor(props) {
        super(props)
        this.state = {
            lists:[]
        };
    }
    componentDidMount(){
        this.getList();
    }
    getList() {
        var self = this;
        axios ({
            method:'get',
            url:'http://localhost:3333/music_list'
        }).then(function(res){
            console.log(res);
           if(res.data.code=='200'){
                self.setState({lists:res.data.result})
           }
        }).catch(function(error){
            console.log(error)
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