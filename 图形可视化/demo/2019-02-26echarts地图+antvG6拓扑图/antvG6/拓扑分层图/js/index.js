window.onload = function(){
    //设置数据
    var data ={
        name:'all',
        children:[{
            name:'a',
            children:[{
                name:'a1',
                children:[{
                    name:'a1-1',
                    children:[]
                }]
            },
            {
                name:'a2',
                children:[]
            }]
        },
        {
            name:'b',
            children:[]
        },
        {
            name:'c',
            children:[{
                name:'c1',
                children:[]
            },
            {
                name:'c2',
                children:[]
            }]
        }]
    };
    //配置G6画布
    var tree = new G6.Tree({
        id: 'c1', // 容器ID
        //height: window.innerHeight, // 画布高
        height:500,
        fitView:'autoZoom',  //自适应
        domFocus:true, //缩放
        layoutcfg:{
            getHGap: function() /* d */ {
                // 横向间距
                return 100;
              },
              getVGap: function() /* d */ {
                // 竖向间距
                return 10;
              }
        } ,
        fitView: 'autoZoom' // 自动缩放
      });
      //载入数据
      tree.source(data);
      tree.tooltip(true);//提示信息是否显示
      tree.node().tooltip(function(obj){
        return [
            ['name',obj.name],
            ['状态','100%']
        ]
      });
      tree.node().label(function(obj){   //标签节点
        return obj.name
      });
      tree.edge().shape('smooth');//边缘形状
      //渲染数据
      tree.render();
}