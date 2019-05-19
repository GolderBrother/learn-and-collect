//上拉加载更多 限流 防抖
export function upMore(element,callback){
  let timerId;
  element.addEventListener('scroll',function(){
    if(timerId) clearTimeout(timerId);
    timerId = setTimeout(function(){
      let scrollTop = element.scrollTop;//得到的向上卷去的高度
      let clientHeight = element.clientHeight;//可视区域的高度
      let scrollHeight = element.scrollHeight;//内容的高度
      if(scrollTop+clientHeight+10>scrollHeight){
        callback();
      }
    },80)
  });
}

export function downRefresh(element,callback){
  element.addEventListener('touchstart',touchStart);
  let startY;//开始触摸的纵坐标
  let distance;//移动的距离
  let initTop = element.offsetTop;
  function touchStart(event){
    //只有当此元素的距离顶部的高度等于它的初始距离的话，并且没有滚动的话
    if(element.offsetTop == initTop && element.scrollTop ==0){
      startY = event.targetTouches[0].pageY;//初始值
      element.addEventListener('touchmove',touchMove);
      element.addEventListener('touchend',touchEnd);
    }
    function touchMove(e){
      let pageY = e.targetTouches[0].pageY;
      if(pageY>startY){//新的点的纵坐标大于起始点的纵坐标表示下拉
        distance = pageY - startY;
        element.style.top = initTop+distance+'px';
      }else{//如果上拉的话不处理，移除监听
        element.removeEventListener('touchmove',touchMove);
        element.removeEventListener('touchend',touchEnd);
      }
    }
    function touchEnd(e){
      element.removeEventListener('touchmove',touchMove);
      element.removeEventListener('touchend',touchEnd);
      let timerId = setInterval(function(){
        //如果说当前的距离已经小于等于初始的值了
        if(element.offsetTop<=initTop){
          element.style.top = initTop+'px';
          clearInterval(timerId);//清除定时器
        }else{//让top值减1
          element.style.top = element.offsetTop - 1 +'px';
        }
      },1);
      if(distance>50){
        callback();
      }
    }
  }
}