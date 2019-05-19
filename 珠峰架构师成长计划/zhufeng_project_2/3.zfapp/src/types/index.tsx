export interface Store{
    home:Home,
    router:any,
    session:Session
}
export interface Session{
    error:any,
    success:any,
    user:any
}
export interface Lessons{
    list:any[],//每页的数据
    hasMore:boolean,//是否有更多
    offset:number,//偏移量
    limit:number,//每页的条数
    loading:boolean//当前是否正在加载
}
export interface Home{
    category:string,
    sliders:string[],
    lessons:Lessons
}
