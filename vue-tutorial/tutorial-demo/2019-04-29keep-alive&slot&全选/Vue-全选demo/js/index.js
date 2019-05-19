window.onload = function(){
    new Vue({
        el:'#my',
        data:{ 
          all:{check:false,name:'全选'},
          lists:[{check:false,name:'北京1'},
                {check:false,name:'北京2'},
                {check:true,name:'北京3'},
                {check:false,name:'北京4'},
                {check:false,name:'北京5'},
                {check:false,name:'北京6'},
                {check:false,name:'北京7'},
                {check:false,name:'北京8'}]
        },
        components:{  // 局部组件
          'my-check':{  //组件的名称
            template:'#my-check',
            props:['all','lists'],
            methods:{
                checkAllChange:function(){
                    this.lists.forEach(item=>{
                        item.check = this.all.check;
                    });
                },
                curChange:function(){
                    //获取选中的状态  filter()
                    // var select = this.lists.filter(item=>{
                    //     return item.check;
                    // });
                    // console.log(select.length);
                    // if(select.length == this.lists.length){
                    //     this.all.check = true;
                    // }else {
                    //     this.all.check = false;
                    // }
                    //select.length == this.lists.length ?this.all.check = true:this.all.check = false;
                    this.all.check = this.lists.every(function(item){
                        return item.check
                    });
                }
            }
          }
        }
    })
}

// var arr =[3,26,6,22];
// var a = arr.some(function(item){
//     return item >3
// });
// console.log(a)