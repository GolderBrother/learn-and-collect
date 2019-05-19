<template>
    <div class="goods_detail">
        <header class="top_bar">
            <a @click="goBack" class="icon_back"></a>
            <!-- <a onclick="window.history.go(-1)" class="icon_back"></a> -->
            <h3 class="cartname">商品详情</h3>
            <a href="#" class="icon_menu"></a> 
        </header>
        <main class="detail_box">
            <section class="banner_box">
                <ul class="banner_child_box">
                    <li class="banner_item" v-for="(item,i) in images" :key="i" v-show="i==n">
                        <img :src="item.image_url" alt="" class="banner_pic">
                    </li>
                </ul>
                <div class="banner_count">
                        <em id="slide-nub" class="fz18">{{n+1}}</em>
                        <em class="nub-bg">/</em>
                        <em id="slide-sum" class="fz12">{{images.length}}</em>
                </div>
            </section>
            <section class="product_info clearfix">
                <div class="product_left">
                    <p class="p_name">{{detailData[0] ? detailData[0].product_name : ''}}</p>
                    <div class="product_pric">
                        <span>￥</span>
                        <span class="rel_price">{{detailData[0] ? detailData[0].product_price : ''}}</span>
                        <span>.00</span>
                    </div>
                    <div class="product_right">
                        降价通知
                    </div>
                </div>

            </section>
            <section class="product_intro">
                <p class="pro_det">
                    {{detailData[0] ? detailData[0].product_detail : ''}}
                </p>
           </section>
          
        </main>
        <footer class="cart_d_footer">
            <div class="m">
                <ul class="m_box">
                    <li class="m_item">
                        <a href="" class="m_item_link">
                            <em class="m_item_pic"></em>
                            <span class="m_item_name">卖家</span>
                        </a>
                        <a href="" class="m_item_link">
                            <em class="m_item_pic two"></em>
                            <span class="m_item_name">关注</span>
                        </a>
                        <a href="" class="m_item_link">
                            <em class="m_item_pic three"></em>
                            <span class="m_item_name">购物车</span>
                        </a>
                    </li>
                </ul>
                <div class="btn_box clearfix" >
                    <a href="#" class="buy_now">加入购物车</a>
                    <a href="#" class="buybuy">立即购买</a>
                </div>
            </div>
        </footer>
    </div>
</template>

<script>
export default {
  data () {
    return {
     name:'detail',
     n:0,
     images:[],
     detailData:[]
    }
  },
  //通过ID去请求展示
  mounted:function(){
    this.getDetail(this.$route.params.id);
  },
  methods:{
    getDetail:function(id){
       this.$http.get('/detail',{params:{mId:id}}).then(res=>{   //http://127.0.0.1:3333/detail?mId=6
        //alert(JSON.stringify(res));
        this.images = res.data[0];
        this.detailData = res.data[1];
      },(error)=>{
        console.log(error)
      })
    },
    goBack:function(){
      this.$router.push('/home');
     // window.history.go(-1);
    }
  }
  
}

</script>
<style scoped>
@import '../../assets/css/detail.css'
</style>
