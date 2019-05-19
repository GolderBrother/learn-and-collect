<template>
    <div>
        <h1>tab tab tab</h1>
        <ul class="tab-tit">
			<li v-for="(v,index) in lists" :class="n==index?'active':''"  :key="index"
				v-on:click="action(index)">
				{{v.title}}
			</li>   
		</ul>
		<div class="tab-con">
			<div v-for="(v,index) in lists" v-show="n==index" :key="index">
				{{v.content}}
			</div>
		</div>

        <router-link to="/tab/info" >详情</router-link>
        <!-- <router-link :to="'/tab/list/'+name+'/'+id" >列表</router-link> -->
        <router-link to="/tab/list?name=just&id=123" >列表</router-link>
        <router-view></router-view>
    </div>
</template>

<script>
export default {
  data () {
    return {
      name:'abc',
      id:20,
      n:1,
      lists:[{title:'a1',content:'a111'},
                    {title:'a2',content:'a222'},
                    {title:'a3',content:'a3333'},
                    {title:'a4',content:'a4444'},
                    {title:'a5',content:'a55555'}], 
    }
  }, 
  methods:{  //方法
    action:function(num){
        this.n = num;
    },
  }
}

</script>
<style scoped>
    ul,li {
    	padding:0;
    	margin:0;
    }
    .tab-tit li{
        padding: 10px 15px;
	    text-align: center;
	    list-style:none;
	    cursor:pointer;
		display: inline-block;
    }
    .tab-tit .active{
        color: #09f;
    	border-bottom: 1px solid #09f;
    }
    .tab-con div{
        margin:30px;
    }
    h1 {
        color: red;
    }
</style>
