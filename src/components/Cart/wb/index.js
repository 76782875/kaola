import React from 'react'
import {connect} from 'dva'
import styles from './index.less'
import {Modal, Table, Icon, Button, Input, Checkbox} from 'antd'
import classnames from "classnames";
import {Scrollbars} from 'react-custom-scrollbars';

class WbList extends React.Component {

    state = {
        postionSelects: []
    }
    firstComing = false

    componentDidUpdate() {
        this._handleWbMedias();
    }

    _handleWbMedias() {

        const wbMedias = this.props.wbParames,
            postionSelects = this.state.postionSelects,
            firstComing = this.firstComing;
        if (firstComing || wbMedias.wbData.length < 1) return;
        wbMedias.wbData.forEach(medias => {
            postionSelects[medias.id] = [medias.priceType];
        })
        this.firstComing = true;
    }


    /**
     * 列表翻页
     */
    getNextWb = (pagination = {}) => {
        this.props.dispatch({
            type: 'cart/wbFetch',
            payload: {
                page: pagination.current,
                pageSize: pagination.pageSize
            }
        })
    }


    /**
     * 移除操作
     */
    deleteItem = (id, type) => {
        const {wbData} = this.props.wbParames;
        this.props.dispatch({
            type: 'cart/removeWb',
            payload: {id, wbData},
        })

        this.props.dispatch({type:"cart/getCartTotalPrize"});
    }

    /**
     * checkbox操作
     */
    handleCart = (record, selected) => {
        const {postionSelects} = this.state,
            {id, uid} = record;
        const isFirst = postionSelects[id];
        postionSelects[id] = [selected[selected.length - 1]];
        const priceType = postionSelects[id][0];
        if (isFirst && isFirst[0] && priceType) {
            this.props.wbSelect({uid, priceType})
        } else {
            if (!priceType) {
                this.props.deleteSelect(id);
            } else {
                this.props.addSelect({uid, priceType}).then((res) => {
                    this.setState({
                        postionSelects
                    })
                })
            }
        }

        this.props.dispatch({type:"cart/getCartTotalPrize"});


        // dispatch({
        //     type:'cart/checkedFun',
        //     payload:checked,
        // })
    };

    render() {
        const {
            props: {
                dispatch,
                loading,
                visibleCar,
                visibleOrder,
                wbParames: {
                    wbData,
                    wbTotal,
                    wbPage,
                    wbPageSize,
                    wbPostionSelects,
                },

            }
        } = this
        const columnsWb = [
            {
                dataIndex: "id",
                width: "8%",
                render: (id, item) => {
                    return (
                        <div className={styles.imgContainer}><img src={item.wb_media.avatar}/></div>
                    )
                }
            },
            {
                title: "微博账号",
                dataIndex: "name",
                width: "10%",
                render: (id, item) => {
                    return (
                        <div>
                            <p>{item.wb_media.mediaName}</p>
                            <p>{item.wb_media.uid}</p>
                        </div>
                    )
                }
            },
            {
                title: "位置-售价",
                dataIndex: "priceType",
                width: "20%",
                render: (text, item) => {
                    const {priceHardDirect, priceHardIndirect, priceSoftDirect, priceSoftIndirect} = item.wb_media;
                    const {postionSelects} = this.state;
                    const id = item.id;
                    return (
                        <div onClick={(e) => {
                            e.stopPropagation();
                        }}>
                            <Checkbox.Group onChange={this.handleCart.bind(this, item)}
                                            value={postionSelects[id]}>
                                {priceHardDirect ? <Checkbox className={styles.checkboxItem} value={1}>硬广直发
                                    ￥{priceHardDirect}</Checkbox> : ''}
                                {priceHardIndirect ? <Checkbox className={styles.checkboxItem} value={2}>硬广转发
                                    ￥{priceHardIndirect}</Checkbox> : ''}
                                {priceSoftDirect ? <Checkbox className={styles.checkboxItem} value={3}>软广直发
                                    ￥{priceSoftDirect}</Checkbox> : ''}
                                {priceSoftIndirect ? <Checkbox className={styles.checkboxItem} value={4}>软广转发
                                    ￥{priceSoftIndirect}</Checkbox> : ''}
                            </Checkbox.Group>
                        </div>
                    );
                }
            },
            {
                title: "粉丝数",
                dataIndex: "fans",
                width: "10%",
                render: (fans, item) => (
                    <div>{item.wb_media.fans}</div>
                )
            },
            {
                title: "平均转发",
                width: "10%",
                dataIndex: "medianRepostsCnt",
                render: (medianRepostsCnt, item) => (
                    <div>{item.wb_media.medianRepostsCnt}</div>
                )
            },
            {
                title: "平均评论",
                width: "10%",
                dataIndex: "medianCommentsCnt",
                render: (medianCommentsCnt, item) => (
                    <div>{item.wb_media.medianCommentsCnt}</div>
                )
            },
            {
                title: "平均点赞",
                width: "10%",
                dataIndex: "medianAttitudesCnt",
                render: (medianAttitudesCnt, item) => (
                    <div>{item.wb_media.medianAttitudesCnt}</div>
                )
            },
            {
                title: "原创备注",
                width: "10%",
                dataIndex: "acceptOriginal",
                render: (text, item) => {
                    const {acceptOriginal} = item.wb_media;
                    return (
                        <div>
                            {acceptOriginal == 1 ? '接受' : '不接受'}
                        </div>
                    )
                }
            },
            {
                title: "操作",
                width: "10%",
                dataIndex: "operation",
                render: (text, item) => (
                    <span className={styles.delete} onClick={this.deleteItem.bind(this, item.id, 'wb')}>移除</span>)
            },
        ];

        return (
            <div className={styles.wbMain}>
                <Table
                    dataSource={wbData}
                    columns={columnsWb}
                    loading={loading['cart/wbFetch']}
                    rowKey="id"
                    scroll={{y: 350}}
                    pagination={false}
                >
                </Table>
            </div>
        );
    }
}


function mapStateToProps(state) {
    const {wbParames} = state.cart
    return {
        loading: state.loading.effects,
        wbParames,
        visibleOrder: state.cart.visibleOrder,
        visibleCar: state.cart.visibleCar,
        // checked:state.cart.checked,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        dispatch,
        wbSelect: ({uid, priceType}) => {
            return dispatch({
                type: "app/modifyWbCart",//不知道接口，先模拟调一下
                payload: {uid, priceType}
            });
        },
        deleteSelect: (id) => {
            dispatch({
                type: "app/deleteWbCart",
                payload: id
            });
        },
        addSelect: ({uid, priceType}) => {
            return dispatch({
                type: "app/addWbCart",
                payload: {uid, priceType}
            });
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(WbList);
