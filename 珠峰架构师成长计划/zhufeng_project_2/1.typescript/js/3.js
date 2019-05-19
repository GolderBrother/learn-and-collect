"use strict";
//定义了一个枚举类型的值 性别 ，里面有两个选项 GIRL BOY
var Gender;
(function (Gender) {
    Gender["GIRL"] = "\u5973\u751F";
    Gender["BOY"] = "\u7537\u751F"; //男孩1
})(Gender || (Gender = {}));
console.log("\u674E\u96F7\u662F" + Gender.BOY + ",\u6885\u6885\u662F" + Gender.GIRL);
//去拼多多买货
var OrderStatus;
(function (OrderStatus) {
    OrderStatus["WaitForPay"] = "\u7B49\u5F85\u4ED8\u6B3E";
    OrderStatus["WaitForSend"] = "\u7B49\u5F85\u53D1\u8D27";
    OrderStatus["Sended"] = "\u5DF2\u53D1\u8D27";
    OrderStatus["Signed"] = "\u5DF2\u7B7E\u6536";
})(OrderStatus || (OrderStatus = {}));
