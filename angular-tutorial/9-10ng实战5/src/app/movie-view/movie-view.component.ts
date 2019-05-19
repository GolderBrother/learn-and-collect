import { Component ,Input} from '@angular/core';

@Component({
  selector: 'movie-view',
  templateUrl: './movie-view.component.html',
  styleUrls: ['./movie-view.component.css']
})
export class MovieViewComponent {
//获取父参数
@Input() movie:Object;    //object 对象   数据 
}
