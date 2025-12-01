import type SiteStore from '@/stores/siteStore'
import styles from './index.modules.less'
import { inject, observer } from 'mobx-react'
import { useEffect, useState } from 'react'

const Footer = (props: { siteStore?: SiteStore }) => {
    const { siteStore } = props || {}
    const { siteData } = siteStore!
    let { data } = siteData
    data = data || {}

    const [icp, setIcp] = useState<string>('')
    const [police, setPolice] = useState<string>('')
    const [linkPolice, setLinkPolice] = useState<string>('')
    const [cctv, setCctv] = useState<string>('')

    useEffect(() => {
        let { configList } = data
        configList = configList || []
        const setStateMap: Record<string, (v: string) => void> = {
            icp_code: setIcp,
            police_code: setPolice,
            cctv_code: setCctv,
            link_police_code: setLinkPolice,
        }
        configList.map(item => {
            if (setStateMap[item.key]) {
                setStateMap[item.key](item.value)
            }
        })
    }, [])

    // const policeCode = findSiteData(siteStore!.siteData, 'police_code')?.value

    return (
        <div className={styles.page}>
            <div className={styles.power}>
                <a
                    className={styles.power_item}
                    href="http://www.osta.org.cn/"
                    target="_blank"
                    rel="noreferrer"
                >
                    友情链接：技能人才评价工作网
                </a>
                <div className={styles.power_item}>技术支持：中国电信集团四川省电信公司</div>
            </div>

            <div className={styles.content}>
                {icp ? (
                    <>
                        <div className={styles.content_item}>
                            <a target="_blank" href="https://beian.miit.gov.cn" rel="noreferrer">
                                {/* 浙ICP备{icp}号 */}
                                {icp}
                            </a>
                        </div>
                        {cctv || (police && linkPolice) ? (
                            <div className={styles.content_split} />
                        ) : null}
                    </>
                ) : null}

                {cctv ? (
                    <>
                        <div className={styles.content_item}>
                            {/* 广播电视节目制作经营许可证（浙）字第{cctv}号 */}
                            {cctv}
                        </div>
                        {police && linkPolice ? <div className={styles.content_split} /> : null}
                    </>
                ) : null}

                {police && linkPolice ? (
                    <>
                        <a className={styles.content_item}>
                            {/* <div className={styles.police} /> */}
                            <img
                                className={styles.image}
                                src="https://wtzp-img.oss-cn-hangzhou.aliyuncs.com/gz_origin/TB1jwakrbH1gK0jSZFwXXc7aXXa-20-20%402x.png"
                            />
                            <a
                                target="_blank"
                                href={
                                    'http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=' +
                                    linkPolice
                                }
                                rel="noreferrer"
                            >
                                {/* 浙公网安备{police}号 */}
                                {police}
                            </a>
                        </a>
                    </>
                ) : null}
            </div>
        </div>
    )
}
export default inject('siteStore')(observer(Footer))
