//访问地址 http://localhost:3000/ajax_then.html
const getJSON = function(url,type, data) {
  const promise = new Promise(function(resolve, reject){
    const handler = function() {
      if (this.readyState !== 4) {
        return;
      };
      if (this.status === 200) {
        resolve(this.response);
      } else {
        reject(new Error(this.statusText));
      }
    };
    const client = new XMLHttpRequest();
    client.open(type, url);
    client.onreadystatechange = handler;
    client.responseType = "json";
    if(type =='get'){
    	client.send();
    }else {
    	client.setRequestHeader("Content-Type", "application/json");
    	client.send(JSON.stringify(data));
    }
  });
  return promise;
}; 

$(function() {
	//添加留言
	$(".submit").click(() => {
		submit(true);
	});
	//修改留言
	$(".update").click(()=>{
		submit(false);
	});
	//删除留言
	$(".deleteAll").click(() => {
		getJSON("/map/delAll",'delete')
		.then(function(json) {
		  $(".messageList").html('全部数据已经清除');
		}, function(error) {
		  console.error('出错了', error);
		});
		 
	});
	//查看留言
	$(".viewMes").click(()=> listShow());
	//提交
	let submit = (isAdd) =>{
		let _name = $(".name").val(),
			_message = $(".message").val();
		if(_name =='' || _message =='') {
			alert('请输入信息！');
			return false;
		}
		$(".name,.message").val("");
		isAdd ? add(_name, _message) : upd(_name, _message);
	};
	//添加数据
	let  add = (name, message) => {
		getJSON("/map/add",'post', {name: name, message: message})
		.then(function(json) {
			if(json.code == '200'){
				listShow();
			}
		}, function(error) {
		  console.error('出错了', error);
		});
	};
	//删除数据
	let del = (name) =>{
		getJSON("/map/del",'delete', {name:name})
		.then(function(json) {
		  listShow();
		}, function(error) {
		  console.error('出错了', error);
		}); 
	};
	//编辑数据
	let upd = (name, message) =>{
		getJSON("/map/upd",'put', {name: name, message: message})
		.then(function(json) {
		    $("#inputEmail3").attr('disabled',false);
			listShow();
		}, function(error) {
		  console.error('出错了', error);
		});
	};
	//绑定未来元素
	$(".messageList").on('click', '.del', (e)=>{
		del($(e.target).attr('name'));
	});
	$(".messageList").on('click', '.upd', (e) =>{
		let value = $(e.target).val();
		$("#inputEmail3").attr('disabled',true);
		$(".name").val(value.split(',')[0]);
		$(".message").val(value.split(',')[1]);
	});
	
})