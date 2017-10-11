import { ajaxApi } from '../utils';


export function getMpMedias(data) {
    return ajaxApi("/mpmedias", {
        method: "get",
        data
    })
}

export function getWbMedias(data) {
    return ajaxApi("/wbmedias", {
        method: "get",
        data
    })
}



export function addWbCart(data) {
    return ajaxApi("/wbcart", {
        method: "post",
        data
    })
}
export function addMpCart(data) {
    return ajaxApi("/mpcart", {
        method: "post",
        data
    })
}

export function getCartNum() {
    return ajaxApi("/cart/count", {
        method: "get"
    })
}
