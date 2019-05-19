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
    </div>
</template>

<script>
export default {
  data () {
    return {
        n:0,
        items:[require('../../assets/img/banner1.jpg'),
                require('../../assets/img/banner2.jpg'),
                require('../../assets/img/banner3.jpg'),
                require('../../assets/img/banner4.jpg'),
                require('../../assets/img/banner5.jpg')]
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
</style>
