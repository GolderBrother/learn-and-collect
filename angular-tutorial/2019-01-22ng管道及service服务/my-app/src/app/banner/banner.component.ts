import { Component } from '@angular/core';

let arr:string[]=['../../assets/img/banner1.jpg',
'../../assets/img/banner2.jpg',
'../../assets/img/banner3.jpg',
'../../assets/img/banner4.jpg',
'../../assets/img/banner5.jpg']
@Component({
  selector: 'app-root',  
  templateUrl: './banner.component.html',
  styleUrls:['./banner.component.css','../../assets/font/iconfont.css']
})
export class BannerComponent {
    imgLists = arr;
    n:number = 0;
    timer;
    ngOnInit():void{   //生命周期 初始化
        this.play()
    }
    ngOnDestroy():void{   //生命周期 销毁
        clearInterval(this.timer)
    }
    play():void{
       this.timer = setInterval(()=>{this.autoPlay()},2000)
    }
    autoPlay():void{
        console.log('123');
        this.n++;
        if(this.n == this.imgLists.length){
            this.n = 0;
        }
    }

}