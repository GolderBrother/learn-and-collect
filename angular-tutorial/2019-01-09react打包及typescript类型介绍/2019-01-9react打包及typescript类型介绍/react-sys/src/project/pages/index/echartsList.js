import React, { Component } from 'react';
import ReactEcharts from 'echarts-for-react';

class EchartsList extends Component {
    render() {
        var option = {
            //backgroundColor:'#f60',
            color:['#f60'],
            xAxis: {
                type: 'category',
                data: ['Mon', 'Tue', 'Wed', 'Thu']
            },
            yAxis: {
                type: 'value'
            },
            series: [{
                data: this.props.data,
                type: this.props.type
            }]
        };
        return (
            <ReactEcharts
                option={option} 
                style={{width: '100%',height:'300px'}}
            />
        );
      }
}

export default EchartsList;