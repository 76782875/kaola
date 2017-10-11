import { ajaxApi } from '../utils';

// 微博详情
export function getWbMediaDetail(data) {
    return ajaxApi("/wbmedias/detail", {
        method: "get",
        data
    })
}

// 近30天基本指标变化图
export function getWbBasicIndicators30(data) {
    return ajaxApi("/wbmedias/trend_summary", {
        method: "get",
        data
    })
}


// 相似性文章
export function getWbSimilarArticle(data) {
    return ajaxApi("/wbmedias/similar", {
        method: "get",
        data
    })
}

// 近30天发文时间段分布
export function getWbPostArticleTime30(data) {
    return ajaxApi("/wbmedias/hour", {
        method: "get",
        data
    })
}


// 近30天发文数变化图
export function getWbPostArticleNum30(data) {
    return ajaxApi("/wbmedias/count", {
        method: "get",
        data
    })
}



//  微信详情
export function getMpMediaDetail(data) {
    return ajaxApi("/mpmedias/detail", {
        method: "get",
        data
    })
}

// 近30天基本指标变化图
export function getMpBasicIndicators30(data) {
    return ajaxApi("/mpmedias/trend_summary", {
        method: "get",
        data
    })
}


// 相似性文章
export function getMpSimilarArticle(data) {
    return ajaxApi("/mpmedias/similar", {
        method: "get",
        data
    })
}

// 近30天发文时间段分布
export function getMpPostArticleTime30(data) {
    return ajaxApi("/mpmedias/hour", {
        method: "get",
        data
    })
}


// 近30天发文数变化图
export function getMpPostArticleNum30(data) {
    return ajaxApi("/mpmedias/count", {
        method: "get",
        data
    })
}



