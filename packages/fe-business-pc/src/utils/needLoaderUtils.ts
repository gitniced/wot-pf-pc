const needLoaderUtils = () => {
    const randomKey = Math.random().toString(36).substring(-10)
    const links = [
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
        {
            id: 'TMap',
            done: '1',
            src: 'https://map.qq.com/api/gljs?v=1.exp&libraries=service&key=YQHBZ-TPH3Z-FMWXL-ZCJPP-OWIKE-AMFQS',
            defer: true,
        },
        {
            id: 'workbenchIconfont',
            done: '1',
            src: `https://static.zpimg.cn/public/fe_saas_pc/iconfont.js?randomKey=${randomKey}`,
        },
    ]

    links.map(item => {
        const { id, done, src, defer } = item
        let current = document.getElementById(id)
        if (id === 'workbenchIconfont') {
            current = document.createElement('script')
            // @ts-ignore
            current.charset = 'utf-8'
            // @ts-ignore
            current.src = src
            current.id = id
            // @ts-ignore
            current.defer = defer
            current.onload = () => {
                current!.setAttribute('done', done)
            }
            const s = document.getElementsByTagName('head')[0]
            s.appendChild(current)
        } else {
            if (current === null) {
                current = document.createElement('script')
                // @ts-ignore
                current.charset = 'utf-8'
                // @ts-ignore
                current.src = src
                current.id = id
                // @ts-ignore
                current.defer = defer
                current.onload = () => {
                    current!.setAttribute('done', done)
                }
                const s = document.getElementsByTagName('head')[0]
                s.appendChild(current)
            }
        }
    })
}

export default needLoaderUtils
