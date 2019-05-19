import * as React from 'react';
import { connect } from 'react-redux';
import Header from './Header';
import './index.less';
import {Store} from '../../types';
import actions from '../../store/actions/home';
import Swiper from './Swiper';
import List from './List';
import {loadMore,downRefresh,store} from '../../utils';
interface Props{
  category:string,
  changeCategory:any,
  sliders:any,
  getSliders:any,
  lessons:any,
  getLessons:any,
  refreshLessons:any
}
class Home extends React.Component<Props>{
  mainContent:any
  componentDidMount(){
    if(this.props.sliders.length >0){
      this.mainContent.scrollTop = store.get('homeScrollTop');
    }else{
      this.props.getSliders();
      this.props.getLessons();
    }
   
    loadMore(this.mainContent,this.props.getLessons);
    downRefresh(this.mainContent,this.props.refreshLessons);
  }
  //在组件将要被销毁的时候
  componentWillUnmount(){
    store.set('homeScrollTop',this.mainContent.scrollTop);
  }
  render(){
      return (
        <React.Fragment>
          <Header 
            category={this.props.category}
            changeCategory={this.props.changeCategory}
            refreshLessons={this.props.refreshLessons}
          />
          <div className="main-content" ref={ref=>this.mainContent=ref}>
             <Swiper
              sliders={this.props.sliders}
             />
             <List
               lessons={this.props.lessons}
               getLessons={this.props.getLessons}
             />
          </div>
          
        </React.Fragment>
      )
  }
}
export default connect(
  (state:Store)=>state.home,
  actions
)(Home);
