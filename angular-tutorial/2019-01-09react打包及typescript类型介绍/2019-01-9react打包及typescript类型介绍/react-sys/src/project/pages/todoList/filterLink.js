import React from 'react'
import { connect } from 'react-redux'
import { setVisibility } from '../../redux/actions/todoList'
import './index.scss'

@connect(
    (state) => ({
        setVisibility: state.setVisibility,
    })
)

 class FilterLink extends React.Component {
  onClick = () => {
    var a = setVisibility({filter: this.props.filter});
    this.props.dispatch(a);
  }

  render() {
    const { name,filter } = this.props;   //父组件中
    const active = this.props.setVisibility.filter === filter;   //store
    return (
      <div className="todo-tab_item">
        <a style={{ color: active? '#f01414' : '#4d555d' }} onClick={this.onClick}>{name}</a>
      </div>
    )
  }
}
export default FilterLink