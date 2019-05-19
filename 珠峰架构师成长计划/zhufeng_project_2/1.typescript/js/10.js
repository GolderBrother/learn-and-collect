"use strict";
var myobj = {};
function attr(key, val) {
    if (arguments.length > 1) {
        myobj[key] = val;
    }
    else {
        return myobj[key];
    }
}
attr('name', 'zfpx');
console.log(attr('name'));
