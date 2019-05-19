<template>
    <div v-click-outside>
        <input type="text" :value="formatDate">
        <div class="pannel" v-if="isVisible">
            <div class="pannel-nav">
                <span>&lt;</span>
                <span @click="prevMonth">&lt;&lt;</span>
                <span>{{time.year}}年</span>
                <span>{{time.month+1}}月</span>
                <span @click="nextMonth">&gt;&gt;</span>
                <span>&gt;</span>
            </div>
            <div class="pannel-content">
                <div class="days">
                    <!-- 直接列出一个 6*7 一个列表  99 乘法表 -->
                        <span 
                                v-for="j in 7" :key="`_`+j"
                                class="cell"
                        >
                           {{weekDays[j-1]}}
                        </span>
                    <div v-for="i in 6" :key="i">
                        <!-- 判断是不是当月 不是当月就变灰色 -->
                        <!-- 选择日期的方法 -->
                        <span 
                            v-for="j in 7" :key="j"
                            class="cell cell-days"
                            @click="chooseDate(visibeDays[(i-1)*7+(j-1)])"
                            :class="[
                                {notCurrentMonth:!isCurrentMonth(visibeDays[(i-1)*7+(j-1)])},
                                {today:isToday(visibeDays[(i-1)*7+(j-1)])},
                                {select: isSelect(visibeDays[(i-1)*7+(j-1)])}
                            ]"
                        >
                            {{visibeDays[(i-1)*7+(j-1)].getDate()}}
                        </span>
                    </div>
                </div>
            </div>
            <div class="pannel-footer">
                今天
            </div>
        </div>
    </div>
</template>
<script>
import * as utils from './util'
export default {
    directives:{
        clickOutside:{ // 指令的生命周期
            bind(el,bindings,vnode){ // context
                // 把事件绑定给document上 看一下点击的是否是当前这个元素内部
                let handler = (e)=>{
                    if(el.contains(e.target)){
                        // 判断一下是否当前面板已经显示出来了
                        if(!vnode.context.isVisible){
                            vnode.context.focus();
                        }
                    }else{
                        if(vnode.context.isVisible){
                            vnode.context.blur();
                        }
                    }
                }
                el.handler = handler;
                document.addEventListener('click',handler)
            },
            unbind(el){
                document.removeEventListener('click',el.handler)
            }
        }
    },
    data(){
        let {year,month} = utils.getYearMonthDay(this.value);
        return {
            weekDays:['日','一','二','三','四','五','六'],
            time:{year,month},
            isVisible:false // 这个变量是用来控制这个面板是否可见
        }
    },
    props:{
        value:{
            type:Date,
            default:()=>new Date() // 返回的默认值必须是一个函数类型  {} []
        }
    },
    methods:{
        focus(){ // 显示面板 
            this.isVisible = true;
        },
        blur(){ // 隐藏面板
            this.isVisible = false;
        },
        // 是否是当前月
        isCurrentMonth(date){ // 他是不是当月 this.value
            // 我现在知道当前用户传入的值 2018 5 18  2018 4 28 /   2018 6 8
            let {year,month} = utils.getYearMonthDay(utils.getDate(this.time.year,this.time.month,1));
            let {year:y,month:m} = utils.getYearMonthDay(date);
            return year === y && month === m;
        },
        // 是否是今天
        isToday(date){
            let {year,month,day} = utils.getYearMonthDay(new Date());
            let {year:y,month:m,day:d} = utils.getYearMonthDay(date);
            return year === y && month === m && day === d;
        },
        chooseDate(date){
           this.time = utils.getYearMonthDay(date);
           this.$emit('input',date);
           this.blur(); // 关闭弹层
        },
        isSelect(date){
            // 获取当前的年月日
            let {year,month,day} = utils.getYearMonthDay(this.value);
            let {year:y,month:m,day:d} = utils.getYearMonthDay(date);
            return year === y && month === m && day === d;
        },
        prevMonth(){
            // 获取当前的年月的一个日期
            let d = utils.getDate(this.time.year,this.time.month,1);
            d.setMonth(d.getMonth()-1);
            console.log(d);
            this.time = utils.getYearMonthDay(d);
        },
        nextMonth(){
             let d = utils.getDate(this.time.year,this.time.month,1);
            d.setMonth(d.getMonth()+1);
            this.time = utils.getYearMonthDay(d);
        }
    },
    computed:{
        visibeDays(){
            // 现获取当前是周几
            let {year,month} = utils.getYearMonthDay(utils.getDate(this.time.year,this.time.month,1));
            // 获取当前月份的第一天
            let currentFirstDay = utils.getDate(year,month,1)
            // 先生成一个 当前 2019 5 18    2019 5 1
            // 获取当前是周几  把天数往前移动 几天
            let week = currentFirstDay.getDay();
            // 当前开始的天数
            let startDay = currentFirstDay - week * 60 * 60 * 1000 * 24
            // 循环42天
            let arr = [];
            for(let i = 0; i< 42;i++){
                // 依次循环出42天
                arr.push(new Date(startDay+i * 60 * 60 * 1000 *24));
            }
            return arr
        },
        formatDate(){
           let {year,month,day} =  utils.getYearMonthDay(this.value);// getFullYear getMonth getDate
           return `${year}-${month+1}-${day}`
        }
    }
}
</script>
<style lang="stylus">
.pannel 
    width 32*7px;
    position absolute;
    background #fff;
    box-shadow 2px 2px 2px pink , -2px -2px 2px pink;
    .pannel-nav 
        display flex;
        justify-content space-around;
        height 30px;
        span 
            cursor pointer;
            user-select:none
    .pannel-content
        .cell 
            display inline-flex;
            justify-content center;
            align-items center;
            width 32px;
            height 32px;
            font-weight bold;
            box-sizing border-box;
        .cell-days:hover,.select
            border 1px solid pink;
    .pannel-footer
        height 30px;
        text-align center;
.notCurrentMonth
    color gray
.today
    background red;
    color #fff;
    border-radius 4px;
</style>
