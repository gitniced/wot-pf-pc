import { Button } from 'antd'
import styles from '../../index.module.less'
import type { AccountBindItem } from '../../interface'
import type { UserInfo } from '@/stores/interface'
import { VERIFY_TYPE } from '../../const'
import { AUDIT_STATUS_TYPE } from '@/pages/bind/const'
const GetBindMind = ({
    accountBind,
    userData,
    fixBind,
    getBindUrl,
}: {
    accountBind: AccountBindItem[]
    userData?: UserInfo
    fixBind: (key?: string, statusStr?: string, userData?: UserInfo) => void
    getBindUrl: (key: string, info?: string, userData?: UserInfo) => string | undefined
}) => {
    let mindItem: AccountBindItem | undefined
    accountBind.find(item => {
        if (item.status !== VERIFY_TYPE.BIND) {
            mindItem = item
            return true
        } else {
            return false
        }
    })

    if (mindItem && Object.keys(mindItem).length > 0) {
        return (
            <div className={styles.mind}>
                <div className={styles.un_finish_content}>
                    <div className={styles.un_finish_sign}>
                        <div />
                        <svg className={[styles.sign, 'icon'].join(' ')} aria-hidden="true">
                            <use xlinkHref={`#Warning-Circle-Fill`} />
                        </svg>
                        <div className={styles.text}>未完成认证信息</div>
                    </div>

                    <div className={styles.un_finish_info}>
                        <div className={styles.type}>{mindItem.mindTitle}</div>
                        <div className={styles.info}>{mindItem.mindInfo}</div>
                    </div>
                </div>
                {/* 身份证状态为待审核，不展示按钮 */}
                {mindItem.key === 'auditStatus' &&
                mindItem.status === AUDIT_STATUS_TYPE.WAIT ? null : (
                    <Button
                        className={styles.fix_btn}
                        href={getBindUrl(mindItem?.key, mindItem?.statusStr, userData)}
                        onClick={e => {
                            e.preventDefault()
                            fixBind(mindItem?.key, mindItem?.statusStr, userData)
                        }}
                    >
                        去完善
                    </Button>
                )}
            </div>
        )
    } else {
        return null
    }
}
export default GetBindMind
