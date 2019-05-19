<template>
    <div>
        <h2>testA</h2>
        <!-- <h3>{{msg}}</h3>
         <ul>
            <li v-for="(v,i) in arr" :key="i">{{v}}</li>
        </ul>  -->
    </div>
</template>

<script>
// export default {
//   data () {
//     return {
//       msg: 'Welcome to Your Vue.js App',
//       arr: [1,2,3,4,5]
//     }
//   }
// }
var name = "xyz  123";
var age = 18;
var hobby = 'aaaa';
function fun(a,b) {
    return a+b
};
 //export {name,age,hobby,fun};
//as 别名
// export {
//     name as v1,
//     age as v2};
//export 和 export default 是一个对象
export default {
    name:'abc',
    age:18
}
 
</script>
<style>
    h2 {
        color:red;
    }
</style>
