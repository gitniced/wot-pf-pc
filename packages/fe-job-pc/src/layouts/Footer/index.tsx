import { inject, observer, useLocalStore } from 'mobx-react'
import { linkItems } from '../const'
import styles from './index.module.less'
import { findSiteData } from '@wotu/wotu-components'
import Store from './store'
import { useEffect, useState } from 'react'

const FooterText = (data: any[], istTail: boolean) => {
    return data.map((item, index) => (
        <>
            <div className={styles.site} key={item.code}>
                {!item.customContent?.url ? (
                    <span> {item.customContent?.copywriting}</span>
                ) : (
                    <a target="_blank" href={item.customContent?.url} rel="noreferrer">
                        {item.customContent?.copywriting}
                    </a>
                )}
            </div>
            {(index < data.length - 1 || istTail) && <div className={styles.split} />}
        </>
    ))
}

const Index: React.FC = ({ siteStore }) => {
    const store = useLocalStore(() => new Store())
    const { siteData } = siteStore
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
        const sid = findSiteData(siteStore?.siteData, 'sid')
        store.getFooterCopy(sid)
        store.getFooterQualification(sid)
    }, [])

    return (
        <div className={styles.footer}>
            <div className={styles.friend_chain}>
                <div className={styles.content}>
                    <div className={styles.link_box}>
                        <div className={styles.label}>友情链接：</div>
                        <div className={styles.value}>
                            {linkItems.map(item =>
                                <a href={item.link} target='_blank' className={styles.item} key={item.link} rel="noreferrer">{item.name}</a>)}
                        </div>
                    </div>
                    <div className={styles.technical_support}>
                        <div className={styles.label}>技术支持：</div>
                        <div className={styles.value}>杭州沃土教育科技股份有限公司</div>
                    </div>
                </div>
            </div>
            <div className={styles.version}>
                <div className={styles.content}>
                    {FooterText(
                        store.FooterQualification,
                        !!(icp || cctv || (police && linkPolice)),
                    )}
                    {icp ? (
                        <div className={styles.site}>
                            <a
                                target="_blank"
                                href="https://beian.miit.gov.cn"
                                rel="noreferrer"
                            >
                                {/* 浙ICP备{icp}号 */}
                                {icp}
                            </a>
                        </div>
                    ) : null}

                    {cctv ? (
                        <>
                            <div className={styles.split} />
                            <div className={styles.site}>
                                {/* 广播电视节目制作经营许可证（浙）字第{cctv}号 */}
                                {cctv}
                            </div>
                        </>
                    ) : null}

                    {police && linkPolice ? (
                        <>
                            <div className={styles.split} />
                            <a className={styles.site}>
                                <div className={styles.police} />
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
            <div className={styles.statement}>
                <div className={styles.content}>
                    <div className={styles.item}>负责声明</div>
                    <div className={styles.split} />
                    <div className={styles.item}>知识产权声明</div>
                </div>
            </div>
        </div>
    )
}

export default inject('userStore', 'siteStore')(observer(Index))