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