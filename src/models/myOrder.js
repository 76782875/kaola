import {routerRedux} from 'dva/router'
import * as cartService from '../services/myOrder'

export default {
    namespace: 'myOrder',
    state: {
        page: 1,
        pageSize: 3,
        status: '',
        list: [],
        total: '',
    },
    reducers: {
        getMyOrderList(state, {payload: {list, total, newConditions}}) {
            return {
                ...state,
                list, total,
                ...newConditions
            }
        }
    },
    effects: {
        * listFetch({payload: conditions}, {call, put, select}) {

            const {page, pageSize, status} = yield select(state => state.myOrder);

            const newConditions = {
                page, pageSize, status,
                ...conditions
            }

            const {list, total} = yield call(cartService.myOrderList, newConditions);
            yield put({
                type: 'getMyOrderList',
                payload: {
                    list,
                    total,
                    newConditions
                }
            });
        }
    },
    subscriptions: {
        setup({dispatch, history}) {
            return history.listen(({pathname, query}) => {
                if (pathname === '/myOrder') {
                    dispatch({type: 'listFetch', payload: {}});
                }
            });
        },
    },
}
