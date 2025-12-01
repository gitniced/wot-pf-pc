import { defineConfig } from 'umi'
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const prodGzipList = ['js', 'css']

let publicPath = `/` //开发

switch (process.env.BUILD_ENV) {
    case 'dev':
        publicPath = `https://static.zpimg.cn/dev/fe-user-organization/` //测试
        break
    case 'test':
        publicPath = `https://static.zpimg.cn/test/fe-user-organization/` //测试
        break
    case 'pre':
        publicPath = `https://static.zpimg.cn/pre/fe-user-organization/` //预发
        break
    case 'pro':
        publicPath = `https://static.zpimg.cn/pro/fe-user-organization/` //正式
        break
    default:
        //开发
        publicPath = `/`
        break
}

process.env.RUN_ENV === 'local' ? (publicPath = `http://localhost:${process.env.PORT}/`) : ''

// html模版相关配置
const htmlConfig = {
    title: '机构中心',
    headScripts: [
        {
            src: 'https://static.zpimg.cn/public/site/alias.js',
        },
        {
            src: 'https://static.zpimg.cn/public/fe_user_pc/iconfont.js',
        },
        {
            src: 'https://static.zpimg.cn/public/utils/pc-rem.js',
        },
        {
            src: 'https://static.zpimg.cn/public/global/global-icons.js',
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
    favicon: 'https://static.zpimg.cn/public/fe_user_pc/images/wotu_32.ico',
}

export default defineConfig({
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
    // dynamicImport: {
    //     //自定义loading组件
    //     loading: '@/components/PageLoading/index',
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
    },
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

// "preinstall": "npx only-allow pnpm",
