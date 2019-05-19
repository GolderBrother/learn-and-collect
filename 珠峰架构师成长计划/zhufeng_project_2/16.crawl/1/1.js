/**
 * 如果说这个网站提供了API接口，那么好就可以直接 读取接口内容 得到数据
 * 
 */
let axios = require('axios');
let url = 'https://follow-api-ms.juejin.im/v1/getUserFollowInfo?uid=55a4cb1fe4b039f185f88d9c&src=web';
(async function(){
  let result = await axios.get(url);
  console.log(result.data);
})();