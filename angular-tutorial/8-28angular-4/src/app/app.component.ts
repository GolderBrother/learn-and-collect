import { Component } from '@angular/core';

//routerLink跳转链接
//router-outlet 显示位置
@Component({
  selector: 'app-root',
  template: `
   <div class="lists">
      <a routerLink="/home" routerLinkActive = "active">主页</a>
      <a routerLink="/news" routerLinkActive = "active">新闻</a>
      <a routerLink="/other" routerLinkActive = "active">其它</a>
   </div>
   <router-outlet></router-outlet>
  `,
  styles:[`
   .lists a {
     padding:0 20px;
   }
    .active {
      color:#f60;
    }
  `]
})
export class AppComponent {
  
}