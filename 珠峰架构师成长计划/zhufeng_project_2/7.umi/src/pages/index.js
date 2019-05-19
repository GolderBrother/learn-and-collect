import React from 'react';
import Link from 'umi/link';
//import {Link} from 'react-router-dom';
export default class Home extends React.Component{
    render(){
        return (
            <div>
                Home
                <Link to="/profile">个人中心</Link>
            </div>
        )
    }
}