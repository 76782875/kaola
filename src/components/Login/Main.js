import React from 'react'
import { routerRedux  } from 'dva/router'
import { connect } from 'dva'
import PropTypes from 'prop-types'
import { Form, Input, Button, Row, Col, Icon } from 'antd'
import styles from './Login.css'
import Particles from 'react-particles-js'
import LoginComponent from './Login'
import RegisterComponent from './Register'
import classnames from 'classnames'

const FormItem = Form.Item;
const Main = (
    {
        dispatch,
        formPage,
    }
) => {
    const formPageClass = classnames({[styles.formPage]:true,[styles.formPageHide]:formPage.login.formPage});
    function onClick(status){
        dispatch({
            type:'login/setShow',
            payload:status
        });
    }

    return (
        <div className={styles.particlesMain}>
            <Particles
                width="100%"
                height="100%"
                params={{
            		particles: {
            			line_linked: {
            				shadow: {
            					enable: true,
            					color: "#3CA9D1",
            					blur: 5
            				}
            			},
                        number: {
                            value: 75,
                            density: {
                                enable: false,
                                value_area: 800
                            }
                        }
            		}
            	}}
            />
            <div className={styles.indexBomp}>
                <div className={styles.indexKol}>
                    <div className={styles.middleLeft}>
                        <h1>Function Introduction</h1>
                        <div>
                            <p>海量账号在线挑选 多维数据分析把关</p>
                            <p>预算方案一键生成 媒介效果全程追踪</p>
                        </div>
                        <div className={styles.btnLeft}>
                            <button>KOL优选</button>
                        </div>
                    </div>
                </div>
                <div className={styles.indexTask}>
                    <div className={styles.btnGroup} onClick={onClick.bind(this,true)}>登陆 / 注册</div>
                    <div className={styles.middleRight}>
                        <div>
                            <p>敬请期待</p>
                        </div>
                        <div className={styles.btnRight}>
                            <button>媒体入驻</button>
                        </div>
                    </div>
                </div>
            </div>
            <div  className={formPageClass} >
                <b className={styles.colse} onClick={onClick.bind(this,false)}>+</b>
                <LoginComponent />
                <RegisterComponent />
                <div className={styles.lineMiddle}></div>
            </div>
        </div>
    )
};
export default connect((formPage) => ({formPage}))(Main);

