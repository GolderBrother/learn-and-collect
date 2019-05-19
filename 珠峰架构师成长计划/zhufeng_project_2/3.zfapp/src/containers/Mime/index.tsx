import * as React from 'react';
import { connect } from 'react-redux';
import './index.less';
interface Props{

}
class Mime extends React.Component<Props>{
  render(){
      return <div>Mime</div>
  }
}
export default connect()(Mime);