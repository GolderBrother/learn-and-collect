<template>
    <div class="index-content">
        <div class="banner">
            <img v-for="(item,index) in items" :src="item" v-show="index==n" :key="index"/>
            <div class="banner-circle">
                <ul>
                    <li v-for="(item,index) in items" 
                        :class="{'selected':index==n}" 
                        @click="curShow(index)"
                        :key="index"></li> 
                </ul> 
            </div>
        </div>

        <div class="index-category">
            <div class="category" v-for="(list,index) in lists" :key="index">
                <i class="iconfont" :class="list.icon" :style="{background:list.color}"></i>
                <label @click="jump()">{{list.title}}</label>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  data () {
    return {
        n:0,
        lists:[{title:'在线咨询',icon:'icon-shenghuo',color:'#92d85c'},
            {title:'产品介绍',icon:'icon-jiaoyu',color:'#f95733'},
            {title:'活动动态',icon:'icon-11',color:'#0817ec'},
            {title:'限时抢购',icon:'icon-jiazheng',color:'#92d85c'},
            {title:'在线咨询',icon:'icon-jiajujiafang',color:'#c2ec08'},
            {title:'在线咨询',icon:'icon-licai',color:'#0817ec'}],
        items:[require('../assets/img/banner1.jpg'),
                require('../assets/img/banner2.jpg'),
                require('../assets/img/banner3.jpg'),
                require('../assets/img/banner4.jpg'),
                require('../assets/img/banner5.jpg')]
    }
  },
 // props:['items'],
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
        },
        jump:function(){
            //this.$router.push('/tab');
             this.$router.push({path:'/tab'})
        }
    },
    mounted:function(){
        this.play();
    }
}

</script>
<style scoped>
*{
    margin:0;
    padding:0;
}
ul {
    list-style-type:none;
}
body {
    font-size: 14px;
    background: #fff;
    overflow-y:scroll;
    overflow-x:hidden;
}
html,body {
    max-width:720px;
    height:100%;
    margin:0 auto;
}


/*index*/
.index-content .banner {
    position: relative;
}
.index-content .banner .banner-circle {
    position: absolute;
    bottom: 5px;
    left: 0;
    right: 0;
    color: #fff;
}
.index-content .banner .banner-circle li{
    display:inline-block;
    background: rgba(0,0,0,.3);
    border-radius: 50%;
    padding:5px;
    margin:2px;
}
.index-content .banner .banner-circle ul {
    text-align: center;
}
.index-content .banner .banner-circle .selected {
    background: rgba(0,0,0,.8);
}
.index-content .banner img {
    width: 100%;
    margin: 0;
    padding: 0;
}
/*index-category*/
.index-content .index-category {
    margin-top: 5%;
}
.index-content .index-category .category {
    width: 50%;
    float:left;
    text-align:center;
}
.index-content .index-category .category .iconfont {
    font-size: 40px;
    display:inline-block;
    padding: 10%;
    border-radius: 50%;
    color:#fff;
    border: 3px solid #f9f9f9;
    box-shadow: 0px 0px 6px rgba(0,0,0,.5);
}
.index-content .index-category .category .iconfont{
    background: #92d85c;
}

.index-content .index-category .category label {
    display: block;
    padding: 10% 0;
    color: #999;
}
/*index-category end*/


</style>
