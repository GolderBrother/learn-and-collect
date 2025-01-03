window.onload = function(){
    //图表的配置
var option = {
    xAxis: {
        scale: true
    },
    yAxis: {
        scale: true
    },
    series: [{
        type: 'effectScatter',  //带有涟漪特效动画的散点（气泡）图。
        symbolSize: 30,   //标记大小
        data: [
            [172.7, 105.2],
            [153.4, 42]
        ]
    }, {
        type: 'scatter',   //散点（气泡）图
        data: [[161.2, 51.6], [167.5, 59.0], [159.5, 49.2], [157.0, 63.0], [155.8, 53.6],
            [170.0, 59.0], [159.1, 47.6], [166.0, 69.8], [176.2, 66.8], [160.2, 75.2],
            [172.5, 55.2], [170.9, 54.2], [172.9, 62.5], [153.4, 42.0], [160.0, 50.0],
            [147.2, 49.8], [168.2, 49.2], [175.0, 73.2], [157.0, 47.8], [167.6, 68.8],
            [159.5, 50.6], [175.0, 82.5], [166.8, 57.2], [176.5, 87.8], [170.2, 72.8]
        ],
    }]
};

    //初始化容器
    var mychart = echarts.init(document.getElementById("echarts"));
    //设置数据
    mychart.setOption(option);
    
}