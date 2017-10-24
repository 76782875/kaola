import { ajaxApi } from '../utils'

export function wbList(data){
    return ajaxApi('/wbmedias',{
        mathod:'get',
        data,
    })
} 

//近30天基本变化图
export function getBadeMap(data){
    return ajaxApi('/wbmedias/trend_summary',{
        mathod:'get',
        data,
    });
}