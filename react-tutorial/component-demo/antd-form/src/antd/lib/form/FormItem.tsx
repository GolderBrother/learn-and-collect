import * as React from "react";
interface Props {
  label?: string;
}
interface State {}

export default class FormItem extends React.Component<Props, State> {
  render() {
    const { label, children } = this.props;
    return (
      <div>
        {label && <label>{label}</label>}
        {children}
      </div>
    );
  }
}
