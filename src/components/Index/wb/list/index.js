import React from 'react'
import styles from './index.less'
import { Table } from 'antd'
import {connect} from 'dva'

class List extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        const {
            props:{
                wbList:{
                    list:{list}
                }
            }
        } = this;
        console.warn(list);
        const column = [
            {
                title:'头像',
                dataIndex:'avatar',
                width:'',
                render:(avatar,item) => {
                    return (
                        <div>
                            <span className={styles.imgs}>
                                <img src={item.avatar} />
                            </span>
                        </div>
                    )
                }
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
                render: () => {
                    return(
                        <div>

                        </div>
                    );
                }
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
                    dataSource = {list}
                    rowKey = 'id'
                >

                </Table>
            </div>
        )
    }
}
function mpStateToProps(state){
    const {
        wbList
    } = state.index;
    // console.warn(list);
    return{
        wbList,
    }
}
export default connect(mpStateToProps)(List);