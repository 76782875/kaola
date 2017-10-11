import axios from 'axios';
import querystring from 'query-string';
import { browserHistory } from 'react-router';
import {notification} from 'antd';
export function delQueStr(url, ref) {
    var str = "";
    if (url.indexOf('?') != -1) {
        str = url.substr(url.indexOf('?') + 1);
    } else {
        return url;
    }
    var arr = "";
    var returnurl = "";
    var setparam = "";
    if (str.indexOf('&') != -1) {
        arr = str.split('&');
        for (var i in arr) {
            if (arr.hasOwnProperty(i)) {
                if (arr[i].split('=')[0] != ref) {
                    returnurl = returnurl + arr[i].split('=')[0] + "=" + arr[i].split('=')[1] + "&";
                }
            }
        }
        return url.substr(0, url.indexOf('?')) + "?" + returnurl.substr(0, returnurl.length - 1);
    } else {
        arr = str.split('=');
        if (arr[0] == ref) {
            return url.substr(0, url.indexOf('?'));
        } else {
            return url;
        }
    }
}
// 路由跳转
export function changeRoute(route, params) {
    window.location.hash = route+ (!params ? '' : ("?" + formUrlencodedData(params)));
}

export function getUrlParam(name) {
    var reg = new RegExp("[?&]" + name + "=([^&]*)");
    var r = location.href.match(reg);
    if (r != null) return unescape(r[1]);
    return '';
}
export function formUrlencodedData(data) {
    let str = "";
    for (let i in data) {
        if (data.hasOwnProperty(i)) {
            str = str + i + "=" + data[i] + "&";
        }
    }
    return str ? str.substring(0, str.length - 1) : '';
}

function errHandle(res) {
    notification['error']({
        message: `错误码${res.code}`,
        description: res.message
    })
}

function parse(response) {
    let result = response.data;
    if (!result) {
        throw "服务器返回数据错误";
    }
    if (result.code == 401) {
        window.localStorage.setItem("token", "");
        window.localStorage.setItem("username", "");
        window.location.href = "/login";
        throw result;
    }
    if (result.code != 0) {
        throw result;
    }
    return result.data;
}
export async function ajaxApi(url, options = {}) {
    let params = {},
        method = (options.method || 'get').toLowerCase(),
        data = options.data || {};
    params.url = url;
    params.method = method;
    params.baseURL = 'http://kaolabackend.test.weisgj.com';
    switch(method){
        case 'get' :
            params.params = data;
            break;
        case 'post' :
            params.data = querystring.stringify(data);
            break;
        case 'delete' :
            params.params = data;
            break;
        case 'put' :
            params.data = querystring.stringify(data);
            break;
    }
    let token = window.localStorage.getItem("token");
    if (token) {
        params.headers = { Authorization: token };
    }
    // catch写在前面能阻断model effect里面的执行
    return await axios(params).catch(errHandle).then(parse);
}


export function trim(str) {
    if (!str) return false;
    return str.replace(/(^\s*)|(\s*$)/g, "");
};
export function isBothSpace(ui) {
    var valid = /(^\s)|(\s$)/;
    return (valid.test(ui));
}

export function isPositiveInteger(num) {
    return /^[1-9][0-9]*$/.test(num);
}

export const isEmpty = function (str) {
    if (!str || str === "undefined" || str === "null" || JSON.stringify(str) == '{}') return true;
    return false;
}

export const validDigits = function(num, bit) {
    if (isEmpty(num)) return false;
    return num.toFixed(bit);
}

