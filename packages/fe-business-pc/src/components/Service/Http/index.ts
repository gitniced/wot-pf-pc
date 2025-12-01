/* eslint-disable*/
import { getCookie } from '@/storage'
import { message } from 'antd'
import axios from 'axios'
import { history } from 'umi'

// const GlobalLoadingDom = GlobalLoading()

const getKingUrl = () => {
    let url = ''
    switch (BUILD_ENV) {
        case 'dev':
            url = 'https://apif.wozp.cn' //测试
            break
        case 'pre':
            url = 'https://rapif.wozp.cn' // 灰度预发
            break
        case 'pro':
            url = `https://apif.wozhipei.com` //正式
            break
        default: // 开发
            url = 'https://apif.wozp.cn'
            break
    }
    return url
}

export let kingUrl = getKingUrl()

const Http = axios.create({
    baseURL: getKingUrl(),
    timeout: 80000,
})

/******
 * request拦截器==>对请求参数做处理
 * ******/
Http.interceptors.request.use(
    config => {
        const { url } = config
        if (url.includes('uploads')) {
            config.timeout = 600000
        }
        return config
    },
    error => {
        // 请求错误处理
        // 配置err显示
        Promise.reject(error)
    },
)

/**
 * 拦截响应response，并做一些错误处理
 */
Http.interceptors.response.use(
    response => {
        return Promise.resolve(response)
    },
    error => {
        let { response, code, config } = error || {}
        console.log(response, code, config)
        response = response || {}
        config = config || {}
        let { data, status } = response

        config = config || {}

        if (code === 'ECONNABORTED' && error.message.indexOf('timeout') !== -1) {
            message.error('请求超时,请稍后再试!')
            return Promise.reject('请求超时,请稍后再试!')
        }
        if (axios.isCancel(error)) {
            return {}
        }
        if (status === undefined) {
            return Promise.reject({
                message: '系统繁忙',
                data: { message: '系统繁忙' },
            })
        }
        switch (Number(status || 0)) {
            case 400:
                break
            case 401:
                alert(401)
                break
            case 403:
                if (Number(data.code || 0) === 1001) {
                    // jumpLoginUrl()
                }
                break
            case 404:
                history.replace('/404')
                break
            default:
        }

        if (status !== 401) {
            if (Array.isArray(data)) {
                message.error(data[0] ? data[0].message : data.message)
            } else {
                if (typeof data === 'object') {
                    message.error(data?.message)
                }
            }
        }
        // }
        // 响应错误处理
        return Promise.reject(error.response)
    },
)

const baseRequest = (
    url,
    method = 'get',
    data = {},
    params = {},
    header = {},
    delayTime = 3000,
) => {
    const userType = getCookie('SELECT_USER_TYPE')

    const token = getCookie('TOKEN')

    if (token) {
        //@ts-ignore
        header.Authorization = 'Bearer ' + token
    }

    const myHeaders = {
        'Content-Type': 'application/json',
        'X-Client-Type': 'pc',
        ...header,
    }

    if (userType) {
        const selectIdentityCode = getCookie('SELECT_IDENTITY_CODE')
        //@ts-ignore
        myHeaders['X-User-Type'] =
            userType === 'org' ? 3 : userType === 'user' ? (selectIdentityCode == 6 ? 11 : 1) : ''
    }

    if (userType === 'org') {
        //@ts-ignore
        myHeaders['X-Organization-Code'] = getCookie('SELECT_ORG_CODE') || ''
    }

    // 本地开发环境
    if (ALIAS_ENV !== 'global') {
        //@ts-ignore
        myHeaders['X-Site-Alias'] = ALIAS_ENV
    }

    //@ts-ignore
    const request = Http({
        url,
        method,
        data,
        params,
        delayTime,
        headers: myHeaders,
        baseURL: getKingUrl(),
    })

    return request
}

/**
 * get请求
 * @param urlLink 请求地址
 * @param param 请求地址
 * @param options 请求处理设置
 * @returns {Promise<AxiosResponse>}
 */
export const getData = (urlLink = '', param = {}, options = {}) => {
    //@ts-ignore
    const { headers = {} } = options || {}
    return baseRequest(urlLink, 'get', {}, param, headers)
}

/**
 * post请求
 * @param urlLink 请求地址
 * @param param 请求地址
 * @param options 请求处理设置
 * @returns {Promise<AxiosResponse>}
 */
export const postData = (urlLink = '', param = {}, options = {}) => {
    //@ts-ignore
    const { headers = {} } = options || {}
    return baseRequest(urlLink, 'post', param, {}, headers)
}

/**
 * 上传文件请求
 * @param urlLink 请求地址
 * @param param 表单数据{Object}内部必须file键值对
 * @param options 请求处理设置
 * @returns {Promise<AxiosResponse>}
 */
export const postFile = (urlLink = '', param = {}, options = {}) => {
    //@ts-ignore
    const { headers = {} } = options || {}
    const fileData = new FormData()
    for (const key in param) {
        //@ts-ignore
        fileData.append(key, param[key])
    }
    // 通过append向form对象添加数据
    return baseRequest(
        urlLink,
        'post',
        fileData,
        {},
        { 'Content-Type': 'multipart/form-data', ...headers },
    )
}

export default Http
