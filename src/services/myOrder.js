import { ajaxApi } from '../utils/'
import ruquest from '../utils/request'
import PAGE_SIZE from '../constants'

export function myOrderList(data){
    return ajaxApi('/orders',{
        method:'get',
        data
    });
}
