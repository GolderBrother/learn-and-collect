window.onload = function(){
    //图表的配置
    var option = {
        title: {   //标题
            text: '折线图标题'
        },
        tooltip: {   //提示信息
            trigger: 'axis'
        },
        legend: {   //图例
            data:['邮件营销','联盟广告','视频广告','直接访问','搜索引擎']
        },
        grid: {   //位置
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        toolbox: {   //工具栏
            feature: {
                saveAsImage: {}     //保存图片
            }
        },
        xAxis: {   //x轴
            type: 'category',
            boundaryGap: false,
            data: ['周一','周二','周三','周四','周五','周六','周日']
        },
        yAxis: {   //y轴
            type: 'value'
        },
        series: [    //数据
            {
                name:'邮件营销',
                type:'line',
                stack: '总量',
                data:[120, 132, 101, 134, 90, 230, 210]
            },
            {
                name:'联盟广告',
                type:'line',
                stack: '总量',
                data:[220, 182, 191, 234, 290, 330, 310]
            },
            {
                name:'视频广告',
                type:'line',
                stack: '总量',
                data:[150, 232, 201, 154, 190, 330, 410]
            },
            {
                name:'直接访问',
                type:'line',
                stack: '总量',
                data:[320, 332, 301, 334, 390, 330, 320]
            },
            {
                name:'搜索引擎',
                type:'line',
                stack: '总量',
                data:[820, 932, 901, 934, 1290, 1330, 1320]
            }
        ]
    };
    //初始化容器
    var mychart = echarts.init(document.getElementById("echarts"));
    //设置数据
    mychart.setOption(option);
    
}