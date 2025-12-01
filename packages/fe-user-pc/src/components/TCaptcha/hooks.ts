// tcaptcha文档 https://cloud.tencent.com/document/product/1110

// 错误码列表
// const TcaptchaErrorCode = {
//     '1001': 'TCaptcha.js 加载错误',
//     '1002': '调用 show 方法超时',
//     '1003': '中间 js 加载超时',
//     '1004': '中间 js 加载错误',
//     '1005': '中间 js 运行错误',
//     '1006': '拉取验证码配置错误/超时',
//     '1007': 'iframe 加载超时',
//     '1008': 'iframe 加载错误',
//     '1009': 'jquery 加载错误',
//     '1010': '滑块 js 加载错误',
//     '1011': '滑块 js 运行错误',
//     '1012': '刷新连续错误3次',
//     '1013': '验证网络连续错误3次',
// }

const TcaptchaHook = (serverVerify: any, fail: any) => {
    const appid = '190180729'
    let afterServerVerifyHandler: null | ((ticket: string) => void) = null

    /**
   * @name loadScript 加载图形验证sdk
   * @param autoOpenVerify 是否自动打开滑动验证码弹窗 

   */

    // 本地校验成功后 触发后端人机校验
    const doServerVerify = async ({ ticket, randstr }: { ticket: string; randstr: string }) => {
        console.log(ticket, randstr)
        await serverVerify(ticket, randstr)
        if (Object.prototype.toString.call(afterServerVerifyHandler) === '[object Function]') {
            afterServerVerifyHandler(ticket)
        }
    }

    // 验证后触发函数
    const finishCaptcha = (res: TcaptchaResponse) => {
        // res（用户主动关闭验证码）= {ret: 2, ticket: null}
        // res（验证成功） = {ret: 0, ticket: "String", randstr: "String"}
        // res（请求验证码发生错误，验证码自动返回terror_前缀的容灾票据） = {ret: 0, ticket: "String", randstr: "String",  errorCode: Number, errorMessage: "String"}
        // 此处代码仅为验证结果的展示示例，真实业务接入，建议基于ticket和errorCode情况做不同的业务处理
        const { ret, errorCode, ticket, randstr } = res || {}
        console.log(res)
        switch (ret) {
            case 0:
                if (errorCode) {
                    // 验证失败
                    if (Object.prototype.toString.call(fail) === '[object Function]') {
                        fail(res)
                    }
                } else {
                    // 验证成功
                    if (Object.prototype.toString.call(serverVerify) === '[object Function]') {
                        doServerVerify({ ticket, randstr })
                    }
                }
                break
            case 2:
                // 用户取消
                // if (Object.prototype.toString.call(onClose) === '[object Function]') {
                //     onClose(res)
                // }
                break
            default:
        }
    }

    // 脚本加载或初始化错误时，保障事件流程正常
    const loadErrorCallback = () => {
        // 生成容灾票据或自行做其它处理
        let ticket = 'terror_1001_' + appid + Math.floor(new Date().getTime() / 1000)
        finishCaptcha({
            ret: 0,
            randstr: '@' + Math.random().toString(36).substr(2),
            ticket,
            errorCode: 1001,
            errorMessage: 'jsload_error',
        })
    }

    // 进行图形验证
    const doVerify = () => {
        try {
            const done = document.getElementById('TCaptcha').getAttribute('done')
            if (done !== '1') {
                console.log('TCaptcha is not prepare')
                return
            }
            // 生成一个验证码对象
            // CaptchaAppId：登录验证码控制台，从【验证管理】页面进行查看。如果未创建过验证，请先新建验证。注意：不可使用客户端类型为小程序的CaptchaAppId，会导致数据统计错误。
            //finishCaptcha：定义的回调函数
            const captcha = new TencentCaptcha(appid, finishCaptcha, {
                userLanguage: 'zh-cn',
                needFeedBack: false,
            })
            // 调用方法，显示验证码
            captcha.show()
        } catch (error) {
            console.log('加载异常')
            console.log(error)
            // 加载异常，调用验证码js加载错误处理函数
            loadErrorCallback()
        }
    }

    const loadScript = (autoOpenVerify: boolean) => {
        if (!document.getElementById('TCaptcha')) {
            const scriptDom = document.createElement('script')
            scriptDom.charset = 'utf-8'
            scriptDom.src = 'https://turing.captcha.qcloud.com/TCaptcha.js'
            scriptDom.id = 'TCaptcha'
            scriptDom.onload = async () => {
                scriptDom.setAttribute('done', '1')

                // 如果自动打开滑动验证码弹窗 直接触发验证码
                if (autoOpenVerify) {
                    await doVerify()
                }
            }
            const head = document.getElementsByTagName('head')[0]
            head.appendChild(scriptDom)
        }
    }

    // 绑定图形验证结束并服务端校验通过后的业务
    const afterServerVerify = (callback: () => void) => {
        afterServerVerifyHandler = callback
    }

    return { loadScript, doVerify, afterServerVerify }
}

export default TcaptchaHook
