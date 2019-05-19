export function loadMore(element:any,callback:any){
    //防抖 节流
    let timer:any;
   element.addEventListener('scroll',function(){
       timer&&clearTimeout(timer);
       timer = setTimeout(function(){
        let clientHeight = element.clientHeight;//div的高度，可视区域 的高度
        let scrollTop = element.scrollTop;//向上卷去的高度 
        let scrollHeight = element.scrollHeight;//内容 高度
        if(clientHeight + scrollTop+10 >= scrollHeight){
           callback();
        }
       },300);
       
   });
}

export function downRefresh(element:any,callback:any){
   let startY:number;//按下时候的初始纵坐标
   let distance:number;//一共下拉的距离
   let originalTop = element.offsetTop;//最初的元素距离 父级顶部的距离
   element.addEventListener('touchstart',function(event:any){
       if(element.offsetTop == originalTop &&element.scrollTop == 0){
        startY = event.touches[0].pageY;
        element.addEventListener('touchmove',touchMove);
        element.addEventListener('touchend',touchEnd);
       }
   });
   function touchMove(event:any){
     let pageY  = event.touches[0].pageY;
     if(pageY>startY){
        distance = pageY - startY;
        element.style.top = (originalTop+distance)+'px';
     }else{
        element.removeEventListener('touchmove',touchMove);
        element.removeEventListener('touchend',touchEnd);
     }
   }
   function touchEnd(event:any){
    element.removeEventListener('touchmove',touchMove);
    element.removeEventListener('touchend',touchEnd);
    let timer = setInterval(function(){
        if(distance < 1){
            element.style.top =  originalTop+'px';
            clearInterval(timer);
        }else{
            element.style.top =  (originalTop+--distance)+'px';
        }
    },13);
    if(distance>10){
        callback();
    }
   }

}
//封装了一个工具方法，用来往sessionStorage存值和取值 
export const store = {
    set(key:string,val:string){
        sessionStorage.setItem(key,val);
    },
    get(key:string){
        return sessionStorage.getItem(key);
    }
}