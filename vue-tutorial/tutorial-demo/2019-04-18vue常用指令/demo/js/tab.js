window.onload = function(){
    new Vue({
        el:'#my',  //挂载元素
        data:{   //数据
            n:3,
            title:['a','b','c','d'],
            content:['a111','b111','c1111','d1111'],
            lists:[{title:'a1',content:'a111'},
                    {title:'a2',content:'a222'},
                    {title:'a3',content:'a3333'},
                    {title:'a4',content:'a4444'},
                    {title:'a5',content:'a55555'}],
            tabList:[]
        },
        methods:{  //方法
            action:function(num){
                this.n = num;
            },
            getList:function(){
               // var self = this;    局部定义
               //全局定义
               //箭头函数
                axios({
                    method:'get',   //请求方式
                    url:'http://localhost:3333/get_tablist'
                }).then((res)=>{
                    console.log(res);
                    if(res.data.code=='200'){
                        if(res.data.result && res.data.result.length>0){
                            this.tabList = res.data.result;
                        }
                    }
                }).catch(function(error){
                    console.log(error)
                })
            }
        },
        //生命周期   当前实例 从创建到销毁过程
        mounted:function(){    //挂载完成    
            this.getList();
        }
    })
}
