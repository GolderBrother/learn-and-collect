import request from '@/utils/request';
import {PAGE_SIZE} from '../constants';
import querystring from 'querystring';
const ENTITY_NAME = 'user';
export function fetch(pageNum,where) {//{username:'zfpx'}
  let whereString = querystring.stringify(where); 
  // /user?pageNum=1&pageSize=3&username=zfpx 
  return request(`/${ENTITY_NAME}?pageNum=${pageNum}&pageSize=${PAGE_SIZE}&${whereString}`);
}

export function create(values) {
    return request(`/${ENTITY_NAME}`,{
        method:'POST',
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(values)
    });
  }

export function update(values) {
    return request(`/${ENTITY_NAME}/${values.id}`,{
        method:'PUT',
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(values)
    });
  }

export function del(id) {
    return request(`/${ENTITY_NAME}/${id}`,{
        method:'DELETE',
        headers:{
            "Content-Type":"application/json"
        }
    });
}
export function delAll(ids) {
    return request(`/${ENTITY_NAME}/${ids[0]}`,{
        method:'DELETE',
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(ids)
    });
}
  