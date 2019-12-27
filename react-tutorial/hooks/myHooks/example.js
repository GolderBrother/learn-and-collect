import useWinSize from './useWinSize';
function Example(){
    // 使用自定义hooks
    const size = useWinSize()
    return (
        <div>页面Size:{size.width}x{size.height}</div>
    )
}

export default Example 
