import React,{Component,Fragment} from 'react';
import {connect} from 'dva';
import {Card,Table,Button,Form,Modal,Input,message,Popconfirm,Tree,Transfer} from 'antd';
import {PAGE_SIZE} from './constants';
import {routerRedux} from 'dva/router';
const { TreeNode } = Tree;
const ENTITY_NAME = 'role';
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
    onCheckRoleResources = (checkedKeys)=>{
        this.save({checkedKeys});
    }
    onChangeRoleUsers = (targetKeys)=>{
        this.save({targetKeys});
    }
    setRoleResources = ()=>{
        if(this.props.selectedRows.length ==1){
            let record = this.props.selectedRows[0];
            this.save({resourceVisible:true,record,checkedKeys:record.resourceIds});
        }else{
            message.error('分配权限的时候要选择并且只能选择一个角色!');
        }
    }
    setRoleUsers = ()=>{
        if(this.props.selectedRows.length ==1){
            let record = this.props.selectedRows[0];
            this.save({userVisible:true,record,targetKeys:record.userIds});
        }else{
            message.error('分配权限的时候要选择并且只能选择一个角色!');
        }
    }
    setRoleResourceCancel = ()=>{
        this.save({resourceVisible:false});
    }
    setRoleUserCancel = ()=>{
        this.save({userVisible:false});
    }
    setRoleResourcesOk = ()=>{
        this.props.dispatch({
            type:'role/setRoleResources'
        });
    }
    setRoleUsersOk = ()=>{
        this.props.dispatch({
            type:'role/setRoleUsers'
        });
    }
    render(){
        //定义表格有哪些列
        const columns = [
            {title:'角色名称',dataIndex:'name',key:'name'},
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
        let {dispatch,list,total,pageNum,editVisible,record,selectedRowKeys,
            checkedKeys,resourceVisible,resources,userVisible,users,targetKeys} = this.props;
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
            onChange:(selectedRowKeys,selectedRows)=>{//[1,2]
                this.save({selectedRowKeys,selectedRows});
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
                    <Button.Group>
                        <Button type="warning" onClick={this.onAdd} >添加</Button>
                        <Button type="danger" onClick={this.delAll} style={{marginLeft:'5px'}}>全部删除</Button>
                        <Button icon="solution" onClick={this.setRoleResources} style={{marginLeft:'5px'}}>为角色分配资源</Button>
                        <Button icon="team" onClick={this.setRoleUsers} style={{marginLeft:'5px'}}>给角色分配用户</Button>
                    </Button.Group>
                    
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
                    <ResourceModal
                      visible={resourceVisible}
                      resources = {resources}
                      onOk={this.setRoleResourcesOk}
                      onCancel={this.setRoleResourceCancel}
                      record={record}
                      onCheck={this.onCheckRoleResources}
                      checkedKeys={checkedKeys}
                    />
                     <UserModal
                      visible={userVisible}
                      users = {users}
                      onOk={this.setRoleUsersOk}
                      onCancel={this.setRoleUserCancel}
                      record={record}
                      onChange={this.onChangeRoleUsers}
                      targetKeys={targetKeys}
                    />
                </Card>
            </Fragment>
        )
    }
}

class UserModal extends Component{
    render(){
        let {visible,onOk,onCancel,record,targetKeys,onChange,users} = this.props;
        let {id,name} = record;
        return (
            <Modal
             title={`为${name}分配用户`}
             visible={visible}
             onOk={onOk}
             onCancel={onCancel}
             destroyOnClose
            >
             <Transfer
               dataSource={users}
               targetKeys={targetKeys}
               titles={["待选用户","已选用户"]}
               onChange={onChange}
               rowKey={record=>record.id}
               render={row=>row.username}
             />
            </Modal>
        )
    }
}

class ResourceModal extends Component{
    renderResources = (children=[])=>{
        return children.map(child=>{
            if(child.children&&child.children.length>0){
               return (
                <TreeNode title={child.name} key={child.id}>
                  {this.renderResources(child.children)}
                </TreeNode>
               )
            }else{
                return (
                    <TreeNode title={child.name} key={child.id}/>
                )
            }
        });
    }
    render(){
        let {visible,onOk,onCancel,record,checkedKeys,onCheck,resources} = this.props;
        let {id,name} = record;
        return (
            <Modal
             title={`为${name}分配资源`}
             visible={visible}
             onOk={onOk}
             onCancel={onCancel}
             destroyOnClose
            >
             <Tree
              checkable
              defaultExpandAll
              checkedKeys={checkedKeys}
              onCheck={onCheck}
             >
                    <TreeNode title="根节点" key={0} disabled>
                       {this.renderResources(resources)}
                    </TreeNode>
             </Tree>
            </Modal>
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
                          getFieldDecorator('username')(<Input placeholder="请输入名称"/>)
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
        let {id,name} = record;
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
              </Form>
            </Modal>
        )
    }
}
export default connect(
    state=>state[ENTITY_NAME]
)(BaseComponent);