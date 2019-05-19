<template>
    <div>
        <h2>test</h2>
        <h2>{{$route.params.id}}</h2>
    </div>
</template>

<script>
export default {
    //获取路由的参数
    //params   /router/:id      $route.params.id
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
