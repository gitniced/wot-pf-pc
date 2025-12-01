import type { UserInfo } from '@/stores/interface'
import type { SiteData } from '@/types'
import { message } from 'antd'

const ysfConfigUsr = (userDate: UserInfo | undefined, siteData: SiteData | undefined) => {
    const { code, email, idCardNo, name, mobile } = userDate || {}

    const configUsr = {
        // 用户标识，不传表示匿名用户
        uid: code,
        // 用户名称
        name: name,
        // 用户邮箱
        email: email,
        // 用户手机号
        mobile: mobile,
        // 用户组id
        groupid: '483406582',
        //登录用户其他信息
        data: JSON.stringify([
            { index: 1, key: 'sidName', label: '站点名称', value: siteData?.baseInfo?.name },
            { index: 2, key: 'sid', label: '站点ID', value: siteData?.sid },
            { key: 'id_cardNo', label: '身份证号', value: idCardNo },
        ]),
        // 导航头是否显示返回按钮
        isShowBack: true,
        level: 1,
        success: function () {
            window.ysf?.('open')
        },
        error: function () {
            message.error('打开客服窗口失败，请稍后再试')
        },
    }
    return configUsr
}

export default ysfConfigUsr
