const nodemailer = require('nodemailer');
let transporter = nodemailer.createTransport({
    service:'QQ',//指定邮件服务器
    port:465,//SMTP端口发邮件的端口号
    secureConnection:true,//使用SSL 加密传输服务
    auth:{//权限认证
       user:'83687401@qq.com',
       //注意，这个可不是你的QQ密码，而是一个叫做授权码的东西
       pass:'chjamfzdrxvgbhcb'//这是我的授权码
    }
});
let mailOptions = {
    from:'"张仁阳" <83687401@qq.com>',//发件地址
    to:'83687401@qq.com',//收件地址
    subject:'hello',//邮件的标题
    html:'<h1>world</h1>',//这是内容
}
transporter.sendMail(mailOptions,(err,info)=>{
  if(err){
      console.error(err);
  }
  console.log('邮件已经发送',info);
});