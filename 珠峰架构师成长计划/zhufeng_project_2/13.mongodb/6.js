class User{
    constructor(){
        let users = [];
        for(let i=1;i<=10;i++){
          users.push({id:i,age:i,name:`zfpx${i}`});
        }
        this.users = users;
        this.skipNum =0;
        this.limitNum = 3;
    }
    skip(skipNum){
        this.skipNum = skipNum;
        return this;
    }
    limit(limitNum){
        this.limitNum = limitNum;
        return this;
    }
    sort(sorter){//{age:1}
        this.sorter = sorter;
        let keys = Object.keys(sorter);//['age']
        this.sorterField = keys[0];//age
        this.sorterOrder = sorter[this.sorterField];//1 -1
        return this;
    }
    exec(callback){
        process.nextTick(()=>{
            let list =  this.users.sort((a,b)=>{
                return (a[this.sorterField] - b[this.sorterField])* this.sorterOrder;
            }).slice(this.skipNum,this.skipNum+this.limitNum);
            callback(null,list);
        });
        return this;
    }
}
let user = new User();
let pageNum = 2;
let pageSize = 3;
user.exec(function(err,docs){
    console.log(docs);
}).sort({age:1}).skip((pageNum-1)*pageSize).limit(pageSize)
