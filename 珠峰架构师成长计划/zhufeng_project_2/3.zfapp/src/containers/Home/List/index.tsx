import * as React from 'react';
import { connect } from 'react-redux';
import Loading from '../../../components/Loading';
import {Link} from 'react-router-dom';
import './index.less';
interface Props{
  lessons:any,
  getLessons:any
}
class List extends React.Component<Props>{
  render(){
      let {list,hasMore,loading} = this.props.lessons;
      return (
        <div className="home-lessons">
          <div className="all-lessons">
              <i className="iconfont icon-kecheng-copy"></i>
              <span>全部课程</span>
          </div>
          {
           list.length>0?list.map((item:any,index:number):any=>(
            <Link key={index} to={{pathname:`/detail/${item.id}`,state:item}}>
               <div className="lesson" >
                <img src={item.poster} alt={item.title}/>
                <p>{item.title}</p>
                <p>{item.price}</p>
              </div>
            </Link>
           )):<div className="nodata">暂无数据</div>
          }
          {
            loading?<Loading/>:( !hasMore&&<div className="load-more">我是有底线的</div>)
          }
        </div>
      )
  }
}
export default connect()(List);