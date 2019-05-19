import { Component, Input } from '@angular/core';

@Component({
  selector: 'movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.css']
})
export class MovieCardComponent {
  //获取父参数
  @Input()  movie: Object;
  @Input()  type: string;

}
