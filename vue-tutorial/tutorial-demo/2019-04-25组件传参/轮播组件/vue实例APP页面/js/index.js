window.onload = function(){
    new Vue({
        el:'#my',
        data:{
            n:0,
            lists:{n:0,items: ['img/banner1.jpg',
                                'img/banner2.jpg',
                                'img/banner3.jpg',
                                'img/banner4.jpg',
                                'img/banner5.jpg']
                            },
            lists2:{n:1,items: [
                            'img/banner4.jpg',
                            'img/banner5.jpg']
                        }
        },
        components:{
            'my-banner':{
                template:'#my-banner',
                props:['data'],
                methods:{
                    play:function(){
                        setInterval(this.autoPlay,2000)
                    },
                    autoPlay:function(){
                        this.data.n++;
                        if(this.data.n == this.data.items.length){
                            this.data.n = 0;
                        }
                    },
                    curShow:function(index){
                        this.data.n = index;
                    }
                },
                mounted:function(){   //生命周期
                    this.play();
                }
            }
        },
        
    })
}