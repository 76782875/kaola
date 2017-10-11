import React from 'react'
import styles from './index.less'
import { connect } from 'dva'
import {Radio, Table } from "antd"
import { Link } from "dva/router"


const RadioGroup = Radio.Group;
class MyOrder extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            value:'',
        }

    }

    getNextPage = (e) => {
        this.props.dispatch({
            type:"myOrder/listFetch",
            payload:{
                page:e.current,
                pageSize:e.pageSize,
            }
        });

    }
    checkedFun = (e) =>{
        this.setState({
            value:e.target.value,
        })
        this.props.dispatch({
            type:'myOrder/listFetch',
            payload:{
                status:e.target.value,
                page:1
            }
        });
    }

    render(){
        const {
            props:{
                page,
                total,
                list,
                pageSize,
                loading,
            }
        } = this;
        const radios =[
            {key:"全部订单",value:"",},
            {key:"待媒介处理",value:"1",},
            {key:"执行中",value:"2",},
            {key:"已完成",value:"3",},
            {key:"已取消",value:"-1",},
        ];
        const columns = [
            {
                title:"订单名称",
                dataIndex:"name",
                render:(text,item) => {
                    return(
                        <div>
                            <p>{item.name}</p>
                            <p>{item.id}</p>
                        </div>
                    )
                }
            },
            {
                title:"订单金额",
                dataIndex:"cost",
                render:(text,item) => {
                    return(
                        <span>
                            ￥{item.cost}
                        </span>
                    )
                }
            },
            {
                title:"投放时间",
                dataIndex:"beginTime",
                render:(text,item) => {
                    return(
                        <div>
                            <p>{(item.beginTime).substr(0,10)}</p>
                            <p>{(item.endTime).substr(0,10)}</p>
                        </div>
                    )
                }
            },
            {
                title:"投放账号",
                dataIndex:"idd",
                render:(text,item) => {
                    const { prices } = item;
                    return(
                        <div className={styles.imgs}>
                            {prices.map((key, index) => {

                                if (index <= 14) {
                                    return <div className={styles.imgContainer} key={key.id}><img src={key.avatar}/></div>
                                } else if (index == 15) {
                                    return <div className={styles.imgContainer} key={key.id}>
                                        <span style={{position: "absolute", bottom:0}}>...</span>
                                    </div>
                                }
                            })}
                        </div>
                    )
                }
            },
            {
                title:"备注",
                dataIndex:"remark",
                render:(text,item) => {
                    return(
                        <div>
                            {item.remark ? item.remark : '-'}
                        </div>
                    )
                }
            },
            {
                title:"创建时间/更新时间",
                dataIndex:"created_at",
                render:(text,item) => {
                    return(
                        <div>
                            <p>{item.created_at}</p>
                            <p>{item.updated_at}</p>
                        </div>
                    )
                }
            },
            {
                title:"状态",
                dataIndex:"status",
                render:(text,item) => {
                    return(
                        <div>
                            {item.status == 1 ? <span>待媒介处理</span> : null}
                            {item.status == 2 ? <span>执行中</span> : null}
                            {item.status == 2 ? <span>已完成</span> : null}
                            {item.status == -1 ? <span>已取消</span> : null}
                        </div>
                    )
                }
            },
            {
                title:"操作",
                dataIndex:"id",
                render: (text,item) => {
                    return(
                        <div className={styles.look}>
                            <Link to={{pathname:`/orderDetail/${text}`}} data-id={text}>查看</Link>
                        </div>
                    )
                }
            },
        ];

        console.log(page, pageSize);
        return(
            <div className={styles.myOrderMain}>
                <RadioGroup onChange={this.checkedFun} value={this.state.value}>
                    {radios.map((item) => {
                        return (
                            <span key={item.value}>
                                <Radio value={item.value}>{item.key}</Radio>
                            </span>
                        )
                    }) }
                </RadioGroup>
                <Table
                    columns = {columns}
                    rowKey = "id"
                    dataSource = {this.props.list}
                    loading={loading['myOrder/listFetch']}
                    onChange={this.getNextPage.bind(this)}
                    pagination={{
                        current: page,
                        pageSize,
                        total:total,
                        showSizeChanger: true,
                        showQuickJumper: true,
                        showTotal: total => `共 ${total} 项`,
                    }}
                >

                </Table>
            </div>
        )
    }
}

function mapStateToProps(state){

    const {total,list, page, pageSize} = state.myOrder
    return {
        total,
        list,
        page,
        pageSize,
        loading:state.loading.effects
    }
}

export default connect(mapStateToProps)(MyOrder);
