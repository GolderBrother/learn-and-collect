import { Injectable} from '@angular/core';
import {LISTS} from './lists-data';
import {LISTS2} from './lists-data2';
import {State} from './interface';

@Injectable()  //注入服务
export class ListsService{
  getList(): Promise<State[]>{  //泛型的类型是数组  返回类型
      return Promise.resolve(LISTS); 
  }
  getList2(): Promise<State[]>{  //泛型的类型是数组  返回类型
      return Promise.resolve(LISTS2); 
  }
  getList3(): Promise<State[]>{  //泛型的类型是数组  返回类型
      return Promise.resolve(LISTS); 
  }
}