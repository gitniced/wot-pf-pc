/* eslint-disable no-case-declarations */
import type { AxiosPromise, Method, AxiosResponse } from 'axios'
import axios from 'axios'
import GlobalLoading from '@/components/Global/Loading'
import kingUrl from '../kingUrl'
import { message } from 'antd'
import type { RequestConfig } from './interface'
import { getCookie, delCookie, getSessionStorage, setCookie, getLocalStorage } from '@/storage'
import type { AnyObj } from '@/types'
import { PERSON_TEACHER_IDENTITY_MAP_STRING } from '@/types'
import { findSiteData } from '@wotu/wotu-components'
import { getDomain } from '@/utils/urlUtils'
import domainJson from '@/domain/domain.json'
import { history } from 'umi'
import { LOGIN_TYPE_STR_TO_NUM, MERCHANT_LOGIN_TYPE } from '@wotu/wotu-components/dist/esm/Types'
import doToLogin from '@/utils/doToLogin'

const GlobalLoadingDom = GlobalLoading()

// 请求重复过滤
const requestSet: Set<string> = new Set()

// 动画加载队列
let loadingTimer: number | null = null

const Http = axios.create({
    baseURL: kingUrl,
    headers: {
        'Content-Type': 'application/json',
    },
})

/**
 * 获取请求标识
 * @param config
 * @returns
 */
const getRequestId = (config: RequestConfig): string => {
    let { url, data = {}, params = {} } = config

    // response config 的data或params是被序列号后的数据
    typeof data === 'string' ? (data = JSON.parse(data)) : ''
    typeof params === 'string' ? (params = JSON.parse(params)) : ''

    return encodeURIComponent(`${url}${JSON.stringify(data)}${JSON.stringify(params)}`)
}

/**
 * 显示加载动画
 * @param delay
 */
const showLoading = (delay: number) => {
    loadingTimer !== null && window.clearTimeout(loadingTimer)

    loadingTimer = window.setTimeout(() => {
        GlobalLoadingDom.show('正在上传中...')
    }, delay)
}

/**
 * 隐藏动画加载
 */
const hideLoading = () => {
    if (loadingTimer !== null) {
        window.clearTimeout(loadingTimer)

        // 关闭加载动画
        GlobalLoadingDom.close()
    }
}

/**
 * 请求拦截器
 */
Http.interceptors.request.use(
    (config: RequestConfig) => {
        // console.log(config)
        const { delayTime = 1000 * 80 } = config

        // 修改请求超时时间
        config.timeout = delayTime
        // 请求头添加token
        if (getCookie('TOKEN')) {
            config.headers.Authorization = getCookie('TOKEN')
        }

        // 开启过滤空数据(例如：get请求数据查询)
        if (config.filterEmptyData === true) {
            // 过滤get空数据
            if (config.method?.toLowerCase() === 'get') {
                const filterParams: AnyObj = {}

                for (const key in config.params) {
                    const val = config.params[key]

                    val !== '' && (filterParams[key] = val)
                }

                config.params = filterParams
            }
        }

        // 文件上传
        // 单独处理格式转换、超时设置、加载动画
        if (config.headers['Content-Type'] === 'multipart/form-data') {
            const formData = new FormData()

            for (const key in config.data) {
                formData.append(key, config.data[key] as any)
            }

            config.data = formData
            config.timeout = 1000 * 600

            showLoading(delayTime)
        }

        // 重复接口过滤
        if (config.repeatFilter !== false) {
            const requestToken = getRequestId(config as RequestConfig)

            // 拦截重复请求，使其处于Promise<pedding>状态
            if (requestSet.has(requestToken)) {
                return new Promise(() => {})
            }

            // 存储请求拦截回调函数
            requestSet.add(requestToken)
        }

        // 接口请求增加alias别名
        // let alias = getCookie('ALIAS') || 'ceshi1'

        // if (alias) {
        //     config.headers['X-Site-Alias'] = alias
        // }

        // 接口请求增加org
        const selectOrgCode = getCookie('SELECT_ORG_CODE')
        if (selectOrgCode) {
            config.headers['X-Site-Org'] = selectOrgCode
        }

        if (ALIAS_ENV !== 'global' && ALIAS_ENV) {
            // @ts-ignore
            if (Number(domainJson?.SPECIAL_USER || 0) === 1) {
                config.headers['X-Site-Alias'] = 'merchant'
            } else {
                config.headers['X-Site-Alias'] = ALIAS_ENV
            }
        }
        // config.headers['SID'] = 64
        return config
    },
    error => {
        // 请求错误处理
        // 配置err显示
        Promise.reject(error)
    },
)

Http.interceptors.response.use(
    res => {
        const requestToken = getRequestId(res.config as RequestConfig)

        // 移除已完成的请求，避免占位
        requestSet.delete(requestToken)

        // 清空加载动画
        hideLoading()

        const { status, config, data } = res
        if (status === 200) {
            const { messageCode, message: requestMessage, success } = data || {}
            if (config.url === '/auth/captcha/captcha.jpeg') {
                return Promise.resolve(data)
            }

            // 请求正常 后端代码报错处理
            if (messageCode.slice(0, 1) === '5' && !requestMessage) {
                message.error('系统繁忙,请稍后再试!', 3)
                return Promise.reject('系统繁忙,请稍后再试!')
            }

            // @ts-ignore
            if (config.form) {
                return Promise.resolve(data)
            } else {
                if (success === true) {
                    return Promise.resolve(data.data)
                } else {
                    message.error(`${requestMessage}`)
                    return Promise.reject(`${requestMessage}`)
                }
            }
        } else {
            message.error('系统繁忙')
            return Promise.reject('系统繁忙')
        }
    },
    error => {
        // 清空加载动画
        hideLoading()
        console.log('http error', error)
        console.log('error.message  ', error.message)
        console.log('error.config', error.config)
        console.log('error.code ', error.code)

        if (!error || !error.response) {
            message.error('网络异常，请稍后再试～', 2)
            return Promise.reject('网络异常，请稍后再试～')
        }
        // 响应错误处理
        const { data = {}, status }: { data: any; status: number } = error.response || {}
        const { config } = error

        const requestToken = getRequestId(config)

        // 移除已完成的请求，避免占位
        requestSet.delete(requestToken)

        // 请求超时
        if (error.code === 'ECONNABORTED' && error.message.indexOf('timeout') !== -1) {
            message.error('请求超时,请稍后再试!', 3)

            return Promise.reject('请求超时,请稍后再试!')
        }

        // 服务端数据处理异常
        if (String(status).slice(0, 1) === '5') {
            message.error('系统繁忙，请稍后再试')
            return Promise.reject('系统繁忙，请稍后再试')
        }

        // http码 405 需要统一提示账号或密码错误
        if (String(status) === '405') {
            message.error('抱歉，您的操作无效，请检查输入并重试')
            return Promise.reject('抱歉，您的操作无效，请检查输入并重试')
        }

        let errResponse: any = ''
        switch (status) {
            case 400:
                errResponse = '400'
                break

            case 401:
                message.destroy()
                message.error('登录已过期，请重新登录', 3)
                const typeEnum = { user: 1, org: 2, merchant: 3, personal_teacher: 4 }
                let selectIdentityCode = getCookie('SELECT_IDENTITY_CODE') || ''
                const selectUserType = getCookie('SELECT_USER_TYPE')

                //@ts-ignore
                typeEnum[selectUserType] &&
                    //@ts-ignore
                    setCookie('FROM_URL_USER_TYPE', typeEnum[selectUserType])

                delCookie('TOKEN')
                delCookie('SELECT_ORG_CODE')
                delCookie('SELECT_ROLE_NAME')
                delCookie('SELECT_USER_TYPE')
                delCookie('USER_CODE')

                if (window) {
                    // 当前环境
                    const platform = getSessionStorage('PLATFORM')

                    // 判断siteStore中的tag为portal时为门户子应用 401时返回门户登录页面
                    if (platform === 'portal') {
                        // 门户应用
                        if (!getCookie('FROM_URL')) {
                            const currentUrl = location.href
                            setCookie('FROM_URL', currentUrl)
                        }
                        history.replace('/user/login')
                    } else {
                        // 非门户应用
                        const { siteData } = getLocalStorage('SITE_STORE') || {}
                        // let loginUrl =
                        //     findSiteData(siteData, 'pcDomain', { findKey: 'baseInfo' }) || ''
                        const merchantUserDomain =
                            findSiteData(siteData, 'merchantUserDomain', { findKey: 'baseInfo' }) ||
                            ''
                        if (merchantUserDomain === getDomain()) {
                            let source_type = getLocalStorage('SOURCE_TYPE')
                            let orderIdentity = getCookie('SELECT_IDENTITY_CODE')
                            if (
                                selectUserType === LOGIN_TYPE_STR_TO_NUM.person_teacher ||
                                source_type === MERCHANT_LOGIN_TYPE.PERSON_TEACHER
                            ) {
                                if (isNaN(orderIdentity)) {
                                    message.error('缺少身份信息')
                                } else {
                                    const orderIdentityMapString =
                                        //@ts-ignore
                                        PERSON_TEACHER_IDENTITY_MAP_STRING[Number(orderIdentity)]
                                    if (orderIdentityMapString) {
                                        setCookie('FROM_URL', location.href)
                                        history.replace(`/teacher/${orderIdentityMapString}/login`)
                                    } else {
                                        message.error('缺少身份信息')
                                    }
                                }
                            } else {
                                history.replace(
                                    `/seller/login?sourceType=${getLocalStorage('SOURCE_TYPE')}`,
                                )
                            }
                        } else {
                            setCookie('FROM_URL', location.href)
                            // let urlLoginType = getCookie('URL_LOGIN_TYPE')
                            // loginUrl = RUN_ENV === 'local' ? 'http://localhost:8011' : loginUrl
                            // loginUrl = loginUrl.split(',')
                            // loginUrl = loginUrl.length > 1 ? loginUrl[1] : loginUrl[0]
                            // window.location.replace(
                            //     `${loginUrl}/account/user/login${
                            //         urlLoginType ? `?logintype=${urlLoginType}` : ''
                            //     }`,
                            // )
                            doToLogin(
                                selectIdentityCode,
                                Number(LOGIN_TYPE_STR_TO_NUM[selectUserType]) || undefined,
                            )
                        }
                    }

                    // @ts-ignore
                    window.self_store.userStore.initStore()
                }
                errResponse = '请先登录'
                break

            case 404:
                errResponse = '404'
                break

            default:
                errResponse = error.response
        }

        if (!config.noMsg) {
            if (Array.isArray(data)) {
                message.error(data[0].message, 3)
            } else {
                if (typeof data === 'object') {
                    message.error(data.message, 3)
                }
            }
        }

        return Promise.reject(errResponse)
    },
)

export default <T, K>(
    url: string,
    method: Method,
    data: T,
    config?: RequestConfig,
): AxiosPromise<K> =>
    Http.request<RequestConfig, AxiosResponse<K>>({
        ...config,
        url,
        method,
        [['get', 'GET'].includes(method) ? 'params' : 'data']: data,
    })
