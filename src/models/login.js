import * as loginService from '../services/login';
import {routerRedux} from 'dva/router';
export default {
    namespace: 'login',
    state: {
        loginLoading: false,
        page: null,
        total: null,
        formPage: false,
        username: '',
    },
    reducers: {
        setShow(state, {payload: formPage}) {
            return {...state, formPage}
        },
        setUsername(state, {payload: username}) {
            return {...state, username}
        }
    },
    effects: {
        * fetchLogin({payload: values}, {put, call}) {
            const {username, password} = values;
            const result =  yield call(loginService.getToken, {
                username,
                password
            });
            if (result) {
                window.localStorage.setItem("token", result.token);
                window.localStorage.setItem("username", username);
                yield put({
                    type: 'setUsername',
                    payload: username
                })
                yield put(routerRedux.push('/wb'));
            }
        },
        * fetchRegister({payload: values}, {put, call}) {
            const {data, headers} = yield call(loginService.getToken, {
                username: values.username,
                password: values.password,
                page: page
            });
        },

        * loginFlow(_, {take, fork, takeEvery, select}) {
            while (true) {
                const {payload: {username, password}} = yield take("fetchLogin");
                console.log(username, password);
            }
        }
    },
}
