import React from 'react'
import {connect} from 'dva'
import styles from './index.less'
import {Table, Checkbox} from 'antd'
import classnames from "classnames"

class MpList extends React.Component {
    state = {
        postionSelects: []
    }
    firstComing = false

    componentDidUpdate() {
        this._handleMpMedias();
    }

    _handleMpMedias() {
        const mpMedias = this.props.mpParames,
            postionSelects = this.state.postionSelects,
            firstComing = this.firstComing;
        if (firstComing || mpMedias.mpData.length < 1) return;
        mpMedias.mpData.forEach(medias => {
            postionSelects[medias.id] = [medias.priceType];
        })
        this.firstComing = true;
    }


    handleCart(record, selected) {

        const {postionSelects} = this.state,
            {id, uid, wxid} = record;
        const isFirst = postionSelects[id];
        postionSelects[id] = [selected[selected.length - 1]];
        const priceType = postionSelects[id][0];
        if (isFirst && isFirst[0] && priceType) {
            this.props.modifyCart({wxid, priceType})
        } else {
            if (!priceType) {
                this.props.deleteCart(id);
            } else {
                this.props.addCart({wxid, priceType}).then((res) => {
                    this.setState({
                        postionSelects
                    })
                })
            }
        }

        this.props.dispatch({type:"cart/getCartTotalPrize"});

    }


    /**
     * 列表翻页
     */
    getNextWx = (pagination = {}) => {
        this.props.dispatch({
            type: 'cart/wxFetch',
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
        const {mpData} = this.props.mpParames;
        this.props.dispatch({
            type: 'cart/removeMp',
            payload: {id, mpData},
        });

        this.props.dispatch({type:"cart/getCartTotalPrize"});

    }

    render() {
        const {
            props: {
                dispatch,
                loading,
                visibleCar,
                visibleOrder,
                mpParames: {
                    mpData,
                    mpTotal,
                    mpPage,
                    mpPageSize,
                }
            }
        } = this;

        const columnsMp = [
            {
                dataIndex: "id",
                width: 150,
                render: (id, item) => {
                    return (
                        <div className={styles.imgContainer}><img src={item.mp_media.avatar}/></div>
                    )
                }
            },
            {
                title: "微信公众号",
                width: "10%",
                dataIndex: "mediaName",
                render: (id, item) => {
                    return (
                        <div>
                            <p>{item.mp_media.mediaName}</p>
                            <p>{item.mp_media.wxid}</p>
                        </div>
                    )
                }
            },
            {
                title: "位置-售价",
                dataIndex: "read",
                width: "20%",
                render: (text, item) => {
                    const radioStyle = {
                        display: 'block',
                        height: '20px',
                        fontSize: '12px'
                    };
                    const {priceM0, priceM1, priceM2, priceM3} = item.mp_media;
                    const {postionSelects} = this.state;
                    const id = item.id;
                    return (
                        <Checkbox.Group onChange={this.handleCart.bind(this, item)} value={postionSelects[id]}>
                            {priceM0 ? <Checkbox style={radioStyle} value={1}>单条阅读数￥{priceM0}</Checkbox> : ''}
                            {priceM1 ? <Checkbox style={radioStyle} value={2}>头条阅读数 ￥{priceM1}</Checkbox> : ''}
                            {priceM2 ? <Checkbox style={radioStyle} value={3}>次条阅读数 ￥{priceM2}</Checkbox> : ''}
                            {priceM3 ? <Checkbox style={radioStyle} value={4}>尾条阅读数 ￥{priceM3}</Checkbox> : ''}
                        </Checkbox.Group>
                    );
                }
            },
            {
                title: "平均阅读",
                width: "10%",
                render: (text, item) => {
                    const styleP = {
                        height: '20px',
                        fontSize: '12px'
                    };
                    const {
                        avgReadCnt0Monthly, avgReadCnt1Monthly, avgReadCnt2Monthly, avgReadCnt3Monthly,
                        priceM0, priceM1, priceM2, priceM3
                    } = item.mp_media;
                    return (
                        <div>
                            {priceM0 ? (avgReadCnt0Monthly ? <p style={styleP}>{avgReadCnt0Monthly}</p> :
                                <p>-</p>) : ''}
                            {priceM1 ? (avgReadCnt1Monthly ? <p style={styleP}>{avgReadCnt1Monthly}</p> :
                                <p>-</p>) : ''}
                            {priceM2 ? (avgReadCnt2Monthly ? <p style={styleP}>{avgReadCnt2Monthly}</p> :
                                <p>-</p>) : ''}
                            {priceM3 ? (avgReadCnt3Monthly ? <p style={styleP}>{avgReadCnt3Monthly}</p> :
                                <p>-</p>) : ''}
                        </div>
                    )
                }
            },
            {
                title: "CPM",
                width: "10%",
                render: (text, item) => {
                    const styleP = {
                        height: '20px',
                        fontSize: '12px'
                    }
                    const {
                        avgReadCnt0Monthly, avgReadCnt1Monthly, avgReadCnt2Monthly, avgReadCnt3Monthly,
                        priceM0, priceM1, priceM2, priceM3
                    } = item.mp_media;
                    return (
                        <div>
                            {priceM0 ? (avgReadCnt0Monthly ?
                                <p style={styleP}>{(1000 * priceM0 / avgReadCnt0Monthly).toFixed(2)}</p> :
                                <p>-</p>) : ''}
                            {priceM1 ? (avgReadCnt1Monthly ?
                                <p style={styleP}>{(1000 * priceM1 / avgReadCnt1Monthly).toFixed(2)}</p> :
                                <p>-</p>) : ''}
                            {priceM2 ? (avgReadCnt2Monthly ?
                                <p style={styleP}>{(1000 * priceM2 / avgReadCnt2Monthly).toFixed(2)}</p> :
                                <p>-</p>) : ''}
                            {priceM3 ? (avgReadCnt3Monthly ?
                                <p style={styleP}>{(1000 * priceM3 / avgReadCnt3Monthly).toFixed(2)}</p> :
                                <p>-</p>) : ''}
                        </div>
                    )
                }
            },
            {
                title: "赞阅比",
                dataIndex: "likeReadRatio",
                width: "10%",
                render(text, item) {
                    const {likeReadRatio} = item.mp_media;
                    return likeReadRatio && likeReadRatio.toFixed(2);
                }
            },
            {
                title: "原创备注",
                dataIndex: "priceHardIndirect",
                width: "10%",
                render: (text, item) => {
                    const {acceptOriginal} = item.mp_media;
                    return (
                        <div>
                            {acceptOriginal == 1 ? '接受' : '不接受'}
                        </div>
                    )
                }
            },
            {
                title: "操作",
                dataIndex: "operation",
                render: (text, item) => (
                    <span className={styles.delete} onClick={this.deleteItem.bind(this, item.id, 'wx')}>移除</span>)
            },
        ];


        return (
            <div className={styles.mpMain}>
                <Table
                    dataSource={mpData}
                    columns={columnsMp}
                    loading={loading['cart/mpFetch']}
                    rowKey="id"
                    scroll={{y: 350}}
                    pagination={false}
                />
            </div>
        );
    }
}


function mapStateToProps(state) {
    const {mpParames} = state.cart
    return {
        loading: state.loading.effects,
        mpParames,
        visibleOrder: state.cart.visibleOrder,
        visibleCar: state.cart.visibleCar,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        dispatch,
        addCart: ({wxid, priceType}) => {
            return dispatch({
                type: "app/addMpCart",
                payload: {wxid, priceType}
            });
        },
        deleteCart: (id) => {
            dispatch({
                type: "app/deleteMpCart",
                payload: id
            });
        },
        modifyCart: ({wxid, priceType}) => {
            return dispatch({
                type: "app/modifyMpCart",
                payload: {wxid, priceType}
            });
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MpList);
