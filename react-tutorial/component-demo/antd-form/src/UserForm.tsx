import * as React from "react";
import Form from "./antd/lib/form";
interface Props {
  form: any;
}
class UserForm extends React.Component<Props> {
  constructor(props: Readonly<Props>) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    this.props.form.validateFields((error: any, values: any) => {
      console.log(error, values);
    });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Item label="用户名">
          {getFieldDecorator("username", {
            rules: [
              {
                required: true,
                message: "用户名不能为空"
              },
              {
                min: 2,
                message: "用户名不能少于2位"
              }
            ]
          })(<input name="username" />)}
        </Form.Item>
        <Form.Item label="密码">
          {getFieldDecorator("password", {
            rules: [
              { required: true, message: "密码不能为空" },
              {
                min: 6,
                message: "密码不能小于6位"
              },
              {
                max: 8,
                message: "密码不能多于8位"
              }
            ]
          })(<input type="password" name="password" />)}
        </Form.Item>
        <Form.Item>
          <button>提交</button>
        </Form.Item>
      </Form>
    );
  }
}

export default Form.create()(UserForm);
