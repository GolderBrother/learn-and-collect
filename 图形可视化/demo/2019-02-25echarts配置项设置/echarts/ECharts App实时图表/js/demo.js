window.onload = function(){
    var arr = [[220, 352, 99, 222, 222, 886],
                [320, 776, 422, 934, 1290, 33],
                [970, 226, 256, 934, 54, 1330],
                [430, 775, 664, 934, 1290, 666]];
    //图表的配置
    var option = {
        //backgroundColor:'#fff',   //背景色
        color:['#f60'],   //系列颜色
        xAxis: {
            type: 'category',
            data: ['一月', '二月', '三月', '四月', '五月', '六月'],
            axisLabel:{
                textStyle:{     //文字
                    color:'#fff'
                }
            },
            axisLine:{
                lineStyle:{     //线条
                    color:'#fff'
                }
            }
        },
        yAxis: {
            type: 'value',
            axisLabel:{
                textStyle:{     //文字
                    color:'#fff'
                }
            },
            axisLine:{
                lineStyle:{     //线条
                    color:'#fff'
                }
            }
        },
        grid: {   //位置
            left: '0',
            right: '0',
            bottom: '0',
            containLabel: true
        },
        series: [{
            data: [20, 932, 901, 934, 1290, 1330],
            type: 'line'
        }]
    };
    //初始化容器
    var mychart = echarts.init(document.getElementById("echarts"));
    //设置数据
    //mychart.setOption(option);
    // //定时器
    // setInterval(getList,2000);
    function getList(){
        //获取随机数
        var random = arr[parseInt(Math.random() *arr.length)];   //[20, 932, 901, 934, 1290, 1330]
        option.series[0].data = random;
        //设置数据
         mychart.setOption(option);
         //循环
        //  var str = '';
        //  for(var i=0;i<random.length;i++){
        //      str+='<td>'+random[i]+'</td>'
        //  };
        //  document.getElementsByTagName('tbody')[0].innerHTML='<tr>'+str+'</tr>';
    };
    getList();
}