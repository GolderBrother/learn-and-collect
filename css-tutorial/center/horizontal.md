## 一、水平居中

### 1.1 行内元素

```css
.parent {
  text-align: center;
}
```

### 1.2 块级元素

#### 1.2.1 块级元素一般居中方法

```css
.son {
  margin: 0 auto;
}
```

#### 1.2.2 子元素含 float

```css
.parent {
  width: fit-content;
  margin: 0 auto;
}

.son {
  float: left;
}
```

#### 1.2.3 Flex 弹性盒子

##### flex 2012 版

```css
.parent {
  display: flex;
  justify-content: center;
}
```

##### flex 2009 版

```css
.parent {
  display: box;
  box-orient: horizontal;
  box-pack: center;
}
```

#### 1.2.4 绝对定位

##### transform

```css
.son {
  position: absolute;
  left: 50%;
  transform: translate(-50%, 0);
}
```

##### left: 50%

```css
.son {
  position: absolute;
  width: 宽度;
  left: 50%;
  margin-left: -0.5 * 宽度;
}
```

##### left/right: 0

```css
.son {
  position: absolute;
  width: 宽度;
  left: 0;
  right: 0;
  margin: 0 auto;
}
```

##### 五马分尸式

```css
.parent {
  position: relative;
  height: 100px;
}
.son {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  margin: auto;
  bottom: 0;
  width: 100px;
}
```
    position: absolute;
    left: 50%;
    transform: translate(-50%, 0);
}
```

2）left: 50%

```
.son {
    position: absolute;
    width: 宽度;
    left: 50%;
    margin-left: -0.5*宽度
}
```

3）left/right: 0

```
.son {
    position: absolute;
    width: 宽度;
    left: 0;
    right: 0;
    margin: 0 auto;
}
```

4） 五马分尸式

```
.parent {
    position: relative;
    height: 100px;
}
.son {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    margin: auto;
    bottom: 0;
    width: 宽度;
}
```

## 小结

以上是 CSS 水平居中的 8 种方法
