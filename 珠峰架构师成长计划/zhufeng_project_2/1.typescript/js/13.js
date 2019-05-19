"use strict";
function getUserInfo(user) {
    console.log(user.name + " " + user.age + " " + user.home);
}
function getVipInfo(user) {
    console.log(user.name + " " + user.age);
}
getUserInfo({ name: 'zfpx', age: 10, home: 'beijing' });
getVipInfo({ name: 'zfpx', age: 10 });
