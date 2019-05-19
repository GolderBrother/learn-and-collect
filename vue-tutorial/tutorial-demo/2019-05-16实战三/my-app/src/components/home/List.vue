<template>
	<div class="home_m">
		 <main class="m_product">
                <section class="product_box">
                    <div class="product_top">
                        <a href="#" class="product_left">
                            <img src="../../assets/images/jd_skill.png" alt="" class="miaosha_icon">
                            <strong class="dianshu">六点场</strong>
                            <span class="time">00:21:43</span>
                        </a>
                    </div>
                    <div class="product_content">
                        <ul>
                            <li class="product_skill_item" v-for="(list,i) in lists" :key="i">
                                <router-link  :to="'/detail/'+list.product_id" class="product_skill_item_link">
                                    <img  v-lazy="list.product_img_url" class="product_skill_item_cion lazy-img-fadein">
                                    <p class="nowprice">
                                        <i style="text-decoration: none;font-style: normal;font-size: 12px">¥</i>
                                        <span class="now_price">{{list.product_uprice}}</span>
                                    </p>
                                    <p class="oldprice">
                                        <i style="text-decoration: none;font-style: normal;font-size: 12px">¥</i>
                                        <del class="old_price">{{list.product_price}}</del>
                                    </p>
                                </router-link>
                            </li>
                        </ul>
                    </div>
                </section>
                <div class="left_share_quality_content clearfix">
                    <div class="share_quality">
                        <div class="share_quality_top">
                            <div class="share_title">
                                <p class="share_text">为你推荐</p>
                            </div>
                        </div>
                        <div class="share_quality_left not_eng_box">
                            <ul>
                                <li class="not_eng_item" v-for="(v,i) in mainDatas" :key="i">
                                    <router-link :to="'/detail/'+v.product_id" class="not_eng_link" >
                                        <img  v-lazy="v.product_img_url" alt="" class="not_eng_pic lazy-img-fadein">
                                        <div class="not_eng_info">
                                            <p class="not_eng_title">{{v.product_name}}</p>
                                            <p class="not_eng_text">
                                                <i style="text-decoration: none;font-style: normal;font-size: 12px">¥</i>
                                                <span class="more_info_price_txt">{{v.product_price}}</span>
                                            </p>
                                        </div>
                                    </router-link>
                                </li>
                        
                            </ul>
                        </div>
                    </div>
                </div>
            </main>
	</div>
</template>

<script>
export default {
  data () {
    return {
     name:'list',
     lists:[],
     mainDatas:[]
    }
  }, 
  methods:{
    getList:function(){
      this.$http.get('/home').then(res=>{
        //if(res.code =='200'){}
        this.lists = res.data.slice(0,4);
        this.mainDatas = res.data;
      },(error)=>{
        console.log(error)
      })
    }
  },
  mounted:function(){
    this.getList();
  }
  
}

</script>
<style scoped>
.home-list img {
  width:40%;
}
</style>
