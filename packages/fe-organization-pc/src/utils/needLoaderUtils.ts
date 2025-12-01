const needLoaderUtils = () => {
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
    ]

    links.map(item => {
        const { id, done, src, defer } = item
        let current = document.getElementById(id)
        if (current === null) {
            current = document.createElement('script')
            current.charset = 'utf-8'
            current.src = src
            current.id = id
            current.defer = defer
            current.onload = () => {
                current!.setAttribute('done', done)
            }
            let s = document.getElementsByTagName('head')[0]
            s.appendChild(current)
        }
    })
}

export default needLoaderUtils
