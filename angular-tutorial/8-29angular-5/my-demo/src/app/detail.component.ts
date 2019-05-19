import { Component} from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location }                 from '@angular/common';
import { ListsService } from './app.service';

@Component({
  selector: 'app-detail',
  template: `
    <div>
      详情页{{id}}
      <button (click)="goBack()">返回</button>
    </div>

  `,
})
export class DetailComponent {
  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private listsService: ListsService
  ) {}
  //获取参数 paramMap参数键值对   
  id = this.route.snapshot.paramMap.get('id');
  // ngOnInit():void{
  //   this.listsService.getdetail(this.id:number)
  //     .then(data =>)
  // }
  goBack(): void {
    this.location.back();
  }
}