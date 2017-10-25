import React from 'react'
import styles from './index.less'
import { connect } from 'dva'
import echarts from 'echarts'
import ReactEcharts from 'echarts-for-react'
import AreaLineChart from '../../../Chart/AreaLineChart'
import WordCloudChart from '../../../Chart/WordCloudChart'

class Echarts extends React.Component{

    render(){
        let wordClouds=[];
        if(this.props.wordCloud){
            let wordCloudMap = this.props.wordCloud;
            for(var name in wordCloudMap){
                wordClouds.push({
                    name: name,
                    value: wordCloudMap[name]
                });
            }
        }
        console.log(wordClouds)
        const postTime = [],comments=[],reposts=[],attitudes=[],wbBaseMapData = this.props.wbBaseMapData;
        if(wbBaseMapData.length > 0){
            wbBaseMapData.map((key)=>{
                postTime.push(key.post_time);
                comments.push(key.comments_sum);
                reposts.push(key.reposts_sum);
                attitudes.push(key.attitudes_sum);
            });
        }
        // this.drawMap();
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
                        <AreaLineChart
                            title="评论数"
                            color={['#3a896c']}
                            colorStops={[{
                                offset: 0, color: 'rgba(58, 137, 108, 0.8)' // 0% 处的颜色
                            }, {
                                offset: 1, color: 'rgba(58, 137, 108, 0)' // 100% 处的颜色
                            }]}
                            xAxisData = {postTime}
                            seriesData = {comments}
                        >
                        </AreaLineChart>
                        <AreaLineChart
                            title="转发数"
                            color={['yellow']}
                            colorStops={[
                                {
                                    offset: 0, color: 'rgba(58, 137, 108, 0.8)'
                                },
                                {
                                    offset: 1, color: 'rgba(58, 137, 108, 0)'
                                }
                            ]}
                            xAxisData = {postTime}
                            seriesData = {reposts}
                        >
                        </AreaLineChart>
                        <AreaLineChart
                            title="点赞比"
                            color={['pink']}
                            colorStops={[
                                {
                                    offset: 0, color: 'rgba(58, 137, 108, 0.8)'
                                },
                                {
                                    offset: 1, color: 'rgba(58, 137, 108, 0)'
                                }
                            ]}
                            xAxisData = {postTime}
                            seriesData = {attitudes}
                        >
                        </AreaLineChart>
                    </li>
                    <li className={styles.price_table}>
                        <p>内容词云</p>
                        <div  style={{width:"100%", height:300}}>
                            <WordCloudChart data={wordClouds}/>
                        </div>
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
            wbBaseMapData,
            wordCloud,
        }
    } = state
    return {
        _active_right,
        wb_item,
        wbBaseMapData,
        wordCloud,
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