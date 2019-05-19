<template>
    <div class="home-list">
       {{name}} 
       <ul>
         <li v-for="(v,i) in lists" :key="i">
           {{v.product_name}}
           <img :src="v.product_img_url" >
           </li>
       </ul>
    </div>
</template>

<script>
export default {
  data () {
    return {
     name:'list',
     lists:[]
    }
  }, 
  methods:{
    getList:function(){
      this.$http.get('/home').then(res=>{
        alert(JSON.stringify(res));
        this.lists = res.data;
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
