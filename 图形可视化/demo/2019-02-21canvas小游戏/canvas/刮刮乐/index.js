window.onload = function(){
	var canvas = document.getElementById("canvas");
	var ctx = canvas.getContext("2d");  //绘制图形
	ctx.beginPath(); //开始路径
	ctx.rect(0,0,300,150);  //绘制矩形
	ctx.fillStyle='#c0c0c0';//填充颜色
	ctx.fill();   //填充
	ctx.closePath(); //关闭路径
	
	//按下事件
	canvas.onmousedown = function(event){    //event对象    事件的状态  e.target
		//移动事件
		canvas.onmousemove = function(event){
			var x = event.clientX;    //与X轴的距离
			var y = event.clientY;   //与Y轴的距离
			//console.log(x,y);
			//清除绘制
			ctx.clearRect(x,y,20,20);
		}
	};
	//松开事件
	canvas.onmouseup= function(event){    //event对象    事件的状态  e.target
		canvas.onmousemove  = null;   //清除事件
	};

	//中奖信息
	var arr = ['一个亿','海景别墅','一等奖','二等奖','100元话费','10G流量','谢谢惠顾'];
	var prize = document.querySelector(".prize");
	var i = Math.floor(Math.random()*arr.length);  //随机数 parseInt
	console.log(i);
	prize.innerText = arr[i];   //0-5

}