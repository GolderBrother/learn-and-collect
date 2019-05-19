<template>
    <div>
        <h2>列表</h2>
        <!-- <h2>{{$route.params.id}}</h2>
        <h2>{{$route.params.name}}</h2> -->
        <h1>{{$route.query.name}}</h1>
        <h1>{{$route.query.id}}</h1>
    </div>
</template>

<script>
export default {
    //获取路由的参数
    //params   /router/:id      $route.params.id
    //query    /router?id=123  
  data () {
    return {
    }
  }
}

</script>
<style>
    h2 {
        color:red;
    }
</style>
