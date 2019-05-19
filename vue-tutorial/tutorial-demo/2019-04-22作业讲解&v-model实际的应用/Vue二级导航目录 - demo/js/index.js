window.onload = function(){
    new Vue({
        el:'#my',
        data:{
            lists:[
                {name:'流行女装A',
                subLists:[
                    {name:'流行女装a1'},
                    {name:'流行女装a2'},
                    {name:'流行女装a3'}
                ]},
                {name:'流行女装B',
                subLists:[
                    {name:'流行女装b1'},
                    {name:'流行女装b2'},
                    {name:'流行女装b3'}
                ]},
                {name:'流行女装C',
                subLists:[
                    {name:'流行女装c1'},
                    {name:'流行女装c2'},
                    {name:'流行女装c3'}
                ]}
            ],
            n:0
        },
        methods:{
            cur:function(i){
                this.n = i
            }
        }
    })
}