import {get} from './index';
export const getSliders = ()=>{
 return get('/api/sliders');
}

export const getLessons = (category:string,offset:number,limit:number)=>{
  return get(`/api/lessons/${category}?offset=${offset}&limit=${limit}`);
}