## 二、垂直居中

### 2.1 行内元素

```css
.parent {
  height: 高度;
}

.son {
  line-height: 高度;
}
```

> 注：① 子元素 line-height 值为父元素 height 值。② 单行文本。

### 2.2 块级元素

#### 2.2.1 行内块级元素

```css
.parent::after,
.son {
  display: inline-block;
  vertical-align: middle;
}
.parent::after {
  content: '';
  height: 100%;
}
```

适应 IE7。

#### 2.2.2 `table`

```css
.parent {
  display: table;
}
.son {
  display: table-cell;
  vertical-align: middle;
}
```

优点

- 元素高度可以动态改变, 不需再 CSS 中定义, 如果父元素没有足够空间时, 该元素内容也不会被截断。

缺点

- IE6~7, 甚至 IE8 beta 中无效。

#### 2.2.3 `Flex` 弹性盒子

##### `flex` 2012 版

```css
.parent {
  display: flex;
  height: 100px;
  align-items: center;
}
```

优点

- 内容块的宽高任意, 优雅的溢出。
- 可用于更复杂高级的布局技术中。

缺点

- IE8/IE9 不支持。
- 需要浏览器厂商前缀。
- 渲染上可能会有一些问题。

##### `flex` 2009 版

```css
.parent {
  display: box;
  box-orien: vertical;
  box-pack: center;
}
```

优点

- 实现简单, 扩展性强。

缺点

- 兼容性差, 不支持 IE。

#### 2.2.4 绝对定位

##### `transform`

```css
.parent {
  position: relative;
  height: 200px;
}
.son {
  position: absolute;
  top: 50%;
  transform: translate(0, -50%);
}
```

##### 水平垂直居中

```css
.son {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate3d(-50%, -50%, 0);
}
```

代码优点

- 代码少。

缺点

- IE8 不支持, 属性需要追加浏览器厂商前缀, 可能干扰其他 transform 效果, 某些情形下会出现文本或元素边界渲染模糊的现象。

##### `top: 50%`

```css
.parent {
  position: relative;
  height: 200px;
}
.son {
  position: absolute;
  top: 50%;
  height: 高度;
  margin-top: -0.5高度;
}
/* 水平垂直居中 */
.son {
  position: absolute;
  top: 50%;
  left: 50%;
  height: 高度;
  margin-top: -0.5 * 高度;
  margin-left: -0.5 * 高度;
}
```

优点

- 适用于所有浏览器。

缺点

- 父元素空间不够时, 子元素可能不可见(当浏览器窗口缩小时,滚动条不出现时).如果子元素设置了 overflow:auto, 则高度不够时, 会出现滚动条。

##### `top/bottom: 0;`

```css
.parent {
  position: relative;
  height: 200px;
}
.son {
  position: absolute;
  top: 0;
  bottom: 0;
  margin: auto 0;
}

/* 水平垂直居中 */
.son {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 宽度;
  margin: auto;
}
```

优点

- 简单。

缺点

- 没有足够空间时, 子元素会被截断, 但不会有滚动条。

## 小结

以上是 `CSS` 垂直居中的 8 种方法及其优缺点。
