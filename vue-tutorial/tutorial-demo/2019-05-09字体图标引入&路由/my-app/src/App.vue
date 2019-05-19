<template>
  <div id="app">
    <NavView />
    <router-view></router-view>
  </div>
</template>

<script>
import NavView from './components/NavView' 

export default {
  name: 'App',
  data () {
    return {
     
    }
  },
  methods:{},
  components:{
    //testA
    NavView
  }
}
</script>
<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
h1 {
  color:blue;
}
.active {
  color:blue;
}
</style>
