import React from 'react'
import { connect } from 'dva'
import styles from './index.less'
import OrderDetailComponent from '../../components/OrderDetail'

class OrderDetail extends React.Component{
     render(){
         return(
             <OrderDetailComponent />
         )
     }
}

export default connect()(OrderDetail);