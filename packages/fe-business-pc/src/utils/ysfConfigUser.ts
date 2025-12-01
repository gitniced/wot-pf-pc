import type { UserInfo } from '@/stores/interface'
import type { SiteData } from '@/types'
import { message } from 'antd'

const ysfConfigUsr = (userDate: UserInfo | undefined, siteData: SiteData | undefined) => {
    const {
        // avatar,
        code,
        email,
        idCardNo,
        name,
        mobile,
    } = userDate || {}

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
        // 企业常见问题模板id
        // qtype: '',
        // 企业欢迎语模板id
        // welcomeTemplateId: '',
        //登录用户其他信息
        data: JSON.stringify([
            { index: 1, key: 'sidName', label: '站点名称', value: siteData?.baseInfo?.name },
            { index: 2, key: 'sid', label: '站点ID', value: siteData?.sid },
            { key: 'id_cardNo', label: '身份证号', value: idCardNo },

            // { "index": 5, "key": "reg_date", "label": "注册日期", "value": "2015-11-16" },
            // { "index": 6, "key": "last_login", "label": "上次登录时间", "value": "2015-12-22 15:38:54" }
        ]),
        // 导航头是否显示返回按钮
        isShowBack: true,
        level: 1,
        success: function () {
            ysf?.('open')
        },
        error: function () {
            message.error('打开客服窗口失败，请稍后再试')
        },
    }
    return configUsr
}

export default ysfConfigUsr
