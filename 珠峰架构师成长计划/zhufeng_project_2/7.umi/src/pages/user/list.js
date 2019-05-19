import React from 'react';
import Link from 'umi/link';
export default class UserList extends React.Component{
    render(){
        return (
            <ul className="list-group">
                <li className="list-group-item"><Link to="/user/detail/1">张三</Link></li>
                <li className="list-group-item"><Link to="/user/detail/2">李四</Link></li>
            </ul>
        )
    }
}