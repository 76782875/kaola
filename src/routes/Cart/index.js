import React from 'react'
import {connect} from 'dva'
import CartComponent from '../../components/Cart'

function Cart(){
    return (
        <div>
            <CartComponent />
        </div>
    );
}

export default connect()(Cart);
