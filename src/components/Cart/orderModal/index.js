import React from 'react'
import {Modal, Form, Input, notification, DatePicker} from 'antd'
import {connect} from 'dva'
import styles from './index.less'
import moment from 'moment'
import {routerRedux} from 'dva/router'


const FormItem = Form.Item;
const {RangePicker} = DatePicker;

class OrderModalForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
        }
    }

    showModal = () => {

       if (!this.props.canOrder) {
           notification.error({
               message: "选好车空空如也",
               description: "请选择点账号再来下单吧"
           })
           return;
       }
        this.setState({
            visible: true
        })
    }
    setOrderOk = () => {
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.dispatch({
                    type: 'cart/createOrder',
                    payload: {
                        remark: values.remark,
                        name: values.orderName,
                        beginTime: moment(values.time[0]._d).format('YYYY-MM-DD'),
                        endTime: moment(values.time[1]._d).format('YYYY-MM-DD'),
                    }
                })
                 this.setOrderCancel();
            }
        })
    }
    setOrderCancel = () => {
        this.setState({
            visible: false
        })
    }

    disabledDate = (current) => {
        return current && current.valueOf() + 86400000 < Date.now();
    }

    render() {
        const {
            props: {
                dispatch,
                loading,
                isSuccess,
            }
        } = this

        const {getFieldDecorator} = this.props.form;
        return (
            <div>
                <span onClick={this.showModal}>
                    {this.props.children.props.children}
                </span>
                <Modal
                    //visible={visibleOrder}
                    //onOk={setOrderOk}
                    //onCancel={setOrderCancel}
                    visible={this.state.visible}
                    onOk={this.setOrderOk}
                    onCancel={this.setOrderCancel}
                    closable={false}
                    className={styles.orderModal}
                    okText="确认下单"
                >
                    <Form>
                        <FormItem onSubmit={this.setOrderOk}>
                            <h3>订单名称</h3>
                            {
                                getFieldDecorator(
                                    'orderName', {
                                        rules: [{required: true, message: '请输入订单名称！'}]
                                    }
                                )(
                                    <Input placeholder="订单名称" className={styles.orderName}/>
                                )
                            }
                        </FormItem>
                        <FormItem>
                            <h3>投放时间</h3>
                            {
                                getFieldDecorator(
                                    'time', {
                                        rules: [{required: true, message: "请输入起止时间！"}]
                                    }
                                )(
                                    <RangePicker
                                        format="YYYY-MM-DD"
                                        disabledDate={this.disabledDate}
                                        style={{width:"85%"}}
                                    />
                                )
                            }
                            <p style={{color:"#ccc"}}>依次选择开始时间、结束时间</p>
                        </FormItem>
                        <FormItem>
                            <h3>订单备注(选填)</h3>
                            {
                                getFieldDecorator('remark')(
                                    <Input placeholder="请输入备注内容" className={styles.orderName}/>
                                )
                            }

                        </FormItem>
                    </Form>
                    <p className={styles.pText}>提醒：下单后投放不会立即生效，会有媒介人员与您联系沟通具体事宜。紧急投放建议<a href="#"
                                                                                         className={styles.aLink}>直接联系媒介</a>。
                    </p>
                </Modal>
            </div>
        )
    }
}

function mapStateToProps(state) {
    const {
        cart: {
            isSuccess
        },

    } = state;
    return {
        loading: state.loading.effects,
        isSuccess: state.cart.isSuccess,
    }
}

export default connect(mapStateToProps)(Form.create()(OrderModalForm));
