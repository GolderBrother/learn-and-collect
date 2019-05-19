//全局布局组件
import React,{Fragment} from 'react';
import Link from 'umi/link';
import 'bootstrap/dist/css/bootstrap.css';
import withRouter from 'umi/withRouter';
import {TransitionGroup,CSSTransition} from 'react-transition-group';
//history match location
class Layout extends React.Component{
    componentWillMount(){
      /*   this.props.history.listen((location, action)=>{
            console.log(action,location);
        }); */
    }
    render(){
        return (
            <Fragment>
                <nav className="navbar navbar-default">
                   <div className="container-fluid">
                        <div className="navbar-header">
                            <Link to="/" className="navbar-brand">首页</Link>
                        </div>
                        <div>
                            <ul className="nav navbar-nav">
                                <li><Link to="/">首页</Link></li>
                                <li><Link to="/user">用户管理</Link></li>
                                <li><Link to="/profile">个人设置</Link></li>
                            </ul>
                        </div>
                   </div>
                </nav>
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <TransitionGroup>
                                <CSSTransition key={this.props.location.pathname} classNames="fade" timeout={300}>
                                     {this.props.children}
                                </CSSTransition>
                            </TransitionGroup>
                            
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }
}
export default  withRouter(Layout);