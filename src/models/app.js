import * as mediaServices from '../services/media';
import * as CartSerives from '../services/cart';

export default {
    namespace: 'app',
    state: {
        wbCartCount: 0,
        mpCartCount: 0
    },
    reducers: {

        setCartCount(state, {payload: {wbCount, mpCount}}) {
            return {
                ...state,
                'wbCartCount': wbCount,
                'mpCartCount': mpCount
            }
        },

        addCartCount(state, {payload: type}) {
            let cartCount = state[`${type}CartCount`];
            return {
                ...state,
                [`${type}CartCount`]: ++cartCount
            }
        },

        deleteCartCount(state, {payload: type}) {
            let cartCount = state[`${type}CartCount`];
            return {
                ...state,
                [`${type}CartCount`]: --cartCount
            }
        }
    },

    effects: {
        * getCartNum(_, {call, put}) {
            const result = yield call(mediaServices.getCartNum);
            yield put({
                type: 'setCartCount',
                payload: result
            })
        },

        * addWbCart({payload: {uid, priceType}}, {call, put, select}) {
            const result = yield call(mediaServices.addWbCart, {uid, priceType});
            yield put({
                type: 'addCartCount',
                payload: 'wb'
            })
            return result;
        },

        * deleteWbCart({payload: id}, {call, put, select}) {
            const result = yield call(CartSerives.deleteWbCart, id);
            yield put({
                type: 'deleteCartCount',
                payload: 'wb'
            })

        },

        * modifyWbCart({payload: {uid, priceType}}, {call, put, select}) {
            return yield call(mediaServices.addWbCart, {uid, priceType});
        },


        * addMpCart({payload: {wxid, priceType}}, {call, put, select}) {
            const result = yield call(mediaServices.addMpCart, {wxid, priceType});
            yield put({
                type: 'addCartCount',
                payload: 'mp'
            })
            return result;
        },

        * deleteMpCart({payload: id}, {call, put, select}) {
            const result = yield call(CartSerives.deleteMpCart, id);
            yield put({
                type: 'deleteCartCount',
                payload: 'mp'
            })

            return result;
        },

        * modifyMpCart({payload: {wxid, priceType}}, {call, put, select}) {
            return yield call(mediaServices.addMpCart, {wxid, priceType});
        },

        // * listenersCartStauts(_, {take}) {
        //     while (true) {
        //         const action = yield take('*');
        //         console.log(action);
        //     }
        // }

    },

    subscriptions: {
        init({dispatch}) {
            const username = localStorage.getItem("username");
            dispatch({
                type: "login/setUsername",
                payload: username
            });
        },
        setup({dispatch, history}) {
            return history.listen(({pathname, search}) => {
                if (["/", "/wb", "/mp", "/cart"].indexOf(pathname) !== -1) {
                    dispatch({
                        type: "getCartNum"
                    })
                }
            });
        },
    }

}
