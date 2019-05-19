import * as React from 'react';
import { connect } from 'react-redux';
import './index.less';
import NavHeader from '../../components/NavHeader';
import { GET_HOME_LESSONS_LOADING } from '../../store/action-types';
interface Props{
  location:any,
  history:any
}
class Detail extends React.Component<Props>{
  render(){
      let lesson = this.props.location.state;
      return (
        <div className="lesson-detail">
          <NavHeader title="课程详情" history={this.props.history}/>
          <img src={lesson.poster}/>
          <p>{lesson.title}</p>
          <p>{lesson.price}</p>
        </div>
      )
  }
}
export default connect()(Detail);