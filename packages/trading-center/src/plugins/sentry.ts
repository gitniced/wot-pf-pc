import * as Sentry from '@sentry/react'
import SentryRRWeb from '@sentry/rrweb'
import { name, version } from '../../package.json'

const release = name + '-v' + version

if (BUILD_ENV === 'pro' && RUN_ENV !== 'local') {
    Sentry.init({
        // 这里使用自己项目的dsn
        dsn: 'https://0352dc88f689486e93dea3427b1adcc2@sentry.wozp.cn/10',
        // 在sentry上传请求之前
        // 根据需要自己配置
        beforeSend: event => {
            // const { originalException } = hint || {}

            // if (Object.prototype.toString.call(originalException) !== '[object String]') {
            //     if (Object.prototype.toString.call(originalException) === '[object Object]') {
            //         let formErrType = ['errorFields', 'outOfDate', 'values']
            //         let isForm = true
            //         formErrType.map(formKey => {
            //             if (!originalException.hasOwnProperty(formKey)) {
            //                 isForm = false
            //             }
            //         })
            //         if (!isForm && window) {
            //             window.location.href = '/500'
            //         }
            //     } else {
            //         if (Object.prototype.toString.call(originalException) === '[object Error]') {
            //             if (originalException.message !== '系统繁忙,请稍后再试!') {
            //                 if (window) {
            //                     window.location.href = '/500'
            //                 }
            //             }
            //         }
            //     }
            // }

            if (window) {
                window.location.href = '/500'
            }
            // 上传自定义属性
            event.extra = {
                site: localStorage.getItem('site'),
                userInfo: localStorage.getItem('userInfo'),
            }
            return event
        },
        integrations: [
            new SentryRRWeb({
                // 每100次事件重新制作快照
                checkoutEveryNth: 100,
                // 每5分钟重新制作快照
                checkoutEveryNms: 15 * 60 * 1000,
                // 是否数据脱敏
                maskAllInputs: true,
            }),
        ],
        // 错误过滤，有些错无需上报
        ignoreErrors: [
            'ResizeObserver loop limit exceeded',
            'Request failed with status code',
            'ChunkLoadError',
            'UnhandledRejection',
            'SecurityError',
        ],
        environment: BUILD_ENV, // 环境
        release, // 版本号
    })
}
