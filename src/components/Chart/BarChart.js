import React from 'react';
import ReactEcharts from 'echarts-for-react';


const BarChart = ({title, xAxisData, seriesData}) => {
    const getOption = function() {
        const option = {
            color: ['#3398DB'],
            tooltip : {
                trigger: 'axis',
                axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                    type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                }
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis : [
                {
                    type : 'category',
                    data : xAxisData,
                    axisTick: {
                        alignWithLabel: true
                    },

                }
            ],
            yAxis : [
                {
                    type : 'value',
                    splitLine: {
                        show: false
                    }
                }
            ],
            series : [
                {
                    name:'直接访问',
                    type:'bar',
                    barWidth: '60%',
                    data:seriesData
                }
            ]
        };
        return option;
    }
    return (
        <ReactEcharts
            option={getOption()}
        />
    )
}

export default BarChart;
