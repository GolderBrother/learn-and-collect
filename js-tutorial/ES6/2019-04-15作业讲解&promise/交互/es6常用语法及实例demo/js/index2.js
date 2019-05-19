//箭头函数没有自己的this，指向的是定义时的，而不是执行时的this;
let obj ={
    m:new Map(),
    init:function(){
        this.bind();
    },
    bind:function(){
        $(".container .submit").click(()=>{
            let _name = $(".name").val(),
                _msg = $(".message").val();
            if(_name =='' || _msg ==''){
                alert('请输入信息')
            }else {
                this.m.set(_name,_msg);
                $(".name,.message").val('');
                this.list();
            }
        });
    },
    list:function(){
        let str = '';
        for(let [key,value] of this.m){
            str+=`<li class="list-group-item">${key}<span>说：</span>${value}</li>`;
        };
        $(".messageList").html(str);
    }
}
$(function(){
   obj.init();
})
