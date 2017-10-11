import { ajaxApi } from '../utils/'
import ruquest from '../utils/request'
import PAGE_SIZE from '../constants'

export function deleteMpCart(id){
    return ajaxApi(`/mpcart`,{
        method:'DELETE',
        data:{id}
    });
}

export function deleteWbCart(id){
    return ajaxApi(`/wbcart`,{
        method:'delete',
        data:{id}
    });
}

export function deleteAllCart(id){
    return ajaxApi(`/wbcart`,{
        method:'delete',
        data:{id}
    });
}

export function orderMpList(data){
    return ajaxApi('/mpcart',{
        method:'get',
        // data
    });
}

export function orderWbList(data){
    return ajaxApi('/wbcart',{
        method:'get',
        // data
    });
}

export function createOrder(data){
    return ajaxApi('/orders',{
        method:'post',
        data,
    })
}


export function getCartTotalPrize() {
    return ajaxApi("/cart/total", {
        method: "get"
    })
}
