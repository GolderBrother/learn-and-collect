window.onload = function(){
    new Vue({
        el:'#my',
        data:{ 
            lists:[{name:'手机',state:'0'},
                {name:'电脑',state:'1'},
                {name:'化妆品',state:'2'},
                {name:'包',state:'0'}]
        },
        methods:{   //方法
            add:function(name){
                if (name =='') return;
                this.lists.unshift({name:name,state:'未采购'});  
                this.name="";
            },
            del:function(index){
                this.lists.splice(index,1);  
            }
        },
        filters:{   //过滤器
            stateFilter:function(type){    //过滤器的名称  type 过滤的内容
                // if(type=='0'){
                //     return '未采购'
                // }else {
                //     return '已采购'
                // }
                switch(type) {
                    case '0':
                        return '未采购';
                    case '1':
                        return '采购中';
                    case '2':
                        return '已采购';
                    default:
                        return '未采购';
                }
            }
        }
    })
}