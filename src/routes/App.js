import React from 'react';
import { connect } from 'dva';
import { withRouter } from 'dva/router';
import MainLayout from '../components/MainLayout/MainLayout';
const App = ({children, location, history}) => {
    return (
        <MainLayout location={location} history={history} >
            {children}
        </MainLayout>
    )
}


// 没有被渲染
export default withRouter(App);
