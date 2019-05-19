import { Component } from '@angular/core';

@Component({
  selector: 'app-root',  
  template:`
    <h1>{{date | date:'y-MM-dd'}}</h1>  
    <h1>{{date | date:'y-MM-dd HH:mm:ss'}}</h1>  

    <h1>{{str | uppercase }}</h1> 
    <h1>{{str2 | lowercase }}</h1> 

    <h1>{{n |  slice:1:5 }}</h1> 

    <h1>{{num |  numpipe }}</h1> 
    <h1>{{num |  numpipe:5 }}</h1> 
  ` ,
  styles: []
})
export class AppComponent {
    date = new Date();
    str = 'abc';
    str2 = 'ABC';
    n = 'abcdefg';
    num = 10;
}