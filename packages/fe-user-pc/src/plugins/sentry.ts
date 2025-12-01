import * as Sentry from '@sentry/react'
import SentryRRWeb from '@sentry/rrweb'
import packageInfo from '../../package.json'
const { name, version } = packageInfo

const release = name + '-v' + version

if (BUILD_ENV === 'pro' && RUN_ENV !== 'local') {
    Sentry.init({
        // 这里使用自己项目的dsn
        dsn: 'https://a27efd6faf2d4459946606e0ee41c62e@sentry.wozp.cn/8',
        // 在sentry上传请求之前
        // 根据需要自己配置
        beforeSend: event => {
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
            'ResizeObserver loop completed with undelivered notifications',
            'ResizeObserver loop limit exceeded',
            'Request failed with status code',
            'ChunkLoadError',
            'UnhandledRejection',
            'SecurityError',
            'Failed to fetch',
            'TypeError',
        ],
        environment: BUILD_ENV, // 环境
        release, // 版本号
    })
}
