$(function(){
    let m = new Map();
    $(".container .submit").click(()=>{
        let _name = $(".name").val(),
            _msg = $(".message").val();
        if(_name =='' || _msg ==''){
            alert('请输入信息')
        }else {
            m.set(_name,_msg);
            $(".name,.message").val('');
            list();
        }
    });
    //列表
    var list = () =>{
        let str = '';
        for(let [key,value] of m){
            // str+='<li class="list-group-item">'+key+
            //                 '<span>说：</span>'+value+
            //             '</li>';
            str+=`<li class="list-group-item">${key}
                            <span>说：</span>${value}
                        </li>`;
        };
        $(".messageList").html(str);
    }
})