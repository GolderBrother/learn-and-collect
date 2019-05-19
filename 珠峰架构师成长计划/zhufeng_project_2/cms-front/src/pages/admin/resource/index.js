import React,{Component,Fragment} from 'react';
import {connect} from 'dva';
import {Card,Table,Button,Form,Modal,Input,message,Popconfirm} from 'antd';
import {PAGE_SIZE} from './constants';
import {routerRedux} from 'dva/router';
const ENTITY_NAME = 'resource';
const FormItem = Form.Item;
class BaseComponent extends Component{
    save = (payload)=>{
        this.props.dispatch({type:`${ENTITY_NAME}/save`,payload});
    }
    onAdd = ()=>{//开始添加
      this.save({isCreate:true,editVisible:true,record:{}});
    }
    onEdit = (record)=>{//开始编辑
        this.save({isCreate:false,editVisible:true,record});
    }
    onEditOk = ()=>{//确认保存
      this.editForm.props.form.validateFields((err,values)=>{
          if(err){
              return message.error('表单校验失败');
          }else{
              this.props.dispatch({
                  type:this.props.isCreate?`${ENTITY_NAME}/create`:`${ENTITY_NAME}/update`,
                  payload:values
              });
          }
      });
    }
    onEditCancel = ()=>{//取消保存
        this.props.dispatch({
            type:`${ENTITY_NAME}/save`,
            payload:{editVisible:false}
        });
    }
    onDel = (id)=>{
        this.props.dispatch({
            type:`${ENTITY_NAME}/del`,
            payload:id
        });
    }
    delAll = ()=>{
        this.props.dispatch({
            type:`${ENTITY_NAME}/delAll`,
            payload:this.props.selectedRowKeys
        });
    }
    onSearch = ()=>{
        let values = this.searchForm.props.form.getFieldsValue();
        let where = {};
        for(let key in values){
            if(values[key] && typeof values[key]!='undefined'){
                where[key] = values[key];
            }
        }
        this.props.dispatch({
            type:`${ENTITY_NAME}/search`,
            payload:where
        });
    }
    render(){
        //定义表格有哪些列
        const columns = [
            {title:'名称',dataIndex:'name',key:'name'},
            {title:'路径',dataIndex:'key',key:'key'},
            {title:'图标类型',dataIndex:'icon',key:'icon'},
            {
                title:'操作',
                key:'operate',
                render:(val,record)=>(
                    <Fragment>
                        <Button type="warning" onClick={()=>this.onEdit(record)}>编辑</Button>
                        <Popconfirm
                         okText="确认"
                         cancelText="取消"
                         title="请问你确定要删除吗?"
                         onConfirm={()=>this.onDel(record.id)}
                        >
                           <Button type="danger">删除</Button>
                        </Popconfirm>
                    </Fragment>
                )
            }
        ]
        let {dispatch,list,total,pageNum,editVisible,record,selectedRowKeys} = this.props;
        let pagination = {
            current:pageNum,//当前的页码
            pageSize:PAGE_SIZE,//每页的条数
            showTotal:(total)=>{
                return `总计${total}条`
            },
            total,//总条数一共多少条
            onChange:(pageNum)=>{
                dispatch(routerRedux.push({
                    pathname:`/admin/${ENTITY_NAME}`,
                    query:{pageNum}
                }));
            }
        }
        const rowSelection = {
            type:'checkbox',
            selectedRowKeys,
            onChange:(selectedRowKeys)=>{//[1,2]
                this.save({selectedRowKeys});
            }
        }
        return (
            <Fragment>
                <Card>
                  <SearchForm
                   onSearch={this.onSearch}
                   wrappedComponentRef={inst=>this.searchForm= inst}
                  />
                </Card>
                <Card>
                    <Button type="warning" onClick={this.onAdd}>添加</Button>
                    <Button type="danger" onClick={this.delAll}>全部删除</Button>
                    <Table
                       columns = {columns}
                       dataSource = {list}
                       rowKey={record=>record.id}
                       pagination={pagination}
                       rowSelection={rowSelection}
                       onRow = {
                           record=>{
                               return {
                                   onClick:()=>{
                                       let id = record.id;
                                       let selectedRowKeys = this.props.selectedRowKeys;
                                       let index = selectedRowKeys.indexOf(id);
                                       if(index==-1){
                                         selectedRowKeys = [...selectedRowKeys,id];
                                       }else{
                                         selectedRowKeys = selectedRowKeys.filter(item=>item!=id);
                                       }
                                       this.save({selectedRowKeys});
                                   }
                               }
                           }
                       }
                    />
                    <EditModal
                    visible={editVisible}
                    onOk={this.onEditOk}
                    onCancel={this.onEditCancel}
                    record={record}
                    wrappedComponentRef = {inst =>this.editForm= inst}
                    />
                </Card>
            </Fragment>
        )
    }
}
@Form.create()
class SearchForm extends Component{
    render(){
        let {form:{getFieldDecorator},onSearch} = this.props;
        return (
            <Form layout="inline">
                  <FormItem label="名称">
                      {
                          getFieldDecorator('name',)(<Input placeholder="请输入名称"/>)
                      }
                  </FormItem>
                  <FormItem >
                     <Button shape="circle" icon="search" onClick={onSearch}></Button>
                  </FormItem>
              </Form>
        )       
    }
}
//EditModal = Form.create()(EditModal); form
@Form.create()
class EditModal extends Component{
    render(){
        let {form:{getFieldDecorator},visible,onOk,onCancel,record} = this.props;
        let {id,name,key,icon} = record;
        return (
            <Modal
             style={{width:'1000px'}}
             title="新增"
             visible={visible}
             onOk={onOk}
             onCancel={onCancel}
             destroyOnClose
            >
              <Form>
                   <FormItem >
                      {
                          getFieldDecorator('id',{
                              initialValue:id
                          })(<Input type="hidden"/>)
                      }
                  </FormItem>
                  <FormItem label="名称">
                      {
                          getFieldDecorator('name',{
                              rules:[{required:true,message:'名称必须输入'}],
                              initialValue:name
                          })(<Input placeholder="请输入名称"/>)
                      }
                  </FormItem>
                  <FormItem label="路径">
                      {
                          getFieldDecorator('key',{
                              rules:[{required:true,message:'路径必须输入'}],
                              initialValue:key
                          })(<Input/>)
                      }
                  </FormItem>
                  <FormItem label="图标">
                      {
                          getFieldDecorator('icon',{
                              rules:[{required:true,message:'图标必须输入'}],
                              initialValue:icon
                          })(<Input/>)
                      }
                  </FormItem>
              </Form>
            </Modal>
        )
    }
}
export default connect(
    state=>state[ENTITY_NAME]
)(BaseComponent);