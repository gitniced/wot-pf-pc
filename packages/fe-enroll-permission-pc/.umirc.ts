import { defineConfig } from 'umi'
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const AntDesignThemePlugin = require('antd-theme-webpack-plugin')
const path = require('path')
const prodGzipList = ['js', 'css']

export enum ENV {
    LOCAL = 'local',
    DEV = 'dev',
    TEST = 'test',
    PRE = 'pre',
    PRO = 'pro',
}

let publicPath = `/` //开发

switch (process.env.BUILD_ENV) {
    case 'dev':
        publicPath = `https://static.zpimg.cn/dev/fe_enroll_permission_pc/` //开发
        break
    case 'test':
        publicPath = `https://static.zpimg.cn/test/fe_enroll_permission_pc/` //测试
        break
    case 'pre':
        publicPath = `https://static.zpimg.cn/pre/fe_enroll_permission_pc/` //预发
        break
    case 'pro':
        publicPath = `https://static.zpimg.cn/pro/fe_enroll_permission_pc/` //正式
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
        {
            src: 'https://static.zpimg.cn/public/fe_saas_pc/iconfont.js?v=2121',
        },
        {
            src: 'https://static.zpimg.cn/public/utils/pc-rem.js',
        },
    ],
    metas: [
        {
            'http-equiv': 'Access-Control-Allow-Origin',
            content: '*',
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
    esbuild: {},
    // mfsu: {},
    qiankun: {
        slave: {},
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
