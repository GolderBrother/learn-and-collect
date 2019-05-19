import React, { Component } from 'react';
import { Table} from 'antd';
import axios from 'axios';

class Music extends Component {
    constructor(props) {
        super(props)
        this.columns = [{
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
          this.data = [{
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
          }];
          this.rowSelection = {
            onChange: (selectedRowKeys, selectedRows) => {
              console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
            },
            getCheckboxProps: record => ({
              disabled: record.name === 'Disabled User', // Column configuration not to be checked
              name: record.name,
            }),
          };
    }
    
    render() {

        return (
            <div>
                <Table rowSelection={this.rowSelection} columns={this.columns} dataSource={this.data} />,
            </div>
        );
      }
}

export default Music;