import React from 'react';
import { connect } from 'dva';
import { Button, Icon, Input, Form} from 'antd';
import MainComponent from '../components/Login/Main';
import styles from './Login.css';

function Login(){
    return (
        <div className={styles.login}>
            <MainComponent />
        </div>
    );
}

export default connect()(Login);

