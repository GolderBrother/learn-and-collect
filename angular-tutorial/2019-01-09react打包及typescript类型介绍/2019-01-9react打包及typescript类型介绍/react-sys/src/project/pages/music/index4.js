import React, { Component } from 'react';
import { Table,Select} from 'antd';

import fetchJsonp from 'fetch-jsonp';
const Option = Select.Option;

class Music extends Component {
    constructor(props) {
        super(props)
        this.state = {
            lists:[],
            loading:true
        };
    }
   
    columns = () => {
        return  [{
            dataIndex: 'rowIndex',
            title: '序号',
            width: 50,
        },{
            dataIndex: 'title',
            title: '歌曲名',
            width: 200,
        }, {
            dataIndex: 'author',
            title: '歌手',
            width: 200,
        }, {
            dataIndex: 'country',
            title: '发行国家',
            width: 150,
        }, {
            dataIndex: 'language',
            title: '语种',
            width: 200,
        }, {
            dataIndex: 'publishtime',
            title: '发行时间',
            width: 200,
        }];
    };
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
        this.getList('2');   //默认值 
   };
   getList(typeId){
       fetchJsonp(`http://tingapi.ting.baidu.com/v1/restserver/ting?xml&calback=&from=webapp_music&method=baidu.ting.billboard.billList&type=${typeId}&size=100&offset=0`,{
           method:'get'
       }).then(response=> {
          return response.json()
        }).then(res=> {
          console.log(res); // 在此处进行接收数据之后的操作
          const songArray = []
            let songList = res.song_list;
            for (let i = 0; i < songList.length; i++) {
                songArray.push({
                    title: songList[i].title,
                    author: songList[i].author,
                    country: songList[i].country,
                    language: songList[i].language,
                    publishtime: songList[i].publishtime,
                })
            }
            this.setState({
                lists: songArray,
                loading: false
            });
        }).catch(error=> {
          console.log(error) // 此处是数据请求失败后的处理
        })
   }
   handleChange(value){   //触发下拉框
        this.getList(value); 
    };
    render() {
        var selectorData  = [{name:'热歌榜',id:2},{name:'新歌榜',id:1},{name:'摇滚榜',id:11},{name:'爵士',id:12},{name:'流行',id:16}];
        return (
            <div>
                <div>
                <Select defaultValue={selectorData[0].name} style={{ width: 120 }} onChange={(value)=>this.handleChange(value)}>
                  {
                    selectorData.map(function(item,index){
                      return <Option key={index} value={item.id}>{item.name}</Option>
                    })
                  }
                </Select>
                </div>
                <Table rowSelection={this.rowSelection()} 
                    columns={this.columns()} 
                    loading={this.state.loading}
                    dataSource={this.state.lists.map((item,index)=>({...item,rowIndex:index +1}))} />,
            </div>
        );
      }
}

export default Music;

