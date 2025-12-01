import dayjs from "dayjs";
import type { AccountLogItem } from "../../interface";
import styles from '../../index.module.less'
import { DEVICE_TYPE, LOGIN_TYPE } from "../../const";
import { memo } from "react";
const GetLogDom = ({ accountLog }: { accountLog: AccountLogItem[] }) => {
    return <>
        {
            accountLog?.map?.(item => {
                const { terminal, ip, loginTime, loginType } = item

                return (
                    <div key={`${ip}${loginTime}`} className={styles.log_list_item}>
                        <div className={styles.log_list_item_item}>{LOGIN_TYPE?.[loginType] || '账号登录'}</div>
                        <div className={styles.log_list_item_item}>{ip}</div>
                        <div className={styles.log_list_item_item}>{DEVICE_TYPE?.[terminal] || 'PC网页'}</div>
                        <div className={styles.log_list_item_item}>
                            {dayjs(loginTime).format('YYYY-MM-DD HH:mm:ss')}
                        </div>
                    </div>
                )
            })
        }
    </>
}

export default memo(GetLogDom)