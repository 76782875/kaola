import { ajaxApi } from '../utils/'
import ruquest from '../utils/request'
import PAGE_SIZE from '../constants'

export function orderDetailList(data){
    return ajaxApi('/orders/prices',{
        method:'post',
        data
    });
}
