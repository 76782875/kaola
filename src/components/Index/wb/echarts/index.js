import React from 'react'
import styles from './index.less'
import { connect } from 'dva'

class Echarts extends React.Component{
    render(){
        return(
            <div className={this.props._active_right?styles._active_right:styles.echarts_main }>
                <p>公众号名称：</p>
                <div>123</div>
            </div>
        )
    }
}
function mpStateToProps(state){
    const {
        index:{
            _active_right
        }
    } = state
    return {_active_right}
}

export default connect(mpStateToProps)(Echarts);