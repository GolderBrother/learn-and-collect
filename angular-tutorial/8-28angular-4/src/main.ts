import { enableProdMode } from '@angular/core';  //依赖文件 
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
//platformBrowserDynamic 动态引导
import { AppModule } from './app/app.module';  //引入模块
import { environment } from './environments/environment';  //多环境支持
//判断是开发环境还是生产环境
if (environment.production) {
  enableProdMode();
}
//通过bootstrapModule()启动模块
platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));
