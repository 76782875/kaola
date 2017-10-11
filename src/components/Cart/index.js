import React from 'react';
import {connect} from 'dva';
import styles from './index.less';
import MpListComponent from './mp/index';
import WbListComponent from './wb/index';
import FooterComponent from './footer/index';

class Cart extends React.Component {

    render() {
        return (
            <div className={styles.cartMain}>
                <MpListComponent/>
                <WbListComponent/>
                <FooterComponent/>
            </div>
        );
    }
}

export default connect()(Cart);
