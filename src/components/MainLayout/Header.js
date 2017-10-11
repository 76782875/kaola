import React from 'react';
import {connect} from 'dva';
import {Menu, Icon, Radio, Avatar, Badge} from 'antd';
import {Link} from 'dva/router';
import styles from './Header.less';

const RadioGroup = Radio.Group;

function Header({location, history, wbCartCount, mpCartCount, username}) {

    let cartCount = "",
        pathname = "";
    if (["/wb", "/"].indexOf(location.pathname) !== -1) {
        cartCount = wbCartCount;
        pathname = "/wb";
    } else if (location.pathname == "/mp") {
        cartCount = mpCartCount;
        pathname = "/mp";
    } else {
        cartCount = 0;
        pathname = "";
    }


    return (
        <div className={styles.header}>
            <div>
                <Link to="/wb"><img src={require("../../assets/logo.png")} className={styles.logo}/></Link>
            </div>
            <div>
                <span>选号平台：</span>
                <RadioGroup onChange={(e) => {
                    history.push(e.target.value);
                }} defaultValue={pathname}>
                    <Radio value='/wb'>微博</Radio>
                    <Radio value='/mp'>微信</Radio>
                </RadioGroup>
            </div>

            <Menu
                selectedKeys={[location.pathname]}
                mode="vertical"
                theme="dark"
                className={styles.center}
            >

                <Menu.Item key="/myOrder" className={styles.li}>
                    <Link to="/myOrder"><Icon type="appstore"/>订单管理</Link>
                </Menu.Item>
                <Menu.Item key="/cart" className={styles.li}>
                    <Badge count={cartCount} style={{background: "#21e7b6"}}><Link to="/cart"><Icon
                        type="shopping-cart"/>选号车</Link></Badge>
                </Menu.Item>
            </Menu>

            <div className={styles.kf}>
                <span style={{verticalAlign: "middle", marginRight: 10}}><Icon type="question-circle-o"/> 联系客服</span>
                <Avatar style={{verticalAlign: "middle", marginRight: 10}}
                        src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"/>
                <span style={{verticalAlign: "middle"}}>{username}</span>
            </div>
        </div>
    );
}

function mapStateToProps(state) {
    const {
        app: {
            wbCartCount, mpCartCount
        },
        login: {
            username
        }
    } = state;
    return {
        wbCartCount,
        mpCartCount,
        username
    }
}

export default connect(mapStateToProps)(Header);
