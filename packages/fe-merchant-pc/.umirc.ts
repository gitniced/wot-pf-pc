import { defineConfig } from 'umi'
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const prodGzipList = ['js', 'css']

const PUBLIC_PATH_MAP: Record<string, string> = {
    local: `/`,
    dev: 'https://static.zpimg.cn/dev/fe_merchant_pc/',
    test: 'https://static.zpimg.cn/test/fe_merchant_pc/',
    pre: 'https://static.zpimg.cn/pre/fe_merchant_pc/',
    pro: 'https://static.zpimg.cn/pro/fe_merchant_pc/',
}

let publicPath = PUBLIC_PATH_MAP[process.env.BUILD_ENV || 'local']

process.env.RUN_ENV === 'local' && (publicPath = `http://localhost:${process.env.PORT}/`)

// html模版相关配置
const htmlConfig = {
    headScripts: [
        {
            src: 'https://static.zpimg.cn/public/fe-merchant-pc/iconfonts.js',
        },
        {
            //    用的是考评pc的iconfont库，需要找对应的考评前端
            src: 'https://static.zpimg.cn/public/question_bank/iconfont.js',
        },
        {
            src: 'https://static.zpimg.cn/public/fe-merchant-pc/desmos/zh-CN.js',
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
    publicPath,
    base: '/',
    hash: true,
    runtimePublicPath: true,
    ignoreMomentLocale: true,
    outputPath: `./dist`,
    esbuild: {},
    // mfsu: {},
    qiankun: {
        slave: {},
    },
    // dynamicImport: {
    //     //自定义loading组件
    //     loading: '@/components/PageLoading',
    // },
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
    },
    inlineLimit: 10,
    devtool: process.env.BUILD_ENV !== 'pro' ? 'source-map' : 'eval',
    extraBabelPlugins:
        process.env.BUILD_ENV === 'pro' && process.env.RUN_ENV !== 'local'
            ? ['transform-remove-console']
            : [],
    fastRefresh: {},
    theme: { '@font-size-base': '16px' },
    webpack5: {},
    ...htmlConfig,
    chainWebpack(config: any, { webpack }: any) {
        if (process.env.BUILD_ENV === 'pro' && process.env.RUN_ENV !== 'local') {
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
    externals: {
        less: 'window.less',
    },
    title: false,
    scripts: ['https://static.zpimg.cn/public/less_2.7.3/less.min.js'],
    analyze: {
        analyzerMode: 'server',
        analyzerPort: 8011,
        openAnalyzer: true,
        generateStatsFile: false,
        statsFilename: 'stats.json',
        logLevel: 'info',
        defaultSizes: 'parsed', // stat  // gzip
    },
})
