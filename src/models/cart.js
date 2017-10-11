import {routerRedux} from 'dva/router'
import * as cartService from '../services/cart'
import {deleteCommon} from '../constants'
import { notification } from 'antd'
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
export default {
    namespace: "cart",
    state: {
        visibleCar: false,
        visibleOrder: false,
        mpParames: {
            mpData: [],
            mpTotal: 0,
            mpPage: 1,
            mpPageSize: 10,
        },
        wbParames: {
            wbData: [],
            wbTotal: 0,
            wbPage: 1,
            wbPageSize: 10,
            wbPostionSelects: [],
        },
        totalPrize: 0,
        isSuccess:false
    },
    reducers: {
        showClearModal(state, {payload: visibleCar}) {
            return {...state, visibleCar};
        },
        clearMpData(state, {payload: mpParames}) {
            return {...state, mpParames};
        },
        clearWbData(state, {payload: wbParames}) {
            return {...state, wbParames};
        },
        setOrder(state, {payload: visibleOrder}) {
            return {...state, visibleOrder}
        },
        checkedFun(state, {payload: checked}) {
            return {...state, checked}
        },


        showOrderMpDate(state, {payload: {data, total, mpPage, mpPageSize}}) {
            return {
                ...state,
                mpParames: {
                    mpData: data,
                    mpTotal: total,
                    mpPage,
                    mpPageSize,
                },
            }
        },
        showOrderWbDate(state, {payload: {data, total, wbPage, wbPageSize}}) {
            return {
                ...state,
                wbParames: {
                    wbData: data,
                    wbTotal: total,
                    wbPage,
                    wbPageSize,
                },
            }
        },

        setSuccess(state,{payload:isSuccess}){
            return {
                ...state,
                isSuccess
            }
        },
        setCartTotalPrize(state, {payload: totalPrize}) {
            return {
                ...state,
                totalPrize: totalPrize
            }
        }
    },
    effects: {
        * mpFetch({payload: {mpPage, mpPageSize}}, {call, put}) {
            const data = yield call(cartService.orderMpList, {mpPage, mpPageSize});
            yield put({
                type: 'showOrderMpDate',
                payload: {
                    data,
                    // total,
                    mpPage,
                    mpPageSize,
                },
            });
        },
        * wbFetch({payload: {wbPage, wbPageSize}}, {call, put}) {
            const data = yield call(cartService.orderWbList, {wbPage, wbPageSize});
            // const {
            //     data,total
            // } = wbResult

            yield put({
                type: 'showOrderWbDate',
                payload: {
                    data,
                    // total,
                    wbPage,
                    wbPageSize,
                }
            });
        },
        * removeMp({payload: values}, {call, put, select}) {
            const result = yield call(cartService.deleteMpCart, values.id);
            deleteCommon(values.mpData, values.id)

            yield put({
                type: "app/deleteCartCount",
                payload: "mp"
            })
        },
        * removeWb({payload: values}, {call, put}) {
            const result = yield call(cartService.deleteWbCart, values.id);
            deleteCommon(values.wbData, values.id);
            yield put({
                type: "app/deleteCartCount",
                payload: "wb"
            })
        },
        * clearCar({payload: values}, {call, put}) {
            const clearResult = yield call(cartService.deleteAllCart, 'all');
            yield put({
                type: 'clearMpData',
                payload: {
                    data: deleteCommon(values.mpData, 'all')
                }
            });
            yield put({
                type: 'clearWbData',
                payload: {
                    data: deleteCommon(values.wbData, 'all')
                }
            });
        },
        * createOrder({payload:values},{call,put}){
            yield call(cartService.createOrder,values);
            yield put({
                type:'setSuccess',
                payload:true,
            });
            const type = 'success';
            notification[type]({
                message: '订单提交成功',
                description: '即将跳转至我的订单列表页面',
            });
            yield delay(500);
            yield put(routerRedux.push('/myOrder'));

        },
        * goOrderDetail({payload: values}, {call, put}) {
            yield put(routerRedux.push('/myOrder'));
        },

        * getCartTotalPrize(_, {call, put}) {
            const totalPrize = yield call(cartService.getCartTotalPrize);
            yield put({
                type: 'setCartTotalPrize',
                payload: totalPrize
            })
        },

        * initCartRoute(_, {all, put}) {
            yield all([
                put({type: 'mpFetch', payload: {wxPage: 1, wxPageSize: 10}}),
                put({type: 'wbFetch', payload: {wbPage: 1, wbPageSize: 10}}),
                put({type: 'getCartTotalPrize'})
            ])
        }

    },
    subscriptions: {
        setup({dispatch, history}) {
            return history.listen(({pathname, query}) => {
                if (pathname === '/cart') {
                    dispatch({type: 'initCartRoute'})
                }
            });
        },
    },
}
