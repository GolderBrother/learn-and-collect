export interface Store{
    counter:Counter,
    counter2:Counter2
}
export interface Counter{
    number:number
}
export interface Counter2{
    number:number
}
let store:Store = {
    counter:{
        number:0
    },
    counter2:{
        number:0
    },
}