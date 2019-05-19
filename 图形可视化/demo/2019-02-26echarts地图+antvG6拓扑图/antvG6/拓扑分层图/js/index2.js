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
    // 自定义节点
    G6.registNode('node', {   //注册节点
        draw(cfg, group) {   //cfg当前节点配置项
            console.log((cfg));
            var model = cfg.model;  //当前的数据
            var tree1 = "images/tree_01.png";
            var tree2 = "images/tree_02.png";
            var tree3 = "images/tree_03.png";
            const shape = {
              attrs: {
                x: 0,
                y: 0,
                img:tree1,
                width:50,
                height:50
              }
            };
            if(model.children && model.children.length>0){
                shape.attrs.img = tree3;
            };
            if(model.root){
                shape.attrs.img = tree2;
            }
            // 添加文本、更多图形
            return group.addShape('image',shape);
        },
        afterDraw(cfg, group) {    //绘制文字
            var model = cfg.model;  //当前的数据
            const label = {
                attrs: {
                  text:model.name,
                  x: 0,
                  y: 0,
                  fill: '#333'
                }
              };
              // 添加文本、更多图形
              return group.addShape('text',label);
        }
    });
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
      tree.node().shape('node');  //渲染节点
      tree.edge().shape('smooth');//边缘形状
      //渲染数据
      tree.render();
}