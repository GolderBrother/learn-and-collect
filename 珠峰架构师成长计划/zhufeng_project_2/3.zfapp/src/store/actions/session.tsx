import {reg,login,logout,validate} from '../../api/session';
import {SAVE_SESSION} from '../action-types';
import {push} from 'connected-react-router';
export default {
    reg(body:any){
       return function(dispatch:any){
          reg(body).then((response)=>{
              //code 0成功 1失败  success成功消息 error失败的消息
            let {code,success,error,user} = response;
            //TODO 定义仓库的数据结构  success error user  store.session={success,error}
            dispatch({type:SAVE_SESSION,payload:{success,error,user}});
            if(code == 0){
               dispatch(push('/login'));
            }else{
                alert(error);
            }
          });
       }
    },
    login(body:any){
      return function(dispatch:any){
         login(body).then((response)=>{
             //code 0成功 1失败  success成功消息 error失败的消息
           let {code,success,error,user} = response;
           //TODO 定义仓库的数据结构  success error user  store.session={success,error}
           dispatch({type:SAVE_SESSION,payload:{success,error,user}});
           if(code == 0){
              dispatch(push('/profile'));
           }else{
               alert(error);
           }
         });
      }
   },
   logout(){
      return function(dispatch:any){
         logout().then((response)=>{
             //code 0成功 1失败  success成功消息 error失败的消息
           let {code,success,error} = response;
           //TODO 定义仓库的数据结构  success error user  store.session={success,error}
           dispatch({type:SAVE_SESSION,payload:{success,error}});
           if(code == 0){
              dispatch(push('/login'));
           }else{
               alert(error);
           }
         });
      }
   },
   validate(){
      return function(dispatch:any){
         validate().then((response)=>{
             //code 0成功 1失败  success成功消息 error失败的消息
           let {code,success,error,user} = response;
           //TODO 定义仓库的数据结构  success error user  store.session={success,error}
           //要把数据取回来之后放到仓库中去,
           dispatch({type:SAVE_SESSION,payload:{success,error,user}});
         });
      }
   }
}