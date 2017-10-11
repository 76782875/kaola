import { ajaxApi } from '../utils'

export function wbList(data){
    return ajaxApi('/wbmedias',{
        mathod:'get',
        data,
    })
} 