window.onload = function(){
    var arr = [{x:10,y:10},{x:500,y:300}];
    var timer,flag= false ,speed= 1; 
    var canvas = document.getElementById("myCanvas");
    var ctx = canvas.getContext("2d");
    //drawImage(img,x,y,w,h)   绘制图片
    //var img = document.getElementById("img");
   // ctx.drawImage(img,200,100,20,20)
   //创建图片  new Image()    
   var image = new Image();
   image.src= 'img/person.png';
//    image.onload = function(){   //图片加载完后绘制
//        ctx.drawImage(image,400,100,20,20);
//    };
   //事件
   document.querySelector(".play").onclick = function(){
       play();
   };
   document.querySelector(".stop").onclick = function(){
       stop();
   };
   //开始
   function play() {
       if(flag) return;
      timer =  setInterval(draw,100);    //定时器
      flag = true;
   };
   //暂停
   function stop(){
       clearInterval(timer);
       flag = false;
   };
   //绘制
   function draw(){
       ctx.clearRect(0,0,canvas.width,canvas.height);//清空内容
       if(arr[0].x <arr[1].x){
           arr[0].x+=speed;
       };
       if(arr[0].y <arr[1].y){
           arr[0].y+=speed;
       };
       ctx.drawImage(image,arr[0].x,arr[0].y,30,30);   //drawImage(image,x,y,width,height); 
   }
}