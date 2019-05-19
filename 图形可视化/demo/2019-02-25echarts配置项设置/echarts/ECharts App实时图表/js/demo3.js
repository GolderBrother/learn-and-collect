window.onload = function(){
    //图表的配置
    var option = {
        title: {   //标题
            text: '一周气温变化',
            subtext:'数据来自某某测控中心',//副标题文本
            x:'center',   //居中
            textStyle:{   //主标题样式
                color:'#fff',     
                fontSize:20
            },
            subtextStyle:{   //副标题样式
                color:'#333'
            },
        },
        tooltip: {   //提示信息
            trigger: 'axis',//触发类型
            formatter: '{b}<br/>{a0}:{c0}度<br/>{a1}:{c1}度'
        },
        legend: {   //图例
            data:['最高气温','最低气温'],
            x:'left',   //对齐
            // 使用字符串模板，模板变量为图例名称 {name}
            formatter: '{name}(度)'
        },
        grid: {   //位置
            left: '0',
            right: '0',
            bottom: '0',
            containLabel: true
        },
        toolbox: {   //工具栏
            iconStyle:{   //图标颜色
                color:'#fff'
            },
            emphasis:{    //移入颜色
                iconStyle:{
                    color:'#f00'
                }
            },
            feature: {
                saveAsImage: {
                   iconStyle:{   // 单独图标颜色
                        color:'#f60'
                    }, 
                } ,    //保存图片
                restore:{},    //配置项还原
                magicType:{  //动态类型切换
                    type: ['line', 'bar', 'stack', 'tiled']
                },
                dataView:{}   //数据视图工具，可以展现当前图表所用的数据，编辑后可以动态更新
            }
        },
        xAxis: {   //x轴
            type: 'category',
            boundaryGap: false,
            data: ['周一','周二','周三','周四','周五','周六','周日']
        },
        yAxis: {   //y轴
            type: 'value',
            axisLabel:{
                formatter:'{value}(度)'   // 使用字符串模板，模板变量为刻度默认标签 {value}
                //// 使用函数模板，函数参数分别为刻度数值（类目），刻度的索引
                // formatter: function (value, index) {
                //     if(value >= 30){
                //         return '热'
                //     }else {
                //         return '舒适'
                //     }
                // }
            }
        },
        series: [    //数据
            {
                name:'最高气温',
                type:'line',
                //stack: '总量',
                data:[10, 18, 8, 20, 28, 10, 19]
            },
            {
                name:'最低气温',
                type:'line',
                //stack: '总量',
                data:[3, 9, -3, 10, 14, 5, 11]
            }
        ]
    };
    //初始化容器
    var mychart = echarts.init(document.getElementById("echarts"));
    //设置数据
    mychart.setOption(option);
    
}