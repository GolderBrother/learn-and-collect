/*
 * @Author: yaohuang.zhang 
 * @Email: 1204788939@qq.com 
 * @Date: 2019-12-27 18:05:16 
 * @Last Modified by: yaohuang.zhang
 * @Last Modified time: 2019-12-27 18:06:11
 * @Description: 使用useMemo来优化程序运行性能
 */
import React , {useState} from 'react';
import ChildComponent from './Child';
export default function Parent(){
    const [xiaohong , setXiaohong] = useState('小红待客状态')
    const [zhiling , setZhiling] = useState('志玲待客状态')
    return (
        <>
            <button onClick={()=>{setXiaohong(new Date().getTime())}}>小红</button>
            <button onClick={()=>{setZhiling(new Date().getTime()+',志玲向我们走来了')}}>志玲</button>
            <ChildComponent name={xiaohong}>{zhiling}</ChildComponent>
        </>
    )
}
