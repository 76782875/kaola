import {ajaxApi} from '../utils';

//模拟登录接口
export function getToken(data) {
    return ajaxApi('/session', {
        method: 'post',
        data,
    });
}
