## 一、类组件的情况下

- 1、定义父组件(直接使用```ref```)

```js
export default class UserRef1 extends Component {
  constructor(props) {
    super(props);
    this.child = React.createRef();
  }
  focus = () => {
    console.log(this.child.current.inputRef.current.value);
    this.child.current.inputRef.current.focus();
  }
  render() {
    return (
      <div>
        <Child ref={this.child} />
        <button onClick={this.focus}>获取焦点</button>
      </div>
    )
  }
}
```
- 2、子组件中

```
class Child extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '哈哈'
    }
    this.inputRef = React.createRef();
  }
  render() {
    return (
      <input type="text" value={this.state.name} onChange={(e) => this.setState(e.target.value)} ref={this.inputRef} />
    )
  }
}
```

## 二、函数组件
> 在函数组件中要获取子组件的数据,需要两步骤1.将ref传递到子组件中,2.需要使用forwardRef对子组件进行包装再暴露出去

- 1、父组件

```js
export default () => {
  const parentRef = useRef();
  function focusHander() {
    console.log(parentRef);
    parentRef.current.focus();
    parentRef.current.value = '哈哈';
  }
  return (
    <>
      <ForwardChild ref={parentRef} />
      <button onClick={focusHander}>获取焦点</button>
    </>
  )
}
```

- 2、子组件中

```js
function Child(props, parentRef) {
  console.log(props);
  return (
    <>
      <input type="text" ref={parentRef} />
    </>
  )
}
/**
 * 使用forwardRef将ref直接传递进去
 */
let ForwardChild = forwardRef(Child);
```

## 三、优化(使用useImperativeHandle)
> 上面的方式都会将组件中全部的数据暴露出去,有时候我们想只想暴露出一部分数据

- 1、子组件的代码

```js
import React, { useState, useRef, useImperativeHandle, forwardRef } from 'react'

function Child(props, parentRef) {
  const inputRef = useRef();
  useImperativeHandle(parentRef, () => {
    // return返回的值就可以被父组件获取到,没返回的值就获取不到
    return {
      focus() {
        inputRef.current.focus();
      }
    }
  })
  return (
    <>
      <p>{props.name}</p>
      <input type="text" ref={inputRef} />
    </>
  )
}

let ForwardChidl = forwardRef(Child);
export default ForwardChidl
```
- 2、父组件的代码
```js
export default () => {
  const parentRef = useRef();

  const focusHandler = () => {
    parentRef.current.focus();
  }
  return (
    <>
      <ForwardChidl ref={parentRef} name={'你好'} />
      <button onClick={focusHandler}>获取焦点</button>
    </>
  )
}
```
