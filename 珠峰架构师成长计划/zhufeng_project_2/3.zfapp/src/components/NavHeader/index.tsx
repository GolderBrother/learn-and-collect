import * as React from 'react';
import './index.less';
interface Props{
  title:string,
  history:any
}
export default class NavHeader extends React.Component<Props>{
  render(){
      return (
        <div className="nav-header">
          <i className="iconfont icon-fanhui" onClick={()=>this.props.history.goBack()}></i>
          {this.props.title}
        </div>
      )
  }
}