import { Component} from '@angular/core';

const Img: string[] = [
   '../assets/img/banner1.jpg',
   '../assets/img/banner2.jpg',
   '../assets/img/banner3.jpg',
   '../assets/img/banner4.jpg',
   '../assets/img/banner5.jpg',
];

@Component({
  selector: 'app-root',
  templateUrl: './banner.component.html',
  styleUrls:['./app.compoment.css']

})
export class AppComponent {
  ImgList = Img;
  num:number;
  
}