import Reactr from 'react'
import styles from './index.less'
import MyOrderComponent from '../../components/MyOrder'
import { connect } from 'dva'


function MyOrder(){
    return(
        <div>
            <MyOrderComponent />
        </div>
    )
}

export default connect()(MyOrder);

