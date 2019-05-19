//定义了一个枚举类型的值 性别 ，里面有两个选项 GIRL BOY
enum Gender{
    GIRL='女生',//女孩0
    BOY='男生'//男孩1
}
console.log(`李雷是${Gender.BOY},梅梅是${Gender.GIRL}`);
//去拼多多买货
enum OrderStatus{
    WaitForPay='等待付款',
    WaitForSend='等待发货',
    Sended="已发货",
    Signed='已签收'
}

