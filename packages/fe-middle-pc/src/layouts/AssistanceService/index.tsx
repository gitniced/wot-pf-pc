import { Tooltip } from 'antd'
import styles from './index.module.less'
import { YsfService } from '@wotu/wotu-components'
import { inject, observer } from 'mobx-react'
const KefuDom = ({ data, userStore, siteStore }: { data: any; userStore: any; siteStore: any }) => {
    console.log('🚀 ~ data:', data)
    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <YsfService userDate={userStore?.userData} siteData={siteStore?.siteData?.data}>
                    <Tooltip
                        placement="leftTop"
                        title="点击联系智能客服"
                        // color="var(--primary-color)"
                        overlayClassName={styles.kefu_container_jy}
                    >
                        <div className={styles.item}>
                            <div className={styles.icon}>
                                <img src="https://wtzp-static.oss-cn-hangzhou.aliyuncs.com/public/fe-middle-pc/icon_zhinengkefu%402x_8c11db74.png" />
                            </div>
                            <div className={styles.text}>智能客服</div>
                        </div>
                    </Tooltip>
                </YsfService>
            </div>
        </div>
    )
}
export default inject('siteStore', 'userStore')(observer(KefuDom))
