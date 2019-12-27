/*
 * @Author: yaohuang.zhang 
 * @Email: 1204788939@qq.com 
 * @Date: 2019-12-27 18:04:34 
 * @Last Modified by: yaohuang.zhang 
 * @Last Modified time: 2019-12-27 18:04:34 
 * @Description: 使用useMemo来优化程序运行性能 
 */
import React , {useMemo} from 'react';
export default function ChildComponent({name,children}){
    function changeXiaohong(name){
        console.log('她来了，她来了。小红向我们走来了')
        return name+',小红向我们走来了'
    }
    /**
     * 把“创建”函数和依赖项数组作为参数传入 useMemo，它仅会在某个依赖项改变时才重新计算 memoized 值。这种优化有助于避免在每次渲染时都进行高开销的计算。
     */
    // 使用useMemo，然后给她传递第二个参数，参数匹配成功，才会执行
    const actionXiaohong = useMemo(()=>changeXiaohong(name),[name]) 
    // 这时在浏览器中点击一下志玲按钮，changeXiaohong就不再执行了。也节省了性能的消耗
    return (
        <>
            <div>{actionXiaohong}</div>
            <div>{children}</div>
        </>
    )
}
