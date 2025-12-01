import { defineConfig } from 'umi'
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const AntDesignThemePlugin = require('antd-theme-webpack-plugin')
const path = require('path')
const prodGzipList = ['js', 'css']

const randomKey = Math.random().toString(36).substring(-10)

export enum ENV {
    LOCAL = 'local',
    DEV = 'dev',
    TEST = 'test',
    PRE = 'pre',
    PRO = 'pro',
}

// export enum APP_TYPE {
//     EXAM = 'exam',
//     EXAM_CENTER = 'exam-center',
//     ENROLL_CENTER = 'enroll-center',
//     ORGANIZATION = 'organization',
//     MERCHANT_CENTER = 'merchant-center',
//     TRAIN_CENTER = 'train-center',
//     TRAINING_CENTER = 'training-center',
//     STUDENT_CENTER = 'student-center',
//     SIGN = 'sign-center',
//     EXAM_SELLER = 'exam-seller',
//     EMPLOYMENT = 'employment',
//     MONITOR_CENTER = 'monitor-center',
//     EXAM_GRID_PAPER = 'exam-grid-paper',
//     TRADING_CENTER = 'trading-center',
// }

// const APP_URL: Record<string, any> = {
//     local: {
//         [APP_TYPE.EXAM]: 'http://localhost:9999',
//         [APP_TYPE.EXAM_CENTER]: 'http://localhost:8041',
//         [APP_TYPE.ORGANIZATION]: 'http://localhost:8061',
//         [APP_TYPE.ENROLL_CENTER]: 'http://localhost:8081',
//         [APP_TYPE.TRAINING_CENTER]: 'http://localhost:10003',
//         [APP_TYPE.STUDENT_CENTER]: 'http://localhost:10001',
//         [APP_TYPE.MERCHANT_CENTER]: 'http://localhost:9031',
//         [APP_TYPE.SIGN]: 'http://localhost:9011',
//         [APP_TYPE.EXAM_SELLER]: 'http://localhost:8888',
//         [APP_TYPE.EMPLOYMENT]: 'http://localhost:9015',
//         [APP_TYPE.MONITOR_CENTER]: 'http://localhost:9019',
//         [APP_TYPE.EXAM_GRID_PAPER]: 'http://localhost:4567',
//         [APP_TYPE.TRADING_CENTER]: 'http://localhost:8071',
//     },
//     default: {
//         [APP_TYPE.EXAM]: '/subApp/exam_fe_pc/index.html',
//         [APP_TYPE.EXAM_CENTER]: '/subApp/exam-center/index.html',
//         [APP_TYPE.ORGANIZATION]: '/subApp/organization/index.html',
//         [APP_TYPE.ENROLL_CENTER]: '/subApp/enroll-center/index.html',
//         [APP_TYPE.MERCHANT_CENTER]: '/subApp/merchant-center/index.html',
//         [APP_TYPE.TRAIN_CENTER]: '/subApp/career_fe_pc/index.html',
//         [APP_TYPE.TRAINING_CENTER]: '/subApp/training-center/index.html',
//         [APP_TYPE.STUDENT_CENTER]: '/subApp/student-center/index.html',
//         [APP_TYPE.SIGN]: '/subApp/sign-center/index.html',
//         [APP_TYPE.EXAM_SELLER]: '/subApp/exam_seller/index.html',
//         [APP_TYPE.EMPLOYMENT]: '/subApp/employment/index.html',
//         [APP_TYPE.MONITOR_CENTER]: '/subApp/monitor-center/index.html',
//         [APP_TYPE.EXAM_GRID_PAPER]: '/subApp/exam-grid-paper/index.html',
//         [APP_TYPE.TRADING_CENTER]: '/subApp/trading-center/index.html',
//     },
// }

// const getAppUrl = (name: APP_TYPE) => {
//     switch (process.env.RUN_ENV) {
//         case 'local':
//             return APP_URL.local[name]
//         default:
//             return APP_URL.default[name]
//     }
// }

let publicPath = `/` //开发

switch (process.env.BUILD_ENV) {
    case 'dev':
        publicPath = `https://static.zpimg.cn/dev/fe_business_pc/` //开发
        break
    case 'test':
        publicPath = `https://static.zpimg.cn/test/fe_business_pc/` //测试
        break
    case 'pre':
        publicPath = `https://static.zpimg.cn/pre/fe_business_pc/` //预发
        break
    case 'pro':
        publicPath = `https://static.zpimg.cn/pro/fe_business_pc/` //正式
        break
    default:
        //开发
        publicPath = `http://localhost:${process.env.PORT}/`
        break
}

process.env.RUN_ENV === 'local' ? (publicPath = `http://localhost:${process.env.PORT}/`) : ''
// html模版相关配置
const htmlConfig = {
    headScripts: [
        {
            src: 'https://static.zpimg.cn/public/site/alias.js',
        },
        // {
        //     src: `https://static.zpimg.cn/public/fe_saas_pc/iconfont.js?randomKey=${randomKey}`,
        // },
        {
            src: 'https://static.zpimg.cn/public/default/default_image.js',
        },
        {
            src: 'https://static.zpimg.cn/public/utils/pc-rem.js',
        },
    ],
    metas: [
        {
            httpEquiv: 'Access-Control-Allow-Origin',
            content: '*',
        },
        {
            httpEquiv: 'Cache-Control',
            content: 'no-cache',
        },
        {
            httpEquiv: 'Pragma',
            content: 'no-cache',
        },
        {
            httpEquiv: 'Expires',
            content: '0',
        },
        {
            name: 'apple-mobile-web-app-capable',
            content: 'yes',
        },
        {
            name: 'viewport',
            content:
                'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover',
        },
    ],
}

export default defineConfig({
    title: false,
    base: '/',
    hash: true,
    publicPath,
    runtimePublicPath: false,
    //忽略 moment 的 locale 文件，用于减少尺寸
    ignoreMomentLocale: true,
    outputPath: `./dist`,
    esbuild: {
        target: 'es2015',
    },
    // jsMinifier: 'terser',
    // mfsu: {},
    qiankun: {
        master: {
            //     apps: [
            //         {
            //             name: 'exam',
            //             entry: getAppUrl(APP_TYPE.EXAM),
            //         },
            //         {
            //             name: 'exam-center',
            //             entry: getAppUrl(APP_TYPE.EXAM_CENTER),
            //         },
            //         {
            //             name: 'organization',
            //             entry: getAppUrl(APP_TYPE.ORGANIZATION),
            //         },
            //         {
            //             name: 'enroll-center',
            //             entry: getAppUrl(APP_TYPE.ENROLL_CENTER),
            //         },
            //         {
            //             name: 'merchant-center',
            //             entry: getAppUrl(APP_TYPE.MERCHANT_CENTER),
            //         },
            //         {
            //             name: 'train-center',
            //             entry: getAppUrl(APP_TYPE.TRAIN_CENTER),
            //         },
            //         {
            //             name: 'sign-center',
            //             entry: getAppUrl(APP_TYPE.SIGN),
            //         },
            //         {
            //             name: 'exam-seller',
            //             entry: getAppUrl(APP_TYPE.EXAM_SELLER),
            //         },
            //         {
            //             name: 'fe-job-pc',
            //             entry: getAppUrl(APP_TYPE.EMPLOYMENT),
            //         },
            //         {
            //             name: 'monitor-center',
            //             entry: getAppUrl(APP_TYPE.MONITOR_CENTER),
            //         },
            //         {
            //             name: 'exam-grid-paper',
            //             entry: getAppUrl(APP_TYPE.EXAM_GRID_PAPER),
            //         },
            //         {
            //             name: 'training-center',
            //             entry: getAppUrl(APP_TYPE.TRAINING_CENTER),
            //         },
            //         {
            //             name: 'trading-center',
            //             entry: getAppUrl(APP_TYPE.TRADING_CENTER),
            //         },
            //         {
            //             name: 'student-center',
            //             entry: getAppUrl(APP_TYPE.STUDENT_CENTER),
            //         },
            //     ],
            //     routes: [
            //         {
            //             path: '/exam',
            //             microApp: 'exam',
            //         },
            //         {
            //             path: '/exam-center',
            //             microApp: 'exam-center',
            //         },
            //         {
            //             path: '/organization',
            //             microApp: 'organization',
            //         },
            //         {
            //             path: '/enroll-center',
            //             microApp: 'enroll-center',
            //         },
            //         {
            //             path: '/merchant-center',
            //             microApp: 'merchant-center',
            //         },
            //         {
            //             path: '/train-center',
            //             microApp: 'train-center',
            //         },
            //         {
            //             path: '/training-center',
            //             microApp: 'training-center',
            //         },
            //         {
            //             path: '/sign-center',
            //             microApp: 'sign-center',
            //         },
            //         {
            //             path: '/exam-seller',
            //             microApp: 'exam-seller',
            //         },
            //         {
            //             path: '/employment-center',
            //             microApp: 'fe-job-pc',
            //         },
            //         {
            //             path: '/monitor-center',
            //             microApp: 'monitor-center',
            //         },
            //         {
            //             path: '/exam-grid-paper',
            //             microApp: 'exam-grid-paper',
            //         },
            //         {
            //             path: '/trading-center',
            //             microApp: 'trading-center',
            //         },
            //         {
            //             path: '/student-center',
            //             microApp: 'student-center',
            //         },
            //     ],
            //     sandbox: true, //是否启用沙箱
            //     prefetch: 'all', //是否启用预加载
            //     excludeAssetFilter: (url: string) => {
            //         const microAppAssetFilterWhiteWords = [
            //             'map.qq.com',
            //             'turing.captcha.gtimg.com',
            //             'turing.captcha.qcloud.com',
            //             'qiyukf.com',
            //         ]
            //         return microAppAssetFilterWhiteWords.some(word => {
            //             return url.includes(word)
            //         })
            //     },
        },
        // slave: {
        //     masterEntry:
        //         process.env.NODE_ENV === 'development' ? 'https://chuhe.cloud.wozp.cn' : undefined,
        // },
    },
    dynamicImport: {
        //自定义loading组件
        loading: '@/components/PageLoading/index',
    },
    antd: false,
    autoprefixer: {
        remove: false,
    },
    lessLoader: {
        lessOptions: {
            javascriptEnabled: true,
        },
    },
    targets:
        process.env.RUN_ENV !== 'local'
            ? {
                ie: 11,
            }
            : {
                chrome: 79,
                firefox: false,
                safari: false,
                edge: false,
                ios: false,
            },
    terserOptions: {
        compress: {},
        mangle: {
            safari10: false,
        },
        ie8: false,
        safari10: false,
    },
    define: {
        RUN_ENV: process.env.RUN_ENV,
        BUILD_ENV: process.env.BUILD_ENV,
        ALIAS_ENV: process.env.ALIAS_ENV,
        PUBLIC_PATH: publicPath,
        defaultImage: 'https://zpimg.cn/a/img/img.png',
        defaultLogo: 'https://zpimg.cn/a/img/logo.png',
        defaultAvatar: 'https://zpimg.cn/a/img/avatar.png',
        defaultOrgLogo: 'https://static.zpimg.cn/public/fe_user_pc/images/default_org@2x.png',
    },
    nodeModulesTransform: {
        type: 'none',
        exclude: ['@wotu'],
    },
    inlineLimit: 10,
    devtool: process.env.BUILD_ENV !== 'pro' ? 'source-map' : 'eval',
    extraBabelPlugins:
        process.env.BUILD_ENV === 'pro' && process.env.RUN_ENV !== 'local'
            ? ['transform-remove-console']
            : [],
    fastRefresh: {},
    ...htmlConfig,
    webpack5: {
        // lazyCompilation: {
        //     imports: true,
        // },
    },
    theme: { '@font-size-base': '16px' },
    chainWebpack(config: any, { webpack }: any) {
        // .(m)js 文件编译优化
        config.module
            .rule('esmJs')
            .test(/\.m?js/)
            .resolve.set('fullySpecified', false)
        // 更改主题色
        // config.plugin('antd-theme-webpack-plugin').use(
        //     new AntDesignThemePlugin({
        //         lessUrl: 'https://static.zpimg.cn/public/less_2.7.3/less.min.js',
        //         antDir: path.join(__dirname, './node_modules/antd'), //antd包位置
        //         stylesDir: path.join(__dirname, './src/styles/theme'), //指定皮肤文件夹
        //         varFile: path.join(__dirname, './src/styles/theme/variables.less'), //自己设置默认的主题色
        //         // indexFileName: './public/index.html',
        //         mainLessFile: path.join(__dirname, './src/styles/theme/index.module.less'),
        //         // outputFilePath: path.join(__dirname, `./dist/${customPath}/mycolor.less`), //输出到什么地方
        //         themeVariables: [
        //             //要改变的主题变量
        //             '@primary-color',
        //             '@btn-primary-bg',
        //             // '@btn-default-bg',
        //             '@my-btn-hover-bg',
        //         ],
        //         generateOnce: false,
        //     }),
        // )
        if (process.env.BUILD_ENV === 'pro' && process.env.RUN_ENV !== 'local') {
            // 分包
            config.merge({
                optimization: {
                    minimize: true,
                    splitChunks: {
                        chunks: 'all',
                        minSize: 20000, //生成块的最小大小（以字节为单位）1024字节=1KB。
                        minChunks: 2, //拆分前必须共享模块的最小块数。
                        maxInitialRequests: 30, //入口点的最大并行请求数。
                        automaticNameDelimiter: '.',
                    },
                },
            })

            // 去除无用moment 如有应用moment 必须打开 尽量使用dayjs
            // config
            //   .plugin('replace')
            //   .use(require('webpack').ContextReplacementPlugin)
            //   .tap(() => {
            //     return [/moment[/\\]locale$/, /zh-cn|en-us/]
            //   })

            // 代码压缩
            config.plugin('compression-webpack-plugin').use(
                new CompressionWebpackPlugin({
                    // filename: 文件名称，这里我们不设置，让它保持和未压缩的文件同一个名称
                    algorithm: 'gzip', // 指定生成gzip格式
                    test: new RegExp('\\.(' + prodGzipList.join('|') + ')$'), // 匹配哪些格式文件需要压缩
                    threshold: 10240, //对超过10k的数据进行压缩
                    minRatio: 0.6, // 压缩比例，值为0 ~ 1
                }),
            )
        }
    },
    analyze: {
        analyzerMode: 'server',
        analyzerPort: 8014,
        openAnalyzer: true,
        // generate stats file while ANALYZE_DUMP exist
        generateStatsFile: false,
        statsFilename: 'stats.json',
        logLevel: 'info',
        defaultSizes: 'parsed', // stat  // gzip
    },
})
