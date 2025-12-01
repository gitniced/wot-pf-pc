import type SiteStore from '@/stores/siteStore'
import styles from './index.module.less'
import { inject, observer } from 'mobx-react'
import { useEffect, useState } from 'react'
import { toJS } from 'mobx'

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

        console.log('configList', toJS(configList))

        configList.map((item: any) => {
            if (setStateMap[item.key]) {
                console.log('item', item)
                setStateMap[item.key](item.value)
            }
        })
    }, [data])

    return (
        <footer className={styles.footer}>
            {/* <div className={styles.support}>
                <span>主办单位：杭州沃土教育科技股份有限公司</span>
                <span className={styles.divider}>｜</span>
                <span>技术支持：杭州沃土教育科技股份有限公司</span>
            </div> */}

            <div className={styles.content}>
                <div className={styles.content_item}>
                    <span>© 2025 杭州沃土教育科技股份有限公司 版权所有</span>
                    {icp || cctv || (police && linkPolice) ? (
                        <span className={styles.content_split}>｜</span>
                    ) : null}
                </div>

                {icp ? (
                    <>
                        <div className={styles.content_item}>
                            <a target="_blank" href="https://beian.miit.gov.cn" rel="noreferrer">
                                {icp}
                            </a>
                        </div>
                        {cctv || (police && linkPolice) ? (
                            <span className={styles.content_split}>｜</span>
                        ) : null}
                    </>
                ) : null}

                {cctv ? (
                    <>
                        <div className={styles.content_item}>{cctv}</div>
                        {police && linkPolice ? (
                            <span className={styles.content_split}>｜</span>
                        ) : null}
                    </>
                ) : null}

                {police && linkPolice ? (
                    <>
                        <div className={styles.content_item}>
                            <img
                                className={styles.police_icon}
                                src="https://wtzp-img.oss-cn-hangzhou.aliyuncs.com/gz_origin/TB1jwakrbH1gK0jSZFwXXc7aXXa-20-20%402x.png"
                                alt="公安备案"
                            />
                            <a
                                target="_blank"
                                href={
                                    'http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=' +
                                    linkPolice
                                }
                                rel="noreferrer"
                            >
                                {police}
                            </a>
                        </div>
                    </>
                ) : null}
            </div>
        </footer>
    )
}

export default inject('siteStore')(observer(Footer))
