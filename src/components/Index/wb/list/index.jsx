import React from 'react'
import styles from './index.less'
import { Table } from 'antd'

class List extends React.Component{
    render(){
        const column = [
            {
                title:'头像',
                dataIndex:'id1',
                width:'',
            },{
                title:'自媒体账号',
                dataIndex:'id2',
                width:'',
            },{
                title:'粉丝数(万)',
                dataIndex:'id3',
                width:'',
            },{
                title:'位置-报价',
                dataIndex:'id4',
                width:'',
            },{
                title:'推荐等级',
                dataIndex:'id5',
                width:'',
            },{
                title:'平均转发数',
                dataIndex:'id6',
                width:'',
            },{
                title:'平均评论数',
                dataIndex:'id7',
                width:'',
            },{
                title:'平均点赞数',
                dataIndex:'id8',
                width:'',
            },{
                title:'转赞比',
                dataIndex:'id9',
                width:'',
            },
        ]
        return(
            <div className={styles.list_main}>
                <Table
                    columns = {column}
                    key = 'id'
                >

                </Table>
            </div>
        )
    }
}
export default List;