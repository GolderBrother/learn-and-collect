import * as React from "react";
/*
ts定义接口里面的任意属性
Objects和propName都是自定义的名
interface Objects {
    [propName: string]: any
}
*/
interface Props {
  [props: string]: any;
}
interface State {
  values: Props;
  errors: Props;
}

// 类型别名 void: => 返回值 null 或者 undefined
type Callback = (error: any, values: any) => void;
export default function() {
  return function decorate(WrappedComponent: any) {
    /*
      <Props, State>
      约束FormItem这个组件的属性的结构
      interface Props {
          label?: string
      }

      约束FormItem这个组件的自身数据的结构
      interface State {
          age?: number
      }
    */
    // 高阶(代理)组件概念类似于高阶函数，传入一个组件，返回一个基于源组件装饰过后的新组件

    // 受控组件：受状态控制的组件
    // 非受控组件：不受状态控制的组件(input value -> undefined)
    class ProxyComponent extends React.Component<Props, State> {
      state = {
        values: {},
        //{username:{errors:[{field:'username':message:'用户名不能为空'}]}}
        errors: {} //这里放置着所有的错误信息
      };
      rules: Props = {};
      // 事件对象类型 -> React.ChangeEvent<HTMLInputElement> 固定写法
      // handleChange的第二个参数name是用来给表单元素赋值
      handleChange = (
        event: React.ChangeEvent<HTMLInputElement>,
        name: string
      ): void => {
        const value = event.target.value;
        this.setState(
          {
            values: {
              ...this.state.values,
              [name]: value
            }
          },
          () => {
            this.validateFields([name]);
          }
        );
      };
      validateFields = (
        fields: Array<string> | Callback,
        callback?: Array<string> | Callback
      ): void => {
        if (typeof fields === "function") {
          callback = fields;
          fields = Object.keys(this.rules); //{username:[{required:true,message:'用户名不能为空'}]}
        }
        let errors: Props = this.state.errors;
        fields.forEach(field => {
          let rules = this.rules[field]; //[{required:true,message:'用户名不能为空'}]
          if (rules && rules.length) {
            let values: Props = this.state.values;
            let value: any = values[field];
            let fieldErrors: Array<any> = rules
              .map((rule: Props) => {
                if (
                  (rule.required && !value) ||
                  (rule.min && value && value.length < rule.min) ||
                  (rule.max && value && value.length > rule.max)
                ) {
                  return {
                    field,
                    message: rule.message
                  };
                }
              })
              .filter((item: any) => item); // 再过滤出存在(非空)的元素
            if (fieldErrors.length > 0) {
              errors[field] = {
                errors: fieldErrors
              };
            } else {
              delete errors[field];
            }
          }
        });
        let error = Object.keys(errors).length > 0 ? errors : null;
        this.setState(
          {
            errors
          },
          () => {
            // 类型断言: 强制转换, 断言callback就是Callback类型
            callback && (callback as Callback)(error, this.state.values);
          }
        );
      };

      getFieldDecorator = (name: any, options: any) => {
        //如果说当前元素有rules，我们要缓存到当前组件实例 上
        if (options.rules) {
          this.rules[name] = options.rules;
        }
        return (fieldElement: any) => {
          let values: Props = this.state.values;
          let props: Props = {
            value: values[name] || "",
            onChange: (event: React.ChangeEvent<HTMLInputElement>) =>
              this.handleChange(event, name)
          };
          let errors: Props = this.state.errors;
          let fieldErrors = errors[name];
          let messages: Array<any> = [];
          if (fieldErrors && fieldErrors.errors.length > 0) {
            props.style = { border: "1px solid red" };
            messages = fieldErrors.errors
              .map((item: any) => item.message)
              .map((message: string, index: number) => (
                <p key={index} style={{ color: "red" }}>
                  {message}
                </p>
              ));
          }
          // 克隆出新的元素，因为如果不是类组件，就不能 像<component {...props} />这样传入属性
          let inputElement = React.cloneElement(fieldElement, props);
          return (
            <div>
              {inputElement}
              {messages.length > 0 && messages}
            </div>
          );
        };
      };
      getFieldsValue = () => {
        return this.state.values;
      };
      render() {
        let props = {
          form: {
            getFieldsValue: this.getFieldsValue,
            getFieldDecorator: this.getFieldDecorator,
            validateFields: this.validateFields
          }
        };
        return <WrappedComponent {...props} />;
      }
    }
    return ProxyComponent;
  };
}
