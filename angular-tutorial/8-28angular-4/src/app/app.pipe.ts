import { Pipe,PipeTransform} from '@angular/core';

@Pipe({
    name:'statepipe'
})
export class StatePipe implements PipeTransform{
  transform(value:boolean):string {
      switch (value) {
          case true:
            return '已采购';
          case false:
            return '未采购';
          default:
            return '未采购';
      }
  }
}

@Pipe({
    name:'numpipe'
})
export class NumPipe implements PipeTransform{
  transform(value:number,args?:number):number {
      if(!args){
        args = 1;
      }
      return value*args;
  }
}