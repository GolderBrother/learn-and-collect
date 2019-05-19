window.onload = function(){
    //获得画布元素
    var canvas=document.getElementById("canvas");
    //获得2维绘图对象
    var ctx=canvas.getContext("2d");
    //三个图片  背景图片 英雄 怪兽
    var back = new Image();   //图片预加载
    back.src = 'image/bg.png';
    var heroImg = new Image();   //英雄
    heroImg.src = 'image/hero.png';
    var monsterImg = new Image();   //怪兽
    monsterImg.src = 'image/monster.png';
    //英雄  怪兽  坐标位置 
    var hero = {
        x:0,
        y:0,
        speed:1
    };
    var monster = {
        x:0,
        y:0
    };
    //记录得分
    var n = 0;

    //三个方法
    //渲染图片/文字
    function render(){
        ctx.drawImage(back,0,0,canvas.width,canvas.height);  //渲染背影
        ctx.drawImage(monsterImg,monster.x,monster.y,30,30);  //怪兽
        ctx.drawImage(heroImg,hero.x,hero.y,30,30);  //英雄
        ctx.font = "30px '微软雅黑'";   //文字
        ctx.fillStyle='#fff';
        ctx.fillText('你的得分:'+n,50,50);
    }
    //开始游戏 
    //事件  监听键盘事件
    var keydown = {};
    addEventListener("keydown",function(e){  //按下
       // e.keyCode    上38   下40   左37   右39
       keydown[e.keyCode] = true;
    });
    addEventListener("keyup",function(e){  //松开
        // e.keyCode    上38   下40   左37   右39
        delete keydown[e.keyCode];
     });
    // var obj ={x:'x',y:'y'};
    // var a = ('x' in obj)   //true
    function play(){
        if(38 in keydown){  //上
            hero.y -= hero.speed;
        };
        if(40 in keydown){  //下
            hero.y += hero.speed;
        };
        if(37 in keydown){  //左
            hero.x -= hero.speed;
        };
        if(39 in keydown){  //右
            hero.x += hero.speed;
        };
        if(hero.x <= (monster.x +2) && hero.y <= (monster.y+2) && 
            monster.x <= (hero.x +2)&& monster.y <= (hero.y+2)){
                n++;
                hero.x = canvas.width/2;   //英雄固定的
                hero.y = canvas.height/2;
                monster.x = Math.floor(Math.random()*canvas.width);  //怪兽随机值
                monster.y = Math.floor(Math.random()*canvas.height);
        }
    };
    //游戏结束
    var over = false; //未结束
    function getOver(){
        if(hero.x <= 0 || hero.x >= canvas.width || 
            hero.y <= 0 || hero.y >= canvas.height){
                over = true;
                n = 0;
                alert('over');
        }
    }
    
    //初始化
    function init() {
        play();
        render();
        getOver();
        if(!over){
            requestAnimationFrame(init)
        }
    }
    init();
    //动画神器
    requestAnimationFrame = requestAnimationFrame || 
                                webkitRequestAnimationFrame ||
                                mozRequestAnimationFrame ||
                                msRequestAnimationFrame ;

}
