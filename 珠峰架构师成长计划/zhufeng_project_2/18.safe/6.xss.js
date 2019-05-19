var xss = require("xss");
var html = xss('<script>alert("xss");</script>');
console.log(html);