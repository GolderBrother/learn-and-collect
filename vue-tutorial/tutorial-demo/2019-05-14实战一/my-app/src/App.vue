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
  color:red;
}
</style>
