import { Popover, Tooltip } from 'antd'
import styles from './index.module.less'
import { YsfService } from '@wotu/wotu-components'
import { inject, observer } from 'mobx-react'
const KefuDom = ({ data, userStore, siteStore }: { data: any; userStore: any; siteStore: any }) => {
    console.log('🚀 ~ data:', data)
    return (
        <div className={styles.container}>
            <YsfService userDate={userStore?.userData} siteData={siteStore?.siteData?.data}>
                <Tooltip
                    placement="leftTop"
                    title="点击联系智能客服"
                    color="var(--primary-color)"
                    overlayClassName={styles.kefu_container_jy}
                >
                    <div className={styles.online_servie}>
                        <img
                            className={styles.mascot}
                            src="https://static.zpimg.cn/dev/fe_job_pc/img/jy/png_jixiangwu_cedaohang@2x.png?t=11"
                        />
                        <img
                            className={styles.mascot_bg}
                            src="https://static.zpimg.cn/dev/fe_job_pc/img/jy/png_jixiangwubg@2x.png"
                        />
                    </div>
                </Tooltip>
            </YsfService>

            <div className={styles.content}>
                <Popover
                    content={
                        <div className={styles.hotline}>
                            <p>{data?.serviceHotline?.policyConsultation}</p>
                            <p>{data?.serviceHotline?.technicalConsultation}</p>
                            <p>{data?.serviceHotline?.businessConsultation}</p>
                        </div>
                    }
                    placement="left"
                >
                    <div className={styles.item}>
                        <div className={styles.icon}>
                            <svg className={`${styles.icon}`}>
                                <use xlinkHref={'#icon_dianhuakefu1'} />
                            </svg>
                        </div>
                        <div className={styles.text}>服务热线</div>
                    </div>
                </Popover>
                <Popover
                    overlayClassName={styles.popover}
                    content={<img src={data?.miniApp?.qrcode} />}
                    placement="left"
                >
                    <div className={styles.item}>
                        <div className={styles.icon}>
                            <svg className={`${styles.icon}`}>
                                <use xlinkHref={'#icon_xf_mobile'} />
                            </svg>
                        </div>
                        <div className={styles.text}>移动端</div>
                    </div>
                </Popover>
            </div>
        </div>
    )
}
export default inject('siteStore', 'userStore')(observer(KefuDom))
