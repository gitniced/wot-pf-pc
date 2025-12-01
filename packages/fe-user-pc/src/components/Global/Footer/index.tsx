import type SiteStore from '@/stores/siteStore'
import type UserStore from '@/stores/userStore'
import { inject, observer, Observer, useLocalStore } from 'mobx-react'
import { autorun } from 'mobx'
import { useEffect, useState } from 'react'
import styles from './index.module.less'
import { getEvent } from '../../../utils/event'
import { getPortalCodeFromUrl } from '@/utils/getPortalCodeFromUrl'
import { findSiteData } from '@wotu/wotu-components'
import Store from './store'
import { getLocalStorage } from '@/storage'
// import type { HeaderProps } from './interface'
// import loginHooks from './hooks'
const event = getEvent()

const FooterText = (data: any[], istTail: boolean) => {
    return data.map((item, index) => (
        <div className={styles.site_box} key={item.code}>
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
        </div>
    ))
}

const Footer = (props: { userStore?: UserStore; siteStore?: SiteStore; noBg?: boolean }) => {
    const store = useLocalStore(() => new Store())
    let portalCode = getPortalCodeFromUrl()
    const { siteStore, noBg = false } = props || {}
    const { siteData } = siteStore
    let { data } = siteData
    data = data || {}

    const [icp, setIcp] = useState<string>('')
    const [police, setPolice] = useState<string>('')
    const [linkPolice, setLinkPolice] = useState<string>('')
    const [cctv, setCctv] = useState<string>('')
    const [, update] = useState(0)
    autorun(() => {
        console.count('mobx数据更新')
    })
    useEffect(() => {
        event.on('siteUpdate', () => {
            update(v => v + 1)
        })
    })
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

    const policeCode = findSiteData(siteStore!.siteData, 'police_code')?.value

    const alias = getLocalStorage('ALIAS')

    return (
        <Observer>
            {() => {
                return (
                    <div
                        className={styles.page}
                        style={noBg ? { boxShadow: 'none', background: 'none' } : {}}
                    >
                        <div className={`${styles.content} ${styles.box}`}>
                            {store.footerCopy?.length > 0 && (
                                <div className={styles.recommend}>
                                    {FooterText(store.footerCopy, false)}
                                </div>
                            )}
                            {portalCode ? (
                                <div className={styles.content}>
                                    {policeCode ? (
                                        <>
                                            {/* <a className={styles.site}>
                                                <div className={styles.police} />
                                                <a
                                                    target="_blank"
                                                    href={
                                                        'http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=' +
                                                        policeCode
                                                    }
                                                    rel="noreferrer"
                                                >
                                                    {policeCode}
                                                </a>
                                            </a> */}

                                            {icp ? (
                                                <a
                                                    className={styles.site}
                                                    target="_blank"
                                                    href="https://beian.miit.gov.cn"
                                                    rel="noreferrer"
                                                >
                                                    {/* 浙ICP备{icp}号 */}
                                                    {icp}
                                                </a>
                                            ) : null}
                                            {alias !== 'szrc' ? (
                                                <>
                                                    <div className={styles.split} />

                                                    <a className={styles.site}>
                                                        <img
                                                            src="https://static.zpimg.cn/public/fe_saas_pc/image/wotulogo.png"
                                                            alt=""
                                                        />
                                                        <div>沃土股份提供技术支持</div>
                                                    </a>
                                                </>
                                            ) : null}
                                        </>
                                    ) : null}
                                </div>
                            ) : (
                                <div className={styles.content}>
                                    {FooterText(
                                        store.FooterQualification,
                                        !!(icp || cctv || (police && linkPolice)),
                                    )}
                                    {icp ? (
                                        <>
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
                                            {cctv || (police && linkPolice) ? (
                                                <div className={styles.split} />
                                            ) : null}
                                        </>
                                    ) : null}

                                    {cctv ? (
                                        <>
                                            <div className={styles.site}>
                                                {/* 广播电视节目制作经营许可证（浙）字第{cctv}号 */}
                                                {cctv}
                                            </div>
                                            {police && linkPolice ? (
                                                <div className={styles.split} />
                                            ) : null}
                                        </>
                                    ) : null}

                                    {police && linkPolice ? (
                                        <>
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
                            )}
                        </div>
                    </div>
                )
            }}
        </Observer>
    )
}

export default inject('userStore', 'siteStore')(observer(Footer))
