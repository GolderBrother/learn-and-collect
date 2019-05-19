import { Component } from '@angular/core';


@Component({
  selector: 'app-root',
  template: `
    <div class="lists">
      <a routerLink="/view" routerLinkActive = "active">特价展示</a>
      <a routerLink="/list" routerLinkActive = "active">列表展示</a>
   </div>
   <router-outlet></router-outlet>
  `,
  
})
export class AppComponent {

}