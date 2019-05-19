window.onload = function(){
    new Vue({
        el:'#my',
        data:{
            n:0,
            lists:[{title:'在线咨询',icon:'icon-shenghuo',color:'#92d85c'},
                {title:'产品介绍',icon:'icon-jiaoyu',color:'#f95733'},
                {title:'活动动态',icon:'icon-11',color:'#0817ec'},
                {title:'限时抢购',icon:'icon-jiazheng',color:'#92d85c'},
                {title:'在线咨询',icon:'icon-jiajujiafang',color:'#c2ec08'},
                {title:'在线咨询',icon:'icon-licai',color:'#0817ec'}],
            items:['img/banner1.jpg',
                    'img/banner2.jpg',
                    'img/banner3.jpg',
                    'img/banner4.jpg',
                    'img/banner5.jpg']
        },
        methods:{
            play:function(){
                setInterval(this.autoPlay,2000)
            },
            autoPlay:function(){
                this.n++;
                if(this.n == this.items.length){
                    this.n = 0;
                }
            },
            curShow:function(index){
                this.n = index;
            }
        },
        mounted:function(){
            this.play();
        }
    })
}