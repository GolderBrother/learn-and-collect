import * as services  from '../services/user';
const ENTITY_NAME = 'user';
export default {

    namespace: ENTITY_NAME,
  
    state: {
        isCreate:true,//是否是添加
        list:[],//当前页的记录对象数组
        record:{},//代表当前的记录
        pageNum:1,//当前的页码
        total:0,//总记录数
        editVisible:false, //是否编辑用户编辑窗口
        selectedRowKeys:[],//当前选 中的行的记录ID
        where:{}//过滤或者 说搜索条件
    },
  
    subscriptions: {
      setup({ dispatch, history }) {
          //每当地址栏中路径发生变化的时候就会走此监听函数
          return history.listen(({pathname,query})=>{
              if(pathname == `/admin/${ENTITY_NAME}`){
                 //  /admin/user?pageNum=1
                  //当路径等于/admin/user的时候，就要派发fetch动作，获取数据
                dispatch({type:'fetch',payload:query});
              }
          });
      },
    },
  
    effects: {
        //  http://localhost:7001/user 
      *fetch({ payload:{pageNum,where} }, { call, put,select }) {
        // {code:0,data:{list:[],total:100}}
        if(!pageNum){
          pageNum = yield select(state=>state[ENTITY_NAME].pageNum);
        }
        if(!where){
          where = yield select(state=>state[ENTITY_NAME].where);
        }
        pageNum = isNaN(pageNum)?1:parseInt(pageNum);
        const {list,total} = yield call(services.fetch,pageNum,where);  
        yield put({ type: 'save',payload:{list,total,pageNum} });
      },
      *create({ payload }, { call, put }){
        yield call(services.create,payload);
        yield put({type:'fetch',payload:{pageNum:1}});
        yield put({type:'save',payload:{editVisible:false}});
      },
      *update({ payload }, { call, put,select }){
        yield call(services.update,payload);
        let pageNum = yield select(state=>state[ENTITY_NAME].pageNum);//state指定的合并后的状态树
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
      }
    },
  
    reducers: {
      save(state, action) {
        return { ...state, ...action.payload };
      },
    },
  
  };
  