import React from 'react';
import 'echarts-wordcloud';
import ReactEcharts from 'echarts-for-react';
const WordCloud = ({data}) => {
     function getOption() {
        var option = {
            tooltip: {},
            series: [{
                type: 'wordCloud',
                gridSize: 20,
                sizeRange: [12, 50],
                rotationRange: [0, 0],
                shape: 'circle',
                textStyle: {
                    normal: {
                        color: function() {
                            return 'rgb(' + [
                                Math.round(Math.random() * 160),
                                Math.round(Math.random() * 160),
                                Math.round(Math.random() * 160)
                            ].join(',') + ')';
                        }
                    },
                    emphasis: {
                        shadowBlur: 10,
                        shadowColor: '#333'
                    }
                },
                data
            }]
        };
        return option;
    }
    return (
        <ReactEcharts
            option={getOption()}
        />
    )

}

export default WordCloud;
