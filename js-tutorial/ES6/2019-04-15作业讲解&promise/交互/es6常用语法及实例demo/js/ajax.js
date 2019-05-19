//箭头函数没有自己的this，指向的是定义时的，而不是执行时的this;
let obj ={
   // m:new Map(),
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
                //this.m.set(_name,_msg);
                this.add(_name,_msg);
                $(".name,.message").val('');
            }
        });
    },
    add:function(name,msg){ 
        //var self = this;
        $.ajax({
            type:'post',
            url:'http://localhost:3000/add',
            async:true, //异步
            data:{name:name,message:msg},  //返回给后端
            dataType:'json',
            success:(res)=>{    //后端返回的值
                if(res.code =='200'){
                    this.getData();
                }
            },
            error:function(error){

            }
        })
       
    },
    getData:function(){
        $.ajax({
            type:'get',
            url:'http://localhost:3000/get',
            async:true, //异步
            dataType:'json',
            success:function(res){    //后端返回的值
                if(res.code =='200'){
                    let str = '';
                    for(let item of res.result){
                        str+=`<li class="list-group-item">${item.name}<span>说：</span>${item.message}</li>`;
                    };
                    $(".messageList").html(str);
                }
            },
            error:function(error){

            }
        })
    }
}
$(function(){
   obj.init();
})

