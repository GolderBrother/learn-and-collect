<template>
  <div id="app">
    <img src="./assets/logo.png">
    <img :src="img">
    <img :src="img2">
    <h1>123456</h1>
    <!-- <testA /> -->
    <!-- <h1>{{fun(2,4)}}</h1> -->
    <!-- <h1>{{name.name}}</h1>  -->
    <tab />
    <img v-for="(item,i) in items" :key="i"  :src="item"/>
  </div>
</template>

<script>
//import testA from './components/testA' 
//import {name,age,hobby,fun} from './components/testA' 
//import {v1,v2} from './components/testA' 
//import {name as v1} from './components/testA' 
//export default 是一个对象
//import obj from './components/testA' 
import tab from './components/tab' 
//vue动态生成路径时无法被url-loader解析到，需要通过导入的方式
import logo from  './assets/logo.png'

export default {
  name: 'App',
  data () {
    return {
      //name:v1,
      //fun:fun
      //name:obj
      img:logo,
      img2:'../static/logo.png',
      items:[require('./assets/img/banner1.jpg'),
                    require('./assets/img/banner2.jpg'),
                    require('./assets/img/banner3.jpg'),
                    require('./assets/img/banner4.jpg'),
                    require('./assets/img/banner5.jpg'),]
    }
  },
  methods:{},
  components:{
    //testA
    tab
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
</style>
