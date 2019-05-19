/**
 * title: profile page
 * Routes:
 *  - ./PrivateRoute.js
 */
import React from 'react';
import router from 'umi/router';
export default class Profile extends React.Component{
    handleLogout = ()=>{
        localStorage.removeItem('login');
        router.push('/login');
    }
    render(){
        return (
            <div>
                Profile
                <button onClick={this.handleLogout}>退出登录</button>
            </div>
        )
    }
}