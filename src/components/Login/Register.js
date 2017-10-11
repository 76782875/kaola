import React from 'react'
import { routerRedux  } from 'dva/router'
import { connect } from 'dva'
import PropTypes from 'prop-types'
import { Form, Input, Button, Row, Col, Icon } from 'antd'
import styles from './Login.css'
// import 'antd/dist/antd.css'
import Particles from 'react-particles-js';


const FormItem = Form.Item;
const Register = (
    {
        login,
        dispatch,
        form:{
            getFieldDecorator,
            validateFieldsAndScroll,
        }
    }
) => {
    
    function handleRegister(e){
        e.preventDefault();
        validateFieldsAndScroll((err, values) => {
            if(!err){
                dispatch({
                    type:"login/fetchRegister",
                    payload:values
                });
            }
        });
    }
    
    return (
        <div className={styles.registerForm}>
            <Row className={styles.antRowRight}>
                <Col>
                    <Form onSubmit={handleRegister}>
                        <FormItem >
                            <label>用户名</label>
                            {
                                getFieldDecorator('username', {
                                    rules: [{ required: true, message: '请输入用户名！' }]
                                })(
                                    <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="用户名" />
                                    )
                            }
                        </FormItem>
                        <FormItem>
                            <label>手机</label>
                            {
                                getFieldDecorator('phone', {
                                    rules: [{ required: true, message: '请输入手机号码！' }]
                                })(
                                    <Input prefix={<Icon type="mobile" style={{ fontSize: 13 }} />} placeholder="手机号码" />
                                    )
                            }
                        </FormItem>
                        <FormItem>
                            <label>密码</label>
                            {
                                getFieldDecorator('password', {
                                    rules: [{ required: true, message: '请输入密码！' }]
                                })(
                                    <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} placeholder="密码" />
                                    )
                            }
                        </FormItem>
                        <FormItem>
                            <label>确认密码</label>
                            {
                                getFieldDecorator('copyPassword', {
                                    rules: [{ required: true, message: '请再次输入密码！' }]
                                })(
                                    <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} placeholder="密码" />
                                    )
                            }
                        </FormItem>
                        <FormItem>
                            <label>验证码</label>
                            {
                                getFieldDecorator('verification', {
                                    rules: [{ required: true, message: '请输入验证码！' }]
                                })(
                                    <Input prefix={<Icon type="check-circle" style={{ fontSize: 13 }} />} placeholder="验证码" />
                                    )
                            }
                        </FormItem>
                        <FormItem>
                            <Button className={styles.registerBtn}  htmlType="submit">注册</Button>
                        </FormItem>
                    </Form>
                </Col>
            </Row>
        </div>
    )
}
// export default Login;
export default connect(({ login }) => ({ login }))(Form.create()(Register))
// export default connect(({ login, app}) => ({ login, app}))(Form.create()(Login))
