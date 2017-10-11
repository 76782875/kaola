import React from 'react'
import {connect} from 'dva'
import styles from './index.less'
import {Modal, Table, Icon, Button, Input, Checkbox, Spin} from 'antd'
import classnames from "classnames"
import OrderModalComponent from '../orderModal/index'

const setOrder = classnames({[styles.commonBtn]: true, [styles.orderOwn]: true});
const recommend = classnames({[styles.commonBtn]: true, [styles.recommendOwn]: true});


class Footer extends React.Component {

    /**
     * 清空购物车弹框
     */
    showCarModal = (status) => {
        this.props.dispatch({
            type: 'cart/showClearModal',
            payload: status,
        });
    }
    handleOk = () => {
        const {mpData} = this.props.mpParames;
        const {wbData} = this.props.wbParames;
        this.props.dispatch({
            type: 'cart/clearCar',
            payload: {mpData, wbData}
        });
        this.showCarModal(false)
    }
    handleCancel = () => {
        this.showCarModal(false)
    }

    /**
     * 最优推荐
     */
    recommendation = () => {
        alert('勾选列表中所有账号的第一个广告位');
    }

    render() {

        const {
            props: {
                dispatch,
                loading,
                visibleCar,
                visibleOrder,
                wbCartCount,
                mpCartCount,
                mpParames: {
                    mpData,
                    mpTotal,
                    mpPage,
                    mpPageSize,
                },
                wbParames: {
                    wbData,
                    wbTotal,
                    wbPage,
                    wbPageSize,
                },
                isSuccess,
                totalPrize
            }
        } = this

        return (
            <div className={styles.cartMain}>
                <footer className={styles.footer}>
                    <div className={styles.leftP}>
                        <Spin spinning={loading['cart/getCartTotalPrize']} style={{width: "100%"}}>
                                <span>
                                    已选 <em className={styles.textCount}>{mpCartCount}</em> 微信 + <em
                                    className={styles.textCount}>{wbCartCount}</em> 微博
                                </span>
                            <span className={styles.total}>预计总额：<em>{totalPrize}</em>
                                </span>
                            <Button className={styles.clearCar} onClick={this.showCarModal.bind(this, true)}>
                                清空购物车
                            </Button>
                            {/* <button className={recommend} onClick={this.recommendation.bind(this)}>最优推荐</button> */}
                        </Spin>
                    </div>
                    {/* <button className={setOrder} onClick={showSetOrderModal.bind(this,true)}>立即下单</button> */}
                    <OrderModalComponent canOrder={mpData.length > 0 || wbData.length > 0}>
                        <Button type="primary" >立即下单</Button>
                    </OrderModalComponent>
                </footer>

                <Modal
                    title="清空提示"
                    visible={visibleCar}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    closable={false}
                    className={styles.clearModal}
                >
                    <p>确定清空购物车？</p>
                </Modal>
                {/* <OrderModalComponent /> */}
            </div>
        );
    }
}


function mapStateToProps(state) {
    const {
        cart: {
            mpParames,
            wbParames,
            totalPrize
        },
        app: {
            wbCartCount,
            mpCartCount
        }

    } = state;
    return {
        loading: state.loading.effects,
        mpParames,
        wbParames,
        wbCartCount,
        mpCartCount,
        totalPrize,
        visibleOrder: state.cart.visibleOrder,
        visibleCar: state.cart.visibleCar,
    }
}

export default connect(mapStateToProps)(Footer);
