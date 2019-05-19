import { Component,Input, Output,EventEmitter } from '@angular/core';

@Component({
    selector: 'table-lists',  
    template:`
    <table class="table table-striped">
              <thead>
                <tr>
                  <th>清单名称</th>
                  <th>状态</th>
                  <th>删除</th>
                </tr>
              </thead>
              <tbody>
                <tr *ngFor="let list of lists,let i = index">
                  <td>{{list.name}}</td>
                  <td><input type="checkbox" 
                                [(ngModel)]="list.state" 
                                (change)="curChange()"   />{{list.state | statepipe}}</td>
                  <td><button type="button" 
                            class="btn btn-danger btn-sm" 
                            (click)="del(i)"
                            [disabled]="list.state">
                            删除</button>
                        </td>
                </tr>
              </tbody>
            </table>` 
  })
  export class TableComponent {
    @Input() lists;      //父到子
    @Output() abc = new EventEmitter();   //子发射事件  abc事件的名称
    //删除单个
    del(i:number):void{
        this.lists.splice(i,1);
    }
    //当前状态
    curChange():void{
        // let n = this.lists.filter(function(item){
        //     return item.state == true;
        // });
        let n = this.lists.every(function(item){
            return item.state;
        })
        this.abc.emit(n);   //父组件能够监听自定义事件abc
    }
    getNum():number{
        return 100;
    }
    aaa:number = 222;
  }