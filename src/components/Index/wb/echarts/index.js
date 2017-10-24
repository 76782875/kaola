import React from 'react'
import styles from './index.less'
import { connect } from 'dva'
import echarts from 'echarts'

class Echarts extends React.Component{
    componentDidMount() {
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('main'));
        // 绘制图表
        myChart.setOption({
            title: { text: 'ECharts 入门示例' },
            tooltip: {},
            xAxis: {
                data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
            },
            yAxis: {},
            series: [{
                name: '销量',
                type: 'bar',
                data: [5, 20, 36, 10, 10, 20]
            }]
        });
    }
    render(){
        return(
            <div className={this.props._active_right?styles._active_right:styles.echarts_main }>
                <ul className={styles.portrait_ul}>
                    <li className={styles.portrait}>
                        <p>
                            <span>KOL画像</span>
                            <b onClick={this.props.doubleFunction.bind(this)}> &lt;&lt; </b>
                        </p>
                        <ol className={styles.portrait_ol}>
                            <li>
                                <span><img src={this.props.wb_item.avatar}/></span>
                            </li>
                            <li>
                                <span>{this.props.wb_item.mediaName}</span>
                                <div>{this.props.wb_item.fans}</div>
                            </li>
                            <li>
                                <span>粉丝数:{this.props.wb_item.fans}</span>
                                <div>转赞比:{this.props.wb_item.medianRepostsCnt/this.props.wb_item.medianCommentsCnt}</div>
                            </li>
                            <li>
                                <span>行业分类:暂无</span>
                                <div>等级推荐:{this.props.wb_item.recommendLevel}</div>
                            </li>
                        </ol>
                    </li>
                    <li className={styles.price_table}>
                        <p>报价表</p>
                        <table>
                            <thead>
                                <tr>
                                    <td>位置</td>
                                    <td>售价</td>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{this.props.wb_item.priceHardDirect?'硬广直发':''}</td>
                                    <td>{this.props.wb_item.priceHardDirect?this.props.wb_item.priceHardDirect:''}</td>
                                </tr>
                                <tr>
                                    <td>{this.props.wb_item.priceHardIndirect?'硬广转发':''}</td>
                                    <td>{this.props.wb_item.priceHardIndirect?this.props.wb_item.priceHardIndirect:''}</td>
                                </tr>
                                <tr>
                                    <td>{this.props.wb_item.priceSoftIndirect?'软广直发':''}</td>
                                    <td>{this.props.wb_item.priceSoftIndirect?this.props.wb_item.priceSoftIndirect:''}</td>
                                </tr>
                            </tbody>
                        </table>
                    </li>
                    <li className={styles.price_table}>
                        <p>近30天基本指标变化图</p>
                        <div id="main" style={{ width: 400, height: 400 }}></div>
                    </li>
                </ul>
            </div>
        )
    }
}
function mpStateToProps(state){
    const {
        index:{
            _active_right,
            wb_item,
        }
    } = state
    return {
        _active_right,
        wb_item,
    }
}
function mpDispatchToProps(dispatch){
    return{
        doubleFunction:(idx) =>{
            dispatch({
                type:"index/editActive",
                payload:{
                    _active_right:false,
                    wb_item:idx,
                }
            });
        }
    }
}

export default connect(mpStateToProps,mpDispatchToProps)(Echarts);