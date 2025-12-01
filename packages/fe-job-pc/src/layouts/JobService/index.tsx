import { Popover } from 'antd'
import styles from './index.module.less'
export default ({ data }: { data: any }) => {
    return (
        <div className={styles.container}>
            <div
                className={styles.online_servie}
                onClick={() => {
                    data?.customerService?.getLink()
                }}
            >
                <img src="https://static.zpimg.cn/dev/fe_job_pc/img/jy/png_jixiangwu_cedaohang@2x.png" />
            </div>
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
                            <svg className={`icon ${styles.icon}`}>
                                <use xlinkHref={'#icon_dianhuakefu1'} />
                            </svg>
                        </div>
                        <div className={styles.text}>服务热线</div>
                    </div>
                </Popover>
                <Popover
                    overlayClassName={styles.popover}
                    content={
                        <div className={styles['code-container']}>
                            <div className={styles['code-container-title']}>
                                <div className={styles['code-bg']} />
                                <div className={styles['gzh-name']}>{data?.miniApp?.title}</div>
                                <div className={styles['gzh-desc']}>扫码关注公众号</div>
                            </div>
                            <div className={styles['code-container-content']}>
                                <div>
                                    <img src={data?.miniApp?.qrcode} />
                                </div>
                                <div>微信扫码关注{data?.miniApp?.title}</div>
                            </div>
                        </div>
                    }
                    placement="left"
                >
                    <div className={styles.item}>
                        <div className={styles.icon}>
                            <svg className={`icon ${styles.icon}`}>
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
