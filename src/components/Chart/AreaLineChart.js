import React from 'react';
import ReactEcharts from 'echarts-for-react';

const AreaLineChart = ({title, color, colorStops, xAxisData, seriesData}) => {

    const getOtion = function() {
        const option = {
            title: {
                text: ''
            },
            tooltip : {
                trigger: 'axis',
                axisPointer: {
                    lineStyle: {
                        color: "#3a896c",
                        type: 'dashed',
                        opacity: 0.1
                    }
                }

            },
            legend: {
                data:[title]
            },
            toolbox: {
                feature: {
                    saveAsImage: {}
                }
            },
            grid: {
                show: false,
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            backgroundColor: {
                color: "yellow"
            },
        //    color: ["red", "yellow"],
            xAxis : [
                {
                    type : 'category',
                    boundaryGap : false,
                    data : xAxisData,
                    axisLine: {
                        lineStyle: {
                            color: '#454850'
                        }
                    },

                }
            ],
            yAxis : [
                {
                    type : 'value',
                    axisLine: {
                        lineStyle: {
                            color: '#454850'
                        }
                    },
                    splitLine: {
                        show: false
                    }
                }
            ],
            color,
            series : [
                {
                    name:title,
                    type:'line',
                    stack: '总量',
                    smooth: true,
                    showAllSymbol: true,
                    areaStyle: {normal: {
                        color: {
                            type: 'linear',
                            x: 0,
                            y: 0,
                            x2: 0,
                            y2: 1,
                            colorStops,
                            globalCoord: false // 缺省为 false
                        }
                    }},
                    data: seriesData
                }
            ]
        };
        return option;
    }

    return (
        <ReactEcharts
            option={getOtion()}
        />
    )
}

export default AreaLineChart;
