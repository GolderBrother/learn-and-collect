import { Pipe,PipeTransform } from "@angular/core";

@Pipe ({    //管道装饰器
    name:'statepipe'   //管道名称
})
//implements  实现PipeTransform接口中定义的 transform的方法
export class StatePipe implements PipeTransform{
    transform(value:boolean):string{
        switch(value) {
            case true:
                return '已采购';
            case false:
                return '未采购';
            default:
                return '未采购';
        }
    }
}
