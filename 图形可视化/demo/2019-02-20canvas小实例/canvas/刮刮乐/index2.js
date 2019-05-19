window.onload = function(){
    //获得画布元素
    var canvas=document.getElementById("canvas");
    //获得2维绘图对象
    var ctx=canvas.getContext("2d");
    //绘制矩形
    ctx.fillStyle= '#999';
    ctx.fillRect(0,0,300,150);
    //事件
    canvas.onmousedown = function(e){
        canvas.onmousemove = function(e){
            var x = e.clientX, y = e.clientY; 
            ctx.clearRect(x,y,20,20);
        };
    };
    canvas.onmouseup = function(e){
        canvas.onmousemove = null; //清除事件
    };
    //中奖信息
    var arr = ['一个亿','海景别墅','一等奖','二等奖','三等奖','1000元现金','谢谢惠顾'];
    var i = Math.floor(Math.random()*arr.length);
    console.log(i);
    document.querySelector(".prize").innerText = arr[i];

}