window.onload = function(){
    new Vue({
        el:'#my',
        data:{
            lists:[
                {name:'张学友1',qq:'23456324',id:1,state:false},
                {name:'张学友2',qq:'25155345',id:2,state:false},
                {name:'张学友3',qq:'5435525',id:3,state:false},
                {name:'张学友4',qq:'5253266',id:4,state:false},
                {name:'张学友5',qq:'52436546',id:5,state:false},
                {name:'张学友6',qq:'5436745745',id:6,state:false},
                {name:'张学友7',qq:'246154',id:7,state:false},
                {name:'张学友8',qq:'146464',id:8,state:false},
                {name:'张学友9',qq:'4536754',id:9,state:false},
                {name:'张学友10',qq:'875464',id:10,state:false},
                {name:'张学友11',qq:'353543',id:11,state:false}
            ],
            selectorList:[],
            flag:'show'
        },
        methods:{
            addList:function(list){
                list.state = true;   //当前单击的状态
                //ID重复
                // for(var i=0;i<this.selectorList.length;i++){
                //     if(list.id == this.selectorList[i].id)  return;
                // };
                //filter
                // var idRepeat = this.selectorList.filter(function(v){
                //     return v.id == list.id
                // });
                // if(idRepeat.length >0) return;
                //ES6
                this.selectorList.push(list);
                this.selectorList = [...new Set(this.selectorList)];  
            },
            delList:function(list,index){
                this.selectorList.splice(index,1);    //index 位置   1个数
                this.lists.forEach((v,i)=>{
                    if(v.id == list.id) {
                        v.state = false;
                    }
                })
            }
        }
    })
}