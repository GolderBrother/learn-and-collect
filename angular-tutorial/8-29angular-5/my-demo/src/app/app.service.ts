import { Injectable} from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import {List} from './interface';

@Injectable()  //注入服务
export class ListsService{
  private headers = new Headers({'Content-Type': 'application/json'});
  private Url = 'http://localhost:3333';  // 

  constructor(private http: Http) { }

  getLists(): Promise<List[]> {
    return this.http.get(this.Url+'/list_get')  //http.get()返回的是Observable，不是promise
               .toPromise()
               .then(response => {
                 console.log(response.json().result);
                 return response.json().result }
                 )
               .catch(this.handleError);
  }

  getdetail(id:number): Promise<List[]> {
    return this.http.get(this.Url+'/list_detail'+id)  //http.get()返回的是Observable，不是promise
               .toPromise()
               .then(response => {
                 console.log(response.json().result);
                 return response.json().result }
                 )
               .catch(this.handleError);
  }

  add(name:string): Promise<List[]> {
    return this.http.post(this.Url+'/list_add',JSON.stringify({name:name}),{headers:this.headers})  //http.get()返回的是Observable，不是promise
               .toPromise()
               .then(response => {
                 return response.json()}
                 )
               .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}