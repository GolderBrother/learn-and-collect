window.onload = function(){
    var arr = [{x:10,y:10},{x:550,y:320}];  //坐标点
    var timer,flag=false, speed = 1;  //速度
    //获得画布元素
    var canvas=document.getElementById("myCanvas");
    //获得2维绘图对象
    var ctx=canvas.getContext("2d");
    //var img = document.querySelector("#img");
    //ctx.drawImage(img,200,200,30,30);
    var img = new Image();   //图片预加载
    img.src = 'img/person.png';
    // img.onload = function(){   //  图片加载后才执行
    //     ctx.drawImage(img,200,200,20,20);
    // };
    //单击事件()
    document.querySelector(".play").onclick = function(){play()};
    document.querySelector(".stop").onclick = function(){stop()};
    //定时器
    function play() {
        if(flag) return;
        timer = setInterval(draw,100);
        flag = true;
    };
    function stop() {
        clearInterval(timer);
        flag = false;
    };
    //绘制
    function draw (){
        ctx.clearRect(0,0,canvas.width,canvas.height);  //清空画布内容，起始点  终止点
        if(arr[0].x < arr[1].x){
            arr[0].x += speed;
        };
        if(arr[0].y < arr[1].y){
            arr[0].y += speed;
        };
        ctx.drawImage(img,arr[0].x,arr[0].y,20,20);
    }

}