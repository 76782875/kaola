import React from 'react'
import { connect } from 'dva'
import Aside from '../../components/Index/wb/aside'
import List from '../../components/Index/wb/list'
import Echarts from '../../components/Index/wb/echarts'
import styles from './wb.less'

function index(){
    return (
        <div className={styles.wb_main}>
            <Aside />
            <List />
            <Echarts />
        </div>
    )
}
export default connect()(index);