<template>
    <div>
       <!-- 轮播组件 -->
       <Banner />
       <!-- 搜索区 -->
       <Search />
       <!-- 导航 -->
       <Nav />
        <!-- 展示 -->
       <List />
    </div>
</template>

<script>
import Banner from './Banner'
import Search from './Search'
import Nav from './Nav'
import List from './List'
export default {
  data () {
    return {
     name:'home'
    }
  }, 
  components:{
    Banner,
    Search,
    Nav,
    List
  }
}

</script>
<style scoped>

</style>
