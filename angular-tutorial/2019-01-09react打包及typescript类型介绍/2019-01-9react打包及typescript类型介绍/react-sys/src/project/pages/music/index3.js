import React, { Component } from 'react';
import { Table,Select} from 'antd';

import fetchJsonp from 'fetch-jsonp';
const Option = Select.Option;

class Music extends Component {
    constructor(props) {
        super(props)
        this.state = {
            lists:[]
        };
    }
   data(){
       return [{
        key: '1',
        name: 'John Brown',
        age: 32,
        address: 'New York No. 1 Lake Park',
      }, {
        key: '2',
        name: 'Jim Green',
        age: 42,
        address: 'London No. 1 Lake Park',
      }, {
        key: '3',
        name: 'Joe Black',
        age: 32,
        address: 'Sidney No. 1 Lake Park',
      }, {
        key: '4',
        name: 'Disabled User',
        age: 99,
        address: 'Sidney No. 1 Lake Park',
      }]
   };
   columns =()=>{
       return [{
        title: 'Name',
        dataIndex: 'name',
        render: text => <a href="javascript:;">{text}</a>,
      }, {
        title: 'Age',
        dataIndex: 'age',
      }, {
        title: 'Address',
        dataIndex: 'address',
      }];
   } ;
   rowSelection=()=> {
       return {
        onChange: (selectedRowKeys, selectedRows) => {
          console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        },
        getCheckboxProps: record => ({
          disabled: record.name === 'Disabled User', // Column configuration not to be checked
          name: record.name,
        }),
      };
   };
   componentDidMount(){
        this.getList('11');   //默认值 
   };
   getList(typeId){
       fetchJsonp(`http://tingapi.ting.baidu.com/v1/restserver/ting?xml&calback=&from=webapp_music&method=baidu.ting.billboard.billList&type=${typeId}&size=100&offset=0`,{
           method:'get'
       }).then(function(response) {
          return response.json()
        }).then(function(res) {
          console.log(res); // 在此处进行接收数据之后的操作
        }).catch(function(error) {
          console.log(error) // 此处是数据请求失败后的处理
        })
   }
   handleChange(value){
        //this.setState({select:value})
    };
    render() {
        var selectorData  = [{name:'热歌榜',id:2},{name:'新歌榜',id:1},{name:'摇滚榜',id:11},{name:'爵士',id:12},{name:'流行',id:16}];
        return (
            <div>
                <div>
                <Select defaultValue={selectorData[0].name} style={{ width: 120 }} onChange={this.handleChange}>
                  {
                    selectorData.map(function(item,index){
                      return <Option key={index} value={item.id}>{item.name}</Option>
                    })
                  }
                </Select>
                </div>
                <Table rowSelection={this.rowSelection()} columns={this.columns()} dataSource={this.data()} />,
            </div>
        );
      }
}

export default Music;