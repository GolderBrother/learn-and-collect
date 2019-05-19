<template>
  <div class="footer">
  	<footer class="fixBottomBox">
        <ul>
            <router-link to="/home" class="tabItem">
            	  <i class="iconfont iconshouye1"></i>
                <label>首页</label>
            </router-link> 
            <router-link to="/catgory" class="tabItem">
                <i class="iconfont iconfenlei"></i>
                <label>分类</label>
            </router-link>
            <router-link to="/find" class="tabItem">
               <i class="iconfont iconfaxian"></i>
                <label>发现</label>
            </router-link>
            <router-link to="/cart" class="tabItem">
                <i class="iconfont icongouwuchekong"></i>
                <label>购物车</label>
            </router-link>
            <router-link to="/mine" class="tabItem">
                <i class="iconfont iconwode1"></i>
                <label>我的</label>
            </router-link>
        </ul>
    </footer>
  </div>
</template>

<script>
export default {
  data () {
    return {
     id:1000
    }
  }, 
  
}

</script>
<style scoped>
/* class属性以icon开头的 */
[class^='icon'] {
  background:none;
}
.tabItem i ,
.tabItem label {
  display:block;
}
.tabItem i {
  font-size:22px;
}

</style>
