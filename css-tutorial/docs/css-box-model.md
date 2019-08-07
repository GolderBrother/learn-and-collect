## 复习 CSS盒模型
## 一、概念

CSS盒模型本质上是一个盒子，封装周围的HTML元素，它包括：
```
外边距（margin）、边框（border）、内边距（padding）、实际内容（content）
```
四个属性。
CSS盒模型：
**标准模型 + IE模型**

### 1.1 W3C盒子模型(标准盒模型)
![image](https://mmbiz.qpic.cn/mmbiz_jpg/vO7l6lQ0BwocwYYlAg6nOCD4TWAU7MGENELT45N8Zibz03BNMVGvUqibpRa6GkcKoibqNtiaZM7oME49q3RGaaKE4g/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)
标准盒模型

1.2 IE盒子模型(怪异盒模型)
![image](https://mmbiz.qpic.cn/mmbiz_jpg/vO7l6lQ0BwocwYYlAg6nOCD4TWAU7MGEicV5Yl7cobUozODNKLiceWPwX7edNibUCzBgxE2wFI5CLEUt5vpAnRzog/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)
IE盒子模型

## 二、知识点
### 2.1 标准模型和IE模型的区别
计算宽度和高度的不同。
标准盒模型：**盒子总宽度/高度 = width/height + padding + border + margin**。（ 即 width/height 只是内容高度，不包含 padding 和 border 值 ）
IE盒子模型：盒子总宽度/高度 = **width/height + margin = (内容区宽度/高度 + padding + border) + margin**。（ 即 width/height 包含了 padding 和 border 值 ）

### 2.2 CSS如何设置这两种模型
标准：**box-sizing: content-box**; ( 浏览器默认设置 )
IE： **box-sizing: border-box**;

### 2.3 JS如何获取盒模型对应的宽和高
1. dom.style.width/height 只能取到行内样式的宽和高，style 标签中和 link 外链的样式取不到。
2. dom.currentStyle.width/height （只有IE兼容）取到的是最终渲染后的宽和高
3. window.getComputedStyle(dom).width/height 同（2）但是多浏览器支持，IE9 以上支持。
4. dom.getBoundingClientRect().width/height 也是得到渲染后的宽和高，大多浏览器支持。IE9 以上支持，除此外还可以取到相对于视窗的上下左右的距离。
5. dom.offsetWidth/offsetHeight 包括高度（宽度）、内边距和边框，不包括外边距。最常用，兼容性最好。

### 2.4 实例题（根据盒模型解释边距重叠）
例：父元素里面嵌套了一个子元素，已知子元素的高度是 100px，子元素与父元素的上边距是 10px，计算父元素的实际高度。
模型

```
CSS:
.parents {
   width: 100px;
   background: #FF9934;
}
.child {
  width: 100%;
  height: 100px;
  background: #336667;
  margin-top: 10px;
}
```

```
Html:

<section class='parents'>
  <div class='child'><div>
</section>
```

它的父元素实际高度是 100px 或 110px 都可以。主要看怎么父元素的盒模型如何设置。如以上代码：父元素不加 overflow: hidden，则父元素的实际高度为 100px；如加上 overflow: hidden 父元素高度为 110px，给父元素创建了 BFC，块级格式化上下文。 完整案例: https://jsbin.com/dubimoyahe/...。

### 2.5 BFC（边距重叠解决方案）
#### 2.5.1 BFC基本概念
BFC: 块级格式化上下文
BFC基本概念：BFC 是 CSS 布局的一个概念，是一块独立的渲染区域，是一个环境，里面的元素不会影响到外部的元素 。
父子元素和兄弟元素边距重叠，重叠原则取最大值。空元素的边距重叠是取 margin 与 padding 的最大值。

#### 2.5.2 BFC原理（渲染规则|布局规则）：
1. 内部的 Box 会在垂直方向，从顶部开始一个接着一个地放置；
2. Box 垂直方向的距离由 margin (外边距)决定，属于同一个 BFC 的两个相邻 Box 的 margin 会发生重叠；
3. 每个元素的 margin Box 的左边， 与包含块 border Box 的左边相接触，（对于从左到右的格式化，否则相反）。即使存在浮动也是如此；
4. BFC 在页面上是一个隔离的独立容器，外面的元素不会影响里面的元素，反之亦然。文字环绕效果，设置 float；
5. BFC 的区域不会与 float Box 重叠（清浮动）;
6. 计算 BFC 的高度时，浮动元素也参与计算。

#### 2.5.3 CSS在什么情况下会创建出BFC（即脱离文档流）
1. 根元素，即 HTML 元素（最大的一个 BFC）
2. 浮动（ float 的值不为 none ）
3. 绝对定位元素（ position 的值为 absolute 或 fixed ）
4. 行内块（ display 为 inline-block ）
5. 表格单元（ display 为 table、table-cell、table-caption、inline-block 等 HTML 表格相关的属性 )
6. 弹性盒（ display 为 flex 或 inline-flex ）
7. 默认值。内容不会被修剪，会呈现在元素框之外（overflow 不为 visible）

#### 2.5.4 BFC作用（使用场景）
1. 自适应两（三）栏布局（避免多列布局由于宽度计算四舍五入而自动换行）
2. 避免元素被浮动元素覆盖
3. 可以让父元素的高度包含子浮动元素，清除内部浮动（原理：触发父 div 的 BFC 属性，使下面的子 div 都处在父 div的同一个 BFC 区域之内）
4. 去除边距重叠现象，分属于不同的 BFC 时，可以阻止 margin 重叠

### 2.6 IFC
#### 2.6.1 IFC基本概念
IFC: 行内格式化上下文
IFC基本概念：

![image](https://mmbiz.qpic.cn/mmbiz_jpg/vO7l6lQ0BwocwYYlAg6nOCD4TWAU7MGEsguxa85b0rgiakCgHQficITq0he5EswI0KL0yz8ZhMhIbZs682YsibYBg/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)
IFC

#### 2.6.2 IFC原理（渲染规则|布局规则）：
1. 内部的 **Box** 会在水平方向，从含块的顶部开始一个接着一个地放置；
2. 这些 **Box** 之间的水平方向的 **margin，border 和padding** 都有效；
3. **Box** 垂直对齐方式：以它们的底部、顶部对齐，或以它们里面的文本的基线（**baseline**）对齐（默认，文本与图片对其），例：**line-heigth** 与 **vertical-align**。
