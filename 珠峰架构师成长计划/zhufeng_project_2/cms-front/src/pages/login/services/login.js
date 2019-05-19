import request from '@/utils/request';

export function signup(values) {
  return request('/signup',{
      method:'POST',
      headers:{
          "Content-Type":"application/json"
      },
      body:JSON.stringify(values)
  });
}

export function login(values) {
    return request('/login',{
        method:'POST',
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(values)
    });
  }