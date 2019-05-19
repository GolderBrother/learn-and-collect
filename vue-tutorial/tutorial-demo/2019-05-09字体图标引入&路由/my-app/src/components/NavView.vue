<template>
    <div>
        <router-link to="/banner">轮播</router-link>
        <router-link to="/tab">TAB切换</router-link>
        <!-- <router-link to="/test/10">test</router-link> -->
        <router-link :to="'/test/'+id">test</router-link>
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

</style>
