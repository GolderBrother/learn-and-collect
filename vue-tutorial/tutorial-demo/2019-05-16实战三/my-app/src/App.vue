<template>
  <div id="app">
    <router-view></router-view>
    <NavBottom />
  </div>
</template>

<script>
import NavBottom from './components/NavBottom' 

export default {
  name: 'App',
  data () {
    return {
     
    }
  },
  methods:{},
  components:{
    NavBottom
  }
}
</script>
<style>
.active {
  color:red;
}
</style>
