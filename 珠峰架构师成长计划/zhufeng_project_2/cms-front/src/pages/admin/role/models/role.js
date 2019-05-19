import * as services  from '../services/role';
const ENTITY_NAME = 'role';
export default {

    namespace: 'role',
  
    state: {
        isCreate:true,//是否是添加
        list:[],//当前页的记录对象数组
        record:{},//代表当前的记录
        pageNum:1,//当前的页码
        total:0,//总记录数
        editVisible:false, //是否编辑用户编辑窗口
        selectedRowKeys:[],//当前选 中的行的记录ID
        selectedRows:[],
        where:{},//过滤或者 说搜索条件
        resourceVisible:false,//是否显示分配资源的窗口
        resources:[ ],//这里存放着所有的资源
        checkedKeys:[], //这里存放着被选中的资源ID数组
        userVisible:false,//默认不显示
        users:[],//存放着所有的用户
        targetKeys:[]//已经为此角色分配的用户
    },
  
    subscriptions: {
      setup({ dispatch, history }) {
          //每当地址栏中路径发生变化的时候就会走此监听函数
          return history.listen(({pathname,query})=>{
              if(pathname == `/admin/${ENTITY_NAME}`){
                 //  /admin/user?pageNum=1
                  //当路径等于/admin/user的时候，就要派发fetch动作，获取数据
                dispatch({type:'fetch',payload:query});
                dispatch({type:'getResources'});
                dispatch({type:'getUsers'});
              }
          });
      },
    },
  
    effects: {
        //  http://localhost:7001/user 
      *fetch({ payload:{pageNum,where} }, { call, put,select }) {
        // {code:0,data:{list:[],total:100}}
        if(!pageNum){
          pageNum = yield select(state=>state.role.pageNum);
        }
        if(!where){
          where = yield select(state=>state.role.where);
        }
        pageNum = isNaN(pageNum)?1:parseInt(pageNum);
        const {list,total} = yield call(services.fetch,pageNum,where);  
        yield put({ type: 'save',payload:{list,total,pageNum,where} });
      },
      *create({ payload }, { call, put }){
        yield call(services.create,payload);
        yield put({type:'fetch',payload:{pageNum:1}});
        yield put({type:'save',payload:{editVisible:false}});
      },
      *update({ payload }, { call, put,select }){
        yield call(services.update,payload);
        let pageNum = yield select(state=>state.role.pageNum);//state指定的合并后的状态树
        yield put({type:'fetch',payload:{pageNum}});
        yield put({type:'save',payload:{editVisible:false}});
      },
      *del({ payload }, { call, put,select }){
        yield call(services.del,payload);
        yield put({type:'fetch',payload:{pageNum:1}});
      },
      *delAll({ payload }, { call, put,select }){
        yield call(services.delAll,payload);
        yield put({type:'fetch',payload:{pageNum:1}});
      },
      *search({ payload }, { call, put,select }){
         yield put({type:'fetch',payload:{pageNum:1,where:payload}});
      },
      *getResources({ payload }, { call, put,select }){
        const resources = yield call(services.getResources);
        yield put({type:'save',payload:{resources}});
      },
      *setRoleResources({ payload }, { call, put,select }){
         const {record,checkedKeys} = yield select(state=>state.role);
         yield call(services.setRoleResources,{roleId:record.id,resourceIds:checkedKeys});
         yield put({type:'fetch',payload:{}});
         yield put({type:'save',payload:{resourceVisible:false,selectedRows:[],selectedRowKeys:[],record:{}}});
      },
      *getUsers({ payload }, { call, put,select }){
        const users = yield call(services.getUsers);
        yield put({type:'save',payload:{users}});
      },
      *setRoleUsers({ payload }, { call, put,select }){
        const {record,targetKeys} = yield select(state=>state.role);
        yield call(services.setRoleUsers,{roleId:record.id,userIds:targetKeys});
        yield put({type:'fetch',payload:{}});
        yield put({type:'save',payload:{userVisible:false,selectedRows:[],selectedRowKeys:[],record:{}}});
     },
    },
  
    reducers: {
      save(state, action) {
        return { ...state, ...action.payload };
      },
    },
  
  };
  