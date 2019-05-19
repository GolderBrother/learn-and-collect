let name = '前端';
let url1 = `https://juejin.im/tag/${name}`;
let url2 = `https://juejin.im/tag/${encodeURIComponent(name)}`;
console.log(url1,url2);