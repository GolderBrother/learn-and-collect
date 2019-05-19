const API_HOST = 'http://localhost:3000';
export const get = (url:string)=>{
  return fetch(API_HOST+url,{
      method:'GET',
      credentials:'include',//告诉 客户端在跨域请求的时候一定要携带cookie
      headers:{
          "Accept":'application/json'
      }
  }).then(res=>res.json());
}
export const post = (url:string,body:any)=>{
  return fetch(API_HOST+url,{
     method:'POST',
     credentials:'include',
     headers:{
         "Accept":"application/json",
         "Content-Type":"application/json"
     },
     body:JSON.stringify(body)
  }).then(res=>res.json());;
}