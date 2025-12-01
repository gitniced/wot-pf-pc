import { defineConfig } from 'umi'
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const AntDesignThemePlugin = require('antd-theme-webpack-plugin')
const path = require('path')
const prodGzipList = ['js', 'css']

let publicPath = `/` //开发

switch (process.env.BUILD_ENV) {
    case 'local':
        publicPath = `/` //本地
        break
    case 'dev':
        publicPath = `https://static.zpimg.cn/dev/organization-pc/` //开发
        break
    case 'test':
        publicPath = `https://static.zpimg.cn/test/organization-pc/` //测试
        break
    case 'pre':
        publicPath = `https://static.zpimg.cn/pre/organization-pc/` //预发
        break
    case 'pro':
        publicPath = `https://static.zpimg.cn/pro/organization-pc/` //正式
        break
    default:
        //开发
        publicPath = `/`
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
        //     src: 'https://static.zpimg.cn/s_proxy.js',
        // },
        // {
        //     src: 'https://static.zpimg.cn/public/fe_user_pc/iconfont.js',
        // },
        {
            src: 'https://static.zpimg.cn/public/fe_organization_pc/iconfont.js',
        },
        {
            src: 'https://static.zpimg.cn/public/utils/pc-rem.js',
        },
        {
            src: 'https://static.zpimg.cn/public/global/global-icons.js',
        },
        {
            id: 'wxLogin',
            done: '1',
            src: 'https://res.wx.qq.com/connect/zh_CN/htmledition/js/wxLogin.js',
            defer: true,
        },
        // {
        //     id: 'TCaptcha',
        //     done: '1',
        //     src: 'https://turing.captcha.qcloud.com/TCaptcha.js',
        //     defer: true,
        // },
        {
            id: 'ddlogin',
            done: '1',
            src: 'https://g.alicdn.com/dingding/h5-dingtalk-login/0.21.0/ddlogin.js',
            defer: true,
        },
        // {
        //     id: 'qiyukf',
        //     done: '1',
        //     src: 'https://qiyukf.com/script/6678a159c701ad9647a6dc57bfacf81a.js?hidden=1',
        //     defer: true,
        // },
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
    // favicon: 'https://static.zpimg.cn/public/fe_user_pc/images/wotu_32.ico',
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
        master: {},
    },
    externals: {
        react: 'window.React',
        'react-dom': 'window.ReactDOM',
        less: 'window.less',
    },
    scripts: [
        'https://static.zpimg.cn/public/global/react.production.min.js',
        'https://static.zpimg.cn/public/global/react-dom.production.min.js',
        'https://static.zpimg.cn/public/less_2.7.3/less.min.js',
    ],
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
        BUILD_ENV: process.env.BUILD_ENV,
        ALIAS_ENV: process.env.ALIAS_ENV,
        RUN_ENV: process.env.RUN_ENV,
        PUBLIC_PATH: publicPath,
        defaultImage: 'https://zpimg.cn/a/img/img.png',
        defaultLogo: 'https://zpimg.cn/a/img/logo.png',
        defaultAvatar: 'https://zpimg.cn/a/img/avatar.png',
        defaultOrgLogo: 'https://static.zpimg.cn/public/fe_user_pc/images/default_org@2x.png',
    },
    nodeModulesTransform: {
        type: 'none',
    },
    // chunks: process.env.BUILD_ENV !== 'local' ? ['vendors', 'umi'] : ['umi'],
    inlineLimit: 10,
    devtool: process.env.BUILD_ENV !== 'pro' ? 'source-map' : 'eval',
    extraBabelPlugins:
        process.env.BUILD_ENV === 'pro' && process.env.RUN_ENV !== 'local'
            ? ['transform-remove-console']
            : [],
    fastRefresh: {},
    theme: { '@font-size-base': '16px' },
    webpack5: {
        // lazyCompilation: {
        //     entries: true,
        //     imports: false,
        // },
    },
    ...htmlConfig,
    chainWebpack(config: any, { webpack }: any) {
        // 更改主题色
        config.plugin('antd-theme-webpack-plugin').use(
            new AntDesignThemePlugin({
                lessUrl: 'https://static.zpimg.cn/public/less_2.7.3/less.min.js',
                antDir: path.join(__dirname, './node_modules/antd'), //antd包位置
                stylesDir: path.join(__dirname, './src/styles/theme'), //指定皮肤文件夹
                varFile: path.join(__dirname, './src/styles/theme/variables.less'), //自己设置默认的主题色
                // indexFileName: './public/index.html',
                mainLessFile: path.join(__dirname, './src/styles/theme/index.module.less'),
                // outputFilePath: path.join(__dirname, `./dist/${customPath}/mycolor.less`), //输出到什么地方
                themeVariables: [
                    //要改变的主题变量
                    '@primary-color',
                    '@btn-primary-bg',
                    // '@btn-default-bg',
                    '@my-btn-hover-bg',
                ],
                generateOnce: false,
            }),
        )
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
        analyzerPort: 8004,
        openAnalyzer: true,
        generateStatsFile: false,
        statsFilename: 'stats.json',
        logLevel: 'info',
        defaultSizes: 'parsed', // stat  // gzip
    },
})
