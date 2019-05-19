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
  styleUrls:['./app.component.css']

})
export class AppComponent {
  ImgList = Img;
  num:number =0;
  ngOnInit():void{   //生命周期，初始化
    this.play();
  }
  autoPlay():void{
        this.num++;
        //添加最大判断
        if(this.num == this.ImgList.length){
            this.num = 0;
        }
    }
    play():void{
        //setInterval(函数体,时间)
        setInterval(()=>{this.autoPlay()},2000)
    }
}