window.onload = function(){
    function randomData() {  
        return Math.round(Math.random()*500);  
    };  
    var mydata = [  
        {name: '北京',value: '100' },{name: '天津',value: randomData() },  
        {name: '上海',value: randomData() },{name: '重庆',value: randomData() },  
        {name: '河北',value: randomData() },{name: '河南',value: randomData() },  
        {name: '云南',value: randomData() },{name: '辽宁',value: randomData() },  
        {name: '黑龙江',value: randomData() },{name: '湖南',value: randomData() },  
        {name: '安徽',value: randomData() },{name: '山东',value: randomData() },  
        {name: '新疆',value: randomData() },{name: '江苏',value: randomData() },  
        {name: '浙江',value: randomData() },{name: '江西',value: randomData() },  
        {name: '湖北',value: randomData() },{name: '广西',value: randomData() },  
        {name: '甘肃',value: randomData() },{name: '山西',value: randomData() },  
        {name: '内蒙古',value: randomData() },{name: '陕西',value: randomData() },  
        {name: '吉林',value: randomData() },{name: '福建',value: randomData() },  
        {name: '贵州',value: randomData() },{name: '广东',value: randomData() },  
        {name: '青海',value: randomData() },{name: '西藏',value: randomData() },  
        {name: '四川',value: randomData() },{name: '宁夏',value: randomData() },  
        {name: '海南',value: randomData() },{name: '台湾',value: randomData() },  
        {name: '香港',value: randomData() },{name: '澳门',value: randomData() }  
    ]; 
    var option = {  
        backgroundColor: '#fff',   
        title: {  
            text: '全国地图大数据',     
            subtext: '数据详情展示',   
            x:'center'     //居中
        },  
        tooltip:{  //提示
            trigger:'item'
        },
        // visualMap: {
        //     min: 0,
        //     max: 500,
        //     text:['High','Low'], //两端的文本，如 ['High', 'Low']。
        //     realtime: true,//拖拽时，是否实时更新。
        //     calculable: true, //是否显示拖拽用的手柄（手柄能拖拽调整选中范围）
        //     inRange: {
        //         color: ['lightskyblue','yellow', 'orangered']
        //     }
        // },
        visualMap: {
            show:true,
            x: 'left',
            y: 'center',
            splitList: [
                {start:400,end:500},{start:300,end:400},{start:200,end:300},
                {start:100,end:200},{start:0,end:100}
            ],
            color:['#f60','#9feaa6','lightskyblue','yellow','orangered']
        },
        //配置属性
        series: [{  
            name: '数据',  
            type: 'map',  
            map: 'china',  //中国地图 
            roam:true,  //是否开启鼠标缩放和平移漫游。默认不开启。如果只想要开启缩放或者平移，
            //可以设置成 'scale' 或者 'move'。设置成 true 为都开启
            label:{
                show:true,
                color:'#000',
                fontSize:10
            },
            data:mydata //数据
        }]  
    };  
    //初始化echarts实例
    var myChart = echarts.init(document.getElementById('echarts'));
    //使用制定的配置项和数据显示图表
    myChart.setOption(option);
}