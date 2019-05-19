window.onload = function(){
    new Vue({
        el:'#my',
        data:{
            listsL:[
                {name:'上海1',check:false},
                {name:'上海2',check:false},
                {name:'上海3',check:false},
                {name:'上海4',check:false},
                {name:'上海5',check:false},
                {name:'上海6',check:false},
                {name:'上海7',check:false},
                {name:'上海8',check:false},
                {name:'上海9',check:false}],
            listsR:[]
        },
        methods:{
            addR:function(){
                var l = this.fitlerData(this.listsL,true);
                //console.log(l)
                //this.listsR.push(l);
                this.listsR = [...this.listsR,...l];  //合并
                this.listsL = this.fitlerData(this.listsL,false);
            },
            fitlerData:function(data,type){
                return data.filter(function(v){
                    return v.check == type;
                });
            }
        }
    })
}