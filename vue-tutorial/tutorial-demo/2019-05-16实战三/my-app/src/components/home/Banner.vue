<template>
	<div class="home_ban">
		<div class="m_banner clearfix" id="my_banner">
            <ul class="banner_box">
                    <li v-for="(v,i) in imgDatas" v-show="i==num" :key="i"><img :src="v" alt="" /></li> 
            </ul>
            <ul class="point_box">
                    <li v-for="(v,i) in imgDatas" :key="i"></li> 
            </ul>
        </div>
	</div>
</template>

<script>
export default {
  data () {
    return {
        num:0,
        imgDatas:[require('../../assets/images/l8.jpg'),
            require('../../assets/images/l1.jpg'),
            require('../../assets/images/l2.jpg'),
            require('../../assets/images/l3.jpg'),
            require('../../assets/images/l4.jpg')]
    }
  },
  //props:['imgDatas'],
    mounted:function(){   //生命周期  挂载完成
        this.play();
    },
    methods:{   //方法
        autoPlay:function(){
            this.num++;
            if(this.num == this.imgDatas.length){
                this.num = 0;
            }
        },
        play:function(){
            setInterval(this.autoPlay,2000);
        }  
    }
}
</script>