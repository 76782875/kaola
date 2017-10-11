import React from 'react'
import { connect } from 'dva'
import { Form, Input, Button, Row, Col, Icon } from 'antd'
import styles from './Login.css'
const FormItem = Form.Item;
const Login = (
    {
        dispatch,
        form:{
            getFieldDecorator,
            validateFieldsAndScroll,
        }
    }
) => {
    function handleLogin(e){
        e.preventDefault();
        validateFieldsAndScroll((err, values) =>{
            if(!err){
                dispatch({
                    type: "login/fetchLogin",
                    payload: values
                });
            }
        })
    }

    return (
        <div className={styles.loginForm}>
            <Row className={styles.antRow}>
                <Col>
                    <Form onSubmit={handleLogin}>
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
                            <label>密码</label>
                            {
                                getFieldDecorator('password', {
                                    rules: [{ required: true, message: '请输入密码！' }]
                                })(
                                    <Input type="password" prefix={<Icon type="lock" style={{ fontSize: 13 }} />} placeholder="密码" />
                                    )
                            }
                        </FormItem>
                        <FormItem>
                            <Button  className={styles.loginBtn} htmlType="submit" >登录</Button>
                        </FormItem>
                    </Form>
                </Col>
            </Row>
        </div>
    )
}
export default connect()(Form.create()(Login))
