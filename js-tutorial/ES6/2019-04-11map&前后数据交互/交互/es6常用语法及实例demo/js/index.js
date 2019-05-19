//箭头函数没有自己的this，指向的是定义时的，而不是执行时的this;
// function fun(name){
//     return document.querySelector(name)
// }
// fun('.submit');
let obj ={
    m:new Map(),
    init:function(){
        this.bind();
    },
    $:function(name){
        return document.querySelector(name);
    },
    bind:function(){
        this.$('.submit').onclick = ()=>{
            let _name = this.$(".name").value,
                _msg = this.$(".message").value;
            if(_name =='' || _msg ==''){
                alert('请输入信息')
            }else {
                this.m.set(_name,_msg);
                this.$(".name").value='';
                this.$(".message").value='';
                this.list();
            }
        }
    },
    list:function(){
        let str = '';
        for(let [key,value] of this.m){
            str+=`<li class="list-group-item">${key}<span>说：</span>${value}</li>`;
        };
         this.$(".messageList").innerHTML = str;
    }
}
window.onload = function(){
   obj.init();
}
