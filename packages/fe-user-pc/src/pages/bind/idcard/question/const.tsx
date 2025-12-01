import { Button } from 'antd'
import styles from './index.module.less'
import { findConfigValueToBoolean, YsfService } from '@wotu/wotu-components'

export const getQuestionList = ({ userData, siteData, openAuditModal }) => {
    // 站点是否打开客服按钮
    let showServer = findConfigValueToBoolean(siteData, 'enable_customer_service')
    return [
        {
            key: 'auditModal',
            title: '身份证照片识别失败',
            description: '上传清晰完整的身份证照片，但系统始终无法识别通过。',
            buttonText: '申请人工审核',
            onButtonClick: openAuditModal,
            hrefUrl: '/bind/idcard?type=audit',
        },
        {
            key: 'service',
            title: '其他问题',
            description: '如遇到其他身份认证问题，请通过此种方式反馈。',
            // 是否隐藏改配置
            hidden: !showServer,
            renderButton: () => (
                <YsfService userDate={userData} siteData={siteData}>
                    <Button className={styles.button}>联系客服</Button>
                </YsfService>
            ),
            buttonText: '联系客服',
        },
    ]
}
