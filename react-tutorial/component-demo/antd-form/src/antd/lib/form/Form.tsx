import * as React from "react";
import FormItem from "./FormItem";
import create from "./create";
// import { Function } from "@babel/types";

interface Props {
  onSubmit?: any;
}

export default class Form extends React.Component<Props> {
  static Item = FormItem;
  static create = create;
  render() {
    // return <form {...this.props} />;
    return <form {...this.props}>{this.props.children}</form>
  }
}
