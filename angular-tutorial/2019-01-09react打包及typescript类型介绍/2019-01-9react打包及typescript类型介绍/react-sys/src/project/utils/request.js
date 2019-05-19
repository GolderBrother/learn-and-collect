import axios from 'axios';

//公共的地址
export const GLOBAL_URL ={
  url:"http://localhost:3333"
}
//公共的方法
function request(method,url,body,headers){
  method = method.toUpperCase();  //转为大写  目的更严谨
  if(method ==='GET'){
    body = undefined;
  };
  return axios ({
    method:method,
    url:`${GLOBAL_URL.url +url}`,
    data:body,
    headers:headers || {
      'Content-Type':'application/json'
    }
  }).then(function(res){
    return res
  }).catch(function(error){
    return error
  })
}
export const get = url => request('GET',url);
export const post = (url,body) => request('POST',url,body);
export const put = (url,body) => request('PUT',url,body);
export const del = (url,body) => request('DELETE',url,body);
