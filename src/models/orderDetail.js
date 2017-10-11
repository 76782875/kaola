import {routerRedux} from 'dva/router'
import * as cartService from '../services/orderDetail'
import pathToRegexp from 'path-to-regexp';

export default {
    namespace: 'orderDetail',
    state: {
        page: 1,
        pageSize: 3,
        orderId: '',
        list: [],
        orderInfo: {},
        total: '',
    },
    reducers: {
        getOrderDetailList(state, {payload: {list, total, orderInfo, newConditions}}) {
            return {
                ...state,
                list, total, orderInfo,
                ...newConditions
            }
        }
    },
    effects: {
        * listFetch({payload: conditions}, {call, put, select}) {

            const {page, pageSize, orderId} = yield select(state => state.orderDetail);

            const newConditions = {
                page, pageSize, orderId,
                ...conditions
            }

            const result = yield call(cartService.orderDetailList, newConditions);
            const {list, total, orderInfo} = result;
            yield put({
                type: 'getOrderDetailList',
                payload: {
                    list,
                    total,
                    orderInfo,
                    newConditions
                }
            });
        }
    },
    subscriptions: {
        setup({dispatch, history}) {
            return history.listen(({pathname, query}) => {
                let re = pathToRegexp("/:orderDetail/:id");
                const result = re.exec(pathname);

                if (!result) return;
                if (result[1] === 'orderDetail') {
                    dispatch({type: 'listFetch', payload: {orderId: result[2]}});
                }
            });
        },
    },
}
