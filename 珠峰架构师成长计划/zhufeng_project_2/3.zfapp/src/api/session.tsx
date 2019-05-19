import {get,post} from './index';
export const reg = (body:any)=>{
    return post('/api/reg',body);
}
export const login = (body:any)=>{
    return post('/api/login',body);
}
export const logout = ()=>{
    return get('/api/logout');
}
export const validate = ()=>{
    return get('/api/validate');
}