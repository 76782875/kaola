import React from 'react'
import {connect} from 'dva'
import styles from './index.less'
import {Icon, Table} from 'antd'
import {Link} from 'dva/router'

class OrderDetail extends React.Component {

    constructor(props) {

        super(props)
        this.state = {}
    }

    getNextPage = (e) => {
        this.props.dispatch({
            type: 'orderDetail/listFetch',
            payload: {
                page: e.current,
                pageSize: e.pageSize
            }
        });
    }

    render() {
        const {
            props: {
                page,
                pageSize,
                total,
                list,
                orderInfo,
                loading,
            }
        } = this

        const statusFun = (status) => {
            switch (status) {
                case 1 :
                    return "待媒介处理";
                case '2' :
                    return "执行中";
                case '3' :
                    return "已完成";
                case '-1' :
                    return "已取消";
            }
        }
        const orderInfoMap = [
            {key: "订单名称", value: orderInfo.name,},
            {key: "投放时间", value: orderInfo.beginTime,},
            {key: "订单金额", value: orderInfo.cost,},
            {key: "订单状态", value: statusFun(orderInfo.status)},
            {key: "订单编号", value: orderInfo.id,},
            {key: "订单创建时间", value: orderInfo.created_at,},
            {key: "最后更新时间", value: orderInfo.updated_at,}
        ];
        const columns = [
            {
                title: "小订单编号",
                dataIndex: "id",
                render: (id, item) => {
                    return (
                        <span>{id}</span>
                    )
                }
            },
            {
                title: "平台",
                dataIndex: "mediaId",
                render: (text, item) => {
                    const {mediaType} = item;
                    return (
                        <div>
                            {mediaType == 1 ? <span>微信</span> : null}
                            {mediaType == 2 ? <span>微博</span> : null}
                        </div>
                    )
                }
            },
            {
                dataIndex: "idsss",
                render: (id, item) => {
                    return (
                        <div className={styles.imgContainer}><img src={item.media.avatar}/></div>
                    )
                }
            },
            {
                title: "账号",
                dataIndex: "mediae",
                render: (id, item) => {
                    return (
                        <div>
                            <p>{item.media.mediaName}</p>
                            <p>{item.media.uid}</p>
                        </div>
                    )
                }
            },
            {
                title: "位置",
                dataIndex: "priceType",
                render: (id, item) => {
                    const {mediaType, priceType} = item;
                    const returnTypeWx = (priceType) => {
                        switch (priceType) {
                            case 1 :
                                return '单条';
                                break;
                            case 2 :
                                return '头条';
                                break;
                            case 3 :
                                return '次条';
                                break;
                            case 4 :
                                return '尾条';
                                break;
                        }
                    };
                    const returnTypeWb = (priceType) => {
                        switch (priceType) {
                            case 1 :
                                return '硬广直达';
                            case 2 :
                                return '硬广转发';
                            case 3 :
                                return '软广直发';
                            case 4 :
                                return '软广转发';
                        }
                    };

                    return (
                        <div>
                            {mediaType == 1 ? <span>{returnTypeWx(priceType)}</span> : null}
                            {mediaType == 2 ? <span>{returnTypeWb(priceType)}</span> : null}
                        </div>
                    )
                }
            },
            {
                title: "执行价",
                dataIndex: "cost",
                render: (text, item) => {
                    return (
                        <span>
                            ￥{item.cost}
                        </span>
                    )
                }
            },
            {
                title: "媒介备注",
                dataIndex: "orderId1",
            },
            {
                title: "状态",
                dataIndex: "status",
                render: (text, item) => {
                    return (
                        <div>
                            {item.status == 1 ? <span>待沟通</span> : null}
                            {item.status == 2 ? <span>待执行</span> : null}
                            {item.status == 3 ? <span>成功</span> : null}
                            {item.status == -1 ? <span>拒单</span> : null}
                            {item.status == -2 ? <span>流单</span> : null}
                        </div>
                    )
                }
            },

        ];
        return (
            <div className={styles.orderDetailMain}>
                <div className={styles.detailNav}>
                    <span className={styles.black}>
                        <Link to="/myOrder">
                            <Icon type="left-circle-o"></Icon>
                        </Link>
                    </span>
                    <ul>
                        {orderInfoMap.map((key) => {
                            return (
                                <li key={key.key}>
                                    <span>{key.key}</span>: <span>{key.value}</span>
                                </li>
                            )
                        })}
                    </ul>
                </div>
                <p className={styles.remarks}>备注:-{orderInfo.remark}</p>
                <Table
                    columns={columns}
                    rowKey="id"
                    dataSource={this.props.list}
                    loading={loading['orderDetail/listFetch']}
                    onChange={this.getNextPage.bind(this)}
                    pagination={{
                        current: page,
                        pageSize: pageSize,
                        total: total,
                        showSizeChanger: true,
                        showQuickJumper: true,
                        showTotal: total => `共 ${total} 项`,
                    }}
                >

                </Table>
                <footer className={styles.prompt}>
                    如果您对订单内容有任何疑问，敬请<a>联系媒介</a>。
                </footer>
            </div>
        )
    }
}

function mapStateToProps(state) {
    const {total, list, orderInfo, page, pageSize} = state.orderDetail
    return {
        page,
        pageSize,
        total,
        list,
        orderInfo,
        loading: state.loading.effects,
    }
}

export default connect(mapStateToProps)(OrderDetail);
