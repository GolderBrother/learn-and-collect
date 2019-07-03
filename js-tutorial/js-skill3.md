# 【前端词典】3 个实用有趣的 JS 特性

## 4 个有趣的 JS 特性

### 利用 a 标签解析 URL

有的时候我们需要从一个 URL 中提取域名，查询关键字，变量参数值等，一般我们会自己去解析 URL 来获取这些内容。可是你或许不知道还有更简单的方法。

即创建一个 a 标签将需要解析的 URL 赋值给 a 的 href 属性，然后我们就能很方便的拿到这些内容。代码如下：

```
function parseURL(url) {
    var a =  document.createElement('a');
    a.href = url;
    return {
        host: a.hostname,
        port: a.port,
        query: a.search,
        params: (function(){
            var ret = {},
                seg = a.search.replace(/^\?/,'').split('&'),
                len = seg.length, i = 0, s;
            for (;i<len;i++) {
                if (!seg[i]) { continue; }
                s = seg[i].split('=');
                ret[s[0]] = s[1];
            }
            return ret;
        })(),
        hash: a.hash.replace('#','')
    };
}
parseURL('https://www.baidu.com/s?wd=js&rsv_spt=1&rsv_iqid=0xcc33063400003568&issp=1&f=8&rsv_bp=1&rsv_idx=2&ie=utf-8&tn=baiduhome_pg&rsv_enter=1&rsv_sug3=4&rsv_sug2=0&inputT=419&rsv_sug4=419')

// {host: "www.baidu.com", port: "", query: "?wd=js&rsv_spt=1&rsv_iqid=0xcc33063400003568&issp=…r=1&rsv_sug3=4&rsv_sug2=0&inputT=419&rsv_sug4=419", params: {…}, hash: ""}

```

### 标记语句（label）

有的时候我们会写双重 for 循环做一些数据处理，我们有的时候希望满足条件的时候就直接跳出循环。以免浪费不必要资源。

这个时候我们就可以用 label 和 continue/break 配合使用:

```
firstLoop: 
for (let i = 0; i < 3; i++) { 
   for (let j = 0; j < 3; j++) {
      if (i === j) {
         continue firstLoop; // 继续 firstLoop 循环
         // break firstLoop; // 中止 firstLoop 循环
      }
      console.log(`i = ${i}, j = ${j}`);
   }
}
// 输出
i = 1, j = 0
i = 2, j = 0
i = 2, j = 1
 
for (let i = 0; i < 3; i++) { 
   for (let j = 0; j < 3; j++) {
      if (i === j) {
         continue 
      }
      console.log(`i = ${i}, j = ${j}`);
   }
}
// 输出
i = 0, j = 1
i = 0, j = 2
i = 1, j = 0
i = 1, j = 2
i = 2, j = 0
i = 2, j = 1

```

相信你从上面两段代码的输出可以对标记语句有一个了解。


### IntersectionObserver 是什么？

> IntersectionObserver 可以用来监听元素是否进入了设备的可视区域之内，而不需要频繁的计算来做这个判断。

所以我们可以用这个特性来处理曝光埋点，而不是用 ** getBoundingClientRect().top ** 这种更加损耗性能的方式来处理。

当然你也可以用这个 API 来优化滚动吸顶,代码如下：

```
IntersectionObserverFun: function() {
    let self = this;
    let ele = self.$refs.pride_tab_fixed;
    if( !!IntersectionObserver ){
        let observer = new IntersectionObserver(function(){
            let offsetTop = ele.getBoundingClientRect().top;
            self.titleFixed = offsetTop < 0;
        }, {
            threshold: [1]
        });
        observer.observe(document.getElementsByClassName('title_box')[0]);
    } else {
        window.addEventListener('scroll', _.throttle(function(){
            let offsetTop = ele.getBoundingClientRect().top;
            self.titleFixed = offsetTop < 0;
        }, 50));
    }
}
```
